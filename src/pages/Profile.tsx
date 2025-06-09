
import React, { useState } from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { Button } from '../components/UI/button';
import { User, Settings, Bell, LogOut, Building, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AccountSettingsModal } from '../components/Profile/AccountSettingsModal';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // TODO: Replace with your database API calls
  const [ownerApartments, setOwnerApartments] = useState<any[]>([]);
  const [mockNotifications, setMockNotifications] = useState<any[]>([]);
  
  // Fetch user data from your database API
  React.useEffect(() => {
    if (!user) return;
    
    // TODO: Replace with your database API calls
    // if (user.role === 'owner') {
    //   const fetchOwnerApartments = async () => {
    //     const response = await fetch(`/api/apartments/owner/${user.id}`);
    //     const data = await response.json();
    //     setOwnerApartments(data);
    //   };
    //   fetchOwnerApartments();
    // }
    
    // const fetchNotifications = async () => {
    //   const response = await fetch(`/api/notifications/${user.id}`);
    //   const data = await response.json();
    //   setMockNotifications(data);
    // };
    // fetchNotifications();
    
    console.log('Fetch user data placeholder - connect to your database API');
  }, [user]);
  
  const handleOpenSettings = () => {
    setShowSettings(true);
  };
  
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  
  if (!user) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <div className="bg-muted p-8 rounded-full">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Sign In Required</h1>
          <p className="text-muted-foreground text-center">
            Please sign in to access your profile and settings.
          </p>
          <div className="flex gap-4 mt-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
            <Button onClick={() => navigate('/signup')}>
              Create Account
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
          <div className="h-16 w-16 bg-muted rounded-full grid place-items-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{user?.name || 'User'}</h1>
            <p className="text-muted-foreground">{user?.email || 'user@example.com'}</p>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
              {user?.role === 'owner' ? 'Property Owner' : 'Student'}
            </span>
          </div>
          <div className="ml-auto">
            <Button
              size="icon"
              variant="outline"
              className="relative"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        {/* Owner Dashboard Button - Only show for owners */}
        {user?.role === 'owner' && (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              className="flex flex-col items-center justify-center h-24 bg-card border border-border"
              onClick={() => navigate('/owner-dashboard')}
            >
              <Building className="h-6 w-6 mb-2 text-apartment dark:text-primary" />
              <span>Owner Dashboard</span>
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 bg-card border border-border"
                >
                  <MessageCircle className="h-6 w-6 mb-2 text-apartment dark:text-primary" />
                  <span>My Properties</span>
                  <span className="text-xs text-muted-foreground">{ownerApartments.length} listed</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 p-4 w-80">
                <div className="space-y-2">
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">Your Properties</h3>
                  <ul className="space-y-2 max-h-60 overflow-auto">
                    {ownerApartments.length > 0 ? (
                      ownerApartments.map(apt => (
                        <li key={apt.id} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                          <p className="font-medium text-gray-900 dark:text-white">{apt.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{apt.location} - {apt.price}</p>
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-center text-gray-600 dark:text-gray-400">No properties found</li>
                    )}
                  </ul>
                  <Button 
                    className="w-full mt-2" 
                    onClick={() => navigate('/owner-dashboard')}
                  >
                    Manage Properties
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
        
        {/* Profile Options */}
        <div className="space-y-3">
          <div className="p-4 bg-card rounded-lg border border-border flex items-center justify-between cursor-pointer"
            onClick={() => setShowNotifications(true)}
          >
            <div className="flex items-center gap-3">
              <Bell className="text-apartment dark:text-primary h-5 w-5" />
              <span>Notifications</span>
            </div>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-sm">
                {unreadCount} New
              </span>
            )}
          </div>
          
          <div className="p-4 bg-card rounded-lg border border-border flex items-center justify-between cursor-pointer"
            onClick={handleOpenSettings}
          >
            <div className="flex items-center gap-3">
              <Settings className="text-apartment dark:text-primary h-5 w-5" />
              <span>Account Settings</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 mt-6"
            onClick={() => {
              logout();
              navigate('/signin');
              toast.success("You've been logged out successfully");
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {showSettings && (
        <AccountSettingsModal 
          user={user}
          onClose={() => setShowSettings(false)}
        />
      )}

      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Notifications</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {mockNotifications.length > 0 ? (
              <div className="space-y-4 py-2">
                {mockNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border ${!notification.read ? 'bg-gray-100 dark:bg-gray-800 border-blue-200 dark:border-blue-800' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">{notification.sender}</h4>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{notification.content}</p>
                    {!notification.read && (
                      <div className="mt-2 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            toast.success("Marked as read");
                          }}
                        >
                          Mark as read
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-600 dark:text-gray-400">
                <Bell className="mx-auto h-10 w-10 opacity-20 mb-2" />
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
};

export default ProfilePage;
