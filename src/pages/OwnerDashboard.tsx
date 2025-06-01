
import React, { useState } from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { useNavigate } from 'react-router-dom';
import { ChatModal } from '../components/Chat/ChatModal';
import { OwnerApartmentsList } from '../components/Owner/OwnerApartmentsList';
import { OwnerBookingsList } from '../components/Owner/OwnerBookingsList';
import { AddPropertyModal } from '../components/Owner/AddPropertyModal';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { MessageCircle, CalendarClock, Building, Plus, Bell, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [showApartments, setShowApartments] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // UI-only mock data for notifications
  const mockNotifications = [
    {
      id: '1',
      type: 'message',
      sender: 'Emily Johnson',
      content: 'Hi, I\'m interested in your apartment on Oak Street. Is it still available?',
      time: '10 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'booking',
      sender: 'Michael Smith',
      content: 'New booking request for Downtown Studio',
      time: '2 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'message',
      sender: 'Sophia Williams',
      content: 'Thanks for accepting my booking! Looking forward to moving in next month.',
      time: '1 day ago',
      read: true
    }
  ];

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
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
            <Button size="icon" variant="ghost" onClick={() => navigate('/profile')}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 bg-card border border-border"
            onClick={() => setShowApartments(true)}
          >
            <Building className="h-6 w-6 mb-2" />
            <span>My Apartments</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 bg-card border border-border relative"
            onClick={() => setShowMessages(true)}
          >
            <MessageCircle className="h-6 w-6 mb-2" />
            <span>Messages</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 bg-card border border-border"
            onClick={() => setShowBookings(true)}
          >
            <CalendarClock className="h-6 w-6 mb-2" />
            <span>Bookings</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 bg-card border border-border"
            onClick={() => setShowAddProperty(true)}
          >
            <Plus className="h-6 w-6 mb-2" />
            <span>Add Property</span>
          </Button>
        </div>
        
        {/* Messages Section - Only show when messages button is not clicked */}
        {!showMessages && (
          <div className="bg-card rounded-lg border border-border p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Recent Messages
            </h2>
            
            {mockNotifications.filter(n => n.type === 'message').length > 0 ? (
              <div className="divide-y divide-border">
                {mockNotifications
                  .filter(n => n.type === 'message')
                  .map((msg) => (
                    <div 
                      key={msg.id}
                      className={`py-3 cursor-pointer hover:bg-muted/50 px-2 -mx-2 rounded-md ${
                        !msg.read ? 'bg-muted/30' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-medium ${!msg.read ? 'font-semibold' : ''}`}>
                            {msg.sender}
                            {!msg.read && (
                              <span className="ml-2 bg-primary text-primary-foreground text-xs py-0.5 px-1.5 rounded-full">
                                New
                              </span>
                            )}
                          </h3>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {msg.content}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-20" />
                <p>No messages from students yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => setShowApartments(true)}
                >
                  View Your Listings
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Modals */}
      {showApartments && (
        <OwnerApartmentsList onClose={() => setShowApartments(false)} />
      )}
      
      {showBookings && (
        <OwnerBookingsList onClose={() => setShowBookings(false)} />
      )}
      
      {showAddProperty && (
        <AddPropertyModal onClose={() => setShowAddProperty(false)} />
      )}
      
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {mockNotifications.length > 0 ? (
              <div className="space-y-4 py-2">
                {mockNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border ${!notification.read ? 'bg-muted/40 border-primary/20' : 'border-border bg-card'}`}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">{notification.sender}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm mt-1 text-foreground">{notification.content}</p>
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
              <div className="py-12 text-center text-muted-foreground">
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

export default OwnerDashboard;
