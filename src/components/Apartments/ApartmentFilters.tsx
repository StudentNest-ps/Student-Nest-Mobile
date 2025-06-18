
import React, { useState } from 'react';
import { Button } from '../UI/button';
import { Checkbox } from '../UI/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../UI/dialog';
import { Input } from '../UI/input';
import { Filter, Wifi, ParkingMeter, Wind, UtensilsCrossed } from 'lucide-react';

interface ApartmentFiltersProps {
  onApplyFilters: (filters: {
    minPrice: number;
    maxPrice: number;
    hasWifi: boolean;
    hasParking: boolean;
    hasAC: boolean;
    hasKitchen: boolean;
  }) => void;
}

export const ApartmentFilters = ({ onApplyFilters }: ApartmentFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [hasAC, setHasAC] = useState(false);
  const [hasKitchen, setHasKitchen] = useState(false);
  
  const handleApplyFilters = () => {
    onApplyFilters({
      minPrice,
      maxPrice,
      hasWifi,
      hasParking,
      hasAC,
      hasKitchen
    });
    setIsOpen(false);
  };
  
  const handleResetFilters = () => {
    setMinPrice(500);
    setMaxPrice(5000);
    setHasWifi(false);
    setHasParking(false);
    setHasAC(false);
    setHasKitchen(false);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMaxPrice(value);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          Filters
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Apartments</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={hasParking ? "default" : "outline"}
                size="sm"
                className="flex items-center justify-start gap-2"
                onClick={() => setHasParking(!hasParking)}
              >
                <ParkingMeter size={16} /> Parking
              </Button>
              
              <Button 
                variant={hasWifi ? "default" : "outline"}
                size="sm"
                className="flex items-center justify-start gap-2"
                onClick={() => setHasWifi(!hasWifi)}
              >
                <Wifi size={16} /> WiFi
              </Button>
              
              <Button 
                variant={hasAC ? "default" : "outline"}
                size="sm"
                className="flex items-center justify-start gap-2"
                onClick={() => setHasAC(!hasAC)}
              >
                <Wind size={16} /> AC
              </Button>
              
              <Button 
                variant={hasKitchen ? "default" : "outline"}
                size="sm"
                className="flex items-center justify-start gap-2"
                onClick={() => setHasKitchen(!hasKitchen)}
              >
                <UtensilsCrossed size={16} /> Kitchen
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Price Range</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  min={0}
                  className="w-full"
                />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  min={0}
                  className="w-full"
                />
              </div>
              <Button onClick={handleApplyFilters}>Apply</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
