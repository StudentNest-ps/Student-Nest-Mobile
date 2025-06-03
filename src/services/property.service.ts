import api from './api';

export interface Property {
  _id?: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'studio' | string;
  price: number;
  address: string;
  ownerName: string;
  ownerPhoneNumber: string;
  amenities: string[];
  image: string;
  country: string;
  city: string;
  availableFrom: string;
  availableTo: string;
  maxGuests: string;
}

class PropertyService {
  async getPropertyById(propertyId: string) {
    const response = await api.get(`/properties/${propertyId}`);
    return response.data as Property;
  }

  async addProperty(property: Property) {
    const ownerId = localStorage.getItem('user-id');
    const response = await api.post(`/owner/${ownerId}/properties`, property);
    return response.status === 201;
  }

  async editProperty(property: Property) {
    const ownerId = localStorage.getItem('user-id');
    const response = await api.put(
      `/owner/${ownerId}/properties/${property._id}`,
      property
    );
    return response.status === 200;
  }

  async deleteProperty(propertyId: string) {
    const ownerId = localStorage.getItem('user-id');
    const response = await api.delete(
      `/owner/${ownerId}/properties/${propertyId}`
    );
    return response.status === 200;
  }

  async getPropertiesByOwnerId() {
    const ownerId = localStorage.getItem('user-id');
    const response = await api.get(`/owner/${ownerId}/properties`);
    return response.data as Property[];
  }
}

export const propertyService = new PropertyService(); 