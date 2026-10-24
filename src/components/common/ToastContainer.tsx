import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      {toasts.map((toast) => {
        let bgStyle = 'bg-white border-forest-200 text-charcoal-800 shadow-lift';
        let icon = <CheckCircle2 className="w-5 h-5 text-forest-500 shrink-0" />;

        if (toast.type === 'error') {
          bgStyle = 'bg-red-50 border-red-200 text-red-900 shadow-lift';
          icon = <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-amber-50 border-amber-200 text-amber-900 shadow-lift';
          icon = <AlertTriangle className="w-5 h-5 text-warmOrange-500 shrink-0" />;
        } else if (toast.type === 'info') {
          bgStyle = 'bg-sky-50 border-sky-200 text-sky-900 shadow-lift';
          icon = <Info className="w-5 h-5 text-sky-500 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${bgStyle} animate-in slide-in-from-right-4 fade-in duration-200 transition-all`}
          >
            {icon}
            <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal-400 hover:text-charcoal-700 p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
