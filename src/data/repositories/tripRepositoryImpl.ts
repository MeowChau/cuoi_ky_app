import { TripRepository } from '../../domain/repositories/TripRepository';
import { Trip } from '../../domain/entities/Trip';
import { tripApi, CreateTripRequest, UpdateTripRequest } from '../api/tripApi';
import { TripApiModel } from '../models/TripResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TRIPS_CACHE_KEY = 'cachedTrips';

export class TripRepositoryImpl implements TripRepository {
  private async readCachedTrips(): Promise<Trip[]> {
    try {
      const raw = await AsyncStorage.getItem(TRIPS_CACHE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Trip[]) : [];
    } catch {
      return [];
    }
  }

  private async saveCachedTrips(trips: Trip[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TRIPS_CACHE_KEY, JSON.stringify(trips));
    } catch {
      // Ignore cache write failures and keep app flow unaffected.
    }
  }

  private isLikelyNetworkError(error: any): boolean {
    const noResponse = !error?.response;
    const message = String(error?.message || '').toLowerCase();
    return (
      noResponse ||
      message.includes('network error') ||
      message.includes('timeout') ||
      error?.code === 'ecconnaborted'
    );
  }

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
    try {
      const response = await tripApi.getTrips();
      const trips = response.trips.map(trip => this.mapToDomain(trip));
      await this.saveCachedTrips(trips);
      return trips;
    } catch (error: any) {
      if (this.isLikelyNetworkError(error)) {
        const cachedTrips = await this.readCachedTrips();
        if (cachedTrips.length > 0) {
          return cachedTrips;
        }
      }
      throw error;
    }
  }

  async getTripDetail(id: string): Promise<Trip> {
    const response = await tripApi.getTripDetail(id);
    return this.mapToDomain(response.trip);
  }

  async createTrip(request: CreateTripRequest): Promise<Trip> {
    const response = await tripApi.createTrip(request);
    const createdTrip = this.mapToDomain(response.trip);

    const cachedTrips = await this.readCachedTrips();
    await this.saveCachedTrips([createdTrip, ...cachedTrips]);

    return createdTrip;
  }

  async updateTrip(id: string, request: UpdateTripRequest): Promise<Trip> {
    const response = await tripApi.updateTrip(id, request);
    const updatedTrip = this.mapToDomain(response.trip);

    const cachedTrips = await this.readCachedTrips();
    const nextCache = cachedTrips.map(trip =>
      trip.id === id ? updatedTrip : trip,
    );
    await this.saveCachedTrips(nextCache);

    return updatedTrip;
  }

  async deleteTrip(id: string): Promise<void> {
    await tripApi.deleteTrip(id);

    const cachedTrips = await this.readCachedTrips();
    await this.saveCachedTrips(cachedTrips.filter(trip => trip.id !== id));
  }
}
