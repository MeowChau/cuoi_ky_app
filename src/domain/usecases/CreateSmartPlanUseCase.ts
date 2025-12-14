import {
  ChatRepository,
  SmartPlanRequest,
} from '../repositories/ChatRepository';
import { TripPlan } from '../entities/ChatMessage';

export class CreateSmartPlanUseCase {
  constructor(private chatRepository: ChatRepository) {}

  async execute(request: SmartPlanRequest): Promise<TripPlan> {
    // ✅ VALIDATE BUSINESS LOGIC
    if (!request.destination || request.destination.trim().length === 0) {
      throw new Error('Điểm đến không được để trống');
    }

    if (request.duration <= 0 || request.duration > 30) {
      throw new Error('Thời gian phải từ 1-30 ngày');
    }

    if (request.budget <= 0) {
      throw new Error('Ngân sách phải lớn hơn 0');
    }

    const startDate = new Date(request.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new Error('Ngày khởi hành phải từ hôm nay trở đi');
    }

    // ✅ GỌI REPOSITORY
    return await this.chatRepository.createSmartPlan(request);
  }
}
