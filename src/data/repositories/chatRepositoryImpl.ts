import {
  ChatRepository,
  SendMessageRequest,
  SmartPlanRequest,
} from '../../domain/repositories/ChatRepository';
import { ChatMessage, TripPlan } from '../../domain/entities/ChatMessage';
import { chatApi } from '../api/chatApi';

// Helper function để parse MongoDB date format hoặc ISO string
function parseDate(dateValue: any): Date {
  if (!dateValue) return new Date();
  
  // Nếu là MongoDB date format: {"$date": "2025-11-29T00:00:00.000Z"}
  if (typeof dateValue === 'object' && dateValue.$date) {
    return new Date(dateValue.$date);
  }
  
  // Nếu là string ISO
  if (typeof dateValue === 'string') {
    return new Date(dateValue);
  }
  
  // Nếu đã là Date object
  if (dateValue instanceof Date) {
    return dateValue;
  }
  
  // Fallback
  return new Date();
}

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

      // ⬅️ XỬ LÝ 2 FORMAT RESPONSE KHÁC NHAU
      // Format 1: {success, type, summary, data: itinerary}
      // Format 2: {_id, title, budget, itinerary, ...} (SmartPlanResponse)
      
      let itinerary: any[] = [];
      let responseData: any = response as any;

      // Nếu là format cũ (có field 'data')
      if ((response as any).data && Array.isArray((response as any).data)) {
        itinerary = (response as any).data;
        responseData = {
          _id: `plan-${Date.now()}`,
          title: (response as any).summary || `Lịch trình ${request.destination} ${request.duration} ngày`,
          itinerary: itinerary,
        };
      } else if ((response as any).itinerary && Array.isArray((response as any).itinerary)) {
        // Format mới (SmartPlanResponse)
        itinerary = (response as any).itinerary;
        responseData = response;
      } else {
        throw new Error('Response không có dữ liệu itinerary');
      }

      // ⬅️ TÍNH TOÁN BUDGET BREAKDOWN TỪ ITINERARY
      let estFood = 0;
      let estActivities = 0;
      let estAccommodation = 0;

      itinerary.forEach((day: any) => {
        if (day.activities && Array.isArray(day.activities)) {
          day.activities.forEach((act: any) => {
            const cost = act.cost || 0;
            if (act.type === 'meal') {
              estFood += cost;
            } else if (act.type === 'attraction') {
              estActivities += cost;
            } else if (act.type === 'checkin') {
              estAccommodation += cost;
            }
          });
        }
      });

      // Tính accommodation dựa trên số ngày nếu chưa có
      if (estAccommodation === 0) {
        estAccommodation = 500000 * request.duration; // 500k/ngày mặc định
      } else {
        // Nếu có check-in cost, nhân với số ngày
        estAccommodation = estAccommodation * request.duration;
      }

      // Tính transport cost
      let finalFlightCost = 0;
      let finalTransportCost = 0;
      
      if (request.transportMode === 'flight') {
        finalFlightCost = 2500000; // Vé máy bay khứ hồi
        finalTransportCost = 150000 * request.duration; // Di chuyển nội thành
      } else {
        finalFlightCost = 0;
        finalTransportCost = 500000 + (150000 * request.duration); // Xe riêng + di chuyển nội thành
      }

      const budgetBreakdown = {
        flights: finalFlightCost,
        accommodation: estAccommodation,
        food: estFood,
        activities: estActivities,
        transport: finalTransportCost,
        others: 500000,
      };

      const totalBudget = 
        budgetBreakdown.flights +
        budgetBreakdown.accommodation +
        budgetBreakdown.food +
        budgetBreakdown.activities +
        budgetBreakdown.transport +
        budgetBreakdown.others;

      // Tính end date
      const startDateObj = new Date(request.startDate);
      const endDateObj = new Date(startDateObj);
      endDateObj.setDate(endDateObj.getDate() + request.duration);

      // ⬅️ TRANSFORM RESPONSE THÀNH TRIPPLAN
      const tripPlan: TripPlan = {
        id: responseData._id || `plan-${Date.now()}`,
        title: responseData.title || `Du lịch ${request.destination} ${request.duration} ngày`,
        destination: responseData.destinations?.[0]?.name || request.destination,
        startDate: responseData.startDate
          ? parseDate(responseData.startDate)
          : startDateObj,
        endDate: responseData.endDate
          ? parseDate(responseData.endDate)
          : endDateObj,
        duration: request.duration,
        budget: {
          total: responseData.budget?.total || totalBudget,
          breakdown: responseData.budget?.breakdown || budgetBreakdown,
        },
        itinerary: itinerary.map((day, index) => ({
          day: day.day || index + 1,
          date: day.date
            ? parseDate(day.date)
            : (() => {
                const d = new Date(request.startDate);
                d.setDate(d.getDate() + index);
                return d;
              })(),
          activities: (day.activities || []).map((activity: any, actIndex: number) => ({
            id: activity._id || `activity-${index}-${actIndex}`,
            time: activity.time || '00:00',
            type: activity.type || 'other',
            title: activity.title || 'Hoạt động',
            duration: activity.duration,
            cost: activity.cost || 0,
            selected: activity.selected ?? true,
          })),
        })),
        status: responseData.status || 'planning',
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
