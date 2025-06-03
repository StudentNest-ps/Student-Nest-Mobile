
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
}

const StatCard = ({ title, value, icon, change }: StatCardProps) => {
  return (
    <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
          {change && (
            <p className={`text-xs mt-1 ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
              {change.positive ? '↑' : '↓'} {change.value}
            </p>
          )}
        </div>
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export const DashboardStats = () => {
  const stats = [
    { 
      title: 'Total Properties', 
      value: '24', 
      icon: '🏘️',
      change: { value: '12% this month', positive: true } 
    },
    { 
      title: 'Active Listings', 
      value: '18', 
      icon: '✓',
      change: { value: '3 new this week', positive: true } 
    },
    { 
      title: 'Vacancy Rate', 
      value: '5.2%', 
      icon: '📊',
      change: { value: '1.3% last month', positive: false } 
    },
    { 
      title: 'Total Users', 
      value: '251', 
      icon: '👥',
      change: { value: '24 new signups', positive: true } 
    },
  ];
  
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <StatCard 
          key={index}
          title={stat.title}
          value={stat.value}
          icon={<span className="text-lg">{stat.icon}</span>}
          change={stat.change}
        />
      ))}
    </div>
  );
};
