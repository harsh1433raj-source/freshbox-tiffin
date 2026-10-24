import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mealPlans } from '../data/seedPlans';
import { PaymentMethodSelector } from '../components/common/PaymentLogos';
import { PaymentMethod } from '../types';
import {
  CalendarCheck2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronLeft
} from 'lucide-react';

export const SubscriptionCheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { createSubscription, user } = useApp();

  const planIdParam = (searchParams.get('plan') as 'basic' | 'standard' | 'premium') || 'standard';
  const initialMealPref = (searchParams.get('mealPref') as any) || 'Lunch & Dinner';
  const initialDiet = (searchParams.get('diet') as any) || 'Regular North Indian';

  const [selectedPlanId, setSelectedPlanId] = useState<'basic' | 'standard' | 'premium'>(planIdParam);
  const selectedPlan = mealPlans.find((p) => p.id === selectedPlanId) || mealPlans[1];

  // Form
  const [customerName, setCustomerName] = useState(user.name || '');
  const [customerPhone, setCustomerPhone] = useState(user.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user.email || '');
  const [deliveryAddress, setDeliveryAddress] = useState(user.address || '');
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [mealPreference, setMealPreference] = useState<'Lunch Only' | 'Dinner Only' | 'Lunch & Dinner'>(initialMealPref);
  const [dietaryPreference, setDietaryPreference] = useState<'Regular North Indian' | 'Strict Vegetarian' | 'Jain (No Onion/Garlic)' | 'Low Oil & Low Spice'>(initialDiet);
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateEndDate = (start: string, duration: number) => {
    const d = new Date(start);
    d.setDate(d.getDate() + duration + 4); // accounting for skipped Sundays or full duration
    return d.toISOString().split('T')[0];
  };

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.name = 'Please provide subscriber full name.';
    if (!customerPhone.trim() || customerPhone.length < 10) errs.phone = 'Valid phone number required.';
    if (!deliveryAddress.trim()) errs.address = 'Complete delivery address required.';
    if (!startDate) errs.date = 'Select plan start date.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const endDate = calculateEndDate(startDate, selectedPlan.durationDays);
      const totalMealsCount = selectedPlan.mealsPerDay * selectedPlan.durationDays;

      createSubscription({
        planId: selectedPlan.id,
        planName: `${selectedPlan.name} (${selectedPlan.durationDays} Days)`,
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress,
        startDate,
        endDate,
        mealPreference,
        dietaryPreference,
        status: 'active',
        pausedDates: [],
        totalMeals: totalMealsCount,
        specialNotes
      });

      setIsSubmitting(false);
      navigate('/account?tab=subscriptions');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Breadcrumb */}
      <div>
        <Link
          to="/subscriptions"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-600 hover:underline mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Subscription Plans</span>
        </Link>
        <span className="text-xs font-extrabold uppercase tracking-widest text-warmOrange-600 bg-warmOrange-50 px-3 py-1 rounded-full border border-warmOrange-200">
          Monthly Enrollment
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-forest-900 font-sans tracking-tight mt-1">
          Activate Your Monthly Tiffin Plan
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Separate monthly subscription onboarding • Demo simulated transaction
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* Plan Switcher */}
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-card space-y-3">
            <label className="block text-xs font-extrabold text-charcoal-700 uppercase tracking-wider">
              Selected Meal Plan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mealPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-forest-500 bg-forest-50/60 ring-2 ring-forest-500/20'
                        : 'border-cream-300 bg-white hover:bg-cream-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-charcoal-800">{plan.name}</span>
                      <span className="text-[10px] bg-cream-200 px-1.5 py-0.5 rounded font-mono">
                        {plan.durationDays}d
                      </span>
                    </div>
                    <p className="text-base font-black text-forest-700 mt-1">₹{plan.price}</p>
                    <p className="text-[11px] text-charcoal-500">{plan.mealsDescription}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer & Delivery Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-4">
            <h3 className="text-base font-extrabold text-charcoal-800 pb-3 border-b border-cream-200">
              Delivery Schedule & Customer Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Subscriber Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full text-sm p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-sm p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Complete Delivery Address *
              </label>
              <textarea
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Building name, flat number, street, landmark, area pincode"
                className="w-full text-sm p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
              />
              {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Subscription Start Date *
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50 font-semibold cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Meal Slot
                </label>
                <select
                  value={mealPreference}
                  onChange={(e) => setMealPreference(e.target.value as any)}
                  className="w-full text-sm p-2.5 rounded-xl border border-cream-300 font-semibold bg-cream-50/50 cursor-pointer"
                >
                  <option value="Lunch Only">Lunch Only (12:30 - 2:00 PM)</option>
                  <option value="Dinner Only">Dinner Only (7:30 - 9:30 PM)</option>
                  <option value="Lunch & Dinner">Both Lunch & Dinner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Dietary Style
                </label>
                <select
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value as any)}
                  className="w-full text-sm p-2.5 rounded-xl border border-cream-300 font-semibold bg-cream-50/50 cursor-pointer"
                >
                  <option value="Regular North Indian">Regular North Indian</option>
                  <option value="Strict Vegetarian">Strict Vegetarian</option>
                  <option value="Jain (No Onion/Garlic)">Jain (No Onion/Garlic)</option>
                  <option value="Low Oil & Low Spice">Low Oil & Low Spice</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Special Dietary Requests (Optional)
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="E.g. No green chillies, extra roasted rotis, prefer yellow dal"
                className="w-full text-sm p-3 rounded-xl border border-cream-300 bg-cream-50/50"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card">
            <h3 className="text-base font-extrabold text-charcoal-800 pb-3 border-b border-cream-200 mb-4">
              Select Demo Payment Method
            </h3>
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onSelect={(m) => setPaymentMethod(m)}
            />
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-card space-y-4">
            <h3 className="text-base font-extrabold text-charcoal-800 pb-3 border-b border-cream-200">
              Subscription Summary
            </h3>

            <div className="space-y-3 text-xs text-charcoal-600">
              <div className="p-3 bg-forest-50/70 rounded-2xl border border-forest-100">
                <p className="font-extrabold text-forest-800 text-sm">{selectedPlan.name}</p>
                <p className="text-[11px] text-forest-700 mt-0.5">{selectedPlan.mealsDescription}</p>
                <p className="text-[11px] text-charcoal-500 mt-1">
                  Start: <strong>{startDate}</strong> • Duration: <strong>{selectedPlan.durationDays} Days</strong>
                </p>
                <p className="text-[11px] text-charcoal-500">
                  Total Meals: <strong>{selectedPlan.mealsPerDay * selectedPlan.durationDays} Meals</strong>
                </p>
              </div>

              <div className="flex justify-between">
                <span>Monthly Plan Fee</span>
                <span className="font-bold text-charcoal-800">₹{selectedPlan.price}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Doorstep Delivery Charges</span>
                <span>FREE (Included)</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Packaging & Thermal Box</span>
                <span>FREE (Included)</span>
              </div>

              <div className="pt-3 border-t border-cream-200 flex items-baseline justify-between">
                <span className="font-black text-sm text-charcoal-900">Total Subscription</span>
                <span className="text-2xl font-black text-forest-700 font-sans">
                  ₹{selectedPlan.price}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleEnroll}
              disabled={isSubmitting}
              className="w-full bg-forest-500 hover:bg-forest-600 active:scale-98 text-white font-black text-sm sm:text-base py-4 px-6 rounded-2xl shadow-lg shadow-forest-500/25 flex items-center justify-center gap-2 transition-all mt-4"
            >
              <span>{isSubmitting ? 'Activating Subscription...' : `Activate Subscription • ₹${selectedPlan.price}`}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="p-3 bg-cream-50 rounded-xl text-center space-y-1">
              <p className="text-[11px] font-bold text-charcoal-700 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
                Frontend Demo Simulation
              </p>
              <p className="text-[10px] text-charcoal-500">
                You will be able to pause and resume individual meal dates right inside your account dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
