export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
  tripPlan?: TripPlan; // ✅ THÊM TRIP PLAN CHO MESSAGE ĐẶC BIỆT
}

// ✅ MỚI: TRIP PLAN ENTITY
export interface TripPlan {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  budget: {
    total: number;
    breakdown: {
      flights: number;
      accommodation: number;
      food: number;
      activities: number;
      transport: number;
      others: number;
    };
  };
  itinerary: DayPlan[];
  status: 'planning' | 'confirmed' | 'ongoing' | 'completed';
}

export interface DayPlan {
  day: number;
  date: Date;
  activities: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  time: string;
  type: 'checkin' | 'checkout' | 'meal' | 'attraction' | 'transport' | 'other';
  title: string;
  duration?: string;
  cost: number;
  selected: boolean;
}
