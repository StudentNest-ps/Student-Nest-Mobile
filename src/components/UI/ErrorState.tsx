
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the page you requested. Please try again.",
  onRetry
}: ErrorStateProps) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-6 rounded-full bg-destructive/10 mb-6">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      
      <h1 className="text-2xl font-bold mb-2 text-foreground">
        {title}
      </h1>
      
      <p className="text-muted-foreground mb-8 max-w-md">
        {message}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleRetry} className="flex items-center gap-2 bg-apartment dark:bg-primary text-white">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2" onClick={() => window.location.href = '/'}>
          <Home className="h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
};
