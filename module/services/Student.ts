import axios from 'axios';
import { Booking, IBooking } from '../types/Student';
import { token } from './token';

class Student {
  async bookProperty(booking: IBooking) {
    const res = await axios.post(`/api/sn/api/bookings`, booking, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status
  }

  async getMyBookings() {
    const res = await axios.get(`/api/sn/api/bookings/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data as Booking[];
  }

  async cancelBooking(bookingId: string) {
    const res = await axios.delete(`/api/sn/api/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status === 200; // OK
  }
}

const student = new Student();
export default student;
