import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import { Textarea } from '../UI/textarea';
import { Property } from '@/services/property.service';
import { propertyService } from '@/services/property.service';

interface EditPropertyModalProps {
  onClose: () => void;
  property: Property;
  onPropertyUpdated: () => void;
}

export const EditPropertyModal = ({ onClose, property, onPropertyUpdated }: EditPropertyModalProps) => {
  const [propertyData, setPropertyData] = useState<Property>({
    _id: property._id,
    title: property.title,
    description: property.description,
    type: property.type,
    price: property.price,
    address: property.address,
    city: property.city,
    country: property.country,
    ownerName: property.ownerName,
    ownerPhoneNumber: property.ownerPhoneNumber,
    availableFrom: property.availableFrom,
    availableTo: property.availableTo,
    maxGuests: property.maxGuests,
    amenities: property.amenities,
    image: property.image
  });

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment' },
    { id: 'house', label: 'House' },
    { id: 'studio', label: 'Studio' },
    { id: 'condo', label: 'Condominium' },
    { id: 'room', label: 'Room' },
  ];

  const amenityOptions = [
    'WiFi', 'Air Conditioning', 'Kitchen', 'Swimming Pool', 'Balcony', 'Parking', 'TV', 'Gym', 'Security System'
  ];

  const toggleAmenity = (amenity: string) => {
    setPropertyData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Ensure price is a number
      const updatedProperty = {
        ...propertyData,
        price: typeof propertyData.price === 'string' ? parseFloat(propertyData.price) : propertyData.price
      };

      const success = await propertyService.editProperty(updatedProperty);
      
      if (success) {
        toast.success('Property updated successfully!');
        onPropertyUpdated();
        onClose();
      } else {
        toast.error('Failed to update property');
      }
    } catch (error) {
      console.error('Failed to update property:', error);
      toast.error('Failed to update property. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Property</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title & Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Property Title</label>
            <Input 
              value={propertyData.title} 
              onChange={(e) => setPropertyData(p => ({ ...p, title: e.target.value }))} 
              required 
              className="rounded-md" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              value={propertyData.description} 
              onChange={(e) => setPropertyData(p => ({ ...p, description: e.target.value }))} 
              className="rounded-md" 
            />
          </div>

          {/* Type & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Property Type</label>
              <select
                value={propertyData.type}
                onChange={(e) => setPropertyData(p => ({ ...p, type: e.target.value }))}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="" disabled>Select type...</option>
                {propertyTypes.map(pt => (
                  <option key={pt.id} value={pt.id}>{pt.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Rent (USD)</label>
              <Input 
                type="number" 
                value={typeof propertyData.price === 'number' ? propertyData.price : ''} 
                onChange={(e) => setPropertyData(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))} 
                required 
                className="rounded-md" 
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input 
              value={propertyData.address} 
              onChange={(e) => setPropertyData(p => ({ ...p, address: e.target.value }))} 
              required 
              className="rounded-md" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input 
                value={propertyData.city} 
                onChange={(e) => setPropertyData(p => ({ ...p, city: e.target.value }))} 
                required 
                className="rounded-md" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Input 
                value={propertyData.country} 
                onChange={(e) => setPropertyData(p => ({ ...p, country: e.target.value }))} 
                required 
                className="rounded-md" 
              />
            </div>
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Owner Name</label>
              <Input 
                value={propertyData.ownerName} 
                onChange={(e) => setPropertyData(p => ({ ...p, ownerName: e.target.value }))} 
                className="rounded-md" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Owner Phone</label>
              <Input 
                value={propertyData.ownerPhoneNumber} 
                onChange={(e) => setPropertyData(p => ({ ...p, ownerPhoneNumber: e.target.value }))} 
                className="rounded-md" 
              />
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Available From</label>
              <Input 
                type="date" 
                value={propertyData.availableFrom} 
                onChange={(e) => setPropertyData(p => ({ ...p, availableFrom: e.target.value }))} 
                className="rounded-md p-2 border dark:bg-gray-800 dark:border-gray-700" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Available To</label>
              <Input 
                type="date" 
                value={propertyData.availableTo} 
                onChange={(e) => setPropertyData(p => ({ ...p, availableTo: e.target.value }))} 
                className="rounded-md p-2 border dark:bg-gray-800 dark:border-gray-700" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Guests</label>
              <Input 
                type="number" 
                value={propertyData.maxGuests} 
                onChange={(e) => setPropertyData(p => ({ ...p, maxGuests: e.target.value }))} 
                className="rounded-md" 
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenityOptions.map(amenity => (
                <label key={amenity} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={propertyData.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <div className="flex gap-4 items-center">
              <Input 
                value={propertyData.image} 
                onChange={(e) => setPropertyData(p => ({ ...p, image: e.target.value }))} 
                className="rounded-md flex-1" 
                placeholder="Enter image URL or leave empty"
              />
              {propertyData.image ? (
                <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img 
                    src={propertyData.image} 
                    alt="Property preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Hide the broken image
                      e.currentTarget.style.display = 'none';
                      // Show parent div with background color
                      e.currentTarget.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
                        <span>${propertyData.title.charAt(0)}</span>
                      </div>`;
                    }}
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">{propertyData.title.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-md">Cancel</Button>
            <Button type="submit" className="flex-1 rounded-md">Update Property</Button>
          </div>
        </form>
      </div>
    </div>
  );
};