export interface MockPlace {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
}

export interface MockWeather {
  id: string;
  city: string;
  temperature: number;
  condition: 'sunny' | 'rainy' | 'cloudy';
  humidity: number;
}

export const FAMOUS_PLACES: MockPlace[] = [
  {
    id: '1',
    name: 'Vịnh Hạ Long',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400',
    rating: 4.8,
    location: 'Quảng Ninh',
  },
  {
    id: '2',
    name: 'Phố cổ Hội An',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400',
    rating: 4.9,
    location: 'Quảng Nam',
  },
  {
    id: '3',
    name: 'Sapa',
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400',
    rating: 4.7,
    location: 'Lào Cai',
  },
  {
    id: '4',
    name: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400',
    rating: 4.6,
    location: 'Đà Nẵng',
  },
];

export const WEATHER_DATA: MockWeather[] = [
  {
    id: '1',
    city: 'Hà Nội',
    temperature: 28,
    condition: 'sunny',
    humidity: 65,
  },
  {
    id: '2',
    city: 'Hồ Chí Minh',
    temperature: 32,
    condition: 'cloudy',
    humidity: 75,
  },
  {
    id: '3',
    city: 'Đà Nẵng',
    temperature: 30,
    condition: 'rainy',
    humidity: 80,
  },
  {
    id: '4',
    city: 'Nha Trang',
    temperature: 29,
    condition: 'sunny',
    humidity: 70,
  },
];
