import type { Role } from "@/constants/roles";

export type User = {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  accessToken: string;
  avatarUrl?: string;
  phoneNumber?: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
};
