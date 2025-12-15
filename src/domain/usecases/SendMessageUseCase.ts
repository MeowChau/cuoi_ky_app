import {
  ChatRepository,
  SendMessageRequest,
} from '../repositories/ChatRepository';
import { ChatMessage } from '../entities/ChatMessage';

export class SendMessageUseCase {
  constructor(private chatRepository: ChatRepository) {}

  async execute(request: SendMessageRequest): Promise<ChatMessage> {
    // ✅ VALIDATE BUSINESS LOGIC
    if (!request.message || request.message.trim().length === 0) {
      throw new Error('Tin nhắn không được để trống');
    }

    if (request.message.trim().length > 500) {
      throw new Error('Tin nhắn không được quá 500 ký tự');
    }

    // ✅ GỌI REPOSITORY
    return await this.chatRepository.sendMessage(request);
  }
}
