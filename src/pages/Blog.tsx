
import React, { useState } from 'react';
import { MobileLayout } from '../components/Layout/MobileLayout';
import { BlogArticleModal } from '../components/Blog/BlogArticleModal';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

const BlogPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  
  const articles: BlogArticle[] = [
    {
      id: '1',
      title: 'Guide to Student Housing Options',
      excerpt: 'Explore the best housing options for students on a budget.',
      content: 'Finding affordable and comfortable housing as a student can be challenging. This guide will help you navigate the various options available to you.\n\nWhen looking for student housing, consider factors like proximity to campus, rental costs, utilities, transportation options, and neighborhood safety. Many universities offer on-campus dormitories which provide convenience and community, but they may come with restrictions and higher costs.\n\nOff-campus apartments or shared houses often provide more freedom and potentially lower costs when split between roommates. Co-op housing is another option where students share responsibilities and costs in a community living arrangement.\n\nSome students opt for homestays with local families, which can provide a supportive environment and sometimes include meals. Others look into purpose-built student accommodation managed by private companies.\n\nWhatever option you choose, start your search early, understand your lease terms completely, and consider your personal preferences and lifestyle needs. With careful planning, you can find housing that enhances your academic experience without breaking your budget.',
      author: 'Emma Rodriguez',
      date: 'June 12, 2023',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Housing'
    },
    {
      id: '2',
      title: '5 Ways to Decorate Your Apartment on a Budget',
      excerpt: 'Simple and affordable ideas to make your apartment feel like home.',
      content: "Transforming your apartment into a comfortable and stylish home doesn't have to be expensive. Here are five budget-friendly ways to decorate your space.\n\n1. Thrift Store Finds: Second-hand stores, flea markets, and online marketplaces can be treasure troves for unique décor items, furniture, and artwork at fraction of retail prices. Don't be afraid to DIY and refinish or repurpose items to fit your style.\n\n2. Plants: Indoor plants add life, color, and improved air quality to your space. Many varieties are inexpensive and low-maintenance. If you don't have a green thumb, consider realistic artificial plants.\n\n3. Removable Wallpaper and Decals: These temporary solutions can dramatically transform walls without damaging them or losing your security deposit. They come in countless designs to match any aesthetic.\n\n4. Strategic Lighting: Lighting significantly impacts ambiance. Replace harsh overhead lighting with softer lamps, string lights, or candles to create a cozy atmosphere.\n\n5. Textiles: Affordable pillows, throws, curtains, and rugs can add color, pattern, and texture to your space while making it more comfortable.\n\nRemember, decorating doesn't have to happen all at once. Take your time to collect pieces you love, and your apartment will gradually become a reflection of your personality and style.",
      author: 'Marcus Chen',
      date: 'July 22, 2023',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Decor'
    },
    {
      id: '3',
      title: 'Understanding Your Tenant Rights',
      excerpt: 'What every student renter should know about their legal rights.',
      content: "As a student tenant, understanding your legal rights can help you avoid exploitation and resolve conflicts with landlords effectively.\n\nFirst, familiarize yourself with tenant laws in your specific location, as they vary by country, state, and even city. However, some rights are generally universal:\n\n• Right to habitable housing: Your landlord must provide housing that meets basic structural, health, and safety standards, including functioning plumbing, heating, electricity, and clean common areas.\n\n• Right to privacy: Landlords typically must give advance notice (often 24-48 hours) before entering your apartment, except in emergencies.\n\n• Security deposit protections: Most regions have laws governing how much can be charged, where the deposit must be held, and when it must be returned.\n\n• Protection against discrimination: Fair housing laws prohibit discrimination based on race, color, national origin, religion, sex, familial status, or disability.\n\n• Right to repairs: Landlords are generally required to maintain the property and make timely repairs.\n\n• Eviction protection: Landlords must follow legal procedures for eviction and cannot engage in \"self-help\" evictions like changing locks or removing belongings.\n\nDocument everything in writing, including repair requests and communications with your landlord. Join or form a tenants' association for collective advocacy if needed, and don't hesitate to seek legal aid if your rights are violated. Many universities offer free legal services for students facing housing issues.",
      author: 'Priya Sharma',
      date: 'August 5, 2023',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'Legal'
    },
  ];
  
  return (
    <MobileLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Student Living Blog</h1>
        <p className="text-muted-foreground">
          Tips, guides, and insights for student apartment living.
        </p>
        
        <div className="space-y-4">
          {articles.map((article) => (
            <div 
              key={article.id}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-sm cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-full">
                  {article.category}
                </span>
                
                <h2 className="font-bold mt-2">{article.title}</h2>
                <p className="text-muted-foreground text-sm mt-1">{article.excerpt}</p>
                
                <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedArticle && (
        <BlogArticleModal 
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </MobileLayout>
  );
};

export default BlogPage;
