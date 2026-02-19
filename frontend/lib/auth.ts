import apiClient from './api';
import Cookies from 'js-cookie';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/login', credentials);
    
    // Store token and user data in cookies
    if (response.data.token) {
      Cookies.set('auth_token', response.data.token, { expires: 7 }); // 7 days
      Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });
    }
    
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/logout');
    } finally {
      // Always clear local data
      Cookies.remove('auth_token');
      Cookies.remove('user');
    }
  },

  async getUser(): Promise<User> {
    const response = await apiClient.get<{ user: User }>('/user');
    return response.data.user;
  },

  getCurrentUser(): User | null {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        return JSON.parse(userCookie) as User;
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!Cookies.get('auth_token');
  },

  getToken(): string | undefined {
    return Cookies.get('auth_token');
  },
};
