import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'sonner';

// Import pages
import Home from './pages/Home';
import Apartments from './pages/Apartments';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import BookingConfirmation from './pages/BookingConfirmation';
import OwnerDashboard from './pages/OwnerDashboard';
import Bookings from './pages/Bookings';
import PaymentSuccess from './pages/PaymentSuccess';
import Chat from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-center" richColors closeButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/booking/:id" element={<BookingConfirmation />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
