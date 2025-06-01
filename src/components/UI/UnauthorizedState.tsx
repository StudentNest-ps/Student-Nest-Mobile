
import React from 'react';
import { Button } from '../ui/button';
import { LogIn, Lock } from 'lucide-react';

export const UnauthorizedState = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-6 rounded-full bg-muted mb-6">
        <Lock className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">
        Access Denied
      </h1>
      
      <p className="text-muted-foreground mb-8 max-w-md">
        You don't have permission to access this page. Please sign in with the appropriate account.
      </p>
      
      <Button onClick={() => window.location.href = '/signin'} className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
    </div>
  );
};
