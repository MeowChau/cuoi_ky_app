// src/presentation/containers/Home/hooks.ts
import { useState, useEffect } from 'react';
import { SearchPlacesUseCase } from '../../../domain/usecases/SearchPlacesUseCase';
import { GetWeatherForecastUseCase } from '../../../domain/usecases/GetWeatherForecastUseCase';
import { GetFeaturedPlacesUseCase } from '../../../domain/usecases/GetFeaturedPlacesUseCase'; // ✅ Import usecase này
import { PlaceRepositoryImpl } from '../../../data/repositories/placeRepositoryImpl';
import { WeatherRepositoryImpl } from '../../../data/repositories/weatherRepositoryImpl';
import { Place } from '../../../domain/entities/Place';
import { Weather, City } from '../../../domain/entities/Weather';
import { VIETNAM_CITIES } from '../../../data/api/weatherApi';

// ----------------------------------------------------
// 1. HOOK: SEARCH (TÌM KIẾM)
// ----------------------------------------------------
export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeRepository = new PlaceRepositoryImpl();
  const searchUseCase = new SearchPlacesUseCase(placeRepository);

  const handleSearch = async (keyword: string) => {
    if (!keyword || keyword.trim().length === 0) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const results = await searchUseCase.execute({ keyword });
      setSearchResults(results);

      if (results.length === 0) {
        setError('Không tìm thấy địa điểm phù hợp');
      }
    } catch (err: any) {
      console.error('❌ Search error:', err);
      setError(err.message || 'Lỗi tìm kiếm');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setError(null);
    setIsSearching(false);
  };

  return {
    searchResults,
    isSearching,
    error,
    handleSearch,
    clearSearch,
  };
};

// ----------------------------------------------------
// 2. HOOK: HOME DATA (LẤY ĐỊA ĐIỂM NỔI BẬT TỪ API)
// ----------------------------------------------------
// 🔥 Đây là phần bị thiếu gây ra lỗi
export const useHomeData = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const placeRepository = new PlaceRepositoryImpl();
  const getFeaturedUseCase = new GetFeaturedPlacesUseCase(placeRepository);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    setIsLoading(true);
    try {
      const places = await getFeaturedUseCase.execute();
      setFeaturedPlaces(places);
    } catch (err: any) {
      console.error('Error fetching home data:', err);
      setError('Không thể tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  return { featuredPlaces, isLoading, error, refetch: fetchFeatured };
};

// ----------------------------------------------------
// 3. HOOK: WEATHER (DỰ BÁO THỜI TIẾT)
// ----------------------------------------------------
export const useWeatherForecast = () => {
  const [selectedCity, setSelectedCity] = useState<City>(VIETNAM_CITIES[0]);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weatherRepository = new WeatherRepositoryImpl();
  const getWeatherUseCase = new GetWeatherForecastUseCase(weatherRepository);

  useEffect(() => {
    fetchWeather();
  }, [selectedCity]);

  const fetchWeather = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const weather = await getWeatherUseCase.execute({ city: selectedCity });
      setWeatherData(weather);
    } catch (err: any) {
      console.error('❌ Fetch weather error:', err);
      setError(err.message || 'Không thể lấy dữ liệu thời tiết');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const refetch = () => {
    fetchWeather();
  };

  return {
    cities: VIETNAM_CITIES,
    selectedCity,
    weatherData,
    isLoading,
    error,
    handleCityChange,
    refetch,
  };
};

// Type exports
export interface PlaceType {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
}

export interface WeatherType {
  id: string;
  city: string;
  temperature: number;
  condition: 'sunny' | 'rainy' | 'cloudy';
  humidity: number;
}