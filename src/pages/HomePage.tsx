import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MealCard } from '../components/menu/MealCard';
import { ExtraCard } from '../components/menu/ExtraCard';
import { mealPlans } from '../data/seedPlans';
import {
  UtensilsCrossed,
  CalendarCheck2,
  Droplets,
  Clock,
  ShieldCheck,
  Star,
  ChevronRight,
  Sparkles,
  Flame,
  CheckCircle,
  Truck,
  HeartHandshake,
  ArrowRight,
  Plus,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    meals,
    extras,
    waterItems,
    approvedFeedback,
    averageRating,
    totalApprovedReviews,
    addToCart
  } = useApp();
  const navigate = useNavigate();

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter bestselling meals
  const bestsellers = meals.filter((m) => m.isBestseller).slice(0, 4);
  const dailyCombos = meals.filter((m) => m.category === 'Lunch' || m.category === 'Dinner').slice(0, 4);

  // Selected featured extras (one from each popular category)
  const featuredExtras = extras.slice(0, 6);

  const faqs = [
    {
      q: 'How does daily tiffin ordering work without a monthly subscription?',
      a: 'You can order single-day meals just like standard food delivery! Browse our Daily Menu, select items, customize rotis or spices, and checkout. It is delivered hot to your doorstep within 30 to 40 minutes.'
    },
    {
      q: 'Can I customize the rotis, dal, or spice levels in my meal?',
      a: 'Yes! Click the "Customize" button on any eligible meal to select tawa vs butter rotis, steamed vs jeera rice, choice of dal, sabzi, curd/raita, and spice level. All customizations dynamically adjust the price.'
    },
    {
      q: 'How do monthly subscriptions work? Can I pause meals when traveling?',
      a: 'Our monthly plans run for 26 or 30 days. You can pause any upcoming meal date with one click in your Customer Account. Unused meals are rolled over as credits or extend your plan expiry.'
    },
    {
      q: 'Is there a deposit on the 20-Litre Water Jar?',
      a: 'Yes, a one-time refundable security deposit of ₹150 applies per jar unless you exchange an empty FreshPure jar with our delivery executive upon arrival.'
    },
    {
      q: 'Is this food prepared in a 100% pure vegetarian kitchen?',
      a: 'Absolutely. FreshBox Tiffin operates a dedicated, spotless 100% Pure Vegetarian kitchen with fresh daily produce, zero synthetic colors, and homestyle cooking methods.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-50 via-cream-100 to-cream-200 pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 border border-forest-200 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-warmOrange-500 animate-pulse"></span>
                <span className="text-xs font-bold text-forest-800 tracking-wide uppercase">
                  100% Pure Veg • Homestyle Cooking
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-forest-900 tracking-tight leading-[1.15] font-sans">
                Ghar Jaisa Khana, <br className="hidden sm:inline" />
                <span className="text-forest-600 underline decoration-warmOrange-400 decoration-wavy decoration-2">
                  Ab Aapke Darwaze Par.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-charcoal-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Freshly prepared meals, flexible monthly plans, and everyday essentials delivered with care. Clean ghee, soft tawa rotis, and soulful North Indian curries made daily.
              </p>

              {/* 3 Prominent CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  to="/menu"
                  className="bg-forest-500 hover:bg-forest-600 active:scale-95 text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg shadow-forest-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <UtensilsCrossed className="w-5 h-5 text-warmOrange-300" />
                  <span>Order Today's Tiffin</span>
                </Link>

                <Link
                  to="/subscriptions"
                  className="bg-warmOrange-500 hover:bg-warmOrange-600 active:scale-95 text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg shadow-warmOrange-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <CalendarCheck2 className="w-5 h-5" />
                  <span>Explore Monthly Plans</span>
                </Link>

                <Link
                  to="/water"
                  className="bg-white hover:bg-cream-100 border border-cream-400 text-charcoal-800 font-bold text-sm sm:text-base px-5 py-3.5 rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Droplets className="w-5 h-5 text-sky-500" />
                  <span>Shop Water</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-charcoal-600">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-4 h-4 text-forest-600" />
                  <span>Express 30-Min Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <Star className="w-4 h-4 fill-warmOrange-400 text-warmOrange-400" />
                  <span>{averageRating} / 5 Rating ({totalApprovedReviews} Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-forest-600" />
                  <span>Demo Mode Active</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-forest-300 to-warmOrange-300 rounded-3xl blur-2xl opacity-40"></div>

                {/* Main Hero Card */}
                <div className="relative bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-cream-300 overflow-hidden">
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80"
                      alt="FreshBox Special Thali"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-forest-900/90 backdrop-blur-xs text-cream-100 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-warmOrange-400" />
                      <span>Today's Chef Special</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-forest-900 font-extrabold text-xs px-3 py-1 rounded-xl shadow-md">
                      Starting @ ₹80
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-lg text-charcoal-800">
                        Special Shahi Veg Thali
                      </h3>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Hot & Ready
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-500">
                      4 Butter Rotis, Shahi Paneer, Dal Makhani, Jeera Rice, Boondi Raita & Gulab Jamun.
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xl font-black text-forest-700">₹120</span>
                      <button
                        onClick={() => navigate('/menu')}
                        className="bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                      >
                        <span>Order Now</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Badge */}
                <div className="hidden sm:flex absolute -bottom-4 left-4 bg-white rounded-2xl p-3 shadow-lift border border-cream-300 items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center text-forest-700 font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-charcoal-800">Zero Delivery Fee</p>
                    <p className="text-[10px] text-charcoal-500">On all orders above ₹149</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How FreshBox Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-warmOrange-600 bg-warmOrange-50 px-3 py-1 rounded-full border border-warmOrange-200">
            Simple & Seamless
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-forest-900 mt-2 font-sans tracking-tight">
            How FreshBox Tiffin Works
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-2">
            Enjoy healthy homestyle food without the daily hassle of meal preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Choose Meal or Plan',
              desc: 'Order a single daily tiffin or choose an economical monthly subscription that fits your routine.',
              icon: UtensilsCrossed,
              color: 'bg-emerald-50 text-emerald-700'
            },
            {
              step: '02',
              title: 'Customize Your Thali',
              desc: 'Choose roti count, butter vs plain, dal variant, spice levels, and favorite extra sides.',
              icon: Sparkles,
              color: 'bg-amber-50 text-amber-700'
            },
            {
              step: '03',
              title: 'Cooked Pure & Fresh',
              desc: 'Prepared in our spotless pure vegetarian kitchen with high quality grains and clean cooking oils.',
              icon: Flame,
              color: 'bg-rose-50 text-rose-700'
            },
            {
              step: '04',
              title: 'Hot Doorstep Drop',
              desc: 'Delivered in thermal insulated containers right on time for your lunch or dinner break.',
              icon: Truck,
              color: 'bg-sky-50 text-sky-700'
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-6 border border-cream-300 shadow-card hover:shadow-lift transition-all relative"
              >
                <span className="text-4xl font-black font-mono text-cream-400 absolute top-4 right-4">
                  {item.step}
                </span>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold mb-4 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-charcoal-800 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Daily Tiffin Section & Bestselling Meals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
              Today's Kitchen Menu
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-forest-900 mt-2 font-sans tracking-tight">
              Bestselling Daily Tiffins
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Order individual homestyle meals without any contract. Hot, balanced, and ready to eat.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest-600 hover:text-forest-700 bg-forest-50 hover:bg-forest-100 px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            <span>View Full 15+ Item Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </section>

      {/* 4. Dedicated Extra Add-ons Section: "Make Your Meal Extra Special" */}
      <section className="bg-forest-900 text-cream-100 py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-warmOrange-300 bg-forest-800 px-3 py-1 rounded-full border border-forest-700">
                Custom Accompaniments
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 font-sans tracking-tight">
                Make Your Meal Extra Special
              </h2>
              <p className="text-xs sm:text-sm text-forest-200 mt-1 max-w-xl">
                Add extra rotis, cooling raita, fresh green salad, homestyle dal, or sweet lassi. Buy alone or alongside your favorite tiffin!
              </p>
            </div>
            <Link
              to="/menu?category=Extra Items"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest-900 bg-warmOrange-400 hover:bg-warmOrange-300 px-4 py-2.5 rounded-xl shadow-md transition-colors shrink-0"
            >
              <span>Explore All 25+ Add-ons</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredExtras.map((extra) => (
              <div key={extra.id} className="text-charcoal-800">
                <ExtraCard extra={extra} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Monthly Subscription Section & Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-warmOrange-600 bg-warmOrange-50 px-3 py-1 rounded-full border border-warmOrange-200">
            Hassle-Free Monthly Eating
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-forest-900 mt-2 font-sans tracking-tight">
            Flexible Monthly Tiffin Plans
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-2">
            No cooking, no dishwashing, no daily ordering. Pause meals anytime when traveling.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {mealPlans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all relative ${
                  plan.isPopular
                    ? 'border-warmOrange-500 shadow-xl scale-102 ring-4 ring-warmOrange-100'
                    : 'border-cream-300 shadow-card hover:shadow-lift'
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-warmOrange-500 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-forest-600 bg-forest-50 px-2.5 py-1 rounded-md">
                      {plan.badge}
                    </span>
                    <span className="text-xs font-semibold text-charcoal-400">
                      {plan.durationDays} Days Plan
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-charcoal-800">
                    {plan.name}
                  </h3>
                  <p className="text-xs font-medium text-forest-600 mt-0.5">
                    {plan.mealsDescription}
                  </p>

                  <div className="mt-4 pt-4 border-t border-cream-200 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-forest-900 font-sans">
                      ₹{plan.price}
                    </span>
                    <span className="text-xs text-charcoal-400">/ month (₹{plan.perMealPrice}/meal)</span>
                  </div>

                  <p className="text-[11px] font-bold text-warmOrange-600 bg-warmOrange-50 px-2 py-1 rounded mt-2">
                    {plan.savingsBadge}
                  </p>

                  <ul className="mt-6 space-y-3 text-xs text-charcoal-600">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-forest-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-cream-200">
                  <button
                    onClick={() => navigate(`/subscription-checkout?plan=${plan.id}`)}
                    className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      plan.isPopular
                        ? 'bg-warmOrange-500 hover:bg-warmOrange-600 text-white shadow-warmOrange-500/25'
                        : 'bg-forest-500 hover:bg-forest-600 text-white shadow-forest-500/20'
                    }`}
                  >
                    <span>Subscribe to {plan.name.split(' ')[0]}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Plan Comparison Table */}
        <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-card overflow-hidden">
          <h3 className="text-lg sm:text-xl font-black text-forest-900 mb-6 font-sans">
            Detailed Subscription Plan Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-cream-300 text-charcoal-500 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 text-center">Basic Saver</th>
                  <th className="py-3 px-4 text-center bg-warmOrange-50/50 text-warmOrange-800">
                    Standard Twin
                  </th>
                  <th className="py-3 px-4 text-center">Premium Feast</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200 text-charcoal-700">
                <tr>
                  <td className="py-3 px-4 font-bold">Monthly Price</td>
                  <td className="py-3 px-4 text-center font-bold text-forest-700">₹2,000</td>
                  <td className="py-3 px-4 text-center font-bold text-warmOrange-600 bg-warmOrange-50/30">
                    ₹3,800
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-forest-700">₹4,500</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Meals per Day</td>
                  <td className="py-3 px-4 text-center">1 (Lunch or Dinner)</td>
                  <td className="py-3 px-4 text-center bg-warmOrange-50/30 font-semibold">
                    2 (Lunch & Dinner)
                  </td>
                  <td className="py-3 px-4 text-center font-semibold">2 + Sunday Feasts</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Monthly Duration</td>
                  <td className="py-3 px-4 text-center">26 Days</td>
                  <td className="py-3 px-4 text-center bg-warmOrange-50/30">26 Days</td>
                  <td className="py-3 px-4 text-center">30 Days (Full Month)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Meal Pause Flexibility</td>
                  <td className="py-3 px-4 text-center">Up to 4 Days</td>
                  <td className="py-3 px-4 text-center bg-warmOrange-50/30">Up to 6 Days</td>
                  <td className="py-3 px-4 text-center text-forest-600 font-bold">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Sunday Special Feasts</td>
                  <td className="py-3 px-4 text-center text-charcoal-400">—</td>
                  <td className="py-3 px-4 text-center text-charcoal-400 bg-warmOrange-50/30">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Included</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Daily Free Mineral Water</td>
                  <td className="py-3 px-4 text-center text-charcoal-400">—</td>
                  <td className="py-3 px-4 text-center text-charcoal-400 bg-warmOrange-50/30">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">1L Bottle / Day</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Drinking Water Store Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-900 to-sky-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-sky-700/80 text-sky-200 text-xs font-bold px-3 py-1 rounded-full">
                <Droplets className="w-3.5 h-3.5 text-sky-300" />
                <span>Pure RO + UV + Essential Minerals</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-sans tracking-tight">
                FreshPure Drinking Water Store
              </h2>
              <p className="text-xs sm:text-sm text-sky-100 max-w-lg leading-relaxed">
                Order 500ml, 1L, 2L bottles alongside your food, or set up a recurring 20-Litre Jar subscription for home & office with refundable jar deposits.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/water"
                  className="bg-white hover:bg-sky-50 text-sky-900 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2"
                >
                  <Droplets className="w-4 h-4 text-sky-600" />
                  <span>Shop Drinking Water</span>
                </Link>
                <Link
                  to="/water#jar-subscription"
                  className="bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-sky-500 transition-colors"
                >
                  <span>20L Monthly Delivery Plans</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-charcoal-800">
              {waterItems.slice(0, 2).map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-3 shadow-md flex flex-col justify-between">
                  <div className="h-28 rounded-xl overflow-hidden bg-sky-50 mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-800 truncate">{item.name}</h4>
                    <p className="text-xs font-black text-forest-700 mt-0.5">₹{item.price}</p>
                  </div>
                  <button
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
                    className="mt-2 w-full bg-forest-500 hover:bg-forest-600 text-white font-bold text-[11px] py-1.5 rounded-lg flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Approved Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
                Verified Feedback
              </span>
              <div className="flex items-center gap-1 text-xs font-extrabold text-charcoal-700 bg-white px-2 py-0.5 rounded-lg border border-cream-300">
                <Star className="w-3.5 h-3.5 fill-warmOrange-400 text-warmOrange-400" />
                <span>{averageRating} / 5</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-forest-900 mt-2 font-sans tracking-tight">
              Loved by Thousands of Diners
            </h2>
          </div>
          <Link
            to="/feedback"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest-600 hover:underline"
          >
            <span>Write a Review</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {approvedFeedback.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-cream-300">
            <p className="text-sm text-charcoal-500">
              No approved reviews yet. Submit your feedback to see it here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approvedFeedback.slice(0, 4).map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-cream-300 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-warmOrange-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-warmOrange-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-charcoal-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-extrabold text-charcoal-800">{rev.customerName}</p>
                    <p className="text-[10px] text-charcoal-400 font-mono">
                      Order #{rev.orderId}
                    </p>
                  </div>
                  <span className="text-[10px] bg-forest-50 text-forest-700 font-bold px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 8. Frequently Asked Questions (FAQ Accordion) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 mt-2 font-sans">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-cream-300 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-charcoal-800 flex items-center justify-between gap-4"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-forest-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-charcoal-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-forest-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-charcoal-600 leading-relaxed border-t border-cream-200 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
