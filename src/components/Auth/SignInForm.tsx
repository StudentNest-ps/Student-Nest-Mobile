import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('Signed in successfully!');
        // Navigate based on the role returned from the server
        if (result.role === 'owner') {
          navigate('/owner-dashboard');
        } else if (result.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error: any) {
      toast.error(error.message || "Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md p-6 mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-gradient text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to access your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <button type="button" className="text-sm text-primary hover:underline">
              Forgot password?
            </button>
          </div>
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
        
        <Button 
          type="submit" 
          className="w-full bg-apartment hover:bg-apartment-dark dark:bg-primary dark:hover:bg-primary/90" 
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <span className="mr-2 h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
              Signing in...
            </span>
          ) : (
            <>
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
