// src/domain/entities/Weather.ts

export interface City {
    id: string;
    name: string;
    lat: number;
    lon: number;
  }
  
  export interface WeatherDay {
    date: Date;
    temp: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    description: string;
    icon: string;
  }
  
  export interface Weather {
    city: City;
    forecast: WeatherDay[]; // 3 ngày
    updatedAt: Date;
  }