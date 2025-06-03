
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface User {
  id: string;
  name?: string;
  email?: string;
}

interface AccountSettingsModalProps {
  user: User | null;
  onClose: () => void;
}

export const AccountSettingsModal = ({ user, onClose }: AccountSettingsModalProps) => {
  const { updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error("User data is missing");
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUserProfile({
        id: user.id,
        name: formData.name,
        email: formData.email
      });
      
      setIsSaving(false);
      toast.success("Profile updated successfully");
      onClose();
    }, 1000);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-lg border border-border animate-fade-in max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-lg">Account Settings</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Full Name
            </label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Email Address
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Phone Number
            </label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded-md bg-background"
              placeholder="Optional"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Address
            </label>
            <input 
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded-md bg-background"
              placeholder="Optional"
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button 
              type="submit" 
              className="flex items-center gap-2"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
