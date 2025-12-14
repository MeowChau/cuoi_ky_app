import {
  ChatRepository,
  SendMessageRequest,
  SmartPlanRequest,
} from '../../domain/repositories/ChatRepository';
import { ChatMessage, TripPlan } from '../../domain/entities/ChatMessage';
import { chatApi } from '../api/chatApi';

export class ChatRepositoryImpl implements ChatRepository {
  async getConversationHistory(conversationId: string): Promise<ChatMessage[]> {
    throw new Error('Method not implemented.');
  }
  async sendMessage(request: SendMessageRequest): Promise<ChatMessage> {
    // ✅ LỌC BỎ MESSAGE KHÔNG HỢP LỆ
    const validHistory = (request.conversationHistory || [])
      .filter((msg: ChatMessage) => msg.text && msg.text.trim().length > 0)
      .map((msg: ChatMessage) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.text.trim(),
      }));
  
    const response = await chatApi.chat({
      message: request.message,
      conversationHistory: validHistory,
    });
  
    // ✅ VALIDATION RESPONSE
    if (!response || !response.response) {
      throw new Error('AI không trả lời được. Vui lòng thử lại.');
    }
  
    return {
      id: Date.now().toString(),
      text: response.response,
      sender: 'ai',
      timestamp: new Date(),
    };
  }

  async createSmartPlan(request: SmartPlanRequest): Promise<TripPlan> {
    try {
      const response = await chatApi.smartPlan({
        destination: request.destination,
        startDate: request.startDate,
        duration: request.duration,
        budget: request.budget,
        transportMode: request.transportMode,
      });

      console.log(
        '✅ Repository received response:',
        JSON.stringify(response, null, 2),
      );

      // ⬅️ KIỂM TRA RESPONSE CHI TIẾT
      if (!response) {
        throw new Error('Server không trả về dữ liệu');
      }

      // ⬅️ TÍNH TOÁN BREAKDOWN NẾU BACKEND KHÔNG TRẢ VỀ
      let budgetBreakdown = {
        flights: 0,
        accommodation: 0,
        food: 0,
        activities: 0,
        transport: 0,
        others: 0,
      };

      if (response.budget?.breakdown) {
        // Nếu backend trả về breakdown, dùng nó
        budgetBreakdown = {
          flights: response.budget.breakdown.flights || 0,
          accommodation: response.budget.breakdown.accommodation || 0,
          food: response.budget.breakdown.food || 0,
          activities: response.budget.breakdown.activities || 0,
          transport: response.budget.breakdown.transport || 0,
          others: response.budget.breakdown.others || 0,
        };
      } else {
        // ⬅️ NẾU KHÔNG, TỰ TÍNH BREAKDOWN DỰA TRÊN TỔNG BUDGET
        const totalBudget = response.budget?.total || request.budget;

        // Phân bổ ngân sách theo tỷ lệ chuẩn
        budgetBreakdown = {
          flights: Math.round(totalBudget * 0.3), // 30% vé máy bay
          accommodation: Math.round(totalBudget * 0.25), // 25% khách sạn
          food: Math.round(totalBudget * 0.2), // 20% ăn uống
          activities: Math.round(totalBudget * 0.15), // 15% hoạt động
          transport: Math.round(totalBudget * 0.05), // 5% di chuyển
          others: Math.round(totalBudget * 0.05), // 5% khác
        };

        console.log('💡 Tự tính breakdown:', budgetBreakdown);
      }

      // ⬅️ TRANSFORM RESPONSE THÀNH TRIPPLAN
      const tripPlan: TripPlan = {
        id: response._id || `plan-${Date.now()}`,
        title: response.title || `Lịch trình ${request.destination}`,
        destination: response.destinations?.[0]?.name || request.destination,
        startDate: response.startDate
          ? new Date(response.startDate)
          : new Date(request.startDate),
        endDate: response.endDate
          ? new Date(response.endDate)
          : (() => {
              const end = new Date(request.startDate);
              end.setDate(end.getDate() + request.duration);
              return end;
            })(),
        duration: request.duration,
        budget: {
          total: response.budget?.total || request.budget,
          breakdown: budgetBreakdown,
        },
        itinerary: (response.itinerary || []).map((day, index) => ({
          day: day.day || index + 1,
          date: day.date
            ? new Date(day.date)
            : (() => {
                const d = new Date(request.startDate);
                d.setDate(d.getDate() + index);
                return d;
              })(),
          activities: (day.activities || []).map((activity, actIndex) => ({
            id: activity._id || `activity-${index}-${actIndex}`,
            time: activity.time || '00:00',
            type: activity.type || 'other',
            title: activity.title || 'Hoạt động',
            duration: activity.duration,
            cost: activity.cost || 0,
            selected: activity.selected ?? true,
          })),
        })),
        status: response.status || 'planning',
      };

      console.log(
        '✅ Transformed TripPlan:',
        JSON.stringify(tripPlan, null, 2),
      );

      return tripPlan;
    } catch (error: any) {
      console.error('❌ Create Smart Plan Error in Repository:', error);
      throw error;
    }
  }
}
