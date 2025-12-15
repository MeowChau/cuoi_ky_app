import { TripRepository } from '../../domain/repositories/TripRepository';
import { Trip } from '../../domain/entities/Trip';
import { tripApi, CreateTripRequest, UpdateTripRequest } from '../api/tripApi';
import { TripApiModel } from '../models/TripResponse';

export class TripRepositoryImpl implements TripRepository {
  // Helper: Map API model to Domain entity
  private mapToDomain(apiModel: TripApiModel): Trip {
    return {
      id: apiModel._id,
      title: apiModel.title,
      description: apiModel.description,
      startDate: apiModel.startDate,
      endDate: apiModel.endDate,
      origin: apiModel.origin,
      transportMode: apiModel.transportMode,
      destinations: apiModel.destinations || [],
      budget: apiModel.budget,
      itinerary: apiModel.itinerary,
      createdAt: apiModel.createdAt,
      updatedAt: apiModel.updatedAt,
    };
  }

  async getTrips(): Promise<Trip[]> {
    const response = await tripApi.getTrips();
    return response.trips.map(trip => this.mapToDomain(trip));
  }

  async getTripDetail(id: string): Promise<Trip> {
    const response = await tripApi.getTripDetail(id);
    return this.mapToDomain(response.trip);
  }

  async createTrip(request: CreateTripRequest): Promise<Trip> {
    const response = await tripApi.createTrip(request);
    return this.mapToDomain(response.trip);
  }

  async updateTrip(id: string, request: UpdateTripRequest): Promise<Trip> {
    const response = await tripApi.updateTrip(id, request);
    return this.mapToDomain(response.trip);
  }

  async deleteTrip(id: string): Promise<void> {
    await tripApi.deleteTrip(id);
  }
}