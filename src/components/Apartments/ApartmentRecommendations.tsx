
import React, { useState, useEffect } from 'react';
import { ApartmentCard } from './ApartmentCard';
import { useAuth } from '../../contexts/AuthContext';

interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
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
    const fetchRecommendations = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/recommendations?userId=${user?.id}`);
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error('Failed to fetch apartment recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRecommendations();
    }
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
