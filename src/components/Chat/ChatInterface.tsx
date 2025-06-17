import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MobileLayout } from '../Layout/MobileLayout';
import { chatService, Message } from '../../services/chat.service';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import { ArrowLeft, Send } from 'lucide-react';

interface ChatState {
  senderId: string;
  receiverId: string;
  propertyId: string;
}

const ChatInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get chat parameters from location state
  const chatState = location.state as ChatState;
  
  useEffect(() => {
    if (!chatState?.senderId || !chatState?.receiverId || !chatState?.propertyId) {
      navigate('/bookings');
      return;
    }
    
    fetchMessages();
    // Set up polling to refresh messages every 10 seconds
    const interval = setInterval(fetchMessages, 10000);
    
    return () => clearInterval(interval);
  }, [chatState]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await chatService.getMessageThread({
        senderId: chatState.senderId,
        receiverId: chatState.receiverId,
        propertyId: chatState.propertyId
      });
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    try {
      await chatService.sendMessage({
        senderId: chatState.senderId,
        receiverId: chatState.receiverId,
        propertyId: chatState.propertyId,
        message: newMessage.trim()
      });
      setNewMessage('');
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <MobileLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold">Chat with Property Owner</h1>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading && messages.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg._id}
                className={`flex ${msg.senderId === chatState.senderId ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] rounded-lg p-3 ${
                    msg.senderId === chatState.senderId 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="break-words">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.senderId === chatState.senderId ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default ChatInterface;