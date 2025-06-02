import api from './api';

export interface Property {
  _id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  image: string;
  ownerId: string;
  // Add other property fields as needed
}

class OwnerService {
  private baseUrl = '/owner';

  // Get count of properties
  async getPropertiesCount(): Promise<{ count: number }> {
    try {
      const response = await api.get(`${this.baseUrl}/properties/count`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all properties for the owner
  async getMyProperties(): Promise<Property[]> {
    try {
      const ownerId = this.getOwnerId();
      const response = await api.get(`${this.baseUrl}/${ownerId}/properties`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add a new property
  async addProperty(propertyData: Omit<Property, '_id' | 'ownerId'>): Promise<Property> {
    try {
      const ownerId = this.getOwnerId();
      const response = await api.post(
        `${this.baseUrl}/${ownerId}/properties`,
        propertyData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Edit a property
  async updateProperty(propertyId: string, propertyData: Partial<Property>): Promise<Property> {
    try {
      const ownerId = this.getOwnerId();
      const response = await api.put(
        `${this.baseUrl}/${ownerId}/properties/${propertyId}`,
        propertyData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete a property
  async deleteProperty(propertyId: string): Promise<{ message: string }> {
    try {
      const ownerId = this.getOwnerId();
      const response = await api.delete(
        `${this.baseUrl}/${ownerId}/properties/${propertyId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Helper method to get owner ID from auth context
  private getOwnerId(): string {
    // Get the token from localStorage
    const token = localStorage.getItem('auth-token');
    if (!token) {
      throw new Error('Not authenticated. Please log in.');
    }

    // Get the user from your auth context or localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Log the user data for debugging
    console.log('Current user:', user);

    // Check if we have the correct user ID
    if (!user._id) { // Note: Changed from user.id to user._id as MongoDB uses _id
      throw new Error('User ID not found. Please log in again.');
    }

    return user._id; // Return the MongoDB _id
  }

  // Error handling helper
  private handleError(error: any): Error {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data.message || 'An error occurred';
      if (error.response.status === 403) {
        throw new Error('You do not have permission to perform this action');
      } else if (error.response.status === 404) {
        throw new Error('Property not found');
      }
      throw new Error(message);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up request');
    }
  }
}

export const ownerService = new OwnerService(); 