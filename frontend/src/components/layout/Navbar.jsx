import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 bg-background/50 backdrop-blur-md border-b border-card-border flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search employees, documents..."
          className="w-full bg-sidebar/50 border border-card-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-all"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-muted hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-background"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-4 border-l border-card-border">
          <div className="text-right">
            <p className="text-sm font-medium">Kedari Anegondi</p>
            <p className="text-xs text-muted">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
            KA
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
