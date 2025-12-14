export interface Place {
  id: string;
  name: string;
  description?: string;
  location: string; // City + Country
  lat: number;
  lng: number;
  rating?: number;
  image?: string;
  type?: string;
  category?: string;
  budgetRange?: {
    min: number;
    max: number;
  };
  recommendedDuration?: number;
  tags?: string[];
  vicinity?: string;
  phone?: string;
  website?: string;
}
