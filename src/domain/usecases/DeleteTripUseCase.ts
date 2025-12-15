import { TripRepository } from '../repositories/TripRepository';

export class DeleteTripUseCase {
  constructor(private tripRepository: TripRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('ID chuyến đi không hợp lệ');
    }
    return await this.tripRepository.deleteTrip(id);
  }
}