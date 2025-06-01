
import React, { useState, useEffect } from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { SignInForm } from '../components/Auth/SignInForm';
import { SignUpForm } from '../components/Auth/SignUpForm';
import { ApartmentList } from '../components/Apartments/ApartmentList';
import { BlogHero } from '../components/Blog/BlogHero';
import { BlogCarousel } from '../components/Blog/BlogCarousel';
import { ErrorState } from '../components/UI/ErrorState';
import { LoadingState } from '../components/UI/LoadingState';
import { Button } from '../components/ui/button';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// Wrapped component that uses auth context
const IndexContent = () => {
  const [activeView, setActiveView] = useState('auth');
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  
  // Listen for view changes from bottom nav
  useEffect(() => {
    const handleViewChange = (e: CustomEvent) => {
      setActiveView(e.detail.view);
    };
    
    window.addEventListener('viewChange', handleViewChange as EventListener);
    
    // Get the saved view from localStorage if available
    const savedView = localStorage.getItem('activeView');
    if (savedView) {
      setActiveView(savedView);
    }
    
    return () => {
      window.removeEventListener('viewChange', handleViewChange as EventListener);
    };
  }, []);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Redirect to home if authenticated
  useEffect(() => {
    if (isAuthenticated && activeView === 'auth') {
      setActiveView('home');
      localStorage.setItem('activeView', 'home');
    }
  }, [isAuthenticated, activeView]);
  
  if (loading) {
    return (
      <MobileLayout>
        <LoadingState />
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* If not authenticated, show auth screens */}
        {!isAuthenticated && (
          <div className="space-y-8">
            <SignInForm />
            <div className="border-t border-border pt-8">
              <SignUpForm />
            </div>
          </div>
        )}
        
        {/* If authenticated, show the selected view */}
        {isAuthenticated && (
          <>
            {activeView === 'home' && (
              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h2 className="text-2xl font-bold mb-2 text-gradient">ApartmentFinder</h2>
                  <p className="text-muted-foreground mb-4">
                    Find your perfect home with our mobile apartment finder app.
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setActiveView('apartments');
                      localStorage.setItem('activeView', 'apartments');
                    }}
                  >
                    Browse Apartments
                  </Button>
                </div>
                
                {/* Featured content */}
                <div className="space-y-4">
                  <h3 className="font-bold">Featured Apartments</h3>
                  <ApartmentList />
                </div>
              </div>
            )}
            
            {activeView === 'apartments' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Apartments</h2>
                <ApartmentList />
              </div>
            )}
            
            {activeView === 'blog' && (
              <div className="space-y-2">
                <h2 className="text-2xl font-bold mb-4">Blog</h2>
                <BlogHero />
                <BlogCarousel />
              </div>
            )}
            
            {activeView === 'states' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Service Status</h2>
                <ErrorState 
                  title="Service Temporarily Unavailable"
                  message="We're currently performing maintenance on this section. Please check back soon!"
                />
              </div>
            )}
          </>
        )}
      </div>
    </MobileLayout>
  );
};

// Wrap the Index component with AuthProvider
const Index = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

export default Index;
