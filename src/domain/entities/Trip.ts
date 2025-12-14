export interface Trip {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    origin?: string;
    transportMode?: string;
    destinations: Destination[];
    budget: Budget;
    itinerary?: ItineraryDay[];
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Destination {
    name: string;
    location?: {
      lat: number;
      lng: number;
    };
  }
  
  export interface Budget {
    total: number;
    flights?: number;
    hotels?: number;
    food?: number;
    activities?: number;
    transport?: number;
    others?: number;
  }
  
  export interface ItineraryDay {
    day: number;
    date: string;
    activities: Activity[];
  }
  
  export interface Activity {
    time: string;
    title: string;
    location?: string;
    description?: string;
    cost?: number;
  }