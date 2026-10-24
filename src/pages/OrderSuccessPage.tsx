import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Bike,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Receipt,
  Sparkles
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const { getOrderById, orders } = useApp();
  const navigate = useNavigate();

  // Find order or fallback to most recent order
  const order = getOrderById(orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-charcoal-800">No order found</h2>
        <p className="text-xs text-charcoal-500">
          We couldn't retrieve the requested order information.
        </p>
        <Link
          to="/"
          className="inline-block bg-forest-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Success Badge & Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lift ring-8 ring-emerald-50">
          <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14" />
        </div>

        <div className="inline-flex items-center gap-1.5 bg-forest-50 text-forest-700 text-xs font-bold px-3 py-1 rounded-full border border-forest-200">
          <Sparkles className="w-3.5 h-3.5 text-warmOrange-500" />
          <span>Kitchen Acknowledged</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-forest-900 font-sans tracking-tight">
          Ghar Jaisa Khana is on its way!
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto">
          Thank you, <strong className="text-charcoal-800">{order.customer.name}</strong>. Your meal has been scheduled with our master chefs.
        </p>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
        {/* Order Meta Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-cream-200">
          <div>
            <p className="text-xs text-charcoal-400 font-medium">Order Reference ID</p>
            <p className="text-xl sm:text-2xl font-black text-forest-700 font-mono tracking-tight">
              #{order.id}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-amber-50 text-warmOrange-700 border border-amber-200 px-3 py-1 rounded-xl font-mono">
              Status: {order.orderStatus}
            </span>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-xl">
              {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Estimated Delivery Notice */}
        <div className="p-4 rounded-2xl bg-forest-50 border border-forest-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-forest-500 text-white flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-warmOrange-300" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-forest-900">
              Estimated Delivery Time
            </p>
            <p className="text-xs text-forest-700 font-medium">
              {order.estimatedDelivery} ({order.customer.deliverySlot})
            </p>
          </div>
        </div>

        {/* Items Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-700">
            Order Items ({order.items.length})
          </h3>
          <div className="divide-y divide-cream-100 space-y-2">
            {order.items.map((item) => (
              <div key={item.cartItemId} className="pt-2 flex items-start justify-between gap-3 text-xs">
                <div>
                  <p className="font-extrabold text-charcoal-800">
                    {item.quantity}x {item.name}
                  </p>
                  {item.customization && (
                    <p className="text-[11px] text-forest-700 font-medium">
                      Custom: {item.customization.rotiChoice} • {item.customization.spiceLevel}
                    </p>
                  )}
                  {item.portion && (
                    <p className="text-[10px] text-charcoal-400">{item.portion}</p>
                  )}
                </div>
                <span className="font-mono font-bold text-charcoal-900 shrink-0">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery & Payment Info */}
        <div className="pt-4 border-t border-cream-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-bold text-charcoal-800 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest-600" />
              Delivery Destination
            </p>
            <p className="text-charcoal-600 leading-relaxed">{order.customer.address}</p>
            {order.customer.landmark && (
              <p className="text-charcoal-400 mt-0.5">Near: {order.customer.landmark}</p>
            )}
            <p className="text-charcoal-500 mt-1 font-mono">{order.customer.phone}</p>
          </div>

          <div>
            <p className="font-bold text-charcoal-800 mb-1 flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-forest-600" />
              Payment Summary
            </p>
            <p className="text-charcoal-600">Method: <strong>{order.paymentMethod}</strong></p>
            <p className="text-charcoal-600">
              Paid Total: <strong className="text-forest-700 font-mono text-sm">₹{order.total}</strong>
            </p>
            <p className="text-[11px] text-amber-700 mt-1">
              (Demo Simulated Transaction • Zero Money Charged)
            </p>
          </div>
        </div>

        {/* 3 Prominent Action Buttons */}
        <div className="pt-6 border-t border-cream-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Primary Track Button */}
          <Link
            to={`/track-order?orderId=${order.id}`}
            className="flex-1 bg-forest-500 hover:bg-forest-600 active:scale-98 text-white font-extrabold text-xs sm:text-sm py-3.5 px-5 rounded-2xl shadow-lg shadow-forest-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <Bike className="w-4 h-4 text-warmOrange-300" />
            <span>Track My Order Now</span>
          </Link>

          <Link
            to="/orders"
            className="bg-cream-100 hover:bg-cream-200 text-charcoal-800 font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl border border-cream-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View All My Orders</span>
          </Link>

          <Link
            to="/menu"
            className="bg-white hover:bg-cream-100 text-forest-700 font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl border border-cream-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
