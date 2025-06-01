
import React from 'react';
import { X, MapPin, Bed, Bath, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface Apartment {
  id: string;
  name: string;
  image: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
}

interface OwnerApartmentsListProps {
  onClose: () => void;
}

export const OwnerApartmentsList = ({ onClose }: OwnerApartmentsListProps) => {
  // UI-only implementation with empty data
  const apartments: Apartment[] = [];
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Properties</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          {apartments.length > 0 ? (
            <div className="space-y-4">
              {apartments.map((apartment) => (
                <div key={apartment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex gap-4">
                    <img 
                      src={apartment.image} 
                      alt={apartment.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{apartment.name}</h3>
                        <p className="font-bold text-blue-600 dark:text-blue-400">{apartment.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-1 text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <p className="text-sm">{apartment.location}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <span>{apartment.bedrooms} {apartment.bedrooms === 0 ? 'Studio' : apartment.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <span>{apartment.bathrooms} {apartment.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                        </div>
                        
                        <div>
                          <span>{apartment.sqft} sq ft</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1 text-red-600">
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <p>You haven't listed any properties yet.</p>
              <Button className="mt-4">Add Your First Property</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
