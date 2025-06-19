import React, { useState } from 'react';
import { Bed, Bath, Wifi, Car, Tv, Wind } from 'lucide-react';
import { ApartmentDetailsModal } from './ApartmentDetailsModal';
import { useNavigate } from 'react-router-dom';

interface ApartmentProps {
  apartment: {
    id: string;
    name: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    image: string;
    description?: string;
    ownerId?: string;
    ownerName?: string;
    amenities?: string[];
  };
}

export const ApartmentCard = ({ apartment }: ApartmentProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    navigate(`/booking/${apartment.id}`, { state: { apartment } });
  };
  
  // Helper function to check if an amenity exists
  const hasAmenity = (amenity: string) => {
    return apartment.amenities?.some(a => 
      a.toLowerCase().includes(amenity.toLowerCase())
    );
  };
  
  return (
    <>
      <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm card-hover apartment-card">
        <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {apartment.image ? (
            <img 
              src={apartment.image} 
              alt={apartment.name}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setShowDetails(true)}
              onError={(e) => {
                // Fallback image if the main one fails to load
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="text-gray-400 dark:text-gray-500 text-sm">
              No image available
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 cursor-pointer" onClick={() => setShowDetails(true)}>
            {apartment.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">{apartment.location}</p>
          
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-lg">${apartment.price}<span className="text-xs font-normal">/month</span></span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{apartment.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{apartment.bathrooms} bath</span>
            </div>
            <div>
              <span>{apartment.sqft} sqft</span>
            </div>
          </div>
          
          {/* Amenities section */}
          {apartment.amenities && apartment.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {hasAmenity('wifi') && (
                <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <Wifi className="h-3 w-3" />
                  <span>WiFi</span>
                </div>
              )}
              {hasAmenity('parking') && (
                <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <Car className="h-3 w-3" />
                  <span>Parking</span>
                </div>
              )}
              {hasAmenity('tv') && (
                <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <Tv className="h-3 w-3" />
                  <span>TV</span>
                </div>
              )}
              {hasAmenity('air') && (
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <Wind className="h-3 w-3" />
                  <span>AC</span>
                </div>
              )}
              {apartment.amenities.length > 4 && (
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md">
                  +{apartment.amenities.length - 4} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showDetails && (
        <ApartmentDetailsModal 
          apartment={apartment} 
          onClose={() => setShowDetails(false)} 
          onBookNow={handleBookNow}
        />
      )}
    </>
  );
};
