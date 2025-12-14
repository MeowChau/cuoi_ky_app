import { TripRepository } from '../repositories/TripRepository';
import { Trip } from '../entities/Trip';
import { CreateTripRequest } from '../../data/api/tripApi';

export class CreateTripUseCase {
  constructor(private tripRepository: TripRepository) {}

  async execute(request: CreateTripRequest): Promise<Trip> {
    // Validation
    if (!request.title || request.title.trim().length === 0) {
      throw new Error('Vui lòng nhập tên chuyến đi');
    }

    if (!request.startDate) {
      throw new Error('Vui lòng chọn ngày bắt đầu');
    }

    if (!request.endDate) {
      throw new Error('Vui lòng chọn ngày kết thúc');
    }

    // Kiểm tra ngày kết thúc phải sau ngày bắt đầu
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    
    if (endDate <= startDate) {
      throw new Error('Ngày kết thúc phải sau ngày bắt đầu');
    }

    if (!request.budget || request.budget.total <= 0) {
      throw new Error('Vui lòng nhập ngân sách');
    }

    return await this.tripRepository.createTrip(request);
  }
}