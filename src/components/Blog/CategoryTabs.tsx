
import React, { useState } from 'react';

export const CategoryTabs = () => {
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'tips', name: 'Tips & Tricks' },
    { id: 'legal', name: 'Legal' },
    { id: 'decor', name: 'Decoration' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'market', name: 'Market Trends' }
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');
  
  return (
    <div className="mb-6">
      <div className="overflow-x-auto scrollbar-hidden pb-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`py-1.5 px-4 rounded-full text-sm transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
