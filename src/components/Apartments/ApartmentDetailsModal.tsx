
import React, { useState } from 'react';
import { X, MapPin, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '../UI/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { bookingService } from '../../services/booking.service';
import { format, addMonths } from 'date-fns';

interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  description?: string;
  hasWifi?: boolean;
  hasParking?: boolean;
  ownerId?: string;
  ownerName?: string;
  availableFrom?: string;
  availableTo?: string;
}

interface ApartmentDetailsModalProps {
  apartment: Apartment;
  onClose: () => void;
  onBookNow?: () => void;
}

export const ApartmentDetailsModal = ({ apartment, onClose, onBookNow }: ApartmentDetailsModalProps) => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [isProcessingBooking, setIsProcessingBooking] = useState(false);
  const { user } = useAuth();
  
  const handleBookNow = async () => {
    if (!user) {
      toast.error("Please sign in to book this apartment");
      navigate('/signin');
      return;
    }
    
    if (user.role === 'owner') {
      toast.info("As an owner, you cannot book apartments");
      return;
    }
    
    try {
      setIsProcessingBooking(true);
      
      // Create a pending booking
      const bookingData = {
        studentId: localStorage.getItem('user-id'),
        propertyId: apartment.id,
        dateFrom: format(new Date(), 'yyyy-MM-dd'),
        dateTo: format(addMonths(new Date(), 12), 'yyyy-MM-dd') // Default to 12 months
      };
      
      const bookingSuccess = await bookingService.bookProperty(bookingData);
      
      if (bookingSuccess) {
        toast.success(`Booking request for ${apartment.name} has been sent to the owner!`);
        navigate('/bookings');
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      console.error('Booking process failed:', error);
      toast.error(error.message || 'Booking process failed');
    } finally {
      setIsProcessingBooking(false);
    }
  };
  
  const handleContactOwner = () => {
    if (!user) {
      toast.error("Please sign in to contact the owner");
      navigate('/signin');
      return;
    }
    
    if (user.role === 'owner') {
      toast.info("As an owner, you cannot contact other owners");
      return;
    }
    
    // Use the same navigation approach as in Bookings.tsx
    navigate('/chat', {
      state: {
        senderId: user?.id,
        receiverId: apartment.ownerId,
        propertyId: apartment.id
      }
    });
  };
  
  const ownerId = apartment.ownerId || 'owner-1';
  // Remove this line that sets a default owner name
  // const ownerName = apartment.ownerName || 'Apartment Owner';
  
  // Format availability dates
  const formatAvailability = () => {
    if (apartment.availableFrom && apartment.availableTo) {
      const fromDate = new Date(apartment.availableFrom);
      const toDate = new Date(apartment.availableTo);
      return `${format(fromDate, 'MMM d, yyyy')} - ${format(toDate, 'MMM d, yyyy')}`;
    }
    return 'Available immediately';
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={apartment.image} 
            alt={apartment.name}
            className="w-full h-56 object-cover rounded-t-xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 p-1 rounded-full hover:bg-white dark:hover:bg-gray-800"
          >
            <X className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{apartment.name}</h2>
            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{apartment.price}</p>
          </div>
          
          <div className="flex items-center gap-1 mt-2 text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4" />
            <p>{apartment.location}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Description</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {apartment.description || 
               `This apartment is located in a prime location and is ready for immediate occupancy.`}
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Availability</h3>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <p>{formatAvailability()}</p>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-md text-gray-900 dark:text-white">Listed by:</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">{apartment.ownerName || 'Unknown Owner'}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button 
              onClick={handleContactOwner}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              variant="outline"
            >
              <MessageCircle className="h-4 w-4" />
              Contact Owner
            </Button>
            
            <Button 
              onClick={handleBookNow}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isProcessingBooking}
            >
              {isProcessingBooking ? "Processing..." : "Book Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
