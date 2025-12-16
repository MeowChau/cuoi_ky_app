import { Place } from '../entities/Place';

export interface SearchPlaceRequest {
  keyword: string;
  type?: 'hotels' | 'restaurants' | 'attractions' | 'cafes';
}

export interface NearbyPlaceRequest {
  type: 'hotels' | 'restaurants' | 'attractions';
  lat: number;
  lng: number;
  radius?: number;
}

export interface PlaceRepository {
  searchPlaces(request: SearchPlaceRequest): Promise<Place[]>;
  getNearbyPlaces(request: NearbyPlaceRequest): Promise<Place[]>;
  getPlaceDetails(placeId: string): Promise<Place>;
  autocompletePlaces(keyword: string): Promise<Place[]>;

  getFeaturedPlaces(): Promise<Place[]>;
}
