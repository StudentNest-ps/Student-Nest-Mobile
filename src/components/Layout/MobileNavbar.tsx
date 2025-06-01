
import React from 'react';
import { Bell, Moon, Sun, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const MobileNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const showBackButton = !['/'].includes(location.pathname);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-apartment dark:bg-background border-b border-border shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="text-primary-foreground dark:text-foreground mr-2"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <div className="text-gradient font-bold text-xl">
            ApartmentFinder
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-primary-foreground dark:text-foreground"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-primary-foreground transition-all" />
            ) : (
              <Moon size={20} className="text-primary-foreground transition-all" />
            )}
            <span className="sr-only">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-primary-foreground dark:text-foreground"
          >
            <Bell size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};
