import {
  PlaceRepository,
  SearchPlaceRequest,
} from '../repositories/PlaceRepository';
import { Place } from '../entities/Place';

export class SearchPlacesUseCase {
  constructor(private placeRepository: PlaceRepository) {}

  async execute(request: SearchPlaceRequest): Promise<Place[]> {
    if (!request.keyword || request.keyword.trim().length < 2) {
      throw new Error('Từ khóa tìm kiếm phải có ít nhất 2 ký tự');
    }

    return await this.placeRepository.searchPlaces(request);
  }
}
