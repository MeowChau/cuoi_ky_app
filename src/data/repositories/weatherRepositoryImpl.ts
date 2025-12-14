// src/data/repositories/weatherRepositoryImpl.ts
import {
  WeatherRepository,
  GetWeatherRequest,
} from '../../domain/repositories/WeatherRepository';
import { Weather, WeatherDay } from '../../domain/entities/Weather';
import { weatherApi, getWeatherEmoji } from '../api/weatherApi';

export class WeatherRepositoryImpl implements WeatherRepository {
  async getWeatherForecast(request: GetWeatherRequest): Promise<Weather> {
    try {
      const response = await weatherApi.getForecast(
        request.city.lat,
        request.city.lon
      );

      // ✅ GROUP DATA THEO NGÀY
      const dailyData = new Map<string, any[]>();
      
      response.list.forEach(item => {
        const date = new Date(item.dt_txt);
        const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
        
        if (!dailyData.has(dateKey)) {
          dailyData.set(dateKey, []);
        }
        dailyData.get(dateKey)!.push(item);
      });

      // ✅ XỬ LÝ MỖI NGÀY: Lấy mốc 12:00 cho icon/description, tính min/max từ tất cả mốc
      const forecast: WeatherDay[] = [];
      
      for (const [dateKey, items] of dailyData.entries()) {
        if (forecast.length >= 3) break; // Chỉ lấy 3 ngày

        // Tìm mốc 12:00 trưa (hoặc gần nhất)
        const noonItem = items.find(item => {
          const hour = new Date(item.dt_txt).getHours();
          return hour === 12;
        }) || items[Math.floor(items.length / 2)]; // Nếu không có 12:00, lấy giữa ngày

        // ✅ TÌM MIN/MAX TỪ TẤT CẢ MỐC TRONG NGÀY
        const temps = items.map(item => item.main.temp);
        const tempMin = Math.round(Math.min(...temps));
        const tempMax = Math.round(Math.max(...temps));
        const tempAvg = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);

        forecast.push({
          date: new Date(dateKey),
          temp: tempAvg, // Nhiệt độ trung bình trong ngày
          tempMin,
          tempMax,
          humidity: noonItem.main.humidity,
          windSpeed: Math.round(noonItem.wind.speed * 3.6), // m/s -> km/h
          condition: noonItem.weather[0].main,
          description: noonItem.weather[0].description,
          icon: getWeatherEmoji(noonItem.weather[0].icon),
        });
      }

      return {
        city: request.city,
        forecast,
        updatedAt: new Date(),
      };
    } catch (error: any) {
      console.error('❌ Get Weather Forecast Error:', error);
      throw error;
    }
  }
}