
import React from 'react';
import { X, User, Calendar, Tag } from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

interface BlogArticleModalProps {
  article: BlogArticle;
  onClose: () => void;
}

export const BlogArticleModal = ({ article, onClose }: BlogArticleModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-lg border border-border animate-fade-in max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-56 object-cover rounded-t-xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-white/70 dark:bg-black/70 p-1 rounded-full"
          >
            <X className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
        </div>
        
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {article.title}
          </h2>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>{article.category}</span>
            </div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            {article.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4 text-gray-600 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
