import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  UtensilsCrossed,
  Droplets,
  Bike,
  ShoppingBag,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { cartTotals } = useApp();

  const links = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Menu', path: '/menu', icon: UtensilsCrossed },
    { label: 'Water', path: '/water', icon: Droplets },
    { label: 'Track', path: '/track-order', icon: Bike },
    {
      label: 'Cart',
      path: '/cart',
      icon: ShoppingBag,
      badge: cartTotals.itemCount > 0 ? cartTotals.itemCount : undefined
    },
    { label: 'Account', path: '/account', icon: User }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-cream-300 shadow-2xl safe-area-pb">
      <nav className="max-w-md mx-auto grid grid-cols-6 items-center h-16 px-1">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 transition-all relative ${
                  isActive
                    ? 'text-forest-600 font-extrabold scale-105'
                    : 'text-charcoal-500 hover:text-forest-600 font-medium'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-warmOrange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
