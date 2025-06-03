
import React from 'react';
import { Calendar } from 'lucide-react';

export const BlogHero = () => {
  return (
    <div className="relative rounded-xl overflow-hidden mb-6">
      <img 
        src="https://picsum.photos/id/1067/1200/600" 
        alt="Featured Blog Post"
        className="w-full h-64 object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 p-6 flex flex-col justify-end">
        <div className="text-white">
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="bg-primary/80 px-2 py-0.5 rounded-full">Featured</span>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              May 15, 2024
            </div>
          </div>
          
          <h2 className="text-xl font-bold">
            10 Tips for Finding Your Perfect Apartment in a Competitive Market
          </h2>
          
          <p className="text-white/80 mt-2 text-sm line-clamp-2">
            Learn expert strategies to help you secure your dream apartment even in the most competitive rental markets.
          </p>
        </div>
      </div>
    </div>
  );
};
