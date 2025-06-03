import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup({
        email,
        username,
        phoneNumber,
        password,
        confirmPassword
      });
      
      if (success) {
        toast.success("Account created successfully!");
        navigate('/signin');
      }
    } catch (error: any) {
      toast.error(error.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md p-6 mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-gradient text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-muted-foreground">Join our community today</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-foreground">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="johndoe"
            className="w-full p-3 rounded-lg border border-input bg-background text-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg border border-input bg-background text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="1234567890"
            className="w-full p-3 rounded-lg border border-input bg-background text-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-input bg-background text-foreground pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-input bg-background text-foreground pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-muted-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-apartment hover:bg-apartment-dark dark:bg-primary dark:hover:bg-primary/90" 
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <span className="mr-2 h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
              Creating Account...
            </span>
          ) : (
            <>
              <UserPlus className="mr-2 h-5 w-5" />
              Create Account
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
