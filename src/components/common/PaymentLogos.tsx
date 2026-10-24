import React from 'react';
import { PaymentMethod } from '../../types';
import { Check, ShieldCheck, Banknote } from 'lucide-react';

interface PaymentSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentSelectorProps> = ({
  selectedMethod,
  onSelect,
}) => {
  const paymentOptions: {
    id: PaymentMethod;
    name: string;
    sublabel: string;
    badge?: string;
    color: string;
    logo: React.ReactNode;
  }[] = [
    {
      id: 'UPI',
      name: 'Unified Payments (UPI)',
      sublabel: 'GPay, PhonePe, Paytm, BHIM & Any UPI ID',
      badge: 'Fastest',
      color: 'border-emerald-500 bg-emerald-50/30',
      logo: (
        <div className="w-10 h-8 rounded bg-gradient-to-r from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-[11px] tracking-wider shadow-xs">
          UPI
        </div>
      )
    },
    {
      id: 'Google Pay',
      name: 'Google Pay',
      sublabel: 'Instant 1-Click UPI Payment Simulation',
      badge: 'Popular',
      color: 'border-blue-500 bg-blue-50/30',
      logo: (
        <div className="w-10 h-8 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-xs shadow-xs">
          <span className="text-blue-500 font-black">G</span>
          <span className="text-red-500 font-black">P</span>
          <span className="text-amber-500 font-black">a</span>
          <span className="text-green-500 font-black">y</span>
        </div>
      )
    },
    {
      id: 'PhonePe',
      name: 'PhonePe',
      sublabel: 'Pay via PhonePe Wallet, QR or UPI',
      color: 'border-purple-500 bg-purple-50/30',
      logo: (
        <div className="w-10 h-8 rounded bg-[#5f259f] flex items-center justify-center text-white font-extrabold text-[12px] shadow-xs">
          पे
        </div>
      )
    },
    {
      id: 'Paytm',
      name: 'Paytm UPI & Wallet',
      sublabel: 'Paytm Postpaid / Bank / Wallet',
      color: 'border-sky-500 bg-sky-50/30',
      logo: (
        <div className="w-10 h-8 rounded bg-[#002970] flex items-center justify-center text-[#00b9f5] font-black text-[10px] tracking-tight shadow-xs">
          Paytm
        </div>
      )
    },
    {
      id: 'Razorpay',
      name: 'Razorpay Secure Gateway',
      sublabel: 'Netbanking, Wallets & Simulated Gateway',
      badge: 'Demo Mode',
      color: 'border-indigo-500 bg-indigo-50/30',
      logo: (
        <div className="w-10 h-8 rounded bg-[#0C2340] flex items-center justify-center text-[#3395FF] font-black text-[9px] tracking-wider shadow-xs">
          RZP
        </div>
      )
    },
    {
      id: 'Visa',
      name: 'Visa Debit / Credit Card',
      sublabel: 'Simulated Demo Card Transaction',
      color: 'border-blue-700 bg-blue-50/30',
      logo: (
        <div className="w-10 h-8 rounded bg-[#1A1F71] flex items-center justify-center text-white font-extrabold italic text-[11px] shadow-xs">
          VISA
        </div>
      )
    },
    {
      id: 'Mastercard',
      name: 'Mastercard Debit / Credit',
      sublabel: 'Simulated Demo Card Transaction',
      color: 'border-red-500 bg-red-50/30',
      logo: (
        <div className="w-10 h-8 rounded bg-gray-900 flex items-center justify-center relative overflow-hidden shadow-xs">
          <div className="w-4 h-4 rounded-full bg-red-500 -mr-1"></div>
          <div className="w-4 h-4 rounded-full bg-amber-400 opacity-90"></div>
        </div>
      )
    },
    {
      id: 'Cash on Delivery',
      name: 'Cash on Delivery (COD)',
      sublabel: 'Pay in cash or scan QR when your tiffin arrives',
      badge: 'Zero Prepayment',
      color: 'border-amber-500 bg-amber-50/40',
      logo: (
        <div className="w-10 h-8 rounded bg-forest-700 flex items-center justify-center text-warmOrange-300 shadow-xs">
          <Banknote className="w-5 h-5" />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
        <label className="block text-xs sm:text-sm font-bold text-charcoal-800">
          Select Payment Method (Demo Only)
        </label>
        <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Demo Simulated Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {paymentOptions.map((opt) => {
          const isSelected = selectedMethod === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`cursor-pointer rounded-2xl p-3 sm:p-3.5 border-2 transition-all duration-200 flex items-center justify-between gap-2 ${
                isSelected
                  ? `${opt.color} border-forest-500 shadow-md ring-2 ring-forest-500/20`
                  : 'border-cream-300 bg-white hover:border-cream-400 hover:bg-cream-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="shrink-0">{opt.logo}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-charcoal-800 truncate">
                      {opt.name}
                    </span>
                    {opt.badge && (
                      <span className="text-[9px] sm:text-[10px] bg-forest-100 text-forest-700 font-bold px-1.5 py-0.2 rounded shrink-0">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-charcoal-500 leading-tight line-clamp-1">
                    {opt.sublabel}
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  isSelected
                    ? 'bg-forest-500 border-forest-500 text-white'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-800 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <p>
          <strong className="font-semibold">Demo Notice:</strong> FreshBox Tiffin is a frontend demonstration. No real bank accounts, cards, UPI pins, or monetary charges are ever handled. Online payment choices launch an interactive simulation popup.
        </p>
      </div>
    </div>
  );
};
