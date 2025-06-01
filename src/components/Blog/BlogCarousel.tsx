
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  description: string;
}

export const BlogCarousel = () => {
  // Sample blog posts data (frontend only)
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'How to Negotiate Rent Like a Pro',
      excerpt: 'Learn effective techniques to negotiate rental prices and save money.',
      author: 'Emma Johnson',
      date: 'May 12, 2024',
      image: 'https://picsum.photos/id/619/600/400',
      category: 'Tips & Tricks',
      description: "This article breaks down proven negotiation strategies specifically for rental agreements. You'll learn how to research the local market, identify leverage points, and approach landlords with confidence. Includes sample scripts and timing tips to help you get the best possible deal on your next apartment."
    },
    {
      id: '2',
      title: 'Understanding Rental Agreements: What to Look For',
      excerpt: 'Key points to review in your lease before signing.',
      author: 'Michael Wilson',
      date: 'May 8, 2024',
      image: 'https://picsum.photos/id/48/600/400',
      category: 'Legal',
      description: "Don't get caught by surprise with hidden terms in your lease agreement. This comprehensive guide walks you through the most important clauses to review, potential red flags, and questions to ask before signing. Includes a printable checklist to bring with you to your next apartment viewing."
    },
    {
      id: '3',
      title: '5 Apartment Decorating Ideas on a Budget',
      excerpt: 'Transform your space without breaking the bank.',
      author: 'Sophia Garcia',
      date: 'May 5, 2024',
      image: 'https://picsum.photos/id/3/600/400',
      category: 'Decoration',
      description: "You don't need a huge budget to create a stylish living space. This article showcases five affordable decorating approaches that can transform any apartment. From strategic thrift shopping to DIY wall art and clever IKEA hacks, you'll find inspiration for creating a personalized home that reflects your style without emptying your wallet."
    },
    {
      id: '4',
      title: 'Roommate Etiquette: Setting Boundaries',
      excerpt: 'How to live harmoniously with roommates.',
      author: 'David Chen',
      date: 'May 1, 2024',
      image: 'https://picsum.photos/id/342/600/400',
      category: 'Lifestyle',
      description: 'Living with roommates can be challenging, but establishing clear boundaries early on can prevent most common conflicts. This practical guide covers everything from setting up a fair chore schedule to handling guests, quiet hours, and shared expenses. Learn how to have those difficult conversations in a way that maintains positive relationships.'
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <div className="mb-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Latest Articles</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full" 
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full" 
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {posts.map((post) => (
            <div 
              key={post.id}
              className="min-w-full px-0.5"
            >
              <div className="rounded-xl overflow-hidden border border-border bg-card">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-bold line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm text-foreground line-clamp-4">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center gap-2">
        {posts.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-4 bg-apartment dark:bg-primary' : 'w-2 bg-muted'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
