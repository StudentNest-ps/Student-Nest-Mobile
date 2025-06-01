
import React, { useState } from 'react';
import { X, Upload, MapPin, DollarSign, Home, Bed, Bath, Square } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface AddPropertyModalProps {
  onClose: () => void;
}

export const AddPropertyModal = ({ onClose }: AddPropertyModalProps) => {
  const [propertyData, setPropertyData] = useState({
    name: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    type: '',
    description: '',
    amenities: '',
    images: [] as File[]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
          toast.error(`${file.name} is not a valid image format`);
          return false;
        }
        
        if (file.size > maxSize) {
          toast.error(`${file.name} is too large. Maximum size is 10MB`);
          return false;
        }
        
        return true;
      });
      
      setPropertyData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }));
      
      if (validFiles.length > 0) {
        toast.success(`${validFiles.length} image(s) added successfully`);
      }
    }
  };

  const removeImage = (index: number) => {
    setPropertyData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - just show success message
    toast.success('Property added successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Property</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Property Images */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-900 dark:text-white">Property Images</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Click to upload images or drag and drop
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button 
                type="button" 
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                Choose Images
              </Button>
            </div>
            
            {propertyData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {propertyData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Property ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Property Name</label>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Modern Downtown Apartment"
                  value={propertyData.name}
                  onChange={(e) => setPropertyData(prev => ({ ...prev, name: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Monthly Rent</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="2500"
                  value={propertyData.price}
                  onChange={(e) => setPropertyData(prev => ({ ...prev, price: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="123 Main Street, City, State"
                value={propertyData.location}
                onChange={(e) => setPropertyData(prev => ({ ...prev, location: e.target.value }))}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Bedrooms</label>
              <div className="relative">
                <Bed className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  placeholder="2"
                  value={propertyData.bedrooms}
                  onChange={(e) => setPropertyData(prev => ({ ...prev, bedrooms: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Bathrooms</label>
              <div className="relative">
                <Bath className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  placeholder="2"
                  value={propertyData.bathrooms}
                  onChange={(e) => setPropertyData(prev => ({ ...prev, bathrooms: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Square Feet</label>
              <div className="relative">
                <Square className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  placeholder="1200"
                  value={propertyData.sqft}
                  onChange={(e) => setPropertyData(prev => ({ ...prev, sqft: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Property Type</label>
              <Input
                type="text"
                placeholder="Apartment"
                value={propertyData.type}
                onChange={(e) => setPropertyData(prev => ({ ...prev, type: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <Textarea
              placeholder="Describe your property..."
              value={propertyData.description}
              onChange={(e) => setPropertyData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">Amenities</label>
            <Input
              type="text"
              placeholder="WiFi, Parking, Pool, Gym (comma separated)"
              value={propertyData.amenities}
              onChange={(e) => setPropertyData(prev => ({ ...prev, amenities: e.target.value }))}
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
