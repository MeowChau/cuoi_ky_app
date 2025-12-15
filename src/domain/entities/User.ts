export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string | null;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}
