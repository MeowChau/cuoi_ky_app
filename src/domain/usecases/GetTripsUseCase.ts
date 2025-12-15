import { TripRepository } from '../repositories/TripRepository';
import { Trip } from '../entities/Trip';

export class GetTripsUseCase {
  constructor(private tripRepository: TripRepository) {}

  async execute(): Promise<Trip[]> {
    return await this.tripRepository.getTrips();
  }
}