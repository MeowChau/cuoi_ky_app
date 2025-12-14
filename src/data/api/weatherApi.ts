// src/data/api/weatherApi.ts
import axios from 'axios';
import { OPENWEATHER_API_KEY } from '@env';
import { WeatherApiResponse } from '../models/WeatherResponse';

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ✅ DANH SÁCH CÁC THÀNH PHỐ VIỆT NAM
export const VIETNAM_CITIES = [
  { id: 'hanoi', name: 'Hà Nội', lat: 21.0285, lon: 105.8542 },
  { id: 'hcm', name: 'TP.HCM', lat: 10.8231, lon: 106.6297 },
  { id: 'danang', name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022 },
  { id: 'quangninh', name: 'Quảng Ninh', lat: 21.0064, lon: 107.2925 },
  { id: 'ninhbinh', name: 'Ninh Bình', lat: 20.2506, lon: 105.9745 },
];

export const weatherApi = {
  /**
   * ✅ GỌI API DỰ BÁO THỜI TIẾT 5 NGÀY / 3 GIỜ
   */
  getForecast: async (
    lat: number,
    lon: number
  ): Promise<WeatherApiResponse> => {
    try {
      console.log('📤 Weather API Request:', { lat, lon });

      const response = await axios.get<WeatherApiResponse>(
        `${OPENWEATHER_BASE_URL}/forecast`,
        {
          params: {
            lat,
            lon,
            appid: OPENWEATHER_API_KEY,
            units: 'metric', // Celsius
            lang: 'vi', // Tiếng Việt
          },
        }
      );

      console.log('✅ Weather API Response:', response.status);
      return response.data;
    } catch (error: any) {
      console.error('❌ Weather API Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Không thể lấy dữ liệu thời tiết'
      );
    }
  },
};

/**
 * ✅ HELPER: MAPPING ICON OPENWEATHER -> EMOJI
 */
export const getWeatherEmoji = (icon: string): string => {
  const iconMap: Record<string, string> = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
  };
  return iconMap[icon] || '🌤️';
};