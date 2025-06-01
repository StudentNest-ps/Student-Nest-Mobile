
import React, { useState } from 'react';
import { Wifi, ParkingMeter, Bed, Bath, Filter, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface ApartmentFiltersProps {
  onApplyFilters: (filters: {
    minPrice: number;
    maxPrice: number;
    bedrooms: number | null;
    bathrooms: number | null;
    hasWifi: boolean;
    hasParking: boolean;
  }) => void;
}

export const ApartmentFilters = ({ onApplyFilters }: ApartmentFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  
  const handleApplyFilters = () => {
    onApplyFilters({
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      hasWifi,
      hasParking
    });
    setIsOpen(false);
  };
  
  const handleResetFilters = () => {
    setMinPrice(500);
    setMaxPrice(5000);
    setBedrooms(null);
    setBathrooms(null);
    setHasWifi(false);
    setHasParking(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-2 mb-4">
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter size={16} />
            Filters
          </Button>
        </DialogTrigger>
      </div>
      
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Filter Apartments</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Price Range</h3>
            <div className="pt-6">
              <Slider 
                defaultValue={[minPrice, maxPrice]} 
                min={500} 
                max={5000} 
                step={100} 
                onValueChange={(values) => {
                  setMinPrice(values[0]);
                  setMaxPrice(values[1]);
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Bedrooms</h3>
            <div className="flex gap-2">
              {[null, 0, 1, 2, 3, 4].map((num) => (
                <Button 
                  key={num === null ? 'any' : num} 
                  size="sm"
                  variant={bedrooms === num ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setBedrooms(num)}
                >
                  {num === null ? 'Any' : num === 0 ? 'Studio' : num}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Bathrooms</h3>
            <div className="flex gap-2">
              {[null, 1, 2, 3].map((num) => (
                <Button 
                  key={num === null ? 'any' : num} 
                  size="sm"
                  variant={bathrooms === num ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setBathrooms(num)}
                >
                  {num === null ? 'Any' : num}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Amenities</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="wifi" 
                  checked={hasWifi} 
                  onCheckedChange={(checked) => setHasWifi(checked === true)}
                />
                <label 
                  htmlFor="wifi" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 text-gray-900 dark:text-white"
                >
                  <Wifi size={16} /> WiFi Included
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="parking" 
                  checked={hasParking} 
                  onCheckedChange={(checked) => setHasParking(checked === true)}
                />
                <label 
                  htmlFor="parking" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 text-gray-900 dark:text-white"
                >
                  <ParkingMeter size={16} /> Parking Available
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleResetFilters}>
            <X size={16} className="mr-1" /> Reset
          </Button>
          <Button onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
