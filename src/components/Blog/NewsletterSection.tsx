
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Mail } from 'lucide-react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only functionality
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setEmail('');
  };
  
  return (
    <div className="rounded-xl p-6 bg-apartment text-white mb-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-white/20">
          <Mail className="h-6 w-6" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">
            Subscribe to our Newsletter
          </h3>
          <p className="text-sm text-white/80 mb-4">
            Get the latest apartment listings and real estate tips delivered to your inbox.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white/20 p-3 rounded-lg text-center animate-fade-in">
              <p className="text-white font-medium">Thank you for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 py-2 px-3 rounded-lg text-foreground bg-white border-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="secondary">
                  Subscribe
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
