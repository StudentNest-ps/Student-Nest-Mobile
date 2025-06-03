
import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <div className="relative h-12 w-12">
          <div className="h-full w-full rounded-full border-4 border-muted absolute"></div>
          <div className="h-full w-full rounded-full border-4 border-t-primary animate-spin absolute"></div>
        </div>
        
        <p className="text-muted-foreground mt-4 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};
