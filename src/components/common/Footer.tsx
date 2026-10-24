import React from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-900 text-cream-200 pt-16 pb-12 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-800/80">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warmOrange-500 flex items-center justify-center text-forest-900 shadow-md">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Fresh<span className="text-warmOrange-400">Box</span> Tiffin
              </span>
            </Link>
            <p className="text-forest-200 text-sm leading-relaxed max-w-sm">
              "Ghar Jaisa Khana, Ab Aapke Darwaze Par." We deliver freshly prepared, wholesome Indian home-cooked meals, flexible monthly tiffin subscriptions, and pure drinking water right to your doorstep.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-forest-800/80 border border-forest-700/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Kitchen Open & Delivering
              </div>
              <div className="flex items-center gap-1.5 bg-forest-800/80 border border-forest-700/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-warmOrange-300">
                <Sparkles className="w-3.5 h-3.5 text-warmOrange-400" />
                100% Pure Veg Kitchen
              </div>
            </div>
          </div>

          {/* Column 2: Order & Menus */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-sans">
              Order Food
            </h4>
            <ul className="space-y-2.5 text-sm text-forest-200">
              <li>
                <Link to="/menu" className="hover:text-warmOrange-300 transition-colors">
                  Daily Menu
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Lunch" className="hover:text-warmOrange-300 transition-colors">
                  Veg Tiffin Combos
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Extra Items" className="hover:text-warmOrange-300 transition-colors">
                  Extra Roti, Salad & Curd
                </Link>
              </li>
              <li>
                <Link to="/water" className="hover:text-warmOrange-300 transition-colors">
                  20L Water Jars & Bottles
                </Link>
              </li>
              <li>
                <Link to="/subscriptions" className="hover:text-warmOrange-300 transition-colors">
                  Monthly Meal Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Tracking */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-sans">
              Customer Help
            </h4>
            <ul className="space-y-2.5 text-sm text-forest-200">
              <li>
                <Link to="/track-order" className="hover:text-warmOrange-300 transition-colors">
                  Track Live Order
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-warmOrange-300 transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-warmOrange-300 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-warmOrange-300 transition-colors">
                  My Subscriptions & Address
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-warmOrange-300 transition-colors">
                  Contact & FAQs
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-warmOrange-300 text-warmOrange-400 font-bold transition-colors">
                  Admin Demo Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kitchen Timings & Support */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-sans">
              Delivery Hours
            </h4>
            <div className="space-y-2 text-xs text-forest-200">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-warmOrange-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Breakfast</p>
                  <p>07:30 AM – 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-warmOrange-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Lunch</p>
                  <p>12:00 PM – 02:45 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-warmOrange-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Dinner</p>
                  <p>07:15 PM – 10:15 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-forest-800">
              <a
                href="#demo-whatsapp"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Demo WhatsApp Action: Direct support line would connect to +91 98765 43210');
                }}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp (Demo)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-forest-300 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} FreshBox Tiffin Inc. Crafted with care for home-food lovers across India.
          </p>
          <div className="inline-flex items-center gap-2 bg-forest-800/90 border border-forest-700/80 px-3 py-1.5 rounded-full text-warmOrange-300 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-warmOrange-400" />
            <span>Frontend-Only Demo • No real payment gateway • LocalStorage state</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
