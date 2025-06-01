export interface IRegisterUser {
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'landlord' | 'admin';
}

export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
  role: string;
  userId: string;
}

export enum Role {
  ADMIN = 'admin',
  OWNER = 'owner',
  STUDENT = 'student',
}
