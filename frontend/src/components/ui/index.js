import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children }) => (
  <div className={cn("glass-card overflow-hidden", className)}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={cn("px-6 py-4 border-b border-card-border", className)}>
    {children}
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={cn("text-lg font-semibold text-white", className)}>
    {children}
  </h3>
);

export const CardContent = ({ className, children }) => (
  <div className={cn("px-6 py-4", className)}>
    {children}
  </div>
);

export const Button = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
    secondary: "bg-sidebar border border-card-border text-white hover:bg-white/10",
    danger: "bg-danger text-white hover:bg-danger/90 shadow-lg shadow-danger/20",
    ghost: "bg-transparent text-muted hover:text-white hover:bg-white/5",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge = ({ className, variant = 'default', children }) => {
  const variants = {
    default: "bg-sidebar border border-card-border text-muted",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    danger: "bg-danger/10 text-danger border border-danger/20",
    info: "bg-primary/10 text-primary border border-primary/20",
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider", variants[variant], className)}>
      {children}
    </span>
  );
};
