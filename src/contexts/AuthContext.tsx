import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import { authService } from "../services/auth.service";
import { toast } from "sonner";
import {
  notificationService,
  Notification,
} from "../services/notification.service";

interface User {
  id: string;
  name?: string;
  email?: string;
  role: "student" | "owner" | "admin";
}

interface SignUpData {
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  apartmentId: string;
  apartmentName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface Apartment {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  description?: string;
  ownerId: string;
  ownerName: string;
  hasWifi?: boolean;
  hasParking?: boolean;
}

interface Booking {
  id: string;
  apartmentId: string;
  apartmentName: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  moveInDate: string;
  moveOutDate: string;
  totalPrice: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

interface LoginResult {
  success: boolean;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  signup: (data: SignUpData) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updatedUser: Partial<User>) => void;
  getMessages: (userId: string) => Message[];
  sendMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  markMessageAsRead: (messageId: string) => void;
  getAllUsers: () => User[];
  getOwnerApartments: (ownerId: string) => Apartment[];
  getAllApartments: () => Apartment[];
  getOwnerBookings: (ownerId: string) => Booking[];
  addApartment: (apartment: Omit<Apartment, "id">) => void;
  createBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  markNotificationAsSeen: (notificationId: string) => Promise<void>;
  hasUnreadNotifications: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const isAuthenticated = useMemo(() => user !== null, [user]);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    try {
      const result = await authService.loginUser({ email, password });
      if (result.status) {
        const userData = {
          id: result.data.userId,
          email: email,
          token: result.data.token,
          role: result.data.role as "student" | "owner" | "admin",
        };
        localStorage.setItem("auth-token", userData.token);
        setUser(userData);
        return { success: true, role: result.data.role };
      }
      return { success: false };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false };
    }
  };

  const signup = async (data: SignUpData): Promise<boolean> => {
    try {
      const success = await authService.registerUser(data);
      return success;
    } catch {
      toast.error("Something Went Wrong");
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUserProfile = (updatedUser: Partial<User>) => {
    if (!user) return;
    const newUserData = { ...user, ...updatedUser };
    setUser(newUserData);
  };

  const getMessages = (userId: string): Message[] => {
    console.log("Get messages placeholder");
    return [];
  };

  const sendMessage = (message: Omit<Message, "id" | "timestamp">) => {
    console.log("Send message placeholder");
  };

  const markMessageAsRead = (messageId: string) => {
    console.log("Mark message as read placeholder");
  };

  const getAllUsers = (): User[] => {
    console.log("Get all users placeholder");
    return [];
  };

  const getOwnerApartments = (ownerId: string): Apartment[] => {
    console.log("Get owner apartments placeholder");
    return [];
  };

  const getAllApartments = (): Apartment[] => {
    console.log("Get all apartments placeholder");
    return [];
  };

  const getOwnerBookings = (ownerId: string): Booking[] => {
    console.log("Get owner bookings placeholder");
    return [];
  };

  const addApartment = (apartment: Omit<Apartment, "id">) => {
    console.log("Add apartment placeholder");
  };

  const createBooking = (booking: Omit<Booking, "id" | "createdAt">) => {
    console.log("Create booking placeholder");
  };

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const markNotificationAsSeen = async (notificationId: string) => {
    try {
      const success = await notificationService.markAsSeen(notificationId);
      if (success) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === notificationId
              ? { ...notification, seen: true }
              : notification
          )
        );
      }
    } catch (error) {
      console.error("Failed to mark notification as seen:", error);
    }
  };

  const hasUnreadNotifications = useMemo(() => {
    return notifications.some((notification) => !notification.seen);
  }, [notifications]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUserProfile,
    getMessages,
    sendMessage,
    markMessageAsRead,
    getAllUsers,
    getOwnerApartments,
    getAllApartments,
    getOwnerBookings,
    addApartment,
    createBooking,
    notifications,
    fetchNotifications,
    markNotificationAsSeen,
    hasUnreadNotifications,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
