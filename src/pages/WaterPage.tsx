import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { waterSubscriptionPlans } from '../data/seedWater';
import {
  Droplets,
  Plus,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  Truck,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WaterPage: React.FC = () => {
  const { waterItems, addToCart, cart, updateCartQuantity, user, showToast } = useApp();
  const navigate = useNavigate();

  // Jar Return Tracking simulation state
  const [jarsReturning, setJarsReturning] = useState(1);
  const [returnStatus, setReturnStatus] = useState<string | null>(null);

  const handleReturnJars = (e: React.FormEvent) => {
    e.preventDefault();
    setReturnStatus(
      `Demo Request Submitted: Pickup scheduled for ${jarsReturning} empty 20L jar(s). ₹${
        jarsReturning * 150
      } deposit credit will be adjusted against your next order.`
    );
    showToast(`Jar return request submitted for ${jarsReturning} jar(s)!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-bold px-3 py-1 rounded-full border border-sky-200">
          <Droplets className="w-3.5 h-3.5 text-sky-500" />
          <span>FreshPure Hydration Store</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-forest-900 font-sans tracking-tight">
          Drinking Water & 20L Jars
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
          Order 100% pure RO, UV and mineral-balanced drinking water. Purchase bottles alongside your daily tiffin or sign up for recurring monthly jar deliveries.
        </p>
      </div>

      {/* Product Grid: 500ml, 1L, 2L, 20L Jar */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-charcoal-800 font-sans">
            Bottles & Water Jars
          </h2>
          <span className="text-xs text-charcoal-500 font-medium">
            Food & Water can be ordered together
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {waterItems.map((item) => {
            const cartItem = cart.find(
              (c) => c.productId === item.id && c.type === 'water'
            );
            const qty = cartItem ? cartItem.quantity : 0;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-cream-300 p-5 shadow-card hover:shadow-lift transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-sky-50/50 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-sky-800 text-xs font-extrabold px-2.5 py-1 rounded-xl shadow-xs">
                      {item.size}
                    </span>
                    {item.deposit && (
                      <span className="absolute bottom-3 left-3 bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs">
                        +₹{item.deposit} Refundable Deposit
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-charcoal-800 group-hover:text-sky-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-charcoal-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>

                  {item.bulkDiscount && (
                    <div className="mt-2 text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 inline-block">
                      {item.bulkDiscount}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-cream-200 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-forest-700">
                      ₹{item.price}
                    </span>
                    {item.deposit && (
                      <p className="text-[10px] text-charcoal-400">
                        (Deposit: ₹{item.deposit})
                      </p>
                    )}
                  </div>

                  {qty > 0 && cartItem ? (
                    <div className="flex items-center gap-2 bg-sky-50 border border-sky-300 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(cartItem.cartItemId, qty - 1)}
                        className="w-7 h-7 rounded-lg bg-white text-sky-700 font-bold flex items-center justify-center shadow-xs"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-extrabold text-sky-900">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(cartItem.cartItemId, qty + 1)}
                        className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          productId: item.id,
                          type: 'water',
                          name: item.name,
                          price: item.price,
                          basePrice: item.price,
                          quantity: 1,
                          image: item.image,
                          deposit: item.deposit
                        })
                      }
                      className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-sky-600/20 active:scale-95 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Monthly Water Delivery Plans */}
      <section id="jar-subscription" className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Convenient Hydration
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-forest-900 font-sans tracking-tight">
            Monthly Water Jar Delivery Plans
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500">
            Automated morning drop-off for apartments, villas, and team offices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {waterSubscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-300 shadow-card flex flex-col justify-between hover:shadow-lift transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-md">
                    {plan.frequency}
                  </span>
                  <span className="text-xs text-charcoal-400 font-mono">
                    {plan.bottleSize}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-charcoal-800">
                  {plan.title}
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">
                  {plan.description}
                </p>

                <div className="mt-4 pt-4 border-t border-cream-200 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-sky-900 font-sans">
                    ₹{plan.priceMonthly}
                  </span>
                  <span className="text-xs text-charcoal-500">/ month</span>
                </div>

                <ul className="mt-5 space-y-2 text-xs text-charcoal-600">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      productId: plan.id,
                      type: 'water',
                      name: `Monthly Plan: ${plan.title}`,
                      price: plan.priceMonthly,
                      basePrice: plan.priceMonthly,
                      quantity: 1,
                      image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80',
                      deposit: plan.jarDeposit
                    });
                    navigate('/cart');
                  }}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Start Plan (₹{plan.priceMonthly}/mo)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Jar Return Tracking Interface */}
      <section className="bg-gradient-to-r from-cream-100 to-sky-50 rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-white text-sky-800 text-xs font-bold px-3 py-1 rounded-full border border-sky-200">
              <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
              <span>Doorstep Deposit Refund System</span>
            </div>
            <h3 className="text-2xl font-black text-charcoal-900 font-sans">
              20L Empty Jar Return Tracking
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              Have empty FreshPure 20-litre bubble top jars? Hand them to your delivery rider during your next order to skip the security deposit, or schedule an empty jar pickup for a full ₹150/jar refund credit.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 text-xs font-bold text-charcoal-700">
              <span className="bg-white px-3 py-1.5 rounded-xl border border-sky-200 text-center sm:text-left">
                Current Jars with you: <strong className="text-sky-700">{user.jarsInPossession} Jar(s)</strong>
              </span>
              <span className="bg-white px-3 py-1.5 rounded-xl border border-sky-200 text-center sm:text-left">
                Deposit Value: <strong className="text-forest-700">₹{user.jarsInPossession * 150}</strong>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-sky-200 shadow-md">
            <form onSubmit={handleReturnJars} className="space-y-4">
              <h4 className="text-sm font-extrabold text-charcoal-800">
                Schedule Empty Jar Return (Demo)
              </h4>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Number of empty jars to return
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={jarsReturning}
                    onChange={(e) => setJarsReturning(Number(e.target.value))}
                    className="w-full text-sm font-semibold py-2 px-3 rounded-xl border border-cream-300 bg-cream-50"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} Jar{n > 1 ? 's' : ''} (Refund: ₹{n * 150})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Pickup Address
                </label>
                <input
                  type="text"
                  readOnly
                  value={user.address}
                  className="w-full text-sm p-2 rounded-xl border border-cream-200 bg-cream-50 text-charcoal-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md transition-colors"
              >
                Submit Demo Pickup Request
              </button>

              {returnStatus && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  {returnStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
