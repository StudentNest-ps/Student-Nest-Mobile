import api from './api';
import { Role } from '../types/auth';

export interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
}

class AdminService {
  async getUsersByRole(role: Role) {
    const response = await api.get(`/admin/users/role/${role}`);
    return response.data as User[];
  }

  async deleteUser(userId: string) {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.status === 200;
  }

  async getProperties() {
    const response = await api.get('/admin/properties');
    return response.data;
  }

  async deleteProperty(propertyId: string) {
    const response = await api.delete(`/admin/properties/${propertyId}`);
    return response.status === 200;
  }

  async addAccount(values: IRegisterUser) {
    const response = await api.post('/admin/users', values);
    return response.status === 201;
  }
}

export const adminService = new AdminService(); 