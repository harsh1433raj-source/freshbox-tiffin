import React from 'react';
import { AlertCircle, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-forest-900 text-cream-200 text-[11px] sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 shadow-sm border-b border-forest-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-center">
          <span className="inline-flex items-center gap-1 bg-forest-700/80 text-warmOrange-300 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide border border-forest-600">
            <Sparkles className="w-3 h-3 text-warmOrange-400 animate-pulse" />
            FRESH TODAY
          </span>
          <span className="hidden md:inline text-forest-200">|</span>
          <span className="font-medium text-cream-100 text-[11px] sm:text-xs md:text-sm">
            Ghar Jaisa Khana, Ab Aapke Darwaze Par.
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-300 font-normal text-[10px] sm:text-xs bg-forest-800/60 px-2 py-0.5 rounded">
            <Clock className="w-3 h-3 text-emerald-400" /> 30-Min Express
          </span>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-2 text-[10px] sm:text-xs">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-warmOrange-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-medium">
            <AlertCircle className="w-3 h-3 text-warmOrange-400 shrink-0" />
            Demo Mode (Simulated)
          </span>
          <Link
            to="/admin"
            className="text-forest-200 hover:text-white underline underline-offset-2 transition-colors font-semibold"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
};
