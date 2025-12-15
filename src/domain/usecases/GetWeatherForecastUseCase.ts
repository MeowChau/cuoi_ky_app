// src/domain/usecases/GetWeatherForecastUseCase.ts
import {
    WeatherRepository,
    GetWeatherRequest,
  } from '../repositories/WeatherRepository';
  import { Weather } from '../entities/Weather';
  
  export class GetWeatherForecastUseCase {
    constructor(private weatherRepository: WeatherRepository) {}
  
    async execute(request: GetWeatherRequest): Promise<Weather> {
      // ✅ VALIDATE BUSINESS LOGIC
      if (!request.city || !request.city.lat || !request.city.lon) {
        throw new Error('Thông tin thành phố không hợp lệ');
      }
  
      // ✅ GỌI REPOSITORY
      return await this.weatherRepository.getWeatherForecast(request);
    }
  }