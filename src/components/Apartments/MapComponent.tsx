
import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { ApartmentDetailsModal } from './ApartmentDetailsModal';
import { useNavigate } from 'react-router-dom';

interface Apartment {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  mapPosition: { x: string, y: string };
  latitude?: number;
  longitude?: number;
}

interface MapComponentProps {
  apartments: Apartment[];
}

export const MapComponent = ({ apartments = [] }: MapComponentProps) => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Assign mock coordinates to apartments if not provided
  const apartmentsWithCoords = apartments.map((apt, index) => {
    // Generate mock coordinates for demo purposes
    if (!apt.latitude || !apt.longitude) {
      // Base coordinates for New York
      const baseLat = 40.7128;
      const baseLng = -74.006;
      
      // Add small random offset for each apartment
      return {
        ...apt,
        latitude: baseLat + (Math.random() * 0.1 - 0.05),
        longitude: baseLng + (Math.random() * 0.1 - 0.05)
      };
    }
    return apt;
  });
  
  useEffect(() => {
    // Load and initialize interactive map
    if (!mapRef.current || mapLoaded) return;
    
    // Use Mapbox static image API for background map with improved style
    const mapboxToken = 'pk.eyJ1IjoiZGVtb21hcGJveCIsImEiOiJjbDl5d2V5aHIwNzVpM3BydGN1bGNsYnNrIn0.8f_hzHiJHBpHHl62pdcW-g';
    const mapCenter = '-73.98,40.76'; // NYC coordinates
    const zoom = '12';
    const width = mapRef.current.clientWidth;
    const height = mapRef.current.clientHeight;
    const mapStyle = 'mapbox/streets-v11'; // More detailed street view
    
    // Set higher resolution for sharper map
    const highResMultiplier = 2; // 2x resolution for retina displays
    const mapUrl = `https://api.mapbox.com/styles/v1/${mapStyle}/static/${mapCenter},${zoom}/${width * highResMultiplier}x${height * highResMultiplier}?access_token=${mapboxToken}`;
    
    mapRef.current.style.backgroundImage = `url('${mapUrl}')`;
    mapRef.current.style.backgroundSize = 'cover';
    mapRef.current.style.backgroundPosition = 'center';
    
    setMapLoaded(true);
    
    // Create interactive elements for the map (markers, zoom buttons, etc.)
    const addMapControls = () => {
      if (!mapRef.current) return;
      
      // Add controls container
      const controlsContainer = document.createElement('div');
      controlsContainer.className = 'absolute bottom-3 right-3 flex flex-col gap-2';
      
      // Add zoom in button
      const zoomInBtn = document.createElement('button');
      zoomInBtn.className = 'bg-white dark:bg-gray-800 w-8 h-8 rounded-md shadow-md flex items-center justify-center text-foreground dark:text-background hover:bg-gray-100 dark:hover:bg-gray-700';
      zoomInBtn.innerHTML = '+';
      zoomInBtn.setAttribute('aria-label', 'Zoom in');
      
      // Add zoom out button
      const zoomOutBtn = document.createElement('button');
      zoomOutBtn.className = 'bg-white dark:bg-gray-800 w-8 h-8 rounded-md shadow-md flex items-center justify-center text-foreground dark:text-background hover:bg-gray-100 dark:hover:bg-gray-700';
      zoomOutBtn.innerHTML = '−';
      zoomOutBtn.setAttribute('aria-label', 'Zoom out');
      
      controlsContainer.appendChild(zoomInBtn);
      controlsContainer.appendChild(zoomOutBtn);
      mapRef.current.appendChild(controlsContainer);
    };
    
    addMapControls();
    
    // Add animation effect for initial map load
    mapRef.current.style.opacity = '0';
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.style.transition = 'opacity 0.5s ease-in-out';
        mapRef.current.style.opacity = '1';
      }
    }, 100);
    
  }, [mapLoaded]);
  
  const handlePinClick = (apartment: Apartment) => {
    setSelectedApartment(apartment);
  };
  
  const handleBook = () => {
    if (selectedApartment) {
      navigate(`/booking/${selectedApartment.id}`);
    }
  };

  return (
    <>
      <div 
        ref={mapRef} 
        className="h-[300px] rounded-xl border border-border relative bg-muted overflow-hidden shadow-md map-container"
      >
        {/* Map overlay for better visibility in dark mode */}
        <div className="absolute inset-0 dark:bg-black dark:bg-opacity-20 pointer-events-none"></div>
        
        {/* Map pins for apartments */}
        {apartmentsWithCoords.map((apartment) => (
          <button
            key={apartment.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 z-10"
            style={{ 
              top: apartment.mapPosition?.y || '50%',
              left: apartment.mapPosition?.x || '50%'
            }}
            onClick={() => handlePinClick(apartment)}
            aria-label={`View ${apartment.name}`}
          >
            <div className="flex flex-col items-center">
              <div className="h-7 w-7 rounded-full bg-apartment dark:bg-primary grid place-items-center text-white text-xs animate-pulse shadow-lg">
                <span>${parseInt(apartment.price.replace(/[^\d]/g, '')) / 100}</span>
              </div>
              <div className="w-1 h-4 bg-apartment dark:bg-primary rounded-b-sm shadow-md"></div>
            </div>
          </button>
        ))}
        
        {/* Map attribution - required by Mapbox terms */}
        <div className="absolute bottom-0 right-0 text-[10px] text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 dark:bg-opacity-70 px-1 rounded-tl">
          © Mapbox © OpenStreetMap
        </div>
      </div>
      
      {selectedApartment && (
        <ApartmentDetailsModal 
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
          onBookNow={handleBook}
        />
      )}
    </>
  );
};
