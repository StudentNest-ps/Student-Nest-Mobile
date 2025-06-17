
import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Phone, Check, X as XIcon } from 'lucide-react';
import { Button } from '../UI/button';
import { format } from 'date-fns';
import { bookingService, Booking } from '../../services/booking.service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface OwnerBookingsListProps {
  onClose: () => void;
}

export const OwnerBookingsList = ({ onClose }: OwnerBookingsListProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    fetchOwnerBookings();
  }, []);
  
  const fetchOwnerBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getOwnerBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookings');
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };
  
  const handleApproveBooking = async (bookingId: string) => {
    try {
      await bookingService.approveBooking(bookingId);
      toast.success('Booking confirmed successfully');
      fetchOwnerBookings(); // Refresh the list
    } catch (err) {
      toast.error('Failed to confirm booking');
    }
  };
  
  const handleRejectBooking = async (bookingId: string) => {
    try {
      await bookingService.rejectBooking(bookingId);
      toast.success('Booking rejected successfully');
      fetchOwnerBookings(); // Refresh the list
    } catch (err) {
      toast.error('Failed to reject booking');
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'already_booked': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <XIcon className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <p className="mb-4">{error}</p>
              <Button onClick={fetchOwnerBookings}>Try Again</Button>
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{booking.apartment.name}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User className="h-4 w-4" />
                          <span className="font-medium text-gray-900 dark:text-white">{booking.student.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4" />
                          <span>{booking.student.email}</span>
                        </div>
                        {booking.student.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="h-4 w-4" />
                            <span>{booking.student.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(new Date(booking.checkIn), 'MMM d, yyyy')} - 
                            {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <p className="font-bold text-blue-600 dark:text-blue-400 mt-2">${booking.totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Booked {booking.bookingDate && format(new Date(booking.bookingDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {booking.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                          onClick={() => handleApproveBooking(booking.id)}
                        >
                          <Check className="h-4 w-4" /> Confirm
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 flex items-center gap-1"
                          onClick={() => handleRejectBooking(booking.id)}
                        >
                          <XIcon className="h-4 w-4" /> Decline
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="ml-auto"
                      onClick={() => {
                        navigate('/chat', {
                          state: {
                            senderId: user?.id,
                            receiverId: booking.student.id,
                            propertyId: booking.apartment.id
                          }
                        });
                      }}
                    >
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
