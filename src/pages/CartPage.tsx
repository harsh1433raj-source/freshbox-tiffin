import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Plus,
  Sliders,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartTotals,
    extras,
    addToCart
  } = useApp();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  // Recommended add-ons for the cart (Roti, Salad, Raita, Gulab Jamun)
  const quickAddons = extras.filter((e) =>
    ['extra-roti-2', 'extra-salad-1', 'extra-raita-2', 'extra-dairy-5'].includes(e.id)
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-cream-100 border border-cream-300 text-charcoal-400 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12 text-forest-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-forest-900 font-sans">
            Your Cart is Currently Empty
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto">
            Looks like you haven't added any homestyle meals or drinking water to your cart yet.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/menu"
            className="bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Browse Daily Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/subscriptions"
            className="bg-white hover:bg-cream-100 text-forest-700 font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl border border-cream-300 transition-all"
          >
            Explore Monthly Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-cream-300">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-forest-900 font-sans tracking-tight">
            Review Your Cart
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
            {cartTotals.itemCount} items ready for preparation & delivery
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 p-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All Items</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white rounded-3xl border border-cream-300 p-4 sm:p-5 shadow-xs hover:shadow-card transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Item Thumbnail & Basic Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-cream-200 shrink-0 border border-cream-300">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-forest-50 text-forest-700 px-2 py-0.5 rounded">
                        {item.type.toUpperCase()}
                      </span>
                      {item.hindiName && (
                        <span className="text-[11px] text-warmOrange-600 font-medium">
                          {item.hindiName}
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-charcoal-800 leading-snug">
                      {item.name}
                    </h3>

                    {/* Customization Details Breakdown */}
                    {item.customization && (
                      <div className="mt-1 p-2.5 rounded-xl bg-forest-50/70 border border-forest-100 text-[11px] text-forest-900 space-y-0.5">
                        <p className="font-bold text-forest-700 flex items-center gap-1">
                          <Sliders className="w-3 h-3" />
                          Customized Options:
                        </p>
                        <p>• {item.customization.rotiChoice}</p>
                        <p>• {item.customization.riceChoice}</p>
                        <p>• {item.customization.dalChoice} & {item.customization.sabziChoice}</p>
                        {item.customization.raitaChoice !== 'None' && (
                          <p>• {item.customization.raitaChoice}</p>
                        )}
                        <p>• Spice: {item.customization.spiceLevel}</p>
                        {item.customization.instructions && (
                          <p className="italic text-charcoal-600">
                            Note: "{item.customization.instructions}"
                          </p>
                        )}
                      </div>
                    )}

                    {item.deposit ? (
                      <p className="text-[11px] text-amber-700 font-medium">
                        Refundable Jar Deposit: ₹{item.deposit} per jar included
                      </p>
                    ) : null}

                    <div className="pt-1">
                      <span className="text-xs sm:text-sm font-black text-forest-700">
                        ₹{item.price} each
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Quantity Stepper & Subtotal */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-cream-200">
                  <div className="flex items-center gap-1.5 bg-cream-100 rounded-xl p-1 border border-cream-300">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white text-charcoal-800 font-bold flex items-center justify-center hover:bg-cream-200 transition-colors shadow-xs"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-black text-charcoal-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-forest-500 text-white font-bold flex items-center justify-center hover:bg-forest-600 transition-colors shadow-xs"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm sm:text-base font-black text-charcoal-900 font-sans">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-charcoal-400 hover:text-red-600 p-1.5 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Add-ons Carousel in Cart */}
          <div className="bg-white rounded-3xl p-5 border border-cream-300 shadow-xs space-y-3 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-extrabold text-charcoal-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-warmOrange-500" />
                Frequently Added with Meals
              </h3>
              <Link
                to="/menu?category=Extra Items"
                className="text-[11px] font-bold text-forest-600 hover:underline"
              >
                More Add-ons
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickAddons.map((addon) => (
                <div
                  key={addon.id}
                  className="bg-cream-50/60 rounded-2xl p-2.5 border border-cream-300 flex flex-col justify-between"
                >
                  <div className="h-16 rounded-xl overflow-hidden mb-1.5 bg-cream-200">
                    <img
                      src={addon.image}
                      alt={addon.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-charcoal-800 truncate">
                      {addon.name}
                    </h5>
                    <p className="text-[10px] text-forest-700 font-black">
                      ₹{addon.price}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      addToCart({
                        productId: addon.id,
                        type: 'extra',
                        name: addon.name,
                        hindiName: addon.hindiName,
                        price: addon.price,
                        basePrice: addon.price,
                        quantity: 1,
                        image: addon.image,
                        portion: addon.unit
                      })
                    }
                    className="mt-2 w-full bg-white hover:bg-forest-500 hover:text-white border border-forest-200 text-forest-700 text-[10px] font-bold py-1 rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary, Coupons & Checkout */}
        <div className="lg:col-span-4 space-y-4">
          {/* Coupon Code Box */}
          <div className="bg-white rounded-3xl p-5 border border-cream-300 shadow-card space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-charcoal-700 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-warmOrange-500" />
              Apply Discount Coupon
            </h4>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                <div>
                  <p className="font-extrabold font-mono text-sm">{appliedCoupon.code}</p>
                  <p className="text-[11px]">{appliedCoupon.description}</p>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon (e.g. FRESH10)"
                    className="w-full text-sm font-mono font-bold uppercase p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
                  />
                  <button
                    type="submit"
                    className="bg-forest-500 hover:bg-forest-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-red-600 font-semibold">{couponError}</p>
                )}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span
                    onClick={() => {
                      setCouponInput('FRESH10');
                      applyCoupon('FRESH10');
                    }}
                    className="cursor-pointer text-[10px] font-mono font-bold bg-amber-50 hover:bg-amber-100 text-warmOrange-700 border border-amber-200 px-2 py-0.5 rounded"
                  >
                    FRESH10 (10% OFF)
                  </span>
                  <span
                    onClick={() => {
                      setCouponInput('WELCOME50');
                      applyCoupon('WELCOME50');
                    }}
                    className="cursor-pointer text-[10px] font-mono font-bold bg-amber-50 hover:bg-amber-100 text-warmOrange-700 border border-amber-200 px-2 py-0.5 rounded"
                  >
                    WELCOME50 (₹50 OFF)
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Bill Breakdown */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cream-300 shadow-card space-y-4">
            <h4 className="text-sm font-extrabold text-charcoal-800 pb-3 border-b border-cream-200">
              Bill Details
            </h4>

            <div className="space-y-2.5 text-xs text-charcoal-600">
              <div className="flex items-center justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-charcoal-800 font-mono">
                  ₹{cartTotals.subtotal}
                </span>
              </div>

              {cartTotals.discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">- ₹{cartTotals.discount}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Delivery Fee</span>
                  {cartTotals.deliveryFee === 0 && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 rounded">
                      FREE
                    </span>
                  )}
                </div>
                <span className="font-bold text-charcoal-800 font-mono">
                  {cartTotals.deliveryFee === 0 ? '₹0' : `₹${cartTotals.deliveryFee}`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Taxes & Kitchen Packaging (5% GST)</span>
                <span className="font-bold text-charcoal-800 font-mono">
                  ₹{cartTotals.tax}
                </span>
              </div>

              {cartTotals.jarDepositTotal > 0 && (
                <div className="flex items-center justify-between text-amber-700 font-medium">
                  <span>Refundable Water Jar Deposit</span>
                  <span className="font-bold font-mono">
                    ₹{cartTotals.jarDepositTotal}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-cream-300 flex items-baseline justify-between text-sm sm:text-base">
                <span className="font-black text-charcoal-900">To Pay</span>
                <span className="text-xl sm:text-2xl font-black text-forest-700 font-sans">
                  ₹{cartTotals.total}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-forest-500 hover:bg-forest-600 active:scale-98 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-forest-500/25 flex items-center justify-center gap-2 transition-all mt-4"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-forest-600" />
              <span>Simulated Demo Checkout • No Real Card Needed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
