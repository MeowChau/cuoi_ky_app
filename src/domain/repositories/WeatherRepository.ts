// src/domain/repositories/WeatherRepository.ts
import { Weather, City } from '../entities/Weather';

export interface GetWeatherRequest {
  city: City;
}

export interface WeatherRepository {
  getWeatherForecast(request: GetWeatherRequest): Promise<Weather>;
}