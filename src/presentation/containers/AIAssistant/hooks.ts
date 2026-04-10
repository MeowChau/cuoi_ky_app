import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { container } from '../../../di/container';
import { TOKENS } from '../../../di/tokens';
import { SendMessageUseCase } from '../../../domain/usecases/SendMessageUseCase';
import { CreateSmartPlanUseCase } from '../../../domain/usecases/CreateSmartPlanUseCase';
import { CreateTripUseCase } from '../../../domain/usecases/CreateTripUseCase';
import { TripRepository } from '../../../domain/repositories/TripRepository';
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
      const sendMessageUseCase = container.resolve<SendMessageUseCase>(TOKENS.SendMessageUseCase);
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

  const handleCreateSmartPlan = async (params: {
    destination: string;
    startDate: string;
    duration: number;
    budget: number;
    transportMode: 'flight' | 'personal';
  }) => {
    console.log('🚀 handleCreateSmartPlan called with:', params);

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `Tạo kế hoạch du lịch ${params.destination} ${params.duration} ngày, ngân sách ${formatMoney(params.budget)}`,
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

      const createSmartPlanUseCase = container.resolve<CreateSmartPlanUseCase>(TOKENS.CreateSmartPlanUseCase);
      const tripPlan = await createSmartPlanUseCase.execute(params);

      console.log('✅ TripPlan received:', tripPlan);

      if (!tripPlan || !tripPlan.id) {
        throw new Error('Không nhận được dữ liệu kế hoạch từ server');
      }

      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

      const planMessage: ChatMessage = {
        id: Date.now().toString(),
        text: '',
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
        budget: { total: tripPlan.budget.total },
      };

      const createTripUseCase = container.resolve<CreateTripUseCase>(TOKENS.CreateTripUseCase);
      const trip = await createTripUseCase.execute(tripRequest);

      if (trip.id) {
        const tripRepository = container.resolve<TripRepository>(TOKENS.TripRepository);
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

      const confirmMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `✅ Đã lưu lịch trình "${tripPlan.title}"  thành công!`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, confirmMessage]);

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

  const handleEditTripPlan = (tripPlan: TripPlan) => {
    setShowSmartPlanForm(true);
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

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}
