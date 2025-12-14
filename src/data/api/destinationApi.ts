import axiosInstance from './axiosConfig';

// ✅ RESPONSE FORMAT MỚI
export interface DestinationSearchResponse {
  destinations: {
    _id: string;
    name: string;
    description: string;
    country: string;
    city: string;
    location: {
      type: string;
      coordinates: [number, number]; // [lng, lat]
    };
    category: string;
    budgetRange: {
      min: number;
      max: number;
    };
    recommendedDuration: number;
    images: string[];
    tags: string[];
    rating: {
      average: number;
      count: number;
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}

export const destinationApi = {
  // Search destinations
  search: async (params: {
    q: string;
    category?: string;
    budget?: string;
  }): Promise<DestinationSearchResponse> => {
    try {
      console.log('📤 Destination Search Request:', params);

      const response = await axiosInstance.get<DestinationSearchResponse>(
        '/destinations/search',
        { params },
      );

      console.log('✅ Destination Search Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ Destination Search Error:',
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || 'Tìm kiếm địa điểm thất bại',
      );
    }
  },
};
