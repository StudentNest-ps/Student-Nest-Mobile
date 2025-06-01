
import React, { useState, useEffect } from 'react';
import { Home, MapPin, User, BookOpen } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activePath, setActivePath] = useState(() => {
    // Get the current path
    return location.pathname || '/';
  });
  
  useEffect(() => {
    // Update active path when location changes
    setActivePath(location.pathname);
  }, [location]);
  
  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MapPin, label: 'Apartments', path: '/apartments' },
    { icon: BookOpen, label: 'Blog', path: '/blog' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];
  
  const handleNavClick = (path: string) => {
    setActivePath(path);
    navigate(path);
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-apartment dark:bg-background text-primary-foreground dark:text-foreground border-t border-border shadow-sm transition-colors">
      <div className="flex justify-around">
        {navItems.map((item, index) => {
          // Check if the current path starts with this nav item's path
          // Special case for home to prevent matching with all routes
          const isActive = 
            item.path === '/' 
              ? activePath === '/'
              : activePath.startsWith(item.path);
          
          return (
            <button 
              key={index}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center py-2 px-3 transition-opacity ${
                isActive 
                  ? 'text-primary-foreground dark:text-foreground' 
                  : 'text-primary-foreground/70 dark:text-foreground/70 hover:text-primary-foreground dark:hover:text-foreground'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
