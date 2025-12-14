export interface ChatResponse {
  success: boolean;
  message: string;
  response: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  timestamp: string;
}

export interface PlanTripResponse {
  success: boolean;
  message: string;
  plan: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  metadata: {
    destination: string;
    duration: string;
    budget: string;
    generatedAt: string;
  };
}

export interface RecommendationsResponse {
  success: boolean;
  message: string;
  recommendations: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  metadata: {
    budget: string;
    duration: string;
    season: string;
    generatedAt: string;
  };
}

export interface GenerateContentResponse {
  success: boolean;
  message: string;
  content: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  timestamp: string;
}

export interface ConversationHistory {
  role: 'user' | 'assistant';
  content: string;
}

// ✅ MỚI: SMART PLAN RESPONSE
export interface SmartPlanResponse {
  _id: string;
  title: string;
  description?: string;
  userId?: string;
  startDate: string;
  endDate: string;
  transportMode: 'flight' | 'train' | 'bus' | 'personal';
  destinations?: Destination[]; // ⬅️ THÊM OPTIONAL
  itinerary: DayItinerary[];
  budget: Budget;
  travelers?: Traveler[]; // ⬅️ THÊM OPTIONAL
  status: 'planning' | 'confirmed' | 'ongoing' | 'completed';
  tags?: string[]; // ⬅️ THÊM OPTIONAL
  createdAt?: string; // ⬅️ THÊM OPTIONAL
  updatedAt?: string; // ⬅️ THÊM OPTIONAL
}

export interface Destination {
  _id?: string; // ⬅️ THÊM OPTIONAL
  name: string;
  arrivalDate: string;
  departureDate: string;
  hotels?: string[]; // ⬅️ THÊM OPTIONAL
  restaurants?: string[]; // ⬅️ THÊM OPTIONAL
  attractions?: string[]; // ⬅️ THÊM OPTIONAL
}

export interface DayItinerary {
  _id?: string; // ⬅️ THÊM OPTIONAL
  day: number;
  date: string;
  activities: Activity[];
}

export interface Activity {
  _id?: string; // ⬅️ THÊM OPTIONAL
  time: string;
  type: 'checkin' | 'checkout' | 'meal' | 'attraction' | 'transport' | 'other';
  title: string;
  duration?: string;
  cost: number;
  selected?: boolean;
}

export interface Budget {
  total: number;
  spent?: number; // ⬅️ THÊM OPTIONAL
  currency?: string; // ⬅️ THÊM OPTIONAL
  breakdown?: {
    flights?: number; // ⬅️ THÊM OPTIONAL
    accommodation?: number; // ⬅️ THÊM OPTIONAL
    food?: number; // ⬅️ THÊM OPTIONAL
    activities?: number; // ⬅️ THÊM OPTIONAL
    transport?: number; // ⬅️ THÊM OPTIONAL
    others?: number; // ⬅️ THÊM OPTIONAL
  };
}

export interface Traveler {
  _id: string;
  name: string;
}
