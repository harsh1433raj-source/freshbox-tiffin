import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mealPlans } from '../data/seedPlans';
import { useApp } from '../context/AppContext';
import {
  CalendarCheck2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PauseCircle,
  HelpCircle,
  UtensilsCrossed,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const SubscriptionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { subscriptions } = useApp();

  const [selectedPlanId, setSelectedPlanId] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [mealPreference, setMealPreference] = useState<'Lunch Only' | 'Dinner Only' | 'Lunch & Dinner'>('Lunch & Dinner');
  const [dietaryPref, setDietaryPref] = useState<'Regular North Indian' | 'Strict Vegetarian' | 'Jain (No Onion/Garlic)' | 'Low Oil & Low Spice'>('Regular North Indian');

  const selectedPlan = mealPlans.find((p) => p.id === selectedPlanId) || mealPlans[1];

  const handleProceedToEnroll = () => {
    navigate(`/subscription-checkout?plan=${selectedPlanId}&mealPref=${encodeURIComponent(mealPreference)}&diet=${encodeURIComponent(dietaryPref)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-warmOrange-600 bg-warmOrange-50 px-3.5 py-1 rounded-full border border-warmOrange-200">
          Zero Daily Hassle • Monthly Savings
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-forest-900 font-sans tracking-tight">
          Monthly Tiffin Subscriptions
        </h1>
        <p className="text-xs sm:text-base text-charcoal-600 leading-relaxed">
          Nutritious homestyle meals delivered hot on schedule every day. Flexible meal pausing, zero delivery charges, and customizable dietary preferences.
        </p>

        {subscriptions.length > 0 && (
          <div className="pt-2">
            <Link
              to="/account"
              className="inline-flex items-center gap-2 text-xs font-bold text-forest-700 bg-forest-50 hover:bg-forest-100 border border-forest-200 px-4 py-2 rounded-xl transition-colors"
            >
              <span>You have {subscriptions.length} active subscription(s) • Manage or Pause Meals</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {mealPlans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`cursor-pointer rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all relative ${
                isSelected
                  ? 'border-forest-500 bg-white shadow-xl ring-4 ring-forest-500/15'
                  : 'border-cream-300 bg-white/80 hover:border-cream-400 shadow-card hover:shadow-lift'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-warmOrange-500 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-forest-700 bg-forest-50 px-2.5 py-1 rounded-lg">
                    {plan.badge}
                  </span>
                  <span className="text-xs font-semibold text-charcoal-500">
                    {plan.durationDays} Days / Month
                  </span>
                </div>

                <h3 className="text-2xl font-black text-charcoal-800">
                  {plan.name}
                </h3>
                <p className="text-xs font-medium text-forest-600 mt-0.5">
                  {plan.mealsDescription}
                </p>

                <div className="mt-4 pt-4 border-t border-cream-200 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-forest-900 font-sans">
                    ₹{plan.price}
                  </span>
                  <span className="text-xs text-charcoal-400">/ 1 month</span>
                </div>

                <div className="mt-2 text-xs font-bold text-warmOrange-600 bg-warmOrange-50 px-2.5 py-1 rounded-md inline-block">
                  {plan.savingsBadge} (approx ₹{plan.perMealPrice} per meal)
                </div>

                <ul className="mt-6 space-y-3 text-xs text-charcoal-600">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-cream-200">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlanId(plan.id);
                    navigate(`/subscription-checkout?plan=${plan.id}&mealPref=${encodeURIComponent(mealPreference)}&diet=${encodeURIComponent(dietaryPref)}`);
                  }}
                  className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    isSelected
                      ? 'bg-forest-500 hover:bg-forest-600 text-white shadow-forest-500/20'
                      : 'bg-cream-100 hover:bg-forest-500 hover:text-white text-forest-800'
                  }`}
                >
                  <span>Select & Setup Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quick Configurator Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-cream-200">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-charcoal-800">
              Customize Your Selected Plan: {selectedPlan.name}
            </h3>
            <p className="text-xs text-charcoal-500">
              Choose your delivery slots and dietary style prior to checkout.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meal Preference */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold text-charcoal-700 uppercase tracking-wider">
              Preferred Meal Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['Lunch Only', 'Dinner Only', 'Lunch & Dinner'] as const).map((slot) => {
                const isActive = mealPreference === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setMealPreference(slot)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      isActive
                        ? 'border-forest-500 bg-forest-50 text-forest-700 shadow-xs'
                        : 'border-cream-300 bg-cream-50/50 text-charcoal-600 hover:bg-cream-100'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dietary Preference */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold text-charcoal-700 uppercase tracking-wider">
              Dietary Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(
                [
                  'Regular North Indian',
                  'Strict Vegetarian',
                  'Jain (No Onion/Garlic)',
                  'Low Oil & Low Spice'
                ] as const
              ).map((diet) => {
                const isActive = dietaryPref === diet;
                return (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => setDietaryPref(diet)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      isActive
                        ? 'border-forest-500 bg-forest-50 text-forest-700 shadow-xs'
                        : 'border-cream-300 bg-cream-50/50 text-charcoal-600 hover:bg-cream-100'
                    }`}
                  >
                    {diet}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="pt-4 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-charcoal-500">Selected Plan Total:</p>
            <p className="text-2xl font-black text-forest-900 font-sans">
              ₹{selectedPlan.price}{' '}
              <span className="text-xs font-normal text-charcoal-500">
                (includes all delivery & packaging)
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleProceedToEnroll}
            className="w-full sm:w-auto bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-forest-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Proceed to Subscription Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subscription Features & Pause Flexibility FAQ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-600 flex items-center justify-center font-bold">
            <PauseCircle className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-sm text-charcoal-800">
            Pause Meals Anytime
          </h4>
          <p className="text-xs text-charcoal-500 leading-relaxed">
            Going out of town? Simply mark your pause dates in your account dashboard by 8:00 AM. Your subscription automatically extends!
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-warmOrange-50 text-warmOrange-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-sm text-charcoal-800">
            Zero Repetition Menu
          </h4>
          <p className="text-xs text-charcoal-500 leading-relaxed">
            Our chefs rotate seasonal vegetables, authentic dals, and grains every week so you always enjoy fresh, exciting flavours.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-sm text-charcoal-800">
            Simulated Demo Checkout
          </h4>
          <p className="text-xs text-charcoal-500 leading-relaxed">
            No real credit card or recurring auto-debit. All demo subscriptions are safely stored in your browser's localStorage.
          </p>
        </div>
      </div>
    </div>
  );
};
