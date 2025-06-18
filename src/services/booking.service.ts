import api from './api';

export interface IBooking {
  studentId: string;
  propertyId: string;
  dateFrom: string;
  dateTo: string;
}

export enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  AlreadyBooked = 'already_booked',
  Cancelled = 'cancelled',
}

export interface Booking {
  id: string;
  apartment: {
    id: string;
    name: string;
    location: string;
    image: string;
    owner: {
      id: string;
      name: string;
      phone: string;
      email: string;
    };
  };
  student: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'already_booked';
  bookingDate: string;
}

import { notificationService } from './notification.service';

class BookingService {
  async bookProperty(booking: IBooking) {
    const response = await api.post('/bookings', booking);
    
    if (response.status === 201) {
      // Create notification for property owner
      try {
        await notificationService.createNotification({
          userId: response.data.apartment.owner.id, // Owner ID
          message: `New booking request for ${response.data.apartment.name}`,
          type: 'system'
        });
      } catch (error) {
        console.error('Failed to create notification:', error);
      }
      return true;
    }
    return false;
  }

  async getMyBookings(): Promise<Booking[]> {
    const response = await api.get('/bookings/me');
    return response.data;
  }

  async getOwnerBookings(): Promise<Booking[]> {
    const response = await api.get('/bookings/owner');
    return response.data as Booking[];
  }

  async cancelBooking(bookingId: string): Promise<Booking> {
    const response = await api.delete(`/bookings/${bookingId}`);
    
    // Create notification for property owner
    try {
      await notificationService.createNotification({
        userId: response.data.apartment.owner.id,
        message: `Booking for ${response.data.apartment.name} has been cancelled`,
        type: 'system'
      });
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
    
    return response.data;
  }

  async approveBooking(bookingId: string): Promise<boolean> {
    try {
      const response = await api.patch(`/bookings/${bookingId}/approve`);
      
      if (response.status === 200) {
        // Create notification for student
        try {
          await notificationService.createNotification({
            userId: response.data.student.id,
            message: `Your booking for ${response.data.apartment.name} has been approved`,
            type: 'system'
          });
        } catch (error) {
          console.error('Failed to create notification:', error);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to approve booking:', error);
      throw error;
    }
  }

  async rejectBooking(bookingId: string) {
    const response = await api.patch(`/bookings/${bookingId}/reject`);
    
    if (response.status === 200) {
      // Create notification for student
      try {
        await notificationService.createNotification({
          userId: response.data.student.id,
          message: `Your booking for ${response.data.apartment.name} has been rejected`,
          type: 'system'
        });
      } catch (error) {
        console.error('Failed to create notification:', error);
      }
    }
    
    return response.status === 200;
  }
}

export const bookingService = new BookingService();