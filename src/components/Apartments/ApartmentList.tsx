
import React, { useState, useEffect } from 'react';
import { ApartmentCard } from './ApartmentCard';
import { Filter, Wifi, ParkingMeter, X } from 'lucide-react';
import { Button } from '../UI/button';
import { Checkbox } from '../UI/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../UI/dialog';
import { Slider } from '../UI/slider';
import api from '../../services/api';
import { Property } from '../../services/property.service';

// Updated interface to match MongoDB schema and ApartmentCard requirements
interface Apartment {
  _id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  address: string;
  city: string;
  country: string;
  image: string;
  amenities: string[];
  availableFrom: string;
  availableTo: string;
  maxGuests: string;
  // Required properties for ApartmentCard
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  // Optional properties
  ownerId?: string;
  ownerName?: string;
  mapPosition?: { x: string, y: string };
}

export const ApartmentList = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
  const [allApartments, setAllApartments] = useState<Apartment[]>([]);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [propertyType, setPropertyType] = useState('All');
  const [location, setLocation] = useState('All');
  const [loading, setLoading] = useState(true);
  
  // Fetch apartments from your database API
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        // Using the API route provided in your requirements
        const response = await api.get('/properties');
        const properties = response.data as Property[];
        
        // Map the properties to match the expected format for the UI components
        const mappedProperties = properties.map(property => ({
          ...property,
          id: property._id || '',  // Ensure id is always set
          name: property.title,
          location: `${property.city}, ${property.country}`,
          // Default values for properties not in the schema
          bedrooms: 2, // You might want to add these to your schema
          bathrooms: 1, // You might want to add these to your schema
          sqft: 800, // You might want to add these to your schema
          // Format price as string with $ for display
          price: property.price,
          // Set ownerId if available, otherwise use empty string
          ownerId: property._id || ''
        })) as Apartment[];
        
        setAllApartments(mappedProperties);
        setFilteredApartments(mappedProperties);
      } catch (error) {
        console.error('Failed to fetch apartments:', error);
        setAllApartments([]);
        setFilteredApartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);
  
  // Extract unique cities for location filter
  const locations = ['All', ...new Set(allApartments.map(apt => apt.city || ''))];
  
  // Property types from your schema
  const propertyTypes = ['All', 'apartment', 'house', 'studio', 'condo', 'room'];
  
  const applyFilters = () => {
    let result = [...allApartments];
    
    // Filter by price range
    result = result.filter(apt => {
      return apt.price >= minPrice && apt.price <= maxPrice;
    });
    
    // Filter by bedrooms (if you add this to your schema)
    if (bedrooms !== null && result.some(apt => apt.bedrooms !== undefined)) {
      result = result.filter(apt => apt.bedrooms === bedrooms);
    }
    
    // Filter by bathrooms (if you add this to your schema)
    if (bathrooms !== null && result.some(apt => apt.bathrooms !== undefined)) {
      result = result.filter(apt => apt.bathrooms >= bathrooms);
    }
    
    // Filter by property type
    if (propertyType !== 'All') {
      result = result.filter(apt => apt.type === propertyType);
    }
    
    // Filter by location (city)
    if (location !== 'All') {
      result = result.filter(apt => apt.city === location);
    }
    
    // Filter by WiFi
    if (hasWifi) {
      result = result.filter(apt => apt.amenities?.includes('WiFi'));
    }
    
    // Filter by Parking
    if (hasParking) {
      result = result.filter(apt => apt.amenities?.includes('Parking'));
    }
    
    setFilteredApartments(result);
    setIsFiltersOpen(false);
  };
  
  const resetFilters = () => {
    setMinPrice(500);
    setMaxPrice(5000);
    setBedrooms(null);
    setBathrooms(null);
    setHasWifi(false);
    setHasParking(false);
    setPropertyType('All');
    setLocation('All');
    setFilteredApartments(allApartments);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Available Apartments</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-muted rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Available Apartments
        </h2>
        <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
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
          
          <DialogContent className="sm:max-w-[425px] bg-background border-border">
            <DialogHeader>
              <DialogTitle>Filter Apartments</DialogTitle>
              <DialogDescription>
                Customize your apartment search criteria below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Price Range</h3>
                <div className="pt-6">
                  <Slider 
                    value={[minPrice, maxPrice]} 
                    min={500} 
                    max={5000} 
                    step={100} 
                    onValueChange={(values) => {
                      setMinPrice(values[0]);
                      setMaxPrice(values[1]);
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${minPrice}</span>
                  <span>${maxPrice}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Bedrooms</h3>
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
                <h3 className="text-sm font-medium">Bathrooms</h3>
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
                <h3 className="text-sm font-medium">Property Type</h3>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <Button 
                      key={type} 
                      size="sm"
                      variant={propertyType === type ? 'default' : 'outline'}
                      onClick={() => setPropertyType(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Location</h3>
                <div className="flex flex-wrap gap-2">
                  {locations.map((loc) => (
                    <Button 
                      key={loc} 
                      size="sm"
                      variant={location === loc ? 'default' : 'outline'}
                      onClick={() => setLocation(loc)}
                    >
                      {loc}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Amenities</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wifi" 
                      checked={hasWifi} 
                      onCheckedChange={(checked) => setHasWifi(checked === true)}
                    />
                    <label 
                      htmlFor="wifi" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
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
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                    >
                      <ParkingMeter size={16} /> Parking Available
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={resetFilters}>
                <X size={16} className="mr-1" /> Reset
              </Button>
              <Button onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredApartments.length > 0 ? (
          filteredApartments.map((apartment) => (
            <ApartmentCard key={apartment.id || apartment._id} apartment={apartment} />
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-muted-foreground">
            {allApartments.length === 0 ? (
              <p>No apartments available. Please check back later.</p>
            ) : (
              <p>No apartments match your filters. Try adjusting your criteria.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
