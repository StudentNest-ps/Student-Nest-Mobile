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

class BookingService {
  async bookProperty(booking: IBooking) {
    const response = await api.post('/bookings', booking);
    return response.status === 201;
  }

  async getMyBookings(): Promise<Booking[]> {
    const response = await api.get('/bookings/me');
    return response.data;
  }

  async getOwnerBookings() {
    const response = await api.get('/bookings/owner');
    return response.data as Booking[];
  }

  async cancelBooking(bookingId: string): Promise<Booking> {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  }

  async approveBooking(bookingId: string): Promise<boolean> {
    try {
      const response = await api.put(`/bookings/${bookingId}/approve`);
      return response.status === 200;
    } catch (error) {
      console.error('Failed to approve booking:', error);
      throw error;
    }
  }

  async rejectBooking(bookingId: string) {
    const response = await api.patch(`/bookings/${bookingId}/reject`);
    return response.status === 200;
  }
}

export const bookingService = new BookingService();