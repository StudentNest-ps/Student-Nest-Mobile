import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect
} from "react";
import { authService } from "../services/auth.service";
import { toast } from "sonner";

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

  // Load user from localStorage on mount
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

  // Update localStorage whenever user changes
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
          role: result.data.role as "student" | "owner" | "admin"
        };
        localStorage.setItem("auth-token", userData.token);
        setUser(userData); // will trigger the useEffect to save to localStorage
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
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUserProfile = (updatedUser: Partial<User>) => {
    if (!user) return;

    // TODO: Replace with your database API call
    // fetch('/api/users/update', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedUser)
    // });

    const newUserData = { ...user, ...updatedUser };
    setUser(newUserData);
  };

  const getMessages = (userId: string): Message[] => {
    // TODO: Replace with your database API call
    // const response = await fetch(`/api/messages/${userId}`);
    // return await response.json();

    console.log("Get messages placeholder - connect to your database API");
    return [];
  };

  const sendMessage = (message: Omit<Message, "id" | "timestamp">) => {
    // TODO: Replace with your database API call
    // fetch('/api/messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(message)
    // });

    console.log("Send message placeholder - connect to your database API");
  };

  const markMessageAsRead = (messageId: string) => {
    // TODO: Replace with your database API call
    // fetch(`/api/messages/${messageId}/read`, {
    //   method: 'PUT'
    // });

    console.log(
      "Mark message as read placeholder - connect to your database API"
    );
  };

  const getAllUsers = (): User[] => {
    // TODO: Replace with your database API call
    // const response = await fetch('/api/users');
    // return await response.json();

    console.log("Get all users placeholder - connect to your database API");
    return [];
  };

  const getOwnerApartments = (ownerId: string): Apartment[] => {
    // TODO: Replace with your database API call
    // const response = await fetch(`/api/apartments/owner/${ownerId}`);
    // return await response.json();

    console.log(
      "Get owner apartments placeholder - connect to your database API"
    );
    return [];
  };

  const getAllApartments = (): Apartment[] => {
    // TODO: Replace with your database API call
    // const response = await fetch('/api/apartments');
    // return await response.json();

    console.log(
      "Get all apartments placeholder - connect to your database API"
    );
    return [];
  };

  const getOwnerBookings = (ownerId: string): Booking[] => {
    // TODO: Replace with your database API call
    // const response = await fetch(`/api/bookings/owner/${ownerId}`);
    // return await response.json();

    console.log(
      "Get owner bookings placeholder - connect to your database API"
    );
    return [];
  };

  const addApartment = (apartment: Omit<Apartment, "id">) => {
    // TODO: Replace with your database API call
    // fetch('/api/apartments', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(apartment)
    // });

    console.log("Add apartment placeholder - connect to your database API");
  };

  const createBooking = (booking: Omit<Booking, "id" | "createdAt">) => {
    // TODO: Replace with your database API call
    // fetch('/api/bookings', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(booking)
    // });

    console.log("Create booking placeholder - connect to your database API");
  };

  const value = {
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
    createBooking
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
