import api from './api';

export interface User {
  _id: string;
  email: string;
  username: string;
  phoneNumber: string;
  role: 'student' | 'owner' | 'admin';
}

export interface UpdateUserProfileData {
  username?: string;
  phoneNumber?: string;
  password?: string;
}

export const userService = {
  // Get current user profile
  // getCurrentUser: async (): Promise<User> => {
  //   const response = await api.get('/users/me'); // Removed /sn prefix
  //   return response.data;
  // },

  // Update user profile
  updateProfile: async (data: UpdateUserProfileData): Promise<{ message: string }> => {
    const response = await api.patch('/users/me', data); // Removed /sn prefix
    return response.data;
  }
};
