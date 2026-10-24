import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PaymentMethodSelector } from '../components/common/PaymentLogos';
import { CustomerDetails, PaymentMethod } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  Truck,
  Loader2,
  Lock
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotals, placeOrder, user } = useApp();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<CustomerDetails>({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    address: user.address || '',
    landmark: user.landmark || '',
    instructions: '',
    deliverySlot: 'Immediate (30-40 min Express Delivery)'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [simulationStep, setSimulationStep] = useState<'prompt' | 'processing' | 'done'>('prompt');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-charcoal-800">
          Your cart is empty
        </h2>
        <p className="text-xs text-charcoal-500">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-forest-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
        >
          Browse Daily Menu
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.phone.trim() || formData.phone.length < 10)
      errs.phone = 'Please provide a valid 10-digit mobile number.';
    if (!formData.address.trim())
      errs.address = 'Please provide complete delivery address with flat/house number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrderClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (paymentMethod === 'Cash on Delivery') {
      // Direct placement for COD
      const order = placeOrder(formData, 'Cash on Delivery');
      navigate(`/order-success?orderId=${order.id}`);
    } else {
      // Launch simulated online payment gateway
      setIsSimulatingPayment(true);
      setSimulationStep('prompt');
    }
  };

  const handleConfirmSimulatedOnlinePayment = () => {
    setSimulationStep('processing');
    setTimeout(() => {
      setSimulationStep('done');
      setTimeout(() => {
        setIsSimulatingPayment(false);
        const order = placeOrder(formData, paymentMethod);
        navigate(`/order-success?orderId=${order.id}`);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="max-w-2xl">
        <span className="text-xs font-extrabold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
          Express Checkout
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-forest-900 font-sans tracking-tight mt-1">
          Delivery Details & Payment
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Confirm your address and select your preferred demo payment option.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Form & Payment Method */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Address Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-5">
            <h3 className="text-base sm:text-lg font-extrabold text-charcoal-800 pb-3 border-b border-cream-200 flex items-center justify-between">
              <span>1. Customer & Delivery Address</span>
              <span className="text-xs font-normal text-charcoal-500">
                * All fields required
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full text-sm p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50 ${
                    errors.name ? 'border-red-500' : 'border-cream-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Phone Number (for delivery call) *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full text-sm p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50 ${
                    errors.phone ? 'border-red-500' : 'border-cream-300'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Complete Delivery Address (Flat / House, Building, Street) *
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. Flat 402, Green Glen Heights, Bellandur, Bengaluru, 560103"
                className={`w-full text-sm p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50 ${
                  errors.address ? 'border-red-500' : 'border-cream-300'
                }`}
              />
              {errors.address && (
                <p className="text-[11px] text-red-600 font-semibold mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={formData.landmark || ''}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  placeholder="e.g. Near EcoSpace Gate 2"
                  className="w-full text-sm p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Preferred Delivery Slot
                </label>
                <select
                  value={formData.deliverySlot}
                  onChange={(e) =>
                    setFormData({ ...formData, deliverySlot: e.target.value })
                  }
                  className="w-full text-sm font-semibold p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50 cursor-pointer"
                >
                  <option value="Immediate (30-40 min Express Delivery)">
                    Immediate (30-40 min Express Delivery)
                  </option>
                  <option value="Lunch: 12:30 PM - 02:00 PM">
                    Lunch: 12:30 PM - 02:00 PM
                  </option>
                  <option value="Dinner: 07:30 PM - 09:30 PM">
                    Dinner: 07:30 PM - 09:30 PM
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Special Delivery Instructions (Gate code, ring bell, etc.)
              </label>
              <input
                type="text"
                value={formData.instructions || ''}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
                placeholder="e.g. Ring bell twice, leave with security if call unanswered"
                className="w-full text-sm p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card">
            <h3 className="text-base sm:text-lg font-extrabold text-charcoal-800 pb-4 border-b border-cream-200 mb-4">
              2. Select Payment Method
            </h3>
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onSelect={(m) => setPaymentMethod(m)}
            />
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order CTA */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-card space-y-4">
            <h3 className="text-base font-extrabold text-charcoal-800 pb-3 border-b border-cream-200">
              Order Review
            </h3>

            {/* Quick list of items */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 text-xs divide-y divide-cream-100">
              {cart.map((item) => (
                <div key={item.cartItemId} className="pt-2 flex justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-charcoal-800 truncate">
                      {item.quantity}x {item.name}
                    </p>
                    {item.customization && (
                      <p className="text-[10px] text-forest-600 line-clamp-1">
                        Custom: {item.customization.rotiChoice} • {item.customization.spiceLevel}
                      </p>
                    )}
                  </div>
                  <span className="font-mono font-bold text-charcoal-800 shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-3 border-t border-cream-200 space-y-2 text-xs text-charcoal-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-charcoal-800">₹{cartTotals.subtotal}</span>
              </div>
              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>- ₹{cartTotals.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-charcoal-800">
                  {cartTotals.deliveryFee === 0 ? 'FREE' : `₹${cartTotals.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5% GST)</span>
                <span className="font-bold text-charcoal-800">₹{cartTotals.tax}</span>
              </div>
              {cartTotals.jarDepositTotal > 0 && (
                <div className="flex justify-between text-amber-700 font-medium">
                  <span>Water Jar Deposit</span>
                  <span>₹{cartTotals.jarDepositTotal}</span>
                </div>
              )}
              <div className="pt-3 border-t border-cream-200 flex items-baseline justify-between">
                <span className="font-black text-sm text-charcoal-900">Total Amount</span>
                <span className="text-2xl font-black text-forest-700 font-sans">
                  ₹{cartTotals.total}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrderClick}
              className="w-full bg-forest-500 hover:bg-forest-600 active:scale-98 text-white font-black text-sm sm:text-base py-4 px-6 rounded-2xl shadow-lg shadow-forest-500/25 flex items-center justify-center gap-2 transition-all mt-4"
            >
              <span>Place Demo Order • ₹{cartTotals.total}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="p-3 bg-cream-50 rounded-xl text-center space-y-1">
              <p className="text-[11px] font-bold text-charcoal-700 flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5 text-forest-600" />
                Demo Mode Checkout
              </p>
              <p className="text-[10px] text-charcoal-500">
                Order will be saved directly into your browser's localStorage and tracked in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Online Payment Confirmation Modal */}
      {isSimulatingPayment && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded font-mono">
                Simulated Payment Gateway
              </span>
              <h3 className="text-xl font-black text-charcoal-900 mt-2">
                Authorize Demo Payment
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Selected method: <strong className="text-forest-700">{paymentMethod}</strong>
              </p>
            </div>

            <div className="p-4 bg-cream-100 rounded-2xl text-left space-y-1.5 text-xs text-charcoal-700">
              <div className="flex justify-between">
                <span>Pay to:</span>
                <strong className="text-forest-800">FreshBox Tiffin Kitchen</strong>
              </div>
              <div className="flex justify-between">
                <span>Payable Amount:</span>
                <strong className="text-forest-800 font-mono text-sm">₹{cartTotals.total}</strong>
              </div>
              <div className="flex justify-between">
                <span>Transaction Type:</span>
                <span className="text-amber-700 font-semibold">Demo Sandbox (No real charge)</span>
              </div>
            </div>

            {simulationStep === 'prompt' && (
              <div className="space-y-3">
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  Click below to simulate a successful payment approval from your {paymentMethod} app.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSimulatingPayment(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-cream-300 text-xs font-bold text-charcoal-600 hover:bg-cream-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmSimulatedOnlinePayment}
                    className="flex-1 py-3 px-4 rounded-xl bg-forest-500 hover:bg-forest-600 text-white text-xs font-extrabold shadow-md transition-all"
                  >
                    Approve Demo Pay
                  </button>
                </div>
              </div>
            )}

            {simulationStep === 'processing' && (
              <div className="py-4 space-y-3">
                <Loader2 className="w-8 h-8 text-forest-500 animate-spin mx-auto" />
                <p className="text-xs font-bold text-charcoal-700">
                  Verifying simulated transaction with bank network...
                </p>
              </div>
            )}

            {simulationStep === 'done' && (
              <div className="py-4 space-y-2 text-emerald-600">
                <CheckCircle2 className="w-10 h-10 mx-auto" />
                <p className="text-sm font-extrabold">
                  Demo Payment Authorized Successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
