// src/domain/usecases/GetFeaturedPlacesUseCase.ts
import { PlaceRepository } from '../repositories/PlaceRepository';
import { Place } from '../entities/Place';

export class GetFeaturedPlacesUseCase {
  constructor(private placeRepository: PlaceRepository) {}

  async execute(): Promise<Place[]> {
    return await this.placeRepository.getFeaturedPlaces();
  }
}