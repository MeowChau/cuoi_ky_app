import axiosInstance from './axiosConfig';
import {
  AutocompleteResponse,
  SearchResponse,
  NearbyResponse,
  PlaceDetailsResponse,
} from '../models/OsmResponse';

export const osmApi = {
  // Autocomplete - Gợi ý địa điểm khi gõ
  autocomplete: async (keyword: string): Promise<AutocompleteResponse[]> => {
    try {
      const response = await axiosInstance.get<AutocompleteResponse[]>(
        `/osm/autocomplete`,
        {
          params: { q: keyword },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ OSM Autocomplete Error:', error);
      throw new Error(error.response?.data?.message || 'Tìm kiếm thất bại');
    }
  },

  // Search - Tìm kiếm theo loại (hotels, restaurants, attractions, cafes)
  search: async (
    type: 'hotels' | 'restaurants' | 'attractions' | 'cafes',
    keyword: string,
  ): Promise<SearchResponse[]> => {
    try {
      const response = await axiosInstance.get<SearchResponse[]>(
        `/osm/search/${type}`,
        {
          params: { q: keyword },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ OSM Search Error:', error);
      throw new Error(error.response?.data?.message || 'Tìm kiếm thất bại');
    }
  },

  // Nearby - Tìm địa điểm gần vị trí hiện tại
  nearby: async (
    type: 'hotels' | 'restaurants' | 'attractions',
    lat: number,
    lng: number,
    radius: number = 2000,
  ): Promise<NearbyResponse[]> => {
    try {
      const response = await axiosInstance.get<NearbyResponse[]>(
        `/osm/nearby/${type}`,
        {
          params: { lat, lng, radius },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ OSM Nearby Error:', error);
      throw new Error(error.response?.data?.message || 'Tìm kiếm thất bại');
    }
  },

  // Details - Chi tiết địa điểm
  getDetails: async (placeId: string): Promise<PlaceDetailsResponse> => {
    try {
      const response = await axiosInstance.get<PlaceDetailsResponse>(
        `/osm/details/${placeId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ OSM Details Error:', error);
      throw new Error(
        error.response?.data?.message || 'Lấy thông tin thất bại',
      );
    }
  },
};
