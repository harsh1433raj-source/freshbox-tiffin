import { SubscriptionPlan } from '../types';

export const mealPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Daily Saver',
    badge: 'Essential',
    mealsPerDay: 1,
    mealsDescription: '1 Meal per Day (Lunch OR Dinner)',
    durationDays: 26,
    price: 2000,
    perMealPrice: 77,
    savingsBadge: 'Save ₹580/mo vs daily orders',
    features: [
      '26 Days Service (Mon - Sat)',
      'Choose Lunch (12:30 PM - 2:00 PM) OR Dinner (7:30 PM - 9:30 PM)',
      '4 Tawa Rotis + Dal + Seasonal Sabzi + Basmati Rice + Salad',
      'Free doorstep delivery in insulated hot bags',
      'Pause up to 4 days anytime with 1-click in account',
      'Weekly rotating nutritious menu with 0 repetition'
    ],
    deliverySlots: ['Lunch: 12:30 PM - 2:00 PM', 'Dinner: 7:30 PM - 9:30 PM']
  },
  {
    id: 'standard',
    name: 'Standard Twin Meal',
    badge: 'Most Popular',
    isPopular: true,
    mealsPerDay: 2,
    mealsDescription: '2 Meals per Day (Lunch AND Dinner)',
    durationDays: 26,
    price: 3800,
    perMealPrice: 73,
    savingsBadge: 'Save ₹1,400/mo — Top Value',
    features: [
      '26 Days Complete Nutritional Care (Mon - Sat)',
      'Both Lunch & Dinner delivered fresh on time',
      'Different sabzi & dal for lunch and dinner every single day',
      'Includes weekly Sweet or Boondi Raita upgrade',
      'Pause up to 6 meals per month with rollover credits',
      'Dedicated delivery executive for your apartment/office',
      'Option to customize spice level and oil preference'
    ],
    deliverySlots: ['Lunch (12:30 PM - 2:00 PM) + Dinner (7:30 PM - 9:30 PM)']
  },
  {
    id: 'premium',
    name: 'Premium All-Month Feast',
    badge: 'All-Inclusive 30 Days',
    mealsPerDay: 2,
    mealsDescription: '2 Meals per Day + Sunday Special Feasts',
    durationDays: 30,
    price: 4500,
    perMealPrice: 75,
    savingsBadge: 'Includes Sunday Special Dishes',
    features: [
      'Full 30 Days Service (All 7 Days including Sundays)',
      'Both Lunch & Dinner with Sunday Special Feasts (Chole Bhature/Biryani)',
      'Free Weekly Sweet Dish + Raita with every meal',
      'Unlimited meal pause & reschedule flexibility (prior day notice)',
      'Priority VIP kitchen preparation & fastest hot delivery slot',
      'Customized diet options: Jain, No Onion/Garlic, Low-Oil',
      'Complimentary 1-litre FreshPure mineral water bottle per day'
    ],
    deliverySlots: ['Lunch (12:30 PM - 2:00 PM) + Dinner (7:30 PM - 9:30 PM)']
  }
];

export const couponsList = [
  {
    code: 'FRESH10',
    discountType: 'percentage' as const,
    discountValue: 10,
    minOrderValue: 100,
    description: '10% OFF on all daily orders above ₹100',
    isActive: true
  },
  {
    code: 'WELCOME50',
    discountType: 'flat' as const,
    discountValue: 50,
    minOrderValue: 150,
    description: 'Flat ₹50 OFF on your first tiffin order above ₹150',
    isActive: true
  },
  {
    code: 'TIFFIN20',
    discountType: 'percentage' as const,
    discountValue: 20,
    minOrderValue: 300,
    description: '20% OFF on combo meal orders above ₹300',
    isActive: true
  }
];
