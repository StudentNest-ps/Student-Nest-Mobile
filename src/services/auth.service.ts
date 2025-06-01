import api from './api';

export interface IRegisterUser {
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
  role: string;
  userId: string;
  message?: string;
}

class AuthService {
  async registerUser(user: IRegisterUser) {
    try {
      const response = await api.post('/signup', user);
      return response.status === 201;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Registration failed');
    }
  }

  async loginUser(user: User) {
    try {
      const response = await api.post('/login', user);
      const { token, role, userId } = response.data;
      
      // Store auth data
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user-role', role);
      localStorage.setItem('user-id', userId);
      
      return { 
        status: true, 
        data: { token, role, userId } as UserResponse 
      };
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      return { status: false };
    }
  }

  logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-role');
    localStorage.removeItem('user-id');
  }
}

export const authService = new AuthService(); 