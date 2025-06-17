import React, { useState, useEffect } from 'react';
import { X, MessageCircle, User } from 'lucide-react';
import { Button } from '../UI/button';
import { format } from 'date-fns';
import { chatService, Chat } from '../../services/chat.service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface OwnerMessagesListProps {
  onClose: () => void;
}

export const OwnerMessagesList = ({ onClose }: OwnerMessagesListProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    fetchOwnerChats();
  }, []);
  
  const fetchOwnerChats = async () => {
    try {
      setLoading(true);
      const data = await chatService.getChats();
      setChats(data);
      setError(null);
    } catch (err) {
      setError('Failed to load chats');
      toast.error('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };
  
  const handleOpenChat = (chat: Chat) => {
    // Find the other participant (not the current user)
    const otherParticipant = chat.participants.find(p => p._id !== user?.id);
    
    if (!otherParticipant) {
      toast.error('Could not identify chat participant');
      return;
    }
    
    navigate('/chat', {
      state: {
        senderId: user?.id,
        receiverId: otherParticipant._id,
        propertyId: chat.propertyId
      }
    });
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <X className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <p className="mb-4">{error}</p>
              <Button onClick={fetchOwnerChats}>Try Again</Button>
            </div>
          ) : chats.length > 0 ? (
            <div className="space-y-4">
              {chats.map((chat) => {
                // Find the other participant (not the current user)
                const otherParticipant = chat.participants.find(p => p._id !== user?.id);
                
                return (
                  <div 
                    key={chat._id} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleOpenChat(chat)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-gray-500" />
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {otherParticipant?.username || 'Unknown User'}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {otherParticipant?.email || ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Created {formatDate(chat.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No messages yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};