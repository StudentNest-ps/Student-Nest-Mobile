import api from './api';

export interface Chat {
  _id: string;
  participants: User[];
  propertyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
}

export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  propertyId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

import { notificationService } from './notification.service';

class ChatService {
  async getChats() {
    const response = await api.get('/chats');
    return response.data;
  }

  async sendMessage(messageData: {
    senderId: string;
    receiverId: string;
    message: string;
    propertyId: string;
  }) {
    const response = await api.post('/messages', messageData);
    
    // Create notification for message recipient
    try {
      await notificationService.createNotification({
        userId: messageData.receiverId,
        message: `New message: ${messageData.message.substring(0, 30)}${messageData.message.length > 30 ? '...' : ''}`,
        type: 'message'
      });
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
    
    return response.data;
  }

  async getMessageThread(params: {
    senderId: string;
    receiverId: string;
    propertyId: string;
  }) {
    const { senderId, receiverId, propertyId } = params;
    const response = await api.get(
      `/messages/thread?senderId=${senderId}&receiverId=${receiverId}&propertyId=${propertyId}`
    );
    return response.data;
  }

  async getChatMessages(chatId: string) {
    const response = await api.get(`/messages/${chatId}`);
    return response.data;
  }

  async getPropertyChats(propertyId: string) {
    const response = await api.get(`/messages/property/${propertyId}`);
    return response.data;
  }
}

export const chatService = new ChatService();