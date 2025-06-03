
import React from 'react';
import { X, Calendar, User, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { format } from 'date-fns';

interface Booking {
  id: string;
  apartmentName: string;
  studentName: string;
  studentEmail: string;
  moveInDate: string;
  moveOutDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalPrice: string;
  createdAt: string;
}

interface OwnerBookingsListProps {
  onClose: () => void;
}

export const OwnerBookingsList = ({ onClose }: OwnerBookingsListProps) => {
  // UI-only implementation with empty data
  const bookings: Booking[] = [];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Property Bookings</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{booking.apartmentName}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User className="h-4 w-4" />
                          <span className="font-medium text-gray-900 dark:text-white">{booking.studentName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4" />
                          <span>{booking.studentEmail}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {booking.moveInDate && format(new Date(booking.moveInDate), 'MMM d, yyyy')} - 
                            {booking.moveOutDate && format(new Date(booking.moveOutDate), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <p className="font-bold text-blue-600 dark:text-blue-400 mt-2">{booking.totalPrice}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Booked {booking.createdAt && format(new Date(booking.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {booking.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Confirm
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          Decline
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline">
                      Contact Student
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No bookings yet for your properties.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
