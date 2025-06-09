
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '../UI/button';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import api from '../../services/api';

// Define an interface for the API update data
interface UserUpdateData {
  username?: string;
  phoneNumber?: string;
  password?: string;
}

interface User {
  id: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
}

interface AccountSettingsModalProps {
  user: User | null;
  onClose: () => void;
}

export const AccountSettingsModal = ({ user, onClose }: AccountSettingsModalProps) => {
  const { updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    phoneNumber: user?.phoneNumber || '',
    password: '',
    confirmPassword: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error("User data is missing");
      return;
    }
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Prepare data for API call - only include fields with values
      const updateData: UserUpdateData = {};
      if (formData.username) updateData.username = formData.username;
      if (formData.phoneNumber) updateData.phoneNumber = formData.phoneNumber;
      if (formData.password) updateData.password = formData.password;
      
      // Call the API using PUT instead of PATCH
      await api.put('/general/me', updateData);
      
      // Update local state - convert to the format expected by updateUserProfile
      updateUserProfile({
        id: user.id,
        // Map username to name for AuthContext compatibility
        name: formData.username,
        // Keep email unchanged
        email: user.email
      });
      
      toast.success("Profile updated successfully");
      onClose();
    } catch (error: unknown) {
      // Type guard for error with response property
      if (error && typeof error === 'object' && 'response' in error && 
          error.response && typeof error.response === 'object' && 'data' in error.response &&
          error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
        toast.error(String(error.response.data.message));
      } else {
        toast.error("Failed to update profile");
        console.error("Update profile error:", error);
      }
    } finally {
      setIsSaving(false);
    }
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
              Username
            </label>
            <input 
              type="text"
              name="username"
              value={formData.username}
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
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              New Password (leave blank to keep current)
            </label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded-md bg-background"
              placeholder="••••••••"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Confirm New Password
            </label>
            <input 
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded-md bg-background"
              placeholder="••••••••"
              disabled={!formData.password}
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
