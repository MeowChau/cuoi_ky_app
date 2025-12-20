import {
  PlaceRepository,
  SearchPlaceRequest,
} from '../repositories/PlaceRepository';
import { Place } from '../entities/Place';

export class SearchPlacesUseCase {
  constructor(private placeRepository: PlaceRepository) {}

  async execute(request: SearchPlaceRequest): Promise<Place[]> {
    // Chỉ cần có ít nhất 1 ký tự (để hỗ trợ gợi ý khi vừa gõ)
    if (!request.keyword || request.keyword.trim().length < 1) {
      throw new Error('Vui lòng nhập từ khóa tìm kiếm');
    }

    return await this.placeRepository.searchPlaces(request);
  }
}
