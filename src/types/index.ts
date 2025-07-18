export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE"
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const RoleType = {
  HOST: "HOST",
  CHARACTER: "CHARACTER"
} as const;

export type RoleType = typeof RoleType[keyof typeof RoleType];

export interface Plan {
  id: number;
  name: string;
  price: number;
}

export interface Permission {
  id: number;
  name: string;
  userId: number;
}

export interface Channel {
  id: number;
  name: string;
  avatar: string;
  instruction: string;
  authorId: number;
  author?: User;
  followers?: User[];
  snaps?: Snap[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  gender: Gender;
  isActive: boolean;
  isVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  planId?: number;
  plan?: Plan;
  myChannel?: Channel;
  followings?: Channel[];
  permissions?: Permission[];
  snaps?: Snap[];
  searchHistory?: SearchHistory[];
}

export interface Tag {
  id: number;
  name: string;
  snaps?: Snap[];
}

export interface Role {
  id: number;
  name: string;
  type: RoleType;
  personality: string;
  volume_db: number;
  contexts?: Context[];
}

export interface Context {
  id: number;
  roles: Role[];
  message: string;
  timeline: number;
  snapId: number;
  snap?: Snap;
}

export interface Snap {
  id: number;
  title: string;
  duration: number;
  views: number;
  audio: string;
  streamUrl: string;
  channelId: number;
  authorId: number;
  channel?: Channel;
  author?: User;
  tags?: Tag[];
  contexts?: Context[];
}

export interface SearchHistory {
  id: number;
  userId: number;
  user?: User;
  query: string;
  results: string;
  timestamp: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  gender: Gender;
  avatar: string;
}

export interface SubscribeRequest {
  planId: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  timestamp: string;
}

export interface ApiError {
  error: {
    message: string;
    code?: string;
    details?: any;
  };
  success: false;
  timestamp: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  tokens?: AuthTokens;
}

export interface UpdateProfileRequest {
  name?: string;
  avatar?: string;
  gender?: Gender;
}