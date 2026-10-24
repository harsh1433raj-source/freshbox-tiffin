import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, ShieldCheck, ArrowRight, UtensilsCrossed, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginUser, user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('Rahul Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [address, setAddress] = useState('Flat 402, Green Glen Heights, Bellandur, Bengaluru');

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(name, phone, email, address);
    navigate('/account');
  };

  const handleQuickProfile = (
    profileName: string,
    profilePhone: string,
    profileEmail: string,
    profileAddress: string
  ) => {
    loginUser(profileName, profilePhone, profileEmail, profileAddress);
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-forest-500 text-white flex items-center justify-center mx-auto shadow-md">
          <UtensilsCrossed className="w-7 h-7 text-warmOrange-300" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-forest-900 font-sans">
          Demo Customer Login
        </h1>
        <p className="text-xs text-charcoal-500">
          Frontend demonstration session. No real passwords or authentication required.
        </p>
      </div>

      {/* Preset 1-Click Profiles */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-charcoal-600">
          1-Click Test Customer Profiles
        </label>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() =>
              handleQuickProfile(
                'Rahul Sharma',
                '+91 98765 43210',
                'rahul.sharma@example.com',
                'Flat 402, Green Glen Heights, Bellandur, Bengaluru'
              )
            }
            className="p-3 rounded-2xl border border-forest-200 bg-forest-50/60 hover:bg-forest-100/80 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-forest-900">Rahul Sharma (Standard Subscriber)</p>
              <p className="text-[11px] text-forest-700">Bellandur, Bengaluru • 2 Active Orders</p>
            </div>
            <ArrowRight className="w-4 h-4 text-forest-600" />
          </button>

          <button
            type="button"
            onClick={() =>
              handleQuickProfile(
                'Priya Iyer',
                '+91 98111 55667',
                'priya.iyer@example.com',
                'Tower 3, Apt 1104, Prestige Lakeside, Varthur, Bengaluru'
              )
            }
            className="p-3 rounded-2xl border border-cream-300 bg-white hover:bg-cream-100 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-charcoal-800">Priya Iyer (Premium Plan Diner)</p>
              <p className="text-[11px] text-charcoal-500">Varthur, Bengaluru • Strict Jain Preference</p>
            </div>
            <ArrowRight className="w-4 h-4 text-charcoal-400" />
          </button>
        </div>
      </div>

      {/* Custom Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-300 shadow-card space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-700 pb-2 border-b border-cream-200">
          Or Enter Custom Details
        </h3>

        <form onSubmit={handleDemoLogin} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full text-sm p-2.5 rounded-xl border border-cream-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full text-sm p-2.5 rounded-xl border border-cream-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm p-2.5 rounded-xl border border-cream-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Default Delivery Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full text-sm p-2.5 rounded-xl border border-cream-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition-colors mt-2"
          >
            Start Demo Session
          </button>
        </form>

        <p className="text-[11px] text-charcoal-400 text-center flex items-center justify-center gap-1 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
          No sensitive data or password storage
        </p>
      </div>
    </div>
  );
};
