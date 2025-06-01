
import React from 'react';
import { Button } from '../ui/button';
import { Home, Search } from 'lucide-react';

export const NotFoundState = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 relative">
        <div className="text-8xl font-bold text-muted">404</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Search className="h-12 w-12 text-muted-foreground animate-pulse-slow" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold mb-2">
        Page Not Found
      </h1>
      
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Button onClick={() => window.location.href = '/'} className="flex items-center gap-2">
        <Home className="h-4 w-4" />
        Back to Home
      </Button>
    </div>
  );
};
