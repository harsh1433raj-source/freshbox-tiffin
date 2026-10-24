import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MealCard } from '../components/menu/MealCard';
import { ExtraCard } from '../components/menu/ExtraCard';
import { MealCategory, ExtraCategory } from '../types';
import {
  Search,
  Filter,
  ArrowUpDown,
  UtensilsCrossed,
  Sparkles,
  HelpCircle,
  PlusCircle,
  ChefHat
} from 'lucide-react';

const MEAL_CATEGORIES: (MealCategory | 'All')[] = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Tiffin Combos',
  'Extra Items',
  'Snacks',
  'Beverages',
  'Desserts'
];

const EXTRA_SUB_CATEGORIES: (ExtraCategory | 'All Extras')[] = [
  'All Extras',
  'Roti and Bread',
  'Rice and Grains',
  'Salad and Fresh Sides',
  'Raita and Curd',
  'Dal and Gravy',
  'Snacks and Accompaniments',
  'Dairy and Other Extras'
];

export const MenuPage: React.FC = () => {
  const { meals, extras } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = (searchParams.get('category') as MealCategory | 'All') || 'All';
  const [activeExtraSubCategory, setActiveExtraSubCategory] = useState<ExtraCategory | 'All Extras'>('All Extras');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const handleSelectCategory = (cat: MealCategory | 'All') => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Filter and sort meals
  const filteredMeals = useMemo(() => {
    let result = meals.filter((meal) => {
      if (activeCategory === 'Extra Items') return false; // Show extras only
      if (activeCategory !== 'All' && meal.category !== activeCategory) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = meal.name.toLowerCase().includes(query);
        const matchesHindi = meal.hindiName?.toLowerCase().includes(query);
        const matchesDesc = meal.description.toLowerCase().includes(query);
        const matchesTag = meal.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesHindi && !matchesDesc && !matchesTag) return false;
      }
      return true;
    });

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [meals, activeCategory, searchQuery, sortBy]);

  // Filter and sort extras
  const filteredExtras = useMemo(() => {
    // Show extras if category is 'All' or 'Extra Items'
    if (activeCategory !== 'All' && activeCategory !== 'Extra Items') return [];

    let result = extras.filter((extra) => {
      if (
        activeExtraSubCategory !== 'All Extras' &&
        extra.category !== activeExtraSubCategory
      ) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = extra.name.toLowerCase().includes(query);
        const matchesHindi = extra.hindiName?.toLowerCase().includes(query);
        const matchesDesc = extra.description.toLowerCase().includes(query);
        if (!matchesName && !matchesHindi && !matchesDesc) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [extras, activeCategory, activeExtraSubCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
          Pure Veg Homestyle Kitchen
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-forest-900 font-sans tracking-tight">
          Daily Food Menu
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Order for today without any subscription lock-in. Freshly prepared, perfectly portioned, and customized to your taste.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-cream-300 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search thali, paneer, rotis, salad, poha, raita..."
              className="w-full text-sm pl-10 pr-4 py-2.5 rounded-2xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-charcoal-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm font-semibold py-2.5 px-3 rounded-2xl border border-cream-300 bg-white text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-forest-500 cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {MEAL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-forest-500 text-white shadow-md shadow-forest-500/20'
                    : 'bg-cream-100 hover:bg-cream-200 text-charcoal-700 border border-cream-300/60'
                }`}
              >
                {cat === 'All' ? '🍽️ All Dishes' : cat}
              </button>
            );
          })}
        </div>

        {/* Extra Items Subcategory Pills (if viewing Extras or All) */}
        {(activeCategory === 'Extra Items' || activeCategory === 'All') && (
          <div className="pt-2 border-t border-cream-200">
            <p className="text-[11px] font-bold text-charcoal-500 mb-2 uppercase tracking-wider">
              Filter Extra Add-ons by Category:
            </p>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {EXTRA_SUB_CATEGORIES.map((sub) => {
                const isSubActive = activeExtraSubCategory === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setActiveExtraSubCategory(sub)}
                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      isSubActive
                        ? 'bg-warmOrange-500 text-white font-bold shadow-xs'
                        : 'bg-cream-50 hover:bg-cream-100 text-charcoal-600 border border-cream-300'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Dishes Grid */}
      {filteredMeals.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-forest-900 font-sans">
              Main Meals & Thalis
            </h2>
            <span className="text-xs text-charcoal-500 font-mono font-medium">
              {filteredMeals.length} dishes available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </section>
      )}

      {/* Dedicated Extras Section */}
      {filteredExtras.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-cream-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-warmOrange-100 text-warmOrange-800 px-2.5 py-0.5 rounded-md">
                  Add-on Section
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-forest-900 font-sans">
                  Make Your Meal Extra Special
                </h2>
              </div>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Roti, salad, raita, extra dal, snacks & sweets to complete your lunch or dinner box.
              </p>
            </div>
            <span className="text-xs text-charcoal-500 font-mono font-medium">
              {filteredExtras.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExtras.map((extra) => (
              <ExtraCard key={extra.id} extra={extra} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredMeals.length === 0 && filteredExtras.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-cream-300 space-y-4">
          <div className="w-16 h-16 rounded-full bg-cream-100 text-charcoal-400 flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-charcoal-800">
            No dishes found matching "{searchQuery}"
          </h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
            Try searching for something else or reset your category filters to view our full daily menu.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              handleSelectCategory('All');
              setActiveExtraSubCategory('All Extras');
            }}
            className="bg-forest-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Custom Food Request Banner */}
      <div className="bg-gradient-to-r from-warmOrange-50 to-cream-100 border-2 border-dashed border-warmOrange-300 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <ChefHat className="w-5 h-5 text-warmOrange-600" />
            <h3 className="text-lg sm:text-xl font-black text-charcoal-900">
              Want Something Not On Today's Menu?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl">
            Request custom dishes, diet meals (Jain, low-salt, special thepla, halwa, or seasonal greens). Our chefs review custom kitchen requests daily!
          </p>
        </div>
        <Link
          to="/account#custom-request"
          className="bg-warmOrange-500 hover:bg-warmOrange-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all shrink-0 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Request Custom Food</span>
        </Link>
      </div>
    </div>
  );
};
