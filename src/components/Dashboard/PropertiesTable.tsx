
import React from 'react';
import { Button } from '../ui/button';
import { Edit, Trash2, MapPin } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  status: 'Active' | 'Pending' | 'Unavailable';
}

export const PropertiesTable = () => {
  // Sample properties data (frontend only)
  const properties: Property[] = [
    { 
      id: '1', 
      name: 'Oceanview Apartments', 
      location: 'Miami, FL', 
      type: 'Apartment', 
      status: 'Active' 
    },
    { 
      id: '2', 
      name: 'Downtown Lofts', 
      location: 'Chicago, IL', 
      type: 'Loft', 
      status: 'Active' 
    },
    { 
      id: '3', 
      name: 'Highland Townhomes', 
      location: 'Denver, CO', 
      type: 'Townhouse', 
      status: 'Pending' 
    },
    { 
      id: '4', 
      name: 'Lakeside Condos', 
      location: 'Seattle, WA', 
      type: 'Condo', 
      status: 'Unavailable' 
    },
  ];
  
  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Unavailable': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      default: return '';
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-medium">Properties</h3>
        <Button size="sm" variant="outline">
          Add Property
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        {properties.map((property) => (
          <div 
            key={property.id}
            className="p-4 border-b last:border-0 border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          >
            <div>
              <h4 className="font-medium">{property.name}</h4>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {property.location}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
              <span className="text-xs px-2 py-1 rounded-full">
                {property.type}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(property.status)}`}>
                {property.status}
              </span>
              <div className="flex gap-2 ml-auto sm:ml-2">
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
