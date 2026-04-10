import { useState, useEffect } from 'react';
import { container } from '../../../di/container';
import { TOKENS } from '../../../di/tokens';
import { SearchPlacesUseCase } from '../../../domain/usecases/SearchPlacesUseCase';
import { GetWeatherForecastUseCase } from '../../../domain/usecases/GetWeatherForecastUseCase';
import { GetFeaturedPlacesUseCase } from '../../../domain/usecases/GetFeaturedPlacesUseCase';
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

  const handleSearch = async (keyword: string) => {
    if (!keyword || keyword.trim().length === 0) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const searchUseCase = container.resolve<SearchPlacesUseCase>(TOKENS.SearchPlacesUseCase);
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
export const useHomeData = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    setIsLoading(true);
    try {
      const getFeaturedUseCase = container.resolve<GetFeaturedPlacesUseCase>(TOKENS.GetFeaturedPlacesUseCase);
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

  useEffect(() => {
    fetchWeather();
  }, [selectedCity]);

  const fetchWeather = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const getWeatherUseCase = container.resolve<GetWeatherForecastUseCase>(TOKENS.GetWeatherForecastUseCase);
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
