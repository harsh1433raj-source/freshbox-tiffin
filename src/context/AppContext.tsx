import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  ExtraItem,
  WaterItem,
  CartItem,
  Order,
  OrderStatus,
  Feedback,
  ActiveSubscription,
  CustomFoodRequest,
  CustomerDetails,
  PaymentMethod,
  Coupon,
  MealCustomization
} from '../types';
import { initialMeals } from '../data/seedMeals';
import { initialExtras } from '../data/seedExtras';
import { initialWaterItems } from '../data/seedWater';
import { couponsList } from '../data/seedPlans';
import { initialFeedbackList } from '../data/seedFeedback';
import { initialOrders } from '../data/seedOrders';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface DemoUser {
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  isLoggedIn: boolean;
  jarsInPossession: number;
}

interface AppContextType {
  // Products
  meals: MenuItem[];
  extras: ExtraItem[];
  waterItems: WaterItem[];
  addMeal: (meal: Omit<MenuItem, 'id'>) => void;
  updateMeal: (id: string, updated: Partial<MenuItem>) => void;
  deleteMeal: (id: string) => void;
  toggleMealAvailability: (id: string) => void;
  addExtra: (extra: Omit<ExtraItem, 'id'>) => void;
  updateExtra: (id: string, updated: Partial<ExtraItem>) => void;
  deleteExtra: (id: string) => void;
  updateWaterItem: (id: string, updated: Partial<WaterItem>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartTotals: {
    subtotal: number;
    discount: number;
    deliveryFee: number;
    tax: number;
    jarDepositTotal: number;
    total: number;
    itemCount: number;
  };

  // Orders
  orders: Order[];
  placeOrder: (
    customer: CustomerDetails,
    paymentMethod: PaymentMethod
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  advanceOrderStatus: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Subscriptions
  subscriptions: ActiveSubscription[];
  createSubscription: (sub: Omit<ActiveSubscription, 'id' | 'renewalDate' | 'mealsRemaining'>) => ActiveSubscription;
  pauseSubscriptionDate: (subId: string, dateStr: string) => void;
  resumeSubscriptionDate: (subId: string, dateStr: string) => void;
  cancelSubscription: (subId: string) => void;
  updateSubscriptionPlan: (subId: string, newPlanId: 'basic' | 'standard' | 'premium', newPlanName: string) => void;

  // Feedback & Reviews
  feedbackList: Feedback[];
  approvedFeedback: Feedback[];
  averageRating: number;
  totalApprovedReviews: number;
  addFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt' | 'status'>) => void;
  updateFeedbackStatus: (id: string, status: 'approved' | 'pending' | 'hidden') => void;

  // Custom Food Requests
  customRequests: CustomFoodRequest[];
  submitCustomRequest: (req: Omit<CustomFoodRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateCustomRequestStatus: (id: string, status: 'Pending' | 'Accepted' | 'Rejected', note?: string, quote?: number) => void;

  // User Auth
  user: DemoUser;
  loginUser: (name: string, phone: string, email: string, address: string) => void;
  logoutUser: () => void;
  updateUserAddress: (address: string, landmark?: string) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Reset
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper for safe localStorage access
const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
  }
  return fallback;
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};

const ORDER_STAGES: OrderStatus[] = [
  'Order Placed',
  'Confirmed',
  'Preparing Food',
  'Ready for Pickup',
  'Out for Delivery',
  'Delivered'
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products
  const [meals, setMeals] = useState<MenuItem[]>(() =>
    loadFromStorage('freshbox_meals_v2', initialMeals)
  );
  const [extras, setExtras] = useState<ExtraItem[]>(() =>
    loadFromStorage('freshbox_extras_v2', initialExtras)
  );
  const [waterItems, setWaterItems] = useState<WaterItem[]>(() =>
    loadFromStorage('freshbox_water_v2', initialWaterItems)
  );

  // 2. Cart
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage('freshbox_cart_v2', [])
  );
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() =>
    loadFromStorage('freshbox_coupon_v2', null)
  );

  // 3. Orders
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage('freshbox_orders_v2', initialOrders)
  );

  // 4. Subscriptions
  const initialSubs: ActiveSubscription[] = [
    {
      id: 'SUB-2026-8001',
      planId: 'standard',
      planName: 'Standard Twin Meal (26 Days)',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98765 43210',
      customerEmail: 'rahul.sharma@example.com',
      deliveryAddress: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru',
      startDate: '2026-10-15',
      endDate: '2026-11-15',
      mealPreference: 'Lunch & Dinner',
      dietaryPreference: 'Regular North Indian',
      status: 'active',
      pausedDates: ['2026-10-28'],
      renewalDate: '2026-11-15',
      mealsRemaining: 34,
      totalMeals: 52,
      specialNotes: 'Less oily gravies preferred.'
    }
  ];
  const [subscriptions, setSubscriptions] = useState<ActiveSubscription[]>(() =>
    loadFromStorage('freshbox_subscriptions_v2', initialSubs)
  );

  // 5. Feedback
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(() =>
    loadFromStorage('freshbox_feedback_v2', initialFeedbackList)
  );

  // 6. Custom Requests
  const initialRequests: CustomFoodRequest[] = [
    {
      id: 'REQ-101',
      customerName: 'Aarav Sharma',
      customerPhone: '+91 98765 43210',
      itemName: 'Methi Thepla with Chhundo (Gujarati Style)',
      quantity: '6 Pieces with Sweet Mango Chutney',
      expectedPrice: 120,
      preferredDeliveryTime: 'Tomorrow Breakfast (8:30 AM)',
      instructions: 'Thinly rolled, light oil, pure whole wheat flour.',
      status: 'Pending',
      createdAt: '2026-10-23T16:00:00Z'
    }
  ];
  const [customRequests, setCustomRequests] = useState<CustomFoodRequest[]>(() =>
    loadFromStorage('freshbox_custom_requests_v2', initialRequests)
  );

  // 7. User
  const defaultUser: DemoUser = {
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    address: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru',
    landmark: 'Near EcoSpace Tech Park Gate 2',
    isLoggedIn: true,
    jarsInPossession: 1
  };
  const [user, setUser] = useState<DemoUser>(() =>
    loadFromStorage('freshbox_user_v2', defaultUser)
  );

  // 8. Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to storage
  useEffect(() => saveToStorage('freshbox_meals_v2', meals), [meals]);
  useEffect(() => saveToStorage('freshbox_extras_v2', extras), [extras]);
  useEffect(() => saveToStorage('freshbox_water_v2', waterItems), [waterItems]);
  useEffect(() => saveToStorage('freshbox_cart_v2', cart), [cart]);
  useEffect(() => saveToStorage('freshbox_coupon_v2', appliedCoupon), [appliedCoupon]);
  useEffect(() => saveToStorage('freshbox_orders_v2', orders), [orders]);
  useEffect(() => saveToStorage('freshbox_subscriptions_v2', subscriptions), [subscriptions]);
  useEffect(() => saveToStorage('freshbox_feedback_v2', feedbackList), [feedbackList]);
  useEffect(() => saveToStorage('freshbox_custom_requests_v2', customRequests), [customRequests]);
  useEffect(() => saveToStorage('freshbox_user_v2', user), [user]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Cart Management ---
  const addToCart = (newItem: Omit<CartItem, 'cartItemId'>) => {
    setCart((prev) => {
      // Helper to test customization equivalence
      const areCustomizationsEqual = (
        c1?: MealCustomization,
        c2?: MealCustomization
      ) => {
        if (!c1 && !c2) return true;
        if (!c1 || !c2) return false;
        return (
          c1.rotiChoice === c2.rotiChoice &&
          c1.riceChoice === c2.riceChoice &&
          c1.dalChoice === c2.dalChoice &&
          c1.sabziChoice === c2.sabziChoice &&
          c1.raitaChoice === c2.raitaChoice &&
          c1.spiceLevel === c2.spiceLevel &&
          c1.instructions === c2.instructions
        );
      };

      const existingIndex = prev.findIndex((item) => {
        if (item.productId !== newItem.productId) return false;
        if (item.type === 'meal' && (item.customization || newItem.customization)) {
          return areCustomizationsEqual(item.customization, newItem.customization);
        }
        return true;
      });

      if (existingIndex > -1) {
        // Increment quantity of existing item to avoid duplicate entries
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      } else {
        const cartItemId = `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        return [...prev, { ...newItem, cartItemId }];
      }
    });

    showToast(`Added ${newItem.name} to cart!`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = couponsList.find((c) => c.code === trimmed && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    const currentSubtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (currentSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Coupon applies only on orders above ₹${found.minOrderValue}.`
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return { success: true, message: `Applied ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Cart Totals calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const jarDepositTotal = cart.reduce((sum, item) => sum + (item.deposit || 0) * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  // Free delivery above ₹149, else ₹30
  const deliveryFee = subtotal === 0 || subtotal >= 149 ? 0 : 30;
  // 5% standard GST on food items
  const tax = subtotal > 0 ? Math.round((subtotal - discount) * 0.05) : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee + tax + jarDepositTotal);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // --- Order Placement ---
  const placeOrder = (
    customer: CustomerDetails,
    paymentMethod: PaymentMethod
  ): Order => {
    const nextNum = 10000 + orders.length + 1;
    const orderId = `FB-2026-${nextNum}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: orderId,
      createdAt: now.toISOString(),
      items: [...cart],
      customer,
      subtotal,
      discount,
      couponCode: appliedCoupon?.code,
      deliveryFee,
      tax,
      jarDepositTotal,
      total,
      paymentMethod,
      paymentStatus:
        paymentMethod === 'Cash on Delivery'
          ? 'Cash Pending on Delivery'
          : 'Demo Confirmed (Simulated)',
      orderStatus: 'Order Placed',
      statusHistory: [
        {
          status: 'Order Placed',
          timestamp: timeStr,
          note: `Order received. Payment method: ${paymentMethod} (Demo Mode).`
        }
      ],
      estimatedDelivery: '30-40 mins (Priority Express)',
      deliveryAgent: {
        name: 'Suresh Kumar',
        phone: '+91 98111 22334',
        vehicleNumber: 'KA-01-HG-4589'
      }
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${orderId} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    newStatus: OrderStatus,
    note?: string
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const defaultNoteMap: Record<OrderStatus, string> = {
          'Order Placed': 'Order placed by customer.',
          'Confirmed': 'Kitchen acknowledged order & assigned master chef.',
          'Preparing Food': 'Piping hot food being prepared with fresh ingredients.',
          'Ready for Pickup': 'Quality-inspected, packed in hygienic tamper-proof box.',
          'Out for Delivery': 'Delivery partner has picked up your package & is on the way.',
          'Delivered': 'Order successfully delivered. Enjoy your meal!'
        };

        const historyItem = {
          status: newStatus,
          timestamp: timeStr,
          note: note || defaultNoteMap[newStatus]
        };

        return {
          ...order,
          orderStatus: newStatus,
          statusHistory: [...order.statusHistory, historyItem],
          paymentStatus:
            newStatus === 'Delivered' && order.paymentMethod === 'Cash on Delivery'
              ? 'Demo Confirmed (Simulated)'
              : order.paymentStatus
        };
      })
    );

    showToast(`Order #${orderId} updated to: ${newStatus}`, 'info');
  };

  const advanceOrderStatus = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;
    const currentIndex = ORDER_STAGES.indexOf(target.orderStatus);
    if (currentIndex < ORDER_STAGES.length - 1) {
      const nextStatus = ORDER_STAGES[currentIndex + 1];
      updateOrderStatus(orderId, nextStatus);
    } else {
      showToast('Order is already at the final Delivered stage!', 'info');
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
  };

  // --- Subscriptions ---
  const createSubscription = (
    sub: Omit<ActiveSubscription, 'id' | 'renewalDate' | 'mealsRemaining'>
  ): ActiveSubscription => {
    const nextSubNum = 8000 + subscriptions.length + 1;
    const id = `SUB-2026-${nextSubNum}`;
    const newSub: ActiveSubscription = {
      ...sub,
      id,
      renewalDate: sub.endDate,
      mealsRemaining: sub.totalMeals
    };

    setSubscriptions((prev) => [newSub, ...prev]);
    showToast(`Subscribed to ${sub.planName}! Demo order activated.`, 'success');
    return newSub;
  };

  const pauseSubscriptionDate = (subId: string, dateStr: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id !== subId) return s;
        if (s.pausedDates.includes(dateStr)) return s;
        return { ...s, pausedDates: [...s.pausedDates, dateStr] };
      })
    );
    showToast(`Meal on ${dateStr} has been paused. Credit added to your account!`, 'info');
  };

  const resumeSubscriptionDate = (subId: string, dateStr: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id !== subId) return s;
        return {
          ...s,
          pausedDates: s.pausedDates.filter((d) => d !== dateStr)
        };
      })
    );
    showToast(`Meal on ${dateStr} resumed!`, 'success');
  };

  const cancelSubscription = (subId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'cancelled' } : s))
    );
    showToast(`Subscription #${subId} has been cancelled (Demo).`, 'warning');
  };

  const updateSubscriptionPlan = (
    subId: string,
    newPlanId: 'basic' | 'standard' | 'premium',
    newPlanName: string
  ) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, planId: newPlanId, planName: newPlanName } : s))
    );
    showToast(`Subscription plan updated to ${newPlanName}!`, 'success');
  };

  // --- Feedback ---
  const addFeedback = (
    feedback: Omit<Feedback, 'id' | 'createdAt' | 'status'>
  ) => {
    const newFeedback: Feedback = {
      ...feedback,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending' // Demo admin can approve to display on homepage
    };

    setFeedbackList((prev) => [newFeedback, ...prev]);
    showToast('Feedback submitted successfully! Awaiting demo admin review.', 'success');
  };

  const updateFeedbackStatus = (
    id: string,
    status: 'approved' | 'pending' | 'hidden'
  ) => {
    setFeedbackList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
    showToast(`Review status updated to: ${status}`, 'info');
  };

  const approvedFeedback = feedbackList.filter((f) => f.status === 'approved');
  const totalApprovedReviews = approvedFeedback.length;
  const averageRating =
    totalApprovedReviews > 0
      ? Number(
          (
            approvedFeedback.reduce((acc, f) => acc + f.rating, 0) /
            totalApprovedReviews
          ).toFixed(1)
        )
      : 5.0;

  // --- Custom Requests ---
  const submitCustomRequest = (
    req: Omit<CustomFoodRequest, 'id' | 'createdAt' | 'status'>
  ) => {
    const nextReq: CustomFoodRequest = {
      ...req,
      id: `REQ-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    setCustomRequests((prev) => [nextReq, ...prev]);
    showToast('Special food request sent to kitchen! Track status in Account.', 'success');
  };

  const updateCustomRequestStatus = (
    id: string,
    status: 'Pending' | 'Accepted' | 'Rejected',
    note?: string,
    quote?: number
  ) => {
    setCustomRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              adminNote: note !== undefined ? note : r.adminNote,
              adminQuote: quote !== undefined ? quote : r.adminQuote
            }
          : r
      )
    );
    showToast(`Request #${id} marked as ${status}`, 'info');
  };

  // --- User Profile ---
  const loginUser = (
    name: string,
    phone: string,
    email: string,
    address: string
  ) => {
    setUser({
      name,
      phone,
      email,
      address,
      landmark: 'Near Main Gate',
      isLoggedIn: true,
      jarsInPossession: 1
    });
    showToast(`Logged in as ${name}!`, 'success');
  };

  const logoutUser = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    showToast('Logged out of demo session.', 'info');
  };

  const updateUserAddress = (address: string, landmark?: string) => {
    setUser((prev) => ({
      ...prev,
      address,
      landmark: landmark || prev.landmark
    }));
    showToast('Delivery address updated', 'success');
  };

  // --- Menu Management ---
  const addMeal = (mealData: Omit<MenuItem, 'id'>) => {
    const id = `meal-${Date.now()}`;
    const newMeal: MenuItem = { ...mealData, id };
    setMeals((prev) => [newMeal, ...prev]);
    showToast(`Added ${newMeal.name} to menu!`, 'success');
  };

  const updateMeal = (id: string, updated: Partial<MenuItem>) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
    showToast('Menu item updated', 'success');
  };

  const deleteMeal = (id: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
    showToast('Meal removed from menu', 'info');
  };

  const toggleMealAvailability = (id: string) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isAvailable: !m.isAvailable } : m))
    );
  };

  const addExtra = (extraData: Omit<ExtraItem, 'id'>) => {
    const id = `extra-${Date.now()}`;
    const newExtra: ExtraItem = { ...extraData, id };
    setExtras((prev) => [newExtra, ...prev]);
    showToast(`Added ${newExtra.name} to Extras!`, 'success');
  };

  const updateExtra = (id: string, updated: Partial<ExtraItem>) => {
    setExtras((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
    showToast('Extra item updated', 'success');
  };

  const deleteExtra = (id: string) => {
    setExtras((prev) => prev.filter((e) => e.id !== id));
    showToast('Extra item removed', 'info');
  };

  const updateWaterItem = (id: string, updated: Partial<WaterItem>) => {
    setWaterItems((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updated } : w))
    );
    showToast('Water product updated', 'success');
  };

  // --- Full Demo Reset ---
  const resetAllDemoData = () => {
    localStorage.removeItem('freshbox_meals_v2');
    localStorage.removeItem('freshbox_extras_v2');
    localStorage.removeItem('freshbox_water_v2');
    localStorage.removeItem('freshbox_cart_v2');
    localStorage.removeItem('freshbox_coupon_v2');
    localStorage.removeItem('freshbox_orders_v2');
    localStorage.removeItem('freshbox_subscriptions_v2');
    localStorage.removeItem('freshbox_feedback_v2');
    localStorage.removeItem('freshbox_custom_requests_v2');
    localStorage.removeItem('freshbox_user_v2');

    setMeals(initialMeals);
    setExtras(initialExtras);
    setWaterItems(initialWaterItems);
    setCart([]);
    setAppliedCoupon(null);
    setOrders(initialOrders);
    setSubscriptions(initialSubs);
    setFeedbackList(initialFeedbackList);
    setCustomRequests(initialRequests);
    setUser(defaultUser);

    showToast('All demo data reset to default factory state!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        meals,
        extras,
        waterItems,
        addMeal,
        updateMeal,
        deleteMeal,
        toggleMealAvailability,
        addExtra,
        updateExtra,
        deleteExtra,
        updateWaterItem,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartTotals: {
          subtotal,
          discount,
          deliveryFee,
          tax,
          jarDepositTotal,
          total,
          itemCount
        },

        orders,
        placeOrder,
        updateOrderStatus,
        advanceOrderStatus,
        getOrderById,

        subscriptions,
        createSubscription,
        pauseSubscriptionDate,
        resumeSubscriptionDate,
        cancelSubscription,
        updateSubscriptionPlan,

        feedbackList,
        approvedFeedback,
        averageRating,
        totalApprovedReviews,
        addFeedback,
        updateFeedbackStatus,

        customRequests,
        submitCustomRequest,
        updateCustomRequestStatus,

        user,
        loginUser,
        logoutUser,
        updateUserAddress,

        toasts,
        showToast,
        removeToast,

        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
