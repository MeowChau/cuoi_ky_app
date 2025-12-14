// src/presentation/containers/Home/hooks.ts
import { useState, useEffect } from 'react';
import { SearchPlacesUseCase } from '../../../domain/usecases/SearchPlacesUseCase';
import { GetWeatherForecastUseCase } from '../../../domain/usecases/GetWeatherForecastUseCase'; // ✨ NEW
import { PlaceRepositoryImpl } from '../../../data/repositories/placeRepositoryImpl';
import { WeatherRepositoryImpl } from '../../../data/repositories/weatherRepositoryImpl'; // ✨ NEW
import { Place } from '../../../domain/entities/Place';
import { Weather, City } from '../../../domain/entities/Weather'; // ✨ NEW
import { VIETNAM_CITIES } from '../../../data/api/weatherApi'; // ✨ NEW

// ✅ EXISTING HOOK
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

    if (keyword.trim().length < 2) {
      setSearchResults([]);
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

// ✨ NEW HOOK - WEATHER FORECAST
export const useWeatherForecast = () => {
  const [selectedCity, setSelectedCity] = useState<City>(VIETNAM_CITIES[0]);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weatherRepository = new WeatherRepositoryImpl();
  const getWeatherUseCase = new GetWeatherForecastUseCase(weatherRepository);

  // ✅ FETCH WEATHER KHI CHỌN THÀNH PHỐ
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

// ✅ TYPE EXPORTS (EXISTING)
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