export interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
}

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

export type IRegisterUser = {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string
}
