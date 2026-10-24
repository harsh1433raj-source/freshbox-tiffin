import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Menu as MenuIcon,
  X,
  Compass,
  UtensilsCrossed,
  CalendarCheck2,
  Droplets,
  Clock,
  Star,
  Phone,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartTotals, user } = useApp();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Daily Menu', path: '/menu' },
    { label: 'Monthly Plans', path: '/subscriptions' },
    { label: 'Water Store', path: '/water' },
    { label: 'Track Order', path: '/track-order' },
    { label: 'My Orders', path: '/orders' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-300 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none min-w-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-forest-500 flex items-center justify-center text-white shadow-md shadow-forest-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 text-warmOrange-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-forest-700 font-sans truncate">
                  Fresh<span className="text-warmOrange-500">Box</span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-forest-50 text-forest-600 px-1.5 py-0.2 sm:py-0.5 rounded border border-forest-200 shrink-0">
                  Tiffin
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-charcoal-500 font-medium tracking-wide truncate">
                Ghar Jaisa Khana • Daily & Subscriptions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-forest-50 text-forest-600 font-bold shadow-xs'
                      : 'text-charcoal-700 hover:text-forest-600 hover:bg-cream-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons: Admin, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Badge */}
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 bg-forest-50 hover:bg-forest-100 border border-forest-200 px-3 py-2 rounded-xl transition-colors"
              title="Demo Admin Dashboard"
            >
              <ShieldCheck className="w-4 h-4 text-forest-500" />
              <span>Admin</span>
            </Link>

            {/* Account / User */}
            <Link
              to={user.isLoggedIn ? '/account' : '/login'}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-charcoal-700 hover:text-forest-600 p-2 sm:px-3 sm:py-2 rounded-xl hover:bg-cream-100 transition-colors"
              title={user.isLoggedIn ? `Logged in as ${user.name}` : 'Login to FreshBox'}
            >
              <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center font-bold text-xs">
                {user.isLoggedIn ? user.name.charAt(0) : <User className="w-4 h-4" />}
              </div>
              <span className="hidden md:inline font-medium text-xs">
                {user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => navigate('/cart')}
              className="relative flex items-center gap-2 bg-forest-500 hover:bg-forest-600 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-forest-500/20 active:scale-95 transition-all"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartTotals.itemCount > 0 && (
                <span className="bg-warmOrange-500 text-white text-xs font-extrabold px-1.5 py-0.2 rounded-full min-w-5 h-5 flex items-center justify-center shadow-xs animate-bounce">
                  {cartTotals.itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal-700 hover:text-forest-600 hover:bg-cream-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-300 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <div className="p-3 bg-forest-50 rounded-xl mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-forest-500 text-white flex items-center justify-center font-bold text-sm">
                  {user.isLoggedIn ? user.name.charAt(0) : <User className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal-800">
                    {user.isLoggedIn ? user.name : 'Welcome Guest'}
                  </p>
                  <p className="text-[11px] text-charcoal-500">
                    {user.isLoggedIn ? user.phone : 'Sign in to manage subscriptions & orders'}
                  </p>
                </div>
              </div>
              <Link
                to={user.isLoggedIn ? '/account' : '/login'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold text-forest-600 hover:underline"
              >
                {user.isLoggedIn ? 'Account' : 'Login'}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2">
              <Link
                to="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-cream-100 hover:bg-forest-50 text-charcoal-800 text-xs font-bold"
              >
                <UtensilsCrossed className="w-4 h-4 text-forest-500" />
                <span>Daily Menu</span>
              </Link>
              <Link
                to="/subscriptions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-warmOrange-50 hover:bg-warmOrange-100 text-warmOrange-700 text-xs font-bold"
              >
                <CalendarCheck2 className="w-4 h-4 text-warmOrange-500" />
                <span>Monthly Plans</span>
              </Link>
              <Link
                to="/water"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold"
              >
                <Droplets className="w-4 h-4 text-sky-500" />
                <span>Water Store</span>
              </Link>
              <Link
                to="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold"
              >
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Track Order</span>
              </Link>
            </div>

            <div className="divide-y divide-cream-200 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 text-sm font-semibold text-charcoal-700 hover:text-forest-600 hover:bg-cream-50 rounded-lg transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-charcoal-400" />
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-2 text-sm font-bold text-forest-600 hover:bg-forest-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </div>
                <span className="text-[10px] bg-forest-100 text-forest-700 px-2 py-0.5 rounded font-mono">
                  Demo
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
