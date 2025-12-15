import {
  PlaceRepository,
  SearchPlaceRequest,
  NearbyPlaceRequest,
} from '../../domain/repositories/PlaceRepository';
import { Place } from '../../domain/entities/Place';
import { destinationApi } from '../api/destinationApi'; // ✅ IMPORT API MỚI
import { osmApi } from '../api/osmApi';

export class PlaceRepositoryImpl implements PlaceRepository {
  // ✅ SỬA: SEARCH PLACES - DÙNG /destinations/search
  async searchPlaces(request: SearchPlaceRequest): Promise<Place[]> {
    try {
      const response = await destinationApi.search({
        q: request.keyword,
        category: request.type,
      });

      // ✅ TRANSFORM RESPONSE
      return response.destinations.map(dest => ({
        id: dest._id,
        name: dest.name,
        description: dest.description,
        location: `${dest.city}, ${dest.country}`,
        lat: dest.location.coordinates[1], // lat là index 1
        lng: dest.location.coordinates[0], // lng là index 0
        rating: dest.rating.average,
        image: dest.images[0] || 'https://via.placeholder.com/400',
        type: dest.category,
        category: dest.category,
        budgetRange: dest.budgetRange,
        recommendedDuration: dest.recommendedDuration,
        tags: dest.tags,
      }));
    } catch (error: any) {
      console.error('❌ Search Places Error:', error);
      throw error;
    }
  }

  // ✅ GIỮ NGUYÊN: NEARBY PLACES (vẫn dùng OSM)
  async getNearbyPlaces(request: NearbyPlaceRequest): Promise<Place[]> {
    const results = await osmApi.nearby(
      request.type,
      request.lat,
      request.lng,
      request.radius,
    );

    return results.map(item => ({
      id: item.place_id.toString(),
      name: item.name,
      location: item.vicinity,
      lat: item.lat,
      lng: item.lng,
      rating: item.rating || undefined,
      image: item.photo,
      type: request.type,
    }));
  }

  // ✅ GIỮ NGUYÊN: PLACE DETAILS (vẫn dùng OSM)
  async getPlaceDetails(placeId: string): Promise<Place> {
    const result = await osmApi.getDetails(placeId);

    return {
      id: result.place_id.toString(),
      name: result.name,
      location: result.vicinity,
      lat: result.lat,
      lng: result.lng,
      phone: result.tags.phone,
      website: result.tags.website,
    };
  }

  // ✅ GIỮ NGUYÊN: AUTOCOMPLETE (vẫn dùng OSM)
  async autocompletePlaces(keyword: string): Promise<Place[]> {
    const results = await osmApi.autocomplete(keyword);

    return results.map(item => ({
      id: item.place_id,
      name: item.description.split(',')[0],
      description: item.description,
      location: item.secondary_description,
      lat: item.lat,
      lng: item.lng,
      type: item.resultType,
    }));
  }
}
