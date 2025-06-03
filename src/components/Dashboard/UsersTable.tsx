
import React from 'react';
import { Button } from '../ui/button';
import { Trash2, User } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedDate: string;
}

export const UsersTable = () => {
  // Sample users data (frontend only)
  const users: UserData[] = [
    { 
      id: '1', 
      name: 'John Smith', 
      email: 'john@example.com', 
      role: 'Admin', 
      joinedDate: 'Aug 12, 2023' 
    },
    { 
      id: '2', 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com', 
      role: 'Property Manager', 
      joinedDate: 'Oct 5, 2023' 
    },
    { 
      id: '3', 
      name: 'Michael Brown', 
      email: 'michael@example.com', 
      role: 'Owner', 
      joinedDate: 'Jan 18, 2024' 
    },
    { 
      id: '4', 
      name: 'Emily Davis', 
      email: 'emily@example.com', 
      role: 'User', 
      joinedDate: 'Mar 22, 2024' 
    },
  ];
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-primary/10 text-primary';
      case 'Property Manager': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Owner': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };
  
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-medium">Users</h3>
      </div>
      
      <div className="overflow-x-auto">
        {users.map((user) => (
          <div 
            key={user.id}
            className="p-4 border-b last:border-0 border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-0">
              <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadge(user.role)}`}>
                {user.role}
              </span>
              <span className="text-xs text-muted-foreground">
                Joined {user.joinedDate}
              </span>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive ml-auto sm:ml-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
