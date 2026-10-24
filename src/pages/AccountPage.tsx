import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User,
  MapPin,
  CalendarCheck2,
  PauseCircle,
  PlayCircle,
  Droplets,
  ChefHat,
  ShoppingBag,
  Star,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  LogOut
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    user,
    subscriptions,
    pauseSubscriptionDate,
    resumeSubscriptionDate,
    cancelSubscription,
    orders,
    customRequests,
    submitCustomRequest,
    feedbackList,
    logoutUser,
    updateUserAddress,
    showToast
  } = useApp();
  const navigate = useNavigate();

  const activeTab = searchParams.get('tab') || 'subscriptions';

  // Custom Food Request Form State
  const [customItemName, setCustomItemName] = useState('');
  const [customQuantity, setCustomQuantity] = useState('Serves 2');
  const [customExpectedPrice, setCustomExpectedPrice] = useState<number | ''>(150);
  const [customDeliveryTime, setCustomDeliveryTime] = useState('Tomorrow Lunch (1:00 PM)');
  const [customInstructions, setCustomInstructions] = useState('');

  // Pause date input state
  const [pauseDateInput, setPauseDateInput] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });

  // Address edit state
  const [editingAddress, setEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(user.address);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserAddress(tempAddress);
    setEditingAddress(false);
  };

  const handleCustomRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemName.trim()) {
      showToast('Please specify the dish name you would like prepared.', 'warning');
      return;
    }

    submitCustomRequest({
      customerName: user.name,
      customerPhone: user.phone,
      itemName: customItemName.trim(),
      quantity: customQuantity,
      expectedPrice: customExpectedPrice ? Number(customExpectedPrice) : undefined,
      preferredDeliveryTime: customDeliveryTime,
      instructions: customInstructions.trim()
    });

    setCustomItemName('');
    setCustomInstructions('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Profile Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 border border-cream-300 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-forest-500 text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-2xl font-black text-charcoal-900 font-sans truncate">
                {user.name}
              </h1>
              <span className="text-[9px] sm:text-[10px] bg-forest-100 text-forest-800 font-bold px-2 py-0.5 rounded font-mono shrink-0">
                Verified Customer
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-charcoal-500 truncate">
              {user.phone} • {user.email}
            </p>
            <p className="text-[11px] sm:text-xs text-charcoal-600 line-clamp-1 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-forest-600 shrink-0" />
              <span className="truncate">{user.address}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-start pt-2 md:pt-0 border-t md:border-t-0 border-cream-200">
          <Link
            to="/orders"
            className="flex-1 md:flex-none text-center bg-cream-100 hover:bg-forest-50 text-forest-800 font-bold text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-cream-300 transition-colors"
          >
            My Orders ({orders.length})
          </Link>
          <button
            onClick={() => {
              logoutUser();
              navigate('/login');
            }}
            className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-cream-300">
        {[
          { id: 'subscriptions', label: `Active Subscriptions (${subscriptions.filter(s => s.status === 'active').length})` },
          { id: 'custom-requests', label: `Custom Food Requests (${customRequests.length})` },
          { id: 'water-jars', label: `Water Jars (${user.jarsInPossession})` },
          { id: 'address', label: 'Delivery Address & Profile' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`text-xs sm:text-sm font-bold px-4 py-3 border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-forest-600 text-forest-700 bg-white rounded-t-xl'
                  : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Active Subscriptions & Pause Controls */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-forest-900 font-sans">
                Monthly Tiffin Subscriptions
              </h2>
              <p className="text-xs text-charcoal-500">
                Manage daily lunch & dinner deliveries, pause specific meal dates, or upgrade plans.
              </p>
            </div>
            <Link
              to="/subscriptions"
              className="bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll In New Plan</span>
            </Link>
          </div>

          {subscriptions.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-cream-300 space-y-4">
              <CalendarCheck2 className="w-12 h-12 text-forest-400 mx-auto" />
              <h3 className="text-base font-bold text-charcoal-800">
                No active monthly subscription
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Save up to ₹1,400 per month and stop cooking after exhausting office shifts.
              </p>
              <Link
                to="/subscriptions"
                className="inline-block bg-forest-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
              >
                Explore Monthly Plans
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {subscriptions.map((sub) => {
                const isActive = sub.status === 'active';

                return (
                  <div
                    key={sub.id}
                    className={`bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all space-y-6 ${
                      isActive
                        ? 'border-forest-400 shadow-card'
                        : 'border-gray-200 bg-gray-50/70 opacity-80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-cream-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-forest-700 bg-forest-50 px-2 py-0.5 rounded">
                            #{sub.id}
                          </span>
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                              isActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {sub.status.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-charcoal-900 mt-1">
                          {sub.planName}
                        </h3>
                        <p className="text-xs text-charcoal-500">
                          Slot: <strong>{sub.mealPreference}</strong> • Diet: <strong>{sub.dietaryPreference}</strong>
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xs text-charcoal-400">Renewal Date</p>
                        <p className="text-base font-black text-forest-700 font-mono">
                          {sub.renewalDate}
                        </p>
                      </div>
                    </div>

                    {/* Meal Schedule & Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200">
                        <p className="text-charcoal-400 text-[11px]">Start Date</p>
                        <p className="font-bold text-charcoal-800 mt-0.5">{sub.startDate}</p>
                      </div>
                      <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200">
                        <p className="text-charcoal-400 text-[11px]">Total Meals</p>
                        <p className="font-bold text-charcoal-800 mt-0.5">{sub.totalMeals} Meals</p>
                      </div>
                      <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200">
                        <p className="text-charcoal-400 text-[11px]">Meals Remaining</p>
                        <p className="font-bold text-emerald-700 mt-0.5">{sub.mealsRemaining} Left</p>
                      </div>
                      <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200">
                        <p className="text-charcoal-400 text-[11px]">Delivery Charge</p>
                        <p className="font-bold text-forest-700 mt-0.5">Free Doorstep</p>
                      </div>
                    </div>

                    {/* Interactive Meal Pause Controls */}
                    {isActive && (
                      <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                              <PauseCircle className="w-4 h-4 text-warmOrange-500" />
                              Pause Upcoming Meals (Demo Control)
                            </h4>
                            <p className="text-[11px] text-amber-800 mt-0.5">
                              Going out of town? Select a date to pause food delivery. You will receive meal rollover credits.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <input
                            type="date"
                            value={pauseDateInput}
                            onChange={(e) => setPauseDateInput(e.target.value)}
                            className="text-xs font-bold py-2 px-3 rounded-xl border border-amber-300 bg-white text-charcoal-800"
                          />
                          <button
                            type="button"
                            onClick={() => pauseSubscriptionDate(sub.id, pauseDateInput)}
                            className="bg-warmOrange-500 hover:bg-warmOrange-600 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-xs transition-colors"
                          >
                            Pause Meal on {pauseDateInput}
                          </button>
                        </div>

                        {sub.pausedDates && sub.pausedDates.length > 0 && (
                          <div className="pt-2 border-t border-amber-200">
                            <p className="text-[11px] font-bold text-amber-900 mb-1.5">
                              Currently Paused Dates:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {sub.pausedDates.map((date) => (
                                <span
                                  key={date}
                                  className="inline-flex items-center gap-1.5 bg-white text-charcoal-800 border border-amber-300 text-xs font-medium px-3 py-1 rounded-xl shadow-xs"
                                >
                                  <span>{date}</span>
                                  <button
                                    onClick={() => resumeSubscriptionDate(sub.id, date)}
                                    className="text-emerald-700 hover:underline font-bold text-[11px]"
                                    title="Resume this meal"
                                  >
                                    Resume
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Subscription Footer Actions */}
                    <div className="pt-4 border-t border-cream-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="text-charcoal-500">
                        Address: <strong>{sub.deliveryAddress}</strong>
                      </div>

                      {isActive && (
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => cancelSubscription(sub.id)}
                            className="text-red-600 hover:underline font-bold text-xs"
                          >
                            Cancel Plan (Demo)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Custom Food Request Form & History (Section 15) */}
      {activeTab === 'custom-requests' && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-warmOrange-600 bg-warmOrange-50 px-3 py-1 rounded-full border border-warmOrange-200">
              Kitchen Special Request
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-forest-900 font-sans tracking-tight mt-1">
              Custom Food Requests
            </h2>
            <p className="text-xs text-charcoal-500">
              Request home specialties, diet variations, extra seasonal vegetables, thepla, or sweets not currently listed on the daily menu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-cream-300 shadow-card space-y-4">
              <h3 className="text-sm font-extrabold text-charcoal-800 pb-3 border-b border-cream-200 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-warmOrange-500" />
                <span>Submit New Food Request</span>
              </h3>

              <form onSubmit={handleCustomRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">
                    Requested Dish / Accompaniment Name *
                  </label>
                  <input
                    type="text"
                    value={customItemName}
                    onChange={(e) => setCustomItemName(e.target.value)}
                    placeholder="E.g. Gujarati Methi Thepla, Moong Dal Halwa, Sarson Saag..."
                    required
                    className="w-full text-xs p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 mb-1">
                      Portion / Quantity
                    </label>
                    <input
                      type="text"
                      value={customQuantity}
                      onChange={(e) => setCustomQuantity(e.target.value)}
                      placeholder="e.g. 6 Pieces / Serves 2"
                      className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 mb-1">
                      Expected Price (₹ Optional)
                    </label>
                    <input
                      type="number"
                      value={customExpectedPrice}
                      onChange={(e) =>
                        setCustomExpectedPrice(e.target.value ? Number(e.target.value) : '')
                      }
                      placeholder="e.g. 150"
                      className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">
                    Preferred Delivery Time
                  </label>
                  <input
                    type="text"
                    value={customDeliveryTime}
                    onChange={(e) => setCustomDeliveryTime(e.target.value)}
                    placeholder="e.g. Tomorrow Lunch 1:00 PM"
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">
                    Special Cooking Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    placeholder="e.g. Jain preparation, no garlic/onion, mild spices, 100% whole wheat..."
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-warmOrange-500 hover:bg-warmOrange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-colors"
                >
                  Submit Custom Food Request
                </button>
              </form>
            </div>

            {/* Past Requests List */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-cream-300 shadow-card space-y-4">
              <h3 className="text-sm font-extrabold text-charcoal-800 pb-3 border-b border-cream-200">
                Your Request Status History ({customRequests.length})
              </h3>

              {customRequests.length === 0 ? (
                <p className="text-xs text-charcoal-500 text-center py-6">
                  You haven't requested any custom dishes yet.
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {customRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl border border-cream-200 bg-cream-50/50 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-charcoal-800 text-sm">{req.itemName}</h4>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                            req.status === 'Accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : req.status === 'Rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>

                      <p className="text-charcoal-600">
                        Qty: <strong>{req.quantity}</strong> • Preferred: <strong>{req.preferredDeliveryTime}</strong>
                      </p>

                      {req.instructions && (
                        <p className="text-charcoal-500 italic">
                          "{req.instructions}"
                        </p>
                      )}

                      {req.adminNote && (
                        <div className="p-2.5 rounded-xl bg-forest-50 border border-forest-100 text-forest-800 text-[11px]">
                          <strong>Kitchen Response:</strong> {req.adminNote}
                          {req.adminQuote && (
                            <span className="font-bold ml-2">Quote: ₹{req.adminQuote}</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Water Jars Tracking */}
      {activeTab === 'water-jars' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-cream-200">
            <div>
              <h2 className="text-xl font-black text-charcoal-900 font-sans">
                Drinking Water Jar Balance
              </h2>
              <p className="text-xs text-charcoal-500">
                FreshPure 20-Litre Jar refundable security deposit tracker
              </p>
            </div>
            <Link
              to="/water"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              Order More Water
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-100">
              <p className="text-xs font-bold text-sky-800">20L Jars in Possession</p>
              <p className="text-3xl font-black text-sky-900 mt-1">{user.jarsInPossession}</p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <p className="text-xs font-bold text-emerald-800">Refundable Deposit Value</p>
              <p className="text-3xl font-black text-emerald-900 mt-1">₹{user.jarsInPossession * 150}</p>
            </div>
            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200">
              <p className="text-xs font-bold text-charcoal-700">Per Jar Deposit Rate</p>
              <p className="text-3xl font-black text-charcoal-900 mt-1">₹150</p>
            </div>
          </div>

          <p className="text-xs text-charcoal-600 leading-relaxed">
            When ordering a new 20-litre water jar, you can simply exchange your empty jar with the delivery rider to waive the ₹150 deposit fee.
          </p>
        </div>
      )}

      {/* Tab 4: Address & Profile */}
      {activeTab === 'address' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6 max-w-2xl">
          <h2 className="text-xl font-black text-charcoal-900 font-sans pb-3 border-b border-cream-200">
            Delivery Profile & Address
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <p className="font-bold text-charcoal-700">Full Name</p>
              <p className="text-charcoal-900 text-sm font-semibold mt-0.5">{user.name}</p>
            </div>
            <div>
              <p className="font-bold text-charcoal-700">Phone</p>
              <p className="text-charcoal-900 text-sm font-mono mt-0.5">{user.phone}</p>
            </div>
            <div>
              <p className="font-bold text-charcoal-700">Email</p>
              <p className="text-charcoal-900 text-sm mt-0.5">{user.email}</p>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-charcoal-700">Default Delivery Address</p>
                {!editingAddress && (
                  <button
                    onClick={() => setEditingAddress(true)}
                    className="text-forest-600 font-bold hover:underline"
                  >
                    Edit Address
                  </button>
                )}
              </div>

              {editingAddress ? (
                <form onSubmit={handleSaveAddress} className="space-y-3">
                  <textarea
                    rows={3}
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border border-cream-300 text-xs bg-cream-50"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-forest-500 text-white font-bold px-4 py-2 rounded-xl text-xs"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAddress(false)}
                      className="bg-cream-100 text-charcoal-700 font-bold px-4 py-2 rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 text-charcoal-800 leading-relaxed">
                  {user.address}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
