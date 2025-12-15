import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { SendMessageUseCase } from '../../../domain/usecases/SendMessageUseCase';
import { CreateSmartPlanUseCase } from '../../../domain/usecases/CreateSmartPlanUseCase';
import { CreateTripUseCase } from '../../../domain/usecases/CreateTripUseCase';
import { ChatRepositoryImpl } from '../../../data/repositories/chatRepositoryImpl';
import { TripRepositoryImpl } from '../../../data/repositories/tripRepositoryImpl';
import { ChatMessage, TripPlan } from '../../../domain/entities/ChatMessage';
import { MOCK_CHAT_HISTORY } from './mockData';
import { CreateTripRequest } from '../../../data/api/tripApi';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_HISTORY);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSmartPlanForm, setShowSmartPlanForm] = useState(false);
  const scrollViewRef = useRef<any>(null);

  const chatRepository = new ChatRepositoryImpl();
  const tripRepository = new TripRepositoryImpl();
  const sendMessageUseCase = new SendMessageUseCase(chatRepository);
  const createSmartPlanUseCase = new CreateSmartPlanUseCase(chatRepository);
  const createTripUseCase = new CreateTripUseCase(tripRepository);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const detectSmartPlanKeyword = (text: string): boolean => {
    const keywords = [
      'tạo kế hoạch',
      'tạo 1 kế hoạch',
      'lập kế hoạch',
      'lập lịch trình',
      'smart plan',
      'kế hoạch thông minh',
    ];
    const lowerText = text.toLowerCase().trim();
    return keywords.some(keyword => lowerText.includes(keyword));
  };

  const handleSend = async (text?: string) => {
    const messageText = text || inputText.trim();

    if (!messageText) return;

    if (detectSmartPlanKeyword(messageText)) {
      setShowSmartPlanForm(true);
      setInputText('');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setError(null);

    const typingMessage: ChatMessage = {
      id: 'typing',
      text: '',
      sender: 'ai',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageUseCase.execute({
        message: messageText,
        conversationHistory: messages.filter(m => !m.isTyping),
      });

      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      setMessages(prev => [...prev, aiResponse]);
    } catch (err: any) {
      console.error('❌ Send message error:', err);
      setError(err.message);

      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `⚠️ ${err.message}\n\nVui lòng thử lại sau hoặc liên hệ hỗ trợ.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ SỬA: HANDLE CREATE SMART PLAN
  const handleCreateSmartPlan = async (params: {
    destination: string;
    startDate: string;
    duration: number;
    budget: number;
    transportMode: 'flight' |  'personal';
  }) => {
    console.log('🚀 handleCreateSmartPlan called with:', params);

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `Tạo kế hoạch du lịch ${params.destination} ${
        params.duration
      } ngày, ngân sách ${formatMoney(params.budget)}`,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    const typingMessage: ChatMessage = {
      id: 'typing',
      text: '',
      sender: 'ai',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      console.log('📤 Calling createSmartPlanUseCase.execute...');

      const tripPlan = await createSmartPlanUseCase.execute(params);

      console.log('✅ TripPlan received:', tripPlan);

      if (!tripPlan || !tripPlan.id) {
        throw new Error('Không nhận được dữ liệu kế hoạch từ server');
      }

      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

      const planMessage: ChatMessage = {
        id: Date.now().toString(),
        text: '', // Không hiển thị text để tránh trùng lặp với ItineraryView
        sender: 'ai',
        timestamp: new Date(),
        tripPlan,
      };

      setMessages(prev => [...prev, planMessage]);

      Alert.alert(
        '✅ Thành công!',
        `Đã tạo kế hoạch "${tripPlan.title}"\n\nBạn có thể xem chi tiết bên dưới.`,
        [{ text: 'OK' }],
      );
    } catch (err: any) {
      console.error('❌ Create smart plan error:', {
        message: err.message,
        stack: err.stack,
      });

      setError(err.message || 'Tạo kế hoạch thất bại');

      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `⚠️ **Lỗi tạo kế hoạch**\n\n${err.message}\n\n**Gợi ý:**\n- Kiểm tra kết nối internet\n- Thử giảm số ngày hoặc ngân sách\n- Chọn điểm đến phổ biến hơn\n- Liên hệ hỗ trợ nếu lỗi tiếp diễn`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);

      Alert.alert(
        '❌ Lỗi',
        err.message || 'Không thể tạo kế hoạch. Vui lòng thử lại.',
        [
          { text: 'Thử lại', onPress: () => setShowSmartPlanForm(true) },
          { text: 'Đóng', style: 'cancel' },
        ],
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    if (prompt.startsWith('smartplan:')) {
      setShowSmartPlanForm(true);
      return;
    }

    setInputText(prompt);
    handleSend(prompt);
  };

  const clearChat = () => {
    setMessages(MOCK_CHAT_HISTORY);
    setError(null);
  };

  // ✅ HANDLE CONFIRM TRIP PLAN
  const handleConfirmTripPlan = async (tripPlan: TripPlan) => {
    try {
      setIsLoading(true);
      setError(null);

      const budgetPayload = {
        total: tripPlan.budget.total,
        flights: tripPlan.budget.breakdown?.flights,
        hotels: tripPlan.budget.breakdown?.accommodation,
        food: tripPlan.budget.breakdown?.food,
        activities: tripPlan.budget.breakdown?.activities,
        transport: tripPlan.budget.breakdown?.transport,
        others: tripPlan.budget.breakdown?.others,
        breakdown: tripPlan.budget.breakdown,
      };

      // Transform TripPlan to CreateTripRequest
      const tripRequest: CreateTripRequest = {
        title: tripPlan.title,
        startDate: tripPlan.startDate.toISOString().split('T')[0],
        endDate: tripPlan.endDate.toISOString().split('T')[0],
        transportMode: 'personal',
        destinations: [
          {
            name: tripPlan.destination,
            arrivalDate: tripPlan.startDate.toISOString().split('T')[0],
            departureDate: tripPlan.endDate.toISOString().split('T')[0],
          },
        ],
        budget: {
          total: tripPlan.budget.total,
        },
      };

      // Tạo trip cơ bản trước
      const trip = await createTripUseCase.execute(tripRequest);

      // Sau đó update với itinerary và budget breakdown đầy đủ
      if (trip.id) {
        await tripRepository.updateTrip(trip.id, {
          budget: budgetPayload,
          destinations: tripRequest.destinations,
          itinerary: tripPlan.itinerary?.map(day => ({
            day: day.day,
            date: day.date.toISOString().split('T')[0],
            activities: day.activities.map(act => ({
              time: act.time,
              type: act.type,
              title: act.title,
              duration: act.duration,
              cost: act.cost,
              selected: act.selected ?? true,
            })),
          })),
        } as any);
      }

      Alert.alert(
        '✅ Thành công!',
        `Đã lưu lịch trình "${tripPlan.title}" .\n\nBạn có thể xem trong mục "Chuyến đi".`,
        [{ text: 'OK' }],
      );

      // Thêm message xác nhận vào chat
      const confirmMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `✅ Đã lưu lịch trình "${tripPlan.title}"  thành công!`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, confirmMessage]);

      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err: any) {
      console.error('❌ Confirm trip plan error:', err);
      setError(err.message || 'Lưu lịch trình thất bại');
      Alert.alert(
        '❌ Lỗi',
        err.message || 'Không thể lưu lịch trình. Vui lòng thử lại.',
        [{ text: 'OK' }],
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ HANDLE EDIT TRIP PLAN
  const handleEditTripPlan = (tripPlan: TripPlan) => {
    // Mở lại SmartPlanForm với dữ liệu hiện tại
    setShowSmartPlanForm(true);
    // Có thể pre-fill form với dữ liệu từ tripPlan
    console.log('Edit trip plan:', tripPlan);
  };

  return {
    messages,
    inputText,
    setInputText,
    isLoading,
    error,
    scrollViewRef,
    handleSend,
    handleSuggestedPrompt,
    handleCreateSmartPlan,
    handleConfirmTripPlan,
    handleEditTripPlan,
    showSmartPlanForm,
    setShowSmartPlanForm,
    clearChat,
  };
};

// FORMAT TRIP PLAN TO TEXT
function formatTripPlanMessage(plan: TripPlan): string {
  let message = `✅ **${plan.title}**\n\n`;
  message += `📍 Điểm đến: ${plan.destination}\n`;
  message += `📅 Thời gian: ${formatDate(plan.startDate)} - ${formatDate(
    plan.endDate,
  )}\n`;
  message += `⏱️ Thời lượng: ${plan.duration} ngày\n`;
  message += `💰 Tổng ngân sách: ${formatMoney(plan.budget.total)}\n\n`;

  // ⬅️ KIỂM TRA BREAKDOWN CÓ GIÁ TRỊ > 0 KHÔNG
  const breakdown = plan.budget.breakdown;
  const hasBreakdown =
    breakdown.flights > 0 ||
    breakdown.accommodation > 0 ||
    breakdown.food > 0 ||
    breakdown.activities > 0 ||
    breakdown.transport > 0 ||
    breakdown.others > 0;

  if (hasBreakdown) {
    message += `**📊 Chi phí dự kiến:**\n`;
    if (breakdown.flights > 0) {
      message += `- ✈️ Vé máy bay: ${formatMoney(breakdown.flights)}\n`;
    }
    if (breakdown.accommodation > 0) {
      message += `- 🏨 Khách sạn: ${formatMoney(breakdown.accommodation)}\n`;
    }
    if (breakdown.food > 0) {
      message += `- 🍽️ Ăn uống: ${formatMoney(breakdown.food)}\n`;
    }
    if (breakdown.activities > 0) {
      message += `- 🎯 Hoạt động: ${formatMoney(breakdown.activities)}\n`;
    }
    if (breakdown.transport > 0) {
      message += `- 🚕 Di chuyển: ${formatMoney(breakdown.transport)}\n`;
    }
    if (breakdown.others > 0) {
      message += `- 💼 Chi phí khác: ${formatMoney(breakdown.others)}\n`;
    }
    message += '\n';
  } else {
    message += `⚠️ _Chi phí chi tiết sẽ được cập nhật sau khi phân tích lịch trình_\n\n`;
  }

  if (plan.itinerary && plan.itinerary.length > 0) {
    message += `**📅 Lịch trình chi tiết:**\n`;
    plan.itinerary.forEach(day => {
      message += `\n**Ngày ${day.day}** (${formatDate(day.date)})\n`;
      if (day.activities && day.activities.length > 0) {
        day.activities.forEach(activity => {
          const costStr =
            activity.cost > 0 ? ` - ${formatMoney(activity.cost)}` : '';
          message += `• ${activity.time} - ${activity.title}${costStr}\n`;
        });
      } else {
        message += `_Chưa có hoạt động cụ thể_\n`;
      }
    });
  } else {
    message += `⚠️ _Lịch trình chi tiết sẽ được cập nhật sau_\n`;
  }

  return message;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}
