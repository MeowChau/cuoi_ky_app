import axiosInstance from './axiosConfig';
import {
  GetTripsApiResponse,
  CreateTripApiResponse,
  UpdateTripApiResponse,
  DeleteTripApiResponse,
  TripDetailApiResponse,
} from '../models/TripResponse';

export interface CreateTripRequest {
  title: string;
  startDate: string;
  endDate: string;
  origin?: string;
  transportMode?: string;
  destinations?: any[];
  budget: {
    total: number;
  };
}

export interface UpdateTripRequest {
  title?: string;
  startDate?: string;
  endDate?: string;
  budget?: any;
  destinations?: any[];
}

export const tripApi = {
  // Lấy danh sách chuyến đi
  getTrips: async (): Promise<GetTripsApiResponse> => {
    try {
      const response = await axiosInstance.get<GetTripsApiResponse>('/trips');
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Không thể tải danh sách chuyến đi');
    }
  },

  // Tạo chuyến đi mới
  createTrip: async (data: CreateTripRequest): Promise<CreateTripApiResponse> => {
    try {
      const response = await axiosInstance.post<CreateTripApiResponse>(
        '/trips',
        data,
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Tạo chuyến đi thất bại');
    }
  },

  // Lấy chi tiết chuyến đi
  getTripDetail: async (id: string): Promise<TripDetailApiResponse> => {
    try {
      const response = await axiosInstance.get<TripDetailApiResponse>(
        `/trips/${id}`,
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Không thể tải chi tiết chuyến đi');
    }
  },

  // Cập nhật chuyến đi
  updateTrip: async (
    id: string,
    data: UpdateTripRequest,
  ): Promise<UpdateTripApiResponse> => {
    try {
      const response = await axiosInstance.put<UpdateTripApiResponse>(
        `/trips/${id}`,
        data,
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Cập nhật chuyến đi thất bại');
    }
  },

  // Xóa chuyến đi
  deleteTrip: async (id: string): Promise<DeleteTripApiResponse> => {
    try {
      const response = await axiosInstance.delete<DeleteTripApiResponse>(
        `/trips/${id}`,
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Xóa chuyến đi thất bại');
    }
  },
};       
