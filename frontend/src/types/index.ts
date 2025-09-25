
// frontend\src\types\index.ts
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  profile_picture_url?: string;
  role: 'super_admin' | 'user';
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
} 

export interface LoginCredentials {
  email: string;
  password: string;
} 

export interface OTPVerification {
  email: string;
  otp: string;
} 

export type CreateUserFormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  profile_picture?: FileList;
};

export type UpdateUserFormData = {
  first_name: string;
  last_name: string;
  mobile_number: string;
};

