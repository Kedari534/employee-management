import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Settings, 
  ChevronLeft, 
  LogOut,
  UserPlus
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { title: 'Employees', icon: <Users size={20} />, path: '/employees' },
    { title: 'Add Employee', icon: <UserPlus size={20} />, path: '/employees/add' },
    { title: 'Departments', icon: <Building2 size={20} />, path: '/departments' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-card-border transition-all duration-300 flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold text-primary tracking-tight">EMS Pro</h1>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-white/10 rounded-lg text-muted hover:text-white"
        >
          <ChevronLeft className={cn("transition-transform duration-300", collapsed && "rotate-180")} size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "sidebar-item text-muted",
              isActive && "active",
              collapsed && "justify-center px-0"
            )}
          >
            {item.icon}
            {!collapsed && <span className="ml-3 font-medium">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-card-border">
        <button className={cn(
          "sidebar-item text-danger w-full hover:bg-danger/10",
          collapsed && "justify-center px-0"
        )}>
          <LogOut size={20} />
          {!collapsed && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
