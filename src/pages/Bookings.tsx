import React, { useEffect, useState } from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { Calendar, Clock, MapPin, Building, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { bookingService, Booking } from '../services/booking.service';
import { toast } from 'sonner';
import { format } from 'date-fns';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookings');
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingService.cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
      fetchBookings(); // Refresh the list
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'already_booked':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </MobileLayout>
    );
  }

  if (error) {
    return (
      <MobileLayout>
        <div className="text-center py-8">
          <X className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Bookings</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchBookings}>Try Again</Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Bookings Yet</h3>
            <p className="text-muted-foreground">You haven't made any bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div 
                key={booking.id}
                className="rounded-xl overflow-hidden border border-border bg-card shadow-sm card-hover"
              >
                <div className="relative">
                  <img 
                    src={booking.apartment.image} 
                    alt={booking.apartment.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="font-semibold text-white">{booking.apartment.name}</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.apartment.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {format(new Date(booking.checkIn), 'MMM d, yyyy')} - {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>Owner: {booking.apartment.owner.name}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <p className="text-sm font-medium">
                        ${booking.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    
                    {booking.status === 'pending' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Bookings; 