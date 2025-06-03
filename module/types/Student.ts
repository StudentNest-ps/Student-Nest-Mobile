export type IBooking = {
  studentId: string;
  propertyId: string;
  dateFrom: string;
  dateTo: string;
};

export enum BookingStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    AlreadyBooked = 'already_booked',
    Cancelled = 'cancelled',
  }
  
  export interface Owner {
    id: string;              
    name: string;
    phone?: string;
    email?: string;
  }
  
  export interface Apartment {
    id: string;
    name: string;
    location: string;
    image?: string;
    owner?: Owner;
  }

  export interface Student {
    id: string;
    name: string;
    email: string;
    phone?: string;
  }
  
  export interface Booking {
    id: string;
    apartment: Apartment;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalAmount: number;
    status: BookingStatus;
    bookingDate: string;
    student: Student;
  }
  