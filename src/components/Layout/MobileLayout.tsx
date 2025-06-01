
import React from 'react';
import { MobileNavbar } from './MobileNavbar';
import { MobileBottomNav } from './MobileBottomNav';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <MobileNavbar />
      <main className="flex-1 p-4 pt-20 pb-20 overflow-auto bg-background">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
};
