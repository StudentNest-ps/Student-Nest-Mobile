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
    image?: string;
    owner?: {
      id: string;
      name: string;
      phone?: string;
      email?: string;
    };
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: BookingStatus;
  bookingDate: string;
  student: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
}

class BookingService {
  async bookProperty(booking: IBooking) {
    const response = await api.post('/bookings', booking);
    return response.status === 201;
  }

  async getMyBookings() {
    const response = await api.get('/bookings/me');
    return response.data as Booking[];
  }

  async getOwnerBookings() {
    const response = await api.get('/bookings/owner');
    return response.data as Booking[];
  }

  async cancelBooking(bookingId: string) {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.status === 200;
  }

  async approveBooking(bookingId: string) {
    const response = await api.patch(`/bookings/${bookingId}/approve`);
    return response.status === 200;
  }

  async rejectBooking(bookingId: string) {
    const response = await api.patch(`/bookings/${bookingId}/reject`);
    return response.status === 200;
  }
}

export const bookingService = new BookingService(); 