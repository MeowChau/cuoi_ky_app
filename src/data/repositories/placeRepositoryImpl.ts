// src/data/repositories/placeRepositoryImpl.ts
import axios from 'axios';
import {
  PlaceRepository,
  SearchPlaceRequest,
  NearbyPlaceRequest,
} from '../../domain/repositories/PlaceRepository';
import { Place } from '../../domain/entities/Place';

const BASE_URL = 'https://app-smart-travel-assistant.onrender.com/api';

export class PlaceRepositoryImpl implements PlaceRepository {
  // Lấy danh sách địa điểm nổi bật (featured)
  async getFeaturedPlaces(): Promise<Place[]> {
    try {
      console.log(
        'Fetching featured places from:',
        `${BASE_URL}/destinations/featured`,
      );
      const response = await axios.get(`${BASE_URL}/destinations/featured`);

      const data = response.data.destinations;

      return data.map((item: any) => {
        // 1. Xử lý Ảnh
        let finalImage = `https://placehold.co/600x400?text=${encodeURIComponent(
          item.name,
        )}`;
        if (
          item.famousSpots &&
          item.famousSpots.length > 0 &&
          item.famousSpots[0].image
        ) {
          finalImage = item.famousSpots[0].image;
        } else if (item.images && item.images.length > 0) {
          finalImage = item.images[0];
        }

        // 2. Xử lý tên hiển thị
        let displayName = item.name; // Mặc định là tên thành phố (VD: Thành phố Hanoi)
        let displayLocation = item.country || 'Việt Nam';

        if (item.famousSpots && item.famousSpots.length > 0) {
          displayName = item.famousSpots[0].name; // VD: Hồ Gươm
          displayLocation = item.name
            .replace('Thành phố ', '')
            .replace('City', '')
            .trim(); // VD: Hanoi
        } else {
          displayName = item.name.replace('Thành phố ', '');
        }

        return {
          id: item._id,
          name: displayName,
          location: displayLocation,
          image: finalImage,
          rating: item.rating?.average || 4.5,
          description: item.description,
          specialties: item.specialties,
          bestTime: item.bestTimeToVisit
            ? item.bestTimeToVisit.join(', ')
            : '',
          famousSpots: item.famousSpots || [],
          category: item.category,
          lat: item.location?.coordinates?.[1] ?? 0,
          lng: item.location?.coordinates?.[0] ?? 0,
        } as Place;
      });
    } catch (error) {
      console.error('Lỗi khi gọi API Featured:', error);
      return [];
    }
  }

  // Tìm kiếm địa điểm theo từ khóa (dùng API /destinations/search)
  async searchPlaces(request: SearchPlaceRequest): Promise<Place[]> {
    try {
      const params: any = {
        q: request.keyword,
      };

      if (request.type) {
        // map type trong app sang category trên server nếu cần
        params.category = request.type;
      }

      console.log(
        'Searching places from:',
        `${BASE_URL}/destinations/search`,
        params,
      );

      const response = await axios.get(`${BASE_URL}/destinations/search`, {
        params,
      });

      const data = response.data.destinations || [];

      return data.map((item: any) => {
        // 1. Ảnh ưu tiên: famousSpots[0].image -> images[0] -> placeholder
        let finalImage = `https://placehold.co/600x400?text=${encodeURIComponent(
          item.name,
        )}`;
        if (
          item.famousSpots &&
          item.famousSpots.length > 0 &&
          item.famousSpots[0].image
        ) {
          finalImage = item.famousSpots[0].image;
        } else if (item.images && item.images.length > 0) {
          finalImage = item.images[0];
        }

        // 2. Tên + location hiển thị tương tự featured
        let displayName = item.name;
        let displayLocation = item.country || 'Việt Nam';

        if (item.famousSpots && item.famousSpots.length > 0) {
          displayName = item.famousSpots[0].name;
          displayLocation = item.name
            .replace('Thành phố ', '')
            .replace('City', '')
            .trim();
        } else {
          displayName = item.name.replace('Thành phố ', '');
          if (item.city) {
            displayLocation = item.city;
          }
        }

        return {
          id: item._id,
          name: displayName,
          location: displayLocation,
          image: finalImage,
          rating: item.rating?.average
            ? Number(item.rating.average)
            : undefined,
          description: item.description,
          specialties: item.specialties,
          bestTime: item.bestTimeToVisit
            ? item.bestTimeToVisit.join(', ')
            : '',
          famousSpots: item.famousSpots || [],
          category: item.category,
          budgetRange: item.budgetRange,
          recommendedDuration: item.recommendedDuration,
          tags: item.tags,
          lat: item.location?.coordinates?.[1] ?? 0,
          lng: item.location?.coordinates?.[0] ?? 0,
        } as Place;
      });
    } catch (error) {
      console.error('Lỗi khi gọi API Search Places:', error);
      return [];
    }
  }

  // Các hàm khác có thể được implement sau
  async getNearbyPlaces(
    _request: NearbyPlaceRequest,
  ): Promise<Place[]> {
    return [];
  }

  async getPlaceDetails(_placeId: string): Promise<Place> {
    throw new Error('Method not implemented.');
  }

  async autocompletePlaces(_keyword: string): Promise<Place[]> {
    return [];
  }
}