export type MealCategory =
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Snacks'
  | 'Beverages'
  | 'Tiffin Combos'
  | 'Extra Items'
  | 'Desserts';

export type ExtraCategory =
  | 'Roti and Bread'
  | 'Rice and Grains'
  | 'Salad and Fresh Sides'
  | 'Raita and Curd'
  | 'Dal and Gravy'
  | 'Snacks and Accompaniments'
  | 'Dairy and Other Extras';

export interface MealCustomization {
  rotiChoice: string;
  rotiPrice: number;
  riceChoice: string;
  ricePrice: number;
  dalChoice: string;
  dalPrice: number;
  sabziChoice: string;
  sabziPrice: number;
  raitaChoice: string;
  raitaPrice: number;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy' | 'Desi Spicy';
  instructions: string;
  totalCustomizationAddon: number;
}

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  price: number;
  category: MealCategory;
  isVeg: boolean;
  portion: string;
  calories?: string;
  image: string;
  isCustomizable: boolean;
  isBestseller?: boolean;
  isAvailable: boolean;
  rating: number;
  tags?: string[];
}

export interface ExtraItem {
  id: string;
  name: string;
  hindiName?: string;
  category: ExtraCategory;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  unit: string;
  calories?: string;
}

export interface WaterItem {
  id: string;
  name: string;
  size: '500 ml' | '1 Litre' | '2 Litre' | '20 Litre Jar';
  price: number;
  deposit?: number; // refundable deposit for jars
  description: string;
  image: string;
  isAvailable: boolean;
  bulkDiscount?: string;
}

export interface WaterSubscriptionPlan {
  id: string;
  title: string;
  bottleSize: string;
  quantityPerDelivery: number;
  frequency: 'Daily' | 'Alternate Days' | '3 Times a Week' | 'Weekly';
  priceMonthly: number;
  jarDeposit: number;
  description: string;
  features: string[];
}

export interface CartItem {
  cartItemId: string; // unique item id in cart
  productId: string;
  type: 'meal' | 'extra' | 'water';
  name: string;
  hindiName?: string;
  price: number; // calculated item unit price (base + custom addons)
  basePrice: number;
  quantity: number;
  image: string;
  portion?: string;
  customization?: MealCustomization;
  deposit?: number;
}

export interface SubscriptionPlan {
  id: 'basic' | 'standard' | 'premium';
  name: string;
  badge?: string;
  mealsPerDay: number;
  mealsDescription: string;
  durationDays: number;
  price: number;
  perMealPrice: number;
  features: string[];
  isPopular?: boolean;
  savingsBadge: string;
  deliverySlots: string[];
}

export interface ActiveSubscription {
  id: string;
  planId: 'basic' | 'standard' | 'premium';
  planName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  startDate: string;
  endDate: string;
  mealPreference: 'Lunch Only' | 'Dinner Only' | 'Lunch & Dinner';
  dietaryPreference: 'Regular North Indian' | 'Strict Vegetarian' | 'Jain (No Onion/Garlic)' | 'Low Oil & Low Spice';
  status: 'active' | 'paused' | 'cancelled';
  pausedDates: string[]; // dates when meals are paused
  renewalDate: string;
  mealsRemaining: number;
  totalMeals: number;
  specialNotes?: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Preparing Food'
  | 'Ready for Pickup'
  | 'Out for Delivery'
  | 'Delivered';

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  address: string;
  landmark?: string;
  instructions?: string;
  deliverySlot: string;
}

export type PaymentMethod =
  | 'Razorpay'
  | 'UPI'
  | 'Google Pay'
  | 'PhonePe'
  | 'Paytm'
  | 'Visa'
  | 'Mastercard'
  | 'Cash on Delivery';

export interface Order {
  id: string; // e.g. FB-2026-10001
  createdAt: string;
  items: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  tax: number;
  jarDepositTotal: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Demo Confirmed (Simulated)' | 'Cash Pending on Delivery';
  orderStatus: OrderStatus;
  statusHistory: OrderStatusHistoryItem[];
  estimatedDelivery: string;
  deliveryAgent?: {
    name: string;
    phone: string;
    vehicleNumber: string;
  };
}

export interface Feedback {
  id: string;
  orderId: string;
  customerName: string;
  rating: number; // 1-5
  foodQualityRating: number;
  tasteRating: number;
  deliveryRating: number;
  comment: string;
  suggestions?: string;
  mealReviewed?: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'hidden';
}

export interface CustomFoodRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  itemName: string;
  quantity: string;
  expectedPrice?: number;
  preferredDeliveryTime: string;
  instructions: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  adminQuote?: number;
  adminNote?: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  description: string;
  isActive: boolean;
}

export interface DeliveryZone {
  areaName: string;
  pincode: string;
  deliveryFee: number;
  avgTimeMinutes: number;
  isEligible30Min: boolean;
}
