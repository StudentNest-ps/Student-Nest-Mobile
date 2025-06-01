
import React from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Wifi, Shield, Star, Home, Coffee, Clock } from 'lucide-react';
import { ApartmentRecommendations } from '../components/Apartments/ApartmentRecommendations';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <MobileLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h1 className="text-3xl font-bold text-gradient">ApartmentFinder</h1>
          <p className="text-muted-foreground mt-2 mb-6">
            Finding your perfect home has never been easier. Browse, compare, and book apartments 
            all in one place.
          </p>
          <Button 
            onClick={() => navigate('/apartments')}
            size="lg"
            className="w-full"
          >
            Find Your New Home
          </Button>
        </div>
        
        {/* Recommendations Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Recommended For You</h2>
          <ApartmentRecommendations />
        </div>
        
        {/* Features Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="bg-apartment/10 dark:bg-primary/10 p-2 rounded-full">
                <Shield className="h-5 w-5 text-apartment dark:text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Secure Booking</h3>
                <p className="text-sm text-muted-foreground">
                  All transactions and personal data are protected with enterprise-grade security.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="bg-apartment/10 dark:bg-primary/10 p-2 rounded-full">
                <Wifi className="h-5 w-5 text-apartment dark:text-primary" />
              </div>
              <div>
                <h3 className="font-medium">High-Speed Internet</h3>
                <p className="text-sm text-muted-foreground">
                  All our listed apartments come with high-speed Wi-Fi included.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="bg-apartment/10 dark:bg-primary/10 p-2 rounded-full">
                <Star className="h-5 w-5 text-apartment dark:text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Premium Locations</h3>
                <p className="text-sm text-muted-foreground">
                  Handpicked properties in the most desirable neighborhoods.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="bg-apartment/10 dark:bg-primary/10 p-2 rounded-full">
                <Home className="h-5 w-5 text-apartment dark:text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  Every property is inspected to meet our high standards.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="bg-apartment/10 dark:bg-primary/10 p-2 rounded-full">
                <Coffee className="h-5 w-5 text-apartment dark:text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Amenities</h3>
                <p className="text-sm text-muted-foreground">
                  Modern appliances, gyms, pools, and more based on property.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="bg-apartment/10 dark:bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-apartment dark:text-primary" />
              </div>
              <div>
                <h3 className="font-medium">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our customer service team is available around the clock.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-card p-6 rounded-xl border border-border text-center">
          <h2 className="text-xl font-bold mb-2">Ready to find your new home?</h2>
          <p className="text-muted-foreground mb-4">
            Browse our selection of quality apartments today.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
            <Button onClick={() => navigate('/apartments')}>
              View Apartments
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default HomePage;
