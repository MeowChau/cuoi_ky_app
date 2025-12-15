// Autocomplete Response
export interface AutocompleteResponse {
  description: string;
  secondary_description: string;
  place_id: string;
  locationId: string;
  resultType: string;
  lat: number;
  lng: number;
}

// Search Response
export interface SearchResponse {
  description: string;
  secondary_description: string;
  place_id: string;
  locationId: string;
  resultType: string;
  lat: number;
  lng: number;
}

// Nearby Response
export interface NearbyResponse {
  place_id: number;
  name: string;
  rating: number | null;
  user_ratings_total: number;
  vicinity: string;
  lat: number;
  lng: number;
  photo: string;
  types: string[];
  tags: Record<string, any>;
}

// Place Details Response
export interface PlaceDetailsResponse {
  place_id: number;
  name: string;
  lat: number;
  lng: number;
  vicinity: string;
  tags: {
    phone?: string;
    website?: string;
    [key: string]: any;
  };
}
