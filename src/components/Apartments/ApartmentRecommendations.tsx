
import React, { useState, useEffect } from 'react';
import { ApartmentCard } from './ApartmentCard';
import { useAuth } from '../../contexts/AuthContext';

interface Apartment {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  hasWifi?: boolean;
  hasParking?: boolean;
}

export const ApartmentRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch personalized recommendations
    // For now, we'll simulate with dummy data
    const dummyRecommendations: Apartment[] = [
      {
        id: 'rec1',
        name: 'Sunset Heights',
        location: 'Downtown',
        price: '$1,450/mo',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 650,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        hasWifi: true,
        hasParking: false
      },
      {
        id: 'rec2',
        name: 'Campus View',
        location: 'University District',
        price: '$1,150/mo',
        bedrooms: 0, // Studio
        bathrooms: 1,
        sqft: 450,
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        hasWifi: true,
        hasParking: true
      },
      {
        id: 'rec3',
        name: 'Urban Loft',
        location: 'Arts District',
        price: '$1,750/mo',
        bedrooms: 2,
        bathrooms: 1,
        sqft: 850,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        hasWifi: true,
        hasParking: true
      }
    ];
    
    // Simulate API delay
    setTimeout(() => {
      setRecommendations(dummyRecommendations);
      setLoading(false);
    }, 1000);
  }, [user]);
  
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl"></div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-4">
      {recommendations.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
};
