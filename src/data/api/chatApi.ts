import axiosInstance from './axiosConfig';
import {
  ChatResponse,
  PlanTripResponse,
  RecommendationsResponse,
  GenerateContentResponse,
  ConversationHistory,
  SmartPlanResponse,
} from '../models/ChatResponse';

export const chatApi = {
  // AI Chat - Trò chuyện với AI
  chat: async (params: {
    message: string;
    conversationHistory?: ConversationHistory[];
  }): Promise<ChatResponse> => {
    try {
      const response = await axiosInstance.post<ChatResponse>(
        '/ai/chat',
        params,
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ AI Chat Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Không thể kết nối với AI',
      );
    }
  },

  // ✅ SỬA: AI Smart Plan
smartPlan: async (params: {
    destination: string;
    startDate: string;
    duration: number;
    budget: number;
    transportMode: 'flight' | 'train' | 'bus' | 'personal';
  }): Promise<SmartPlanResponse> => {
    try {
      console.log('📤 Smart Plan Request:', JSON.stringify(params, null, 2));

      const response = await axiosInstance.post<SmartPlanResponse>(
        '/ai/smart-plan',
        params,
        {
          timeout: 60000, // ⬅️ TĂNG TIMEOUT LÊN 60s
        }
      );

      console.log('✅ Smart Plan Status:', response.status);
      console.log('✅ Smart Plan Headers:', response.headers);
      console.log('✅ Smart Plan Full Response:', JSON.stringify(response.data, null, 2)); // ⬅️ LOG ĐẦY ĐỦ

      // ⬅️ KIỂM TRA CHI TIẾT BREAKDOWN
      if (response.data?.budget?.breakdown) {
        console.log('💰 Budget Breakdown:', response.data.budget.breakdown);
      } else {
        console.warn('⚠️ Không có budget breakdown từ server!');
      }

      if (!response.data) {
        throw new Error('Server không trả về dữ liệu');
      }

      return response.data;
    } catch (error: any) {
      console.error('❌ AI Smart Plan Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack,
      });

      if (error.code === 'ECONNABORTED') {
        throw new Error('Yêu cầu quá lâu. Server AI đang bận, vui lòng thử lại.');
      }

      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Thông tin không hợp lệ');
      }

      if (error.response?.status === 500) {
        throw new Error('Lỗi server. Vui lòng thử lại sau.');
      }

      if (error.message === 'Network Error') {
        throw new Error('Không có kết nối internet');
      }

      throw new Error(
        error.response?.data?.message || error.message || 'Tạo lịch trình thất bại',
      );
    }
  },
  // AI Plan Trip - Lên kế hoạch chi tiết cho chuyến đi
  planTrip: async (params: {
    destination: string;
    startDate: string;
    endDate: string;
    budget: number;
    preferences?: string[];
  }): Promise<PlanTripResponse> => {
    try {
      const response = await axiosInstance.post<PlanTripResponse>(
        '/ai/plan-trip',
        params,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ AI Plan Trip Error:',
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || 'Lên kế hoạch chuyến đi thất bại',
      );
    }
  },

  // AI Recommendations - Gợi ý địa điểm/hoạt động
  recommendations: async (params: {
    destination: string;
    type: 'attractions' | 'restaurants' | 'hotels' | 'activities';
    budget?: number;
    preferences?: string[];
  }): Promise<RecommendationsResponse> => {
    try {
      const response = await axiosInstance.post<RecommendationsResponse>(
        '/ai/recommendations',
        params,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ AI Recommendations Error:',
        error.response?.data || error.message,
      );
      throw new Error(error.response?.data?.message || 'Lấy gợi ý thất bại');
    }
  },

  // AI Generate Content - Tạo nội dung (review, caption, tips)
  generateContent: async (params: {
    type: 'review' | 'caption' | 'tips';
    context: string;
  }): Promise<GenerateContentResponse> => {
    try {
      const response = await axiosInstance.post<GenerateContentResponse>(
        '/ai/generate-content',
        params,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ AI Generate Content Error:',
        error.response?.data || error.message,
      );
      throw new Error(error.response?.data?.message || 'Tạo nội dung thất bại');
    }
  },
};
