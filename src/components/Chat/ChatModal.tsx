
import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  apartmentId: string;
  apartmentName: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface ChatModalProps {
  apartmentId: string;
  apartmentName: string;
  ownerId: string;
  ownerName: string;
  onClose: () => void;
}

export const ChatModal = ({ apartmentId, apartmentName, ownerId, ownerName, onClose }: ChatModalProps) => {
  const { user, sendMessage, getMessages, markMessageAsRead } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [moveInDate, setMoveInDate] = useState<Date | undefined>(undefined);
  const [moveOutDate, setMoveOutDate] = useState<Date | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch messages from your database API
  useEffect(() => {
    if (!user) return;
    
    // TODO: Replace with your database API call
    // const fetchMessages = async () => {
    //   try {
    //     const response = await fetch(`/api/messages/conversation?apartmentId=${apartmentId}&userId=${user.id}`);
    //     const data = await response.json();
    //     setMessages(data.map(msg => ({
    //       ...msg,
    //       timestamp: new Date(msg.timestamp)
    //     })));
    //   } catch (error) {
    //     console.error('Failed to fetch messages:', error);
    //   }
    // };
    // fetchMessages();
    
    console.log('Fetch messages placeholder - connect to your database API');
    setMessages([]);
  }, [user, apartmentId]);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!user) {
      toast.error("Please sign in to send messages");
      return;
    }
    
    if (newMessage.trim() === '') return;
    
    let messageText = newMessage;
    
    // Add date information if provided
    if (moveInDate || moveOutDate) {
      messageText += "\n\nRequested dates:";
      if (moveInDate) {
        messageText += `\nMove-in: ${format(moveInDate, 'PPP')}`;
      }
      if (moveOutDate) {
        messageText += `\nMove-out: ${format(moveOutDate, 'PPP')}`;
      }
    }
    
    const newMsg = {
      senderId: user.id,
      senderName: user.name || 'User',
      receiverId: user.role === 'student' ? ownerId : messages[0]?.senderId || '',
      apartmentId,
      apartmentName,
      text: messageText,
      read: false
    };
    
    // TODO: Replace with your database API call
    // try {
    //   const response = await fetch('/api/messages', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newMsg)
    //   });
    //   const savedMessage = await response.json();
    //   setMessages([...messages, {
    //     ...savedMessage,
    //     timestamp: new Date(savedMessage.timestamp)
    //   }]);
    // } catch (error) {
    //   console.error('Failed to send message:', error);
    //   toast.error('Failed to send message');
    // }
    
    console.log('Send message placeholder - connect to your database API');
    sendMessage(newMsg);
    setNewMessage('');
    
    // Show message for student
    if (user.role === 'student') {
      toast.info("Message sent. Waiting for owner to respond.", {
        duration: 3000
      });
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const isCurrentUserOwner = user?.role === 'owner';
  const noRepliesYet = messages.length <= 1 || !messages.some(m => m.senderId === user?.id);
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80" onClick={onClose}>
      <div 
        className="bg-background w-full max-w-md rounded-xl shadow-lg border border-border animate-fade-in max-h-[90vh] flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">
              {isCurrentUserOwner ? 'Student Inquiry' : ownerName}
            </h3>
            <p className="text-sm text-muted-foreground">{apartmentName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex justify-center">
              <div className="bg-muted/50 text-sm text-muted-foreground px-3 py-1 rounded-full">
                No messages yet. Start the conversation!
              </div>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] rounded-lg p-3 whitespace-pre-line ${
                  message.senderId === user?.id 
                    ? 'bg-apartment text-white dark:bg-primary' 
                    : 'bg-muted'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === user?.id 
                    ? 'text-white/80' 
                    : 'text-muted-foreground'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {user?.role === 'student' && (
          <div className="p-4 border-t border-border space-y-2">
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                    {moveInDate ? format(moveInDate, 'MMM d, yyyy') : 'Move-in Date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card" align="start">
                  <Calendar
                    mode="single"
                    selected={moveInDate}
                    onSelect={setMoveInDate}
                    disabled={(date) => date < new Date()}
                    className="bg-card border border-input shadow-md rounded-md pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                    {moveOutDate ? format(moveOutDate, 'MMM d, yyyy') : 'Move-out Date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card" align="start">
                  <Calendar
                    mode="single"
                    selected={moveOutDate}
                    onSelect={setMoveOutDate}
                    disabled={(date) => date < (moveInDate || new Date())}
                    className="bg-card border border-input shadow-md rounded-md pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                !user
                  ? "Please sign in to send messages"
                  : isCurrentUserOwner && noRepliesYet
                  ? "Reply to student inquiry"
                  : "Type your message..."
              }
              disabled={!user}
              className="flex-1 p-2 border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!user || !newMessage.trim()}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
