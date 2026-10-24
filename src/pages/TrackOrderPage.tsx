import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { OrderTimeline } from '../components/tracking/OrderTimeline';
import { DemoSimulator } from '../components/tracking/DemoSimulator';
import {
  Bike,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronDown,
  Star,
  CheckCircle2,
  Receipt,
  UtensilsCrossed,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { orders, getOrderById } = useApp();
  const navigate = useNavigate();

  // Find order from query param or default to most recent order
  const urlOrderId = searchParams.get('orderId');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    urlOrderId || (orders.length > 0 ? orders[0].id : '')
  );

  useEffect(() => {
    if (urlOrderId) {
      setSelectedOrderId(urlOrderId);
    } else if (orders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(orders[0].id);
      setSearchParams({ orderId: orders[0].id });
    }
  }, [urlOrderId, orders]);

  const handleSelectOrder = (id: string) => {
    setSelectedOrderId(id);
    setSearchParams({ orderId: id });
  };

  const currentOrder = getOrderById(selectedOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-charcoal-400">
          <Bike className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-forest-900 font-sans">
          No Orders to Track
        </h2>
        <p className="text-xs text-charcoal-500">
          You haven't placed any demo tiffin orders yet.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-forest-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md"
        >
          Place a Demo Order
        </Link>
      </div>
    );
  }

  const isDelivered = currentOrder.orderStatus === 'Delivered';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header & Order Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-300">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Live Order Tracker
            </span>
            <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded font-mono font-medium">
              Demo Mode Tracking
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-forest-900 font-sans tracking-tight mt-1">
            Tracking Order #{currentOrder.id}
          </h1>
        </div>

        {/* Multi-Order Dropdown Switcher */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <label htmlFor="order-switch" className="text-xs font-bold text-charcoal-600">
              Switch Order:
            </label>
            <select
              id="order-switch"
              value={currentOrder.id}
              onChange={(e) => handleSelectOrder(e.target.value)}
              className="text-xs font-bold py-2 px-3 rounded-xl border border-cream-300 bg-white text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-500 shadow-xs cursor-pointer"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} ({o.orderStatus} • ₹{o.total})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Tracker Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-8">
        {/* Estimated Window Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-forest-50 to-cream-100 border border-forest-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-forest-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Clock className="w-6 h-6 text-warmOrange-300" />
            </div>
            <div>
              <p className="text-xs font-semibold text-charcoal-500">
                Current Delivery Stage
              </p>
              <h3 className="text-lg sm:text-xl font-black text-forest-900">
                {currentOrder.orderStatus}
              </h3>
              <p className="text-xs text-forest-700 font-medium mt-0.5">
                Target: {currentOrder.estimatedDelivery}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isDelivered ? (
              <Link
                to={`/feedback?orderId=${currentOrder.id}`}
                className="bg-warmOrange-500 hover:bg-warmOrange-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Rate & Review Food</span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-forest-700 px-3 py-1.5 rounded-xl border border-forest-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active 30-Min Zone Delivery</span>
              </span>
            )}
          </div>
        </div>

        {/* 6-Stage Progress Stepper */}
        <div className="pt-2 pb-4">
          <OrderTimeline
            currentStatus={currentOrder.orderStatus}
            statusHistory={currentOrder.statusHistory}
          />
        </div>

        {/* Demo Status Simulator Tool */}
        <DemoSimulator
          orderId={currentOrder.id}
          currentStatus={currentOrder.orderStatus}
        />

        {/* Rider & Delivery Agent Card */}
        {currentOrder.deliveryAgent && (
          <div className="p-5 rounded-2xl bg-cream-50 border border-cream-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center font-bold text-sm shrink-0">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-400">Assigned Delivery Rider</p>
                <h4 className="text-sm sm:text-base font-extrabold text-charcoal-900">
                  {currentOrder.deliveryAgent.name}
                </h4>
                <p className="text-xs text-charcoal-500 font-mono">
                  Vehicle: {currentOrder.deliveryAgent.vehicleNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  alert(`Demo Call Simulation: Dialing ${currentOrder.deliveryAgent?.phone}`)
                }
                className="inline-flex items-center gap-1.5 bg-white hover:bg-cream-100 text-forest-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-cream-300 shadow-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-forest-600" />
                <span>Call Rider (Demo)</span>
              </button>
            </div>
          </div>
        )}

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-cream-200">
          {/* Ordered Items */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-700 flex items-center gap-1.5">
              <UtensilsCrossed className="w-4 h-4 text-forest-600" />
              Tiffin & Items in this Order
            </h4>
            <div className="divide-y divide-cream-100 space-y-2">
              {currentOrder.items.map((item) => (
                <div key={item.cartItemId} className="pt-2 text-xs flex justify-between gap-2">
                  <div>
                    <p className="font-extrabold text-charcoal-800">
                      {item.quantity}x {item.name}
                    </p>
                    {item.customization && (
                      <p className="text-[11px] text-forest-700">
                        {item.customization.rotiChoice} • {item.customization.spiceLevel}
                      </p>
                    )}
                  </div>
                  <span className="font-mono font-bold text-charcoal-900 shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-cream-200 flex justify-between text-xs font-extrabold text-charcoal-900">
              <span>Total Paid:</span>
              <span className="text-base text-forest-700 font-mono">₹{currentOrder.total}</span>
            </div>
          </div>

          {/* Delivery & Payment Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-forest-600" />
              Delivery & Payment Record
            </h4>
            <div className="p-4 rounded-2xl bg-cream-50/50 border border-cream-200 text-xs space-y-2 text-charcoal-700">
              <p>
                <strong>Customer:</strong> {currentOrder.customer.name} ({currentOrder.customer.phone})
              </p>
              <p>
                <strong>Address:</strong> {currentOrder.customer.address}
              </p>
              {currentOrder.customer.instructions && (
                <p>
                  <strong>Note:</strong> {currentOrder.customer.instructions}
                </p>
              )}
              <div className="pt-2 border-t border-cream-200 flex justify-between">
                <span>Payment: <strong>{currentOrder.paymentMethod}</strong></span>
                <span className="text-emerald-700 font-bold">{currentOrder.paymentStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
