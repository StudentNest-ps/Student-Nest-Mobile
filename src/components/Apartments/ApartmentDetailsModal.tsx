
import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '../UI/button';
import { useNavigate } from 'react-router-dom';
import { ChatModal } from '../Chat/ChatModal';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { bookingService } from '../../services/booking.service';
import { lahzaPaymentsService } from '../../services/lahzaPayments.service';

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
  
  const handleBookNow = () => {
    if (apartment) {
      navigate(`/booking/${apartment.id}`, { state: { apartment } });
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
    
    setShowChat(true);
  };
  
  const ownerId = apartment.ownerId || 'owner-1';
  const ownerName = apartment.ownerName || 'Apartment Owner';
  
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
          
          <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
            <div className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Bed className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-1" />
              <p className="text-gray-900 dark:text-white">{apartment.bedrooms} {apartment.bedrooms === 0 ? 'Studio' : apartment.bedrooms === 1 ? 'Bed' : 'Beds'}</p>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Bath className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-1" />
              <p className="text-gray-900 dark:text-white">{apartment.bathrooms} {apartment.bathrooms === 1 ? 'Bath' : 'Baths'}</p>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <span className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                {apartment.sqft}
              </span>
              <p className="text-gray-900 dark:text-white">sq ft</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Description</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {apartment.description || 
               `This ${apartment.bedrooms === 0 ? 'studio' : apartment.bedrooms + ' bedroom'} 
                apartment offers ${apartment.sqft} square feet of living space in a prime
                location. With ${apartment.bathrooms} bathroom${apartment.bathrooms !== 1 ? 's' : ''} 
                and modern amenities, it's ready for immediate occupancy.`}
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Availability</h3>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <p>Available immediately</p>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-md text-gray-900 dark:text-white">Listed by:</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">{ownerName}</p>
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
      
      {showChat && (
        <ChatModal 
          apartmentId={apartment.id}
          apartmentName={apartment.name}
          ownerId={ownerId}
          ownerName={ownerName}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};
