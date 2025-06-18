import api from './api';

export interface Notification {
  _id: string;
  userId: string;
  message: string;
  seen: boolean;
  type: 'system' | 'message';
  createdAt: string;
  updatedAt: string;
}

class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  async createNotification(data: { userId: string; message: string; type?: 'system' | 'message' }) {
    try {
      const response = await api.post('/notifications', data);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async markAsSeen(notificationId: string): Promise<boolean> {
    try {
      await api.put(`/notifications/${notificationId}/seen`);
      return true;
    } catch (error) {
      console.error('Error marking notification as seen:', error);
      return false;
    }
  }
}

export const notificationService = new NotificationService();