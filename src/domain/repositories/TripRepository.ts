import { Trip } from '../entities/Trip';
import { CreateTripRequest, UpdateTripRequest } from '../../data/api/tripApi';

export interface TripRepository {
  getTrips(): Promise<Trip[]>;
  getTripDetail(id: string): Promise<Trip>;
  createTrip(request: CreateTripRequest): Promise<Trip>;
  updateTrip(id: string, request: UpdateTripRequest): Promise<Trip>;
  deleteTrip(id: string): Promise<void>;
}