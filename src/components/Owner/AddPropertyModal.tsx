import React, { useState } from 'react';
import { X} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import { Textarea } from '../UI/textarea';
import { ownerService } from '@/services/owner.service';

interface AddPropertyModalProps {
  onClose: () => void;
}

export const AddPropertyModal = ({ onClose }: AddPropertyModalProps) => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    type: '',
    price: '', // Changed from rent, will be string from input, convert to number on submit
    address: '',
    city: '',
    country: '',
    ownerName: '', // Changed from owner
    ownerPhoneNumber: '', // Changed from phone
    availableFrom: '',
    availableTo: '',
    maxGuests: 0, // Changed from guests
    amenities: [] as string[], // Explicitly string[]
    images: [] as File[] // For collecting File objects from input
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const maxSize = 10 * 1024 * 1024;

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

    // Construct the payload according to the Property interface
    const newPropertyPayload = {
      title: propertyData.title,
      description: propertyData.description,
      type: propertyData.type,
      price: parseFloat(propertyData.price) || 0, // Convert string to number
      address: propertyData.address,
      city: propertyData.city,
      country: propertyData.country,
      ownerName: propertyData.ownerName,
      ownerPhoneNumber: propertyData.ownerPhoneNumber,
      availableFrom: propertyData.availableFrom,
      availableTo: propertyData.availableTo,
      maxGuests: Number(propertyData.maxGuests),
      amenities: propertyData.amenities,
      // Handle image: For now, using the first image's name or an empty string.
      // In a real app, upload images and get URLs.
      // Use a proper URL for the image or empty string
      image: propertyData.images.length > 0 
        ? URL.createObjectURL(propertyData.images[0]) // Create a temporary URL for preview
        : '', // Empty string if no image
      // IMPORTANT: Replace this with the actual ID of the logged-in owner
      ownerId: 'REPLACE_WITH_ACTUAL_OWNER_ID', 
    };

    console.log('Submitting property data:', newPropertyPayload);

    // TODO: Call your actual service to add the property, e.g.:
    try {
      const response = await ownerService.addProperty(newPropertyPayload);
      toast.success('Property added successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to add property:', error);
      toast.error('Failed to add property. Please try again.');
    }

    // For now, simulating success as the original code did:
    toast.success('Property (simulated) added successfully!');
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
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title & Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Property Title</label>
            <Input value={propertyData.title} onChange={(e) => setPropertyData(p => ({ ...p, title: e.target.value }))} required className="rounded-md" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea value={propertyData.description} onChange={(e) => setPropertyData(p => ({ ...p, description: e.target.value }))} className="rounded-md" />
          </div>

          {/* Type & Rent */}
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
              <Input type="number" value={propertyData.price} onChange={(e) => setPropertyData(p => ({ ...p, price: e.target.value }))} required className="rounded-md" />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input value={propertyData.address} onChange={(e) => setPropertyData(p => ({ ...p, address: e.target.value }))} required className="rounded-md" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input value={propertyData.city} onChange={(e) => setPropertyData(p => ({ ...p, city: e.target.value }))} required className="rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Input value={propertyData.country} onChange={(e) => setPropertyData(p => ({ ...p, country: e.target.value }))} required className="rounded-md" />
            </div>
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Owner Name</label>
              <Input value={propertyData.ownerName} onChange={(e) => setPropertyData(p => ({ ...p, ownerName: e.target.value }))} className="rounded-md" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Owner Phone</label>
              <Input value={propertyData.ownerPhoneNumber} onChange={(e) => setPropertyData(p => ({ ...p, ownerPhoneNumber: e.target.value }))} className="rounded-md" />
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Available From</label>
              <Input type="date" value={propertyData.availableFrom} onChange={(e) => setPropertyData(p => ({ ...p, availableFrom: e.target.value }))} className="rounded-md p-2 border dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Available To</label>
              <Input type="date" value={propertyData.availableTo} onChange={(e) => setPropertyData(p => ({ ...p, availableTo: e.target.value }))} className="rounded-md p-2 border dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Guests</label>
              <Input type="number" value={propertyData.maxGuests} onChange={(e) => setPropertyData(p => ({ ...p, maxGuests: parseInt(e.target.value, 10) || 0 }))} className="rounded-md" />
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

          {/* Upload Images */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Property Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-gray-700 dark:file:text-gray-200 dark:hover:file:bg-gray-600 p-2 border rounded-md dark:border-gray-700" />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-md">Cancel</Button>
            <Button type="submit" className="flex-1 rounded-md">Create Property</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
