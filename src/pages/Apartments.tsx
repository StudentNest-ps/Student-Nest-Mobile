
import React from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { ApartmentList } from '../components/Apartments/ApartmentList';

const ApartmentsPage = () => {
  return (
    <MobileLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Find Your Perfect Apartment</h1>
        <p className="text-muted-foreground mb-4">
          Browse our curated selection of apartments in top locations.
        </p>
        
        <ApartmentList />
      </div>
    </MobileLayout>
  );
};

export default ApartmentsPage;
