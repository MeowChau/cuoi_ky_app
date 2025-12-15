import { ChatMessage, TripPlan } from '../entities/ChatMessage';

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
  conversationHistory?: ChatMessage[];
}

export interface SmartPlanRequest {
  destination: string;
  startDate: string;
  duration: number;
  budget: number;
  transportMode: 'flight' | 'personal';
}

export interface ChatRepository {
  sendMessage(request: SendMessageRequest): Promise<ChatMessage>;
  getConversationHistory(conversationId: string): Promise<ChatMessage[]>;
  createSmartPlan(request: SmartPlanRequest): Promise<TripPlan>; // ✅ MỚI
}
