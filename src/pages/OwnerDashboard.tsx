import React, { useState, useEffect } from "react";
import { MobileLayout } from "../components/Layout/MobileLayout";
import { useNavigate } from "react-router-dom";
import { ChatModal } from "../components/Chat/ChatModal";
import { OwnerApartmentsList } from "../components/Owner/OwnerApartmentsList";
import { OwnerBookingsList } from "../components/Owner/OwnerBookingsList";
import { AddPropertyModal } from "../components/Owner/AddPropertyModal";
import { toast } from "sonner";
import { Button } from "../components/UI/button";
import {
  MessageCircle,
  CalendarClock,
  Building,
  Plus,
  Bell,
  Settings
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "../components/UI/dialog";
import { ownerService, Property } from "../services/owner.service";
import { OwnerMessagesList } from "../components/Owner/OwnerMessagesList";
import { useAuth } from "../contexts/AuthContext";
import { chatService, Message } from "../services/chat.service";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { notifications, hasUnreadNotifications, markNotificationAsSeen, fetchNotifications } = useAuth();
  const [showApartments, setShowApartments] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await ownerService.getMyProperties();
      console.log(data);

      setProperties(data);
      setError(null);
    } catch (err) {
      setError("Failed to load properties");
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentMessages = async () => {
    try {
      setLoadingMessages(true);
      const chats = await chatService.getChats();
      
      // Get the most recent messages from each chat
      const messagesPromises = chats.slice(0, 2).map(chat => 
        chatService.getChatMessages(chat._id)
      );
      
      const messagesResults = await Promise.all(messagesPromises);
      
      // Flatten and sort by date
      const allMessages = messagesResults
        .flat()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 2); // Get only the two most recent messages
      
      setRecentMessages(allMessages);
    } catch (err) {
      console.error("Failed to load recent messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchRecentMessages();
    fetchNotifications();
  }, []);

  const handleUpdateProperty = async (
    propertyId: string,
    propertyData: Partial<Property>
  ) => {
    try {
      await ownerService.updateProperty(propertyId, propertyData);
      toast.success("Property updated successfully");
      //TODO: Update the apartments after update
    } catch (err) {
      toast.error("Failed to update property");
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      await ownerService.deleteProperty(propertyId);
      toast.success("Property deleted successfully");
      //TODO: Update the apartments after Delete
    } catch (err) {
      toast.error("Failed to delete property");
    }
  };

  // Format relative time (e.g., "10 minutes ago")
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <div className="flex items-center gap-2">
            {hasUnreadNotifications && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowNotifications(true)}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate("/profile")}
            >
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
            {notifications.filter(n => n.type === 'message' && !n.seen).length > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {notifications.filter(n => n.type === 'message' && !n.seen).length} new
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

            {loadingMessages ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : recentMessages.length > 0 ? (
              <div className="divide-y divide-border">
                {recentMessages.map((msg) => (
                  <div
                    key={msg._id}
                    className="py-3 cursor-pointer hover:bg-muted/50 px-2 -mx-2 rounded-md"
                    onClick={() => setShowMessages(true)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {msg.senderId === msg.receiverId ? 'System Message' : 'Student'}
                          {notifications.some(n => 
                            n.type === 'message' && 
                            !n.seen && 
                            n.message.includes(msg.message.substring(0, 20))
                          ) && (
                            <span className="ml-2 bg-primary text-primary-foreground text-xs py-0.5 px-1.5 rounded-full">
                              New
                            </span>
                          )}
                        </h3>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {msg.message}
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
        <OwnerApartmentsList 
          apartments={properties} 
          onClose={() => setShowApartments(false)} 
          onPropertyUpdated={fetchProperties} 
        />
      )}

      {showBookings && (
        <OwnerBookingsList onClose={() => setShowBookings(false)} />
      )}

      {showMessages && (
        <OwnerMessagesList onClose={() => setShowMessages(false)} />
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
            {notifications.length > 0 ? (
              <div className="space-y-4 py-2">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-3 rounded-lg border ${
                      !notification.seen
                        ? "bg-muted/40 border-primary/20"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">{notification.type === 'message' ? 'Message' : 'System'}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm mt-1 text-foreground">
                      {notification.message}
                    </p>
                    {!notification.seen && (
                      <div className="mt-2 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            markNotificationAsSeen(notification._id);
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
