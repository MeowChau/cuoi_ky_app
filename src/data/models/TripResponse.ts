export interface GetTripsApiResponse {
    trips: TripApiModel[];
  }
  
  export interface TripApiModel {
    _id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    origin?: string;
    transportMode?: string;
    destinations: any[];
    budget: {
      total: number;
      flights?: number;
      hotels?: number;
      food?: number;
      activities?: number;
      transport?: number;
      others?: number;
    };
    itinerary?: any[];
    createdAt?: string;
    updatedAt?: string;
    userId?: string;
  }
  
  export interface CreateTripApiResponse {
    message: string;
    trip: TripApiModel;
  }
  
  export interface UpdateTripApiResponse {
    message: string;
    trip: TripApiModel;
  }
  
  export interface DeleteTripApiResponse {
    message: string;
  }
  
  export interface TripDetailApiResponse {
    trip: TripApiModel;
  }