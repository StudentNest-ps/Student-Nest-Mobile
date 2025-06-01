import React, { useState } from 'react';
import { Bed, Bath } from 'lucide-react';
import { Button } from '../UI/button';
import { ApartmentDetailsModal } from './ApartmentDetailsModal';
import { useNavigate } from 'react-router-dom';

interface ApartmentProps {
  apartment: {
    id: string;
    name: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    image: string;
    description?: string;
    ownerId?: string;  // Added ownerId
    ownerName?: string; // Added ownerName
  };
}

export const ApartmentCard = ({ apartment }: ApartmentProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    navigate(`/booking/${apartment.id}`, { state: { apartment } });
  };
  
  return (
    <>
      <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm card-hover apartment-card">
        <div className="relative">
          <img 
            src={apartment.image} 
            alt={apartment.name}
            className="w-full h-48 object-cover cursor-pointer"
            onClick={() => setShowDetails(true)}
          />
          {apartment.ownerName && (
            <div className="absolute bottom-0 left-0 bg-background/80 px-2 py-1 text-xs font-medium">
              Listed by {apartment.ownerName}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium line-clamp-1 text-foreground">{apartment.name}</h3>
            <p className="font-bold text-apartment dark:text-primary price-text">{apartment.price}</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">{apartment.location}</p>
          
          <div className="flex items-center gap-4 mt-4 text-sm text-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span>{apartment.bedrooms} {apartment.bedrooms === 0 ? 'Studio' : apartment.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span>{apartment.bathrooms} {apartment.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            
            <div>
              <span>{apartment.sqft} sq ft</span>
            </div>
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <Button 
            className="w-full text-primary-foreground" 
            onClick={() => setShowDetails(true)}
          >
            View Details
          </Button>
        </div>
      </div>
      
      {showDetails && (
        <ApartmentDetailsModal 
          apartment={apartment}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};
