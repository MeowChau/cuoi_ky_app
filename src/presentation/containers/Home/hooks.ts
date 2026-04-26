import { useState, useEffect } from 'react';
import { container } from '../../../di/container';
import { TOKENS } from '../../../di/tokens';
import { SearchPlacesUseCase } from '../../../domain/usecases/SearchPlacesUseCase';
import { GetWeatherForecastUseCase } from '../../../domain/usecases/GetWeatherForecastUseCase';
import { GetFeaturedPlacesUseCase } from '../../../domain/usecases/GetFeaturedPlacesUseCase';
import { Place } from '../../../domain/entities/Place';
import { Weather, City } from '../../../domain/entities/Weather';
import {
  VIETNAM_CITIES,
  weatherApi,
  getWeatherEmoji,
} from '../../../data/api/weatherApi';

export interface PlaceCurrentWeather {
  temp: number;
  icon: string;
  description: string;
  isLoading: boolean;
}

export type PlaceCurrentWeatherMap = Record<string, PlaceCurrentWeather>;

// ----------------------------------------------------
// 1. HOOK: SEARCH (TÌM KIẾM)
// ----------------------------------------------------
export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [weatherByPlace, setWeatherByPlace] = useState<PlaceCurrentWeatherMap>(
    {},
  );
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
      const searchUseCase = container.resolve<SearchPlacesUseCase>(
        TOKENS.SearchPlacesUseCase,
      );
      const results = await searchUseCase.execute({ keyword });
      setSearchResults(results);

      // Lấy thời tiết hiện tại cho tối đa 8 kết quả đầu để tránh gọi API quá nhiều.
      const weatherTargets = results
        .filter(place => !!place.lat && !!place.lng)
        .slice(0, 8);

      if (weatherTargets.length > 0) {
        const initialWeatherMap: PlaceCurrentWeatherMap = {};
        weatherTargets.forEach(place => {
          initialWeatherMap[place.id] = {
            temp: 0,
            icon: '⏳',
            description: 'Đang tải thời tiết...',
            isLoading: true,
          };
        });
        setWeatherByPlace(initialWeatherMap);

        const weatherPairs = await Promise.all(
          weatherTargets.map(async place => {
            try {
              const response = await weatherApi.getCurrentWeather(
                place.lat,
                place.lng,
              );

              return [
                place.id,
                {
                  temp: Math.round(response.main.temp),
                  icon: getWeatherEmoji(response.weather[0]?.icon || ''),
                  description:
                    response.weather[0]?.description || 'Không xác định',
                  isLoading: false,
                },
              ] as const;
            } catch {
              return [
                place.id,
                {
                  temp: 0,
                  icon: '⚠️',
                  description: 'Không lấy được thời tiết',
                  isLoading: false,
                },
              ] as const;
            }
          }),
        );

        setWeatherByPlace(Object.fromEntries(weatherPairs));
      } else {
        setWeatherByPlace({});
      }

      if (results.length === 0) {
        setError('Không tìm thấy địa điểm phù hợp');
      }
    } catch (err: any) {
      console.error('❌ Search error:', err);
      setError(err.message || 'Lỗi tìm kiếm');
      setSearchResults([]);
      setWeatherByPlace({});
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setWeatherByPlace({});
    setError(null);
    setIsSearching(false);
  };

  return {
    searchResults,
    weatherByPlace,
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
      const getFeaturedUseCase = container.resolve<GetFeaturedPlacesUseCase>(
        TOKENS.GetFeaturedPlacesUseCase,
      );
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
  const [citySearchKeyword, setCitySearchKeyword] = useState('');
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchingCity, setIsSearchingCity] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
  }, [selectedCity]);

  const fetchWeather = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const getWeatherUseCase = container.resolve<GetWeatherForecastUseCase>(
        TOKENS.GetWeatherForecastUseCase,
      );
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
    setCitySearchKeyword(city.name);
  };

  const handleSearchCityWeather = async (keyword: string) => {
    const query = keyword.trim();
    if (!query) {
      setError('Vui lòng nhập tỉnh/thành để tìm thời tiết');
      return;
    }

    setIsSearchingCity(true);
    setError(null);

    try {
      const cityResult = await weatherApi.searchCityByName(query, 'VN');
      if (!cityResult) {
        setError(`Không tìm thấy tỉnh/thành: ${query}`);
        return;
      }

      const resolvedCity: City = {
        id: cityResult.name.toLowerCase().replace(/\s+/g, '-'),
        name: cityResult.name,
        lat: cityResult.lat,
        lon: cityResult.lon,
      };

      setSelectedCity(resolvedCity);
      setCitySearchKeyword(cityResult.name);
    } catch (err: any) {
      console.error('❌ Search city weather error:', err);
      setError(err.message || 'Không thể tìm thời tiết theo tỉnh/thành');
    } finally {
      setIsSearchingCity(false);
    }
  };

  const refetch = () => {
    fetchWeather();
  };

  return {
    cities: VIETNAM_CITIES,
    selectedCity,
    citySearchKeyword,
    setCitySearchKeyword,
    weatherData,
    isLoading,
    isSearchingCity,
    error,
    handleCityChange,
    handleSearchCityWeather,
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
