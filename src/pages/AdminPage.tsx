import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  MenuItem,
  ExtraItem,
  WaterItem,
  OrderStatus,
  Feedback,
  MealCategory
} from '../types';
import {
  ShieldCheck,
  LayoutDashboard,
  UtensilsCrossed,
  Droplets,
  CalendarCheck2,
  MessageSquare,
  ChefHat,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Search,
  Eye,
  RotateCcw,
  Bike,
  Star,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const ORDER_STAGES: OrderStatus[] = [
  'Order Placed',
  'Confirmed',
  'Preparing Food',
  'Ready for Pickup',
  'Out for Delivery',
  'Delivered'
];

export const AdminPage: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    meals,
    addMeal,
    updateMeal,
    deleteMeal,
    toggleMealAvailability,
    extras,
    addExtra,
    updateExtra,
    deleteExtra,
    waterItems,
    updateWaterItem,
    subscriptions,
    cancelSubscription,
    feedbackList,
    updateFeedbackStatus,
    customRequests,
    updateCustomRequestStatus,
    resetAllDemoData,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'orders' | 'menu' | 'water' | 'subscriptions' | 'feedback' | 'requests' | 'settings'
  >('overview');

  // Search & filter states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [menuSearch, setMenuSearch] = useState('');

  // Add / Edit Meal Modal state
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [mealForm, setMealForm] = useState({
    name: '',
    hindiName: '',
    description: '',
    price: 80,
    category: 'Lunch' as MealCategory,
    isVeg: true,
    portion: 'Serves 1 • 4 Rotis, Dal, Sabzi & Rice',
    calories: '550 kcal',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isCustomizable: true,
    isBestseller: false,
    isAvailable: true,
    rating: 4.8
  });

  // Calculate Overview KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeSubsCount = subscriptions.filter((s) => s.status === 'active').length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus !== 'Delivered').length;
  const approvedReviews = feedbackList.filter((f) => f.status === 'approved');
  const avgRating =
    approvedReviews.length > 0
      ? (approvedReviews.reduce((sum, f) => sum + f.rating, 0) / approvedReviews.length).toFixed(1)
      : '5.0';

  // Handle open Meal Modal for create or edit
  const handleOpenAddMeal = () => {
    setEditingMealId(null);
    setMealForm({
      name: '',
      hindiName: '',
      description: '',
      price: 80,
      category: 'Lunch',
      isVeg: true,
      portion: 'Serves 1 • 4 Rotis, Dal, Sabzi & Rice',
      calories: '550 kcal',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      isCustomizable: true,
      isBestseller: false,
      isAvailable: true,
      rating: 4.8
    });
    setIsMealModalOpen(true);
  };

  const handleOpenEditMeal = (meal: MenuItem) => {
    setEditingMealId(meal.id);
    setMealForm({
      name: meal.name,
      hindiName: meal.hindiName || '',
      description: meal.description,
      price: meal.price,
      category: meal.category,
      isVeg: meal.isVeg,
      portion: meal.portion,
      calories: meal.calories || '',
      image: meal.image,
      isCustomizable: meal.isCustomizable,
      isBestseller: meal.isBestseller || false,
      isAvailable: meal.isAvailable,
      rating: meal.rating
    });
    setIsMealModalOpen(true);
  };

  const handleSaveMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMealId) {
      updateMeal(editingMealId, mealForm);
    } else {
      addMeal(mealForm);
    }
    setIsMealModalOpen(false);
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'All' && o.orderStatus !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customer.name.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Dashboard Top Banner */}
      <div className="bg-forest-900 text-white rounded-3xl p-5 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 border border-forest-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-warmOrange-500 text-forest-900 px-2.5 py-0.5 rounded font-mono">
              Live Demo Admin
            </span>
            <span className="text-xs text-forest-200">
              Kitchen Operations Control
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black font-sans tracking-tight mt-1">
            FreshBox Master Admin Panel
          </h1>
          <p className="text-xs text-forest-200 mt-1 max-w-xl">
            Changes made here (updating meal prices, advancing order status, approving reviews) immediately persist in localStorage and sync across customer pages.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset all demo data back to default factory state?')) {
              resetAllDemoData();
            }
          }}
          className="bg-forest-800 hover:bg-forest-700 text-warmOrange-300 font-bold text-xs py-2 px-3 sm:px-4 rounded-xl border border-forest-700 flex items-center gap-2 transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4 text-warmOrange-400" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-cream-300">
        {[
          { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard },
          { id: 'orders', label: `Orders (${orders.length})`, icon: Bike },
          { id: 'menu', label: `Meals & Menu (${meals.length})`, icon: UtensilsCrossed },
          { id: 'water', label: `Water Store (${waterItems.length})`, icon: Droplets },
          { id: 'subscriptions', label: `Subscriptions (${subscriptions.length})`, icon: CalendarCheck2 },
          { id: 'feedback', label: `Reviews Moderation (${feedbackList.length})`, icon: MessageSquare },
          { id: 'requests', label: `Custom Requests (${customRequests.length})`, icon: ChefHat },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((tab) => {
          const isActive = activeAdminTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-forest-600 text-forest-700 bg-white rounded-t-xl'
                  : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cream-300 shadow-card">
              <p className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">
                Total Demo Revenue
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-forest-700 font-sans mt-1">
                ₹{totalRevenue}
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                Across {orders.length} demo orders
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cream-300 shadow-card">
              <p className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">
                Active Subscriptions
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-warmOrange-600 font-sans mt-1">
                {activeSubsCount}
              </h3>
              <p className="text-[11px] text-charcoal-500 font-semibold mt-1">
                Monthly recurring diners
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cream-300 shadow-card">
              <p className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">
                Pending Orders
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-600 font-sans mt-1">
                {pendingOrdersCount}
              </h3>
              <p className="text-[11px] text-charcoal-500 font-semibold mt-1">
                In preparation / delivery
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cream-300 shadow-card">
              <p className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">
                Average Rating
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-charcoal-900 font-sans mt-1 flex items-center gap-1">
                <Star className="w-6 h-6 fill-warmOrange-400 text-warmOrange-400" />
                <span>{avgRating} / 5</span>
              </h3>
              <p className="text-[11px] text-charcoal-500 font-semibold mt-1">
                {approvedReviews.length} approved reviews
              </p>
            </div>
          </div>

          {/* Recent Orders Overview Table */}
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="text-base font-extrabold text-charcoal-800">
                Recent Orders Stream
              </h3>
              <button
                onClick={() => setActiveAdminTab('orders')}
                className="text-xs font-bold text-forest-600 hover:underline flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-cream-200 text-charcoal-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Items</th>
                    <th className="py-2.5 px-3">Total</th>
                    <th className="py-2.5 px-3">Payment</th>
                    <th className="py-2.5 px-3">Current Status</th>
                    <th className="py-2.5 px-3 text-right">Quick Advance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100 text-charcoal-700">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-cream-50/50">
                      <td className="py-3 px-3 font-mono font-bold text-forest-700">
                        {order.id}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-bold text-charcoal-900">{order.customer.name}</p>
                        <p className="text-[11px] text-charcoal-400">{order.customer.phone}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold">{order.items.length} items</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold">₹{order.total}</td>
                      <td className="py-3 px-3">
                        <span className="text-[11px] font-semibold">{order.paymentMethod}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-forest-50 text-forest-800 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="text-[11px] font-semibold py-1 px-2 rounded-lg border border-cream-300 bg-white"
                        >
                          {ORDER_STAGES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDER MANAGEMENT */}
      {activeAdminTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
            <div>
              <h2 className="text-xl font-black text-charcoal-900 font-sans">
                Order Management ({filteredOrders.length})
              </h2>
              <p className="text-xs text-charcoal-500">
                Update status stages in real-time. Changes instantly sync to the customer tracking page.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search ID, Name, Phone..."
                  className="text-xs pl-9 pr-3 py-2 rounded-xl border border-cream-300 bg-cream-50/50"
                />
              </div>

              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="text-xs font-bold py-2 px-3 rounded-xl border border-cream-300 bg-white"
              >
                <option value="All">All Statuses</option>
                {ORDER_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl border border-cream-300 bg-cream-50/30 space-y-4 hover:border-forest-400 transition-colors"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-forest-700 text-base">
                      #{order.id}
                    </span>
                    <span className="text-[11px] text-charcoal-500">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded font-mono">
                      {order.orderStatus}
                    </span>
                  </div>

                  {/* Status Dropdown Controller */}
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <label className="text-xs font-bold text-charcoal-600 shrink-0">
                      Update Stage:
                    </label>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="text-xs font-extrabold py-1.5 px-3 rounded-xl border border-forest-300 bg-white text-forest-800 shadow-xs cursor-pointer"
                    >
                      {ORDER_STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-3 border-t border-cream-200">
                  <div>
                    <p className="font-bold text-charcoal-800">Customer</p>
                    <p className="text-charcoal-600">{order.customer.name}</p>
                    <p className="text-charcoal-500 font-mono">{order.customer.phone}</p>
                    <p className="text-charcoal-500 mt-1 line-clamp-1">{order.customer.address}</p>
                  </div>

                  <div>
                    <p className="font-bold text-charcoal-800">Items Ordered</p>
                    <ul className="space-y-0.5 text-charcoal-600">
                      {order.items.map((i) => (
                        <li key={i.cartItemId}>
                          {i.quantity}x {i.name}{' '}
                          {i.customization && (
                            <span className="text-forest-700">({i.customization.spiceLevel})</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-charcoal-800">Payment & Slot</p>
                    <p className="text-charcoal-600">
                      Total: <strong className="text-forest-700 font-mono">₹{order.total}</strong> ({order.paymentMethod})
                    </p>
                    <p className="text-charcoal-500 mt-0.5">Slot: {order.customer.deliverySlot}</p>
                    <Link
                      to={`/track-order?orderId=${order.id}`}
                      className="inline-block text-forest-600 font-bold hover:underline mt-1.5"
                    >
                      View in Tracking Page →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MENU MANAGEMENT */}
      {activeAdminTab === 'menu' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
            <div>
              <h2 className="text-xl font-black text-charcoal-900 font-sans">
                Menu Management ({meals.length} Meals, {extras.length} Extras)
              </h2>
              <p className="text-xs text-charcoal-500">
                Edit prices, dish names, portion descriptions, or add new recipes.
              </p>
            </div>

            <button
              onClick={handleOpenAddMeal}
              className="bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Meal</span>
            </button>
          </div>

          {/* Meals Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cream-200 text-charcoal-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Item</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Portion</th>
                  <th className="py-2.5 px-3">Stock</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100 text-charcoal-700">
                {meals.map((meal) => (
                  <tr key={meal.id} className="hover:bg-cream-50/50">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-extrabold text-charcoal-900">{meal.name}</p>
                          {meal.hindiName && (
                            <p className="text-[10px] text-warmOrange-600">{meal.hindiName}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold">{meal.category}</td>
                    <td className="py-3 px-3 font-mono font-bold text-forest-700">
                      ₹{meal.price}
                    </td>
                    <td className="py-3 px-3 text-charcoal-500 max-w-xs truncate">
                      {meal.portion}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleMealAvailability(meal.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          meal.isAvailable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {meal.isAvailable ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditMeal(meal)}
                        className="text-forest-600 hover:text-forest-800 p-1"
                        title="Edit dish"
                      >
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => deleteMeal(meal.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete dish"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: WATER STORE MANAGEMENT */}
      {activeAdminTab === 'water' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
          <div className="pb-4 border-b border-cream-200">
            <h2 className="text-xl font-black text-charcoal-900 font-sans">
              Water Store Products ({waterItems.length})
            </h2>
            <p className="text-xs text-charcoal-500">
              Update bottle and jar rates, refundable deposit, and availability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {waterItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-cream-200 bg-cream-50/50 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 rounded-xl object-cover mb-2"
                  />
                  <h4 className="font-extrabold text-xs text-charcoal-900">{item.name}</h4>
                  <p className="text-[11px] text-charcoal-500">{item.size}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-cream-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Price:</span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateWaterItem(item.id, { price: Number(e.target.value) })
                      }
                      className="w-20 p-1 rounded border border-cream-300 text-right font-mono font-bold"
                    />
                  </div>
                  {item.deposit !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Deposit:</span>
                      <input
                        type="number"
                        value={item.deposit}
                        onChange={(e) =>
                          updateWaterItem(item.id, { deposit: Number(e.target.value) })
                        }
                        className="w-20 p-1 rounded border border-cream-300 text-right font-mono"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SUBSCRIPTIONS MANAGEMENT */}
      {activeAdminTab === 'subscriptions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
          <div className="pb-4 border-b border-cream-200">
            <h2 className="text-xl font-black text-charcoal-900 font-sans">
              Subscribers Management ({subscriptions.length})
            </h2>
            <p className="text-xs text-charcoal-500">
              Active monthly tiffin subscribers, meal pause schedules, and renewal dates.
            </p>
          </div>

          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl border border-cream-200 bg-cream-50/40 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-forest-700">#{sub.id}</span>
                    <h3 className="text-sm font-extrabold text-charcoal-900 mt-0.5">
                      {sub.customerName} — {sub.planName}
                    </h3>
                    <p className="text-charcoal-500">
                      {sub.customerPhone} • {sub.deliveryAddress}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        sub.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {sub.status}
                    </span>
                    {sub.status === 'active' && (
                      <button
                        onClick={() => cancelSubscription(sub.id)}
                        className="text-xs font-bold text-red-600 hover:underline"
                      >
                        Cancel Plan
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-cream-200 text-[11px]">
                  <p>
                    Preference: <strong>{sub.mealPreference}</strong>
                  </p>
                  <p>
                    Diet: <strong>{sub.dietaryPreference}</strong>
                  </p>
                  <p>
                    Meals Remaining: <strong>{sub.mealsRemaining} Left</strong>
                  </p>
                  <p>
                    Renewal: <strong>{sub.renewalDate}</strong>
                  </p>
                </div>

                {sub.pausedDates && sub.pausedDates.length > 0 && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg">
                    Paused Dates: {sub.pausedDates.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: FEEDBACK MANAGEMENT (MODERATION) */}
      {activeAdminTab === 'feedback' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
          <div className="pb-4 border-b border-cream-200">
            <h2 className="text-xl font-black text-charcoal-900 font-sans">
              Reviews & Feedback Moderation ({feedbackList.length})
            </h2>
            <p className="text-xs text-charcoal-500">
              Only reviews marked as <strong>Approved</strong> will appear on the public homepage and contribute to the average rating.
            </p>
          </div>

          <div className="space-y-4">
            {feedbackList.map((fb) => (
              <div
                key={fb.id}
                className="p-5 rounded-2xl border border-cream-200 bg-cream-50/40 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-sm text-charcoal-900">
                      {fb.customerName}{' '}
                      <span className="font-mono font-normal text-charcoal-400">
                        (Order #{fb.orderId})
                      </span>
                    </h4>
                    <div className="flex items-center gap-1 text-warmOrange-400 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < fb.rating ? 'fill-warmOrange-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-charcoal-600 font-bold ml-1">{fb.rating}/5</span>
                    </div>
                  </div>

                  {/* Approval Actions */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                        fb.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : fb.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {fb.status}
                    </span>

                    <button
                      onClick={() => updateFeedbackStatus(fb.id, 'approved')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateFeedbackStatus(fb.id, 'pending')}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => updateFeedbackStatus(fb.id, 'hidden')}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg"
                    >
                      Hide
                    </button>
                  </div>
                </div>

                <p className="text-charcoal-700 leading-relaxed italic">
                  "{fb.comment}"
                </p>

                {fb.suggestions && (
                  <p className="text-[11px] text-charcoal-500">
                    <strong>Suggestion:</strong> {fb.suggestions}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: CUSTOM FOOD REQUESTS */}
      {activeAdminTab === 'requests' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
          <div className="pb-4 border-b border-cream-200">
            <h2 className="text-xl font-black text-charcoal-900 font-sans">
              Custom Food Requests ({customRequests.length})
            </h2>
            <p className="text-xs text-charcoal-500">
              Customer inquiries for off-menu items, party portions, and dietary variations.
            </p>
          </div>

          <div className="space-y-4">
            {customRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl border border-cream-200 bg-cream-50/40 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-charcoal-900">
                      {req.itemName}
                    </h3>
                    <p className="text-charcoal-500">
                      From: <strong>{req.customerName}</strong> ({req.customerPhone})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
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

                    <button
                      onClick={() =>
                        updateCustomRequestStatus(
                          req.id,
                          'Accepted',
                          'Chef accepted. Will prepare fresh for scheduled slot.',
                          req.expectedPrice || 140
                        )
                      }
                      className="bg-emerald-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateCustomRequestStatus(
                          req.id,
                          'Rejected',
                          'Ingredients currently out of stock.'
                        )
                      }
                      className="bg-red-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-cream-200 text-charcoal-600">
                  <p>Quantity: <strong>{req.quantity}</strong></p>
                  <p>Expected Price: <strong>₹{req.expectedPrice || 'Open'}</strong></p>
                  <p>Slot: <strong>{req.preferredDeliveryTime}</strong></p>
                </div>

                {req.instructions && (
                  <p className="text-charcoal-500 italic">
                    Note: "{req.instructions}"
                  </p>
                )}

                {req.adminNote && (
                  <div className="p-2.5 bg-forest-50 border border-forest-100 rounded-xl text-forest-800">
                    <strong>Admin Note:</strong> {req.adminNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: SETTINGS & RESTORE */}
      {activeAdminTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6 max-w-2xl">
          <h2 className="text-xl font-black text-charcoal-900 font-sans pb-3 border-b border-cream-200">
            Platform Demo Settings
          </h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <h4 className="font-extrabold text-charcoal-800">Coupons Available</h4>
              <p className="text-charcoal-600">• <strong>FRESH10</strong>: 10% OFF on orders above ₹100</p>
              <p className="text-charcoal-600">• <strong>WELCOME50</strong>: Flat ₹50 OFF on orders above ₹150</p>
              <p className="text-charcoal-600">• <strong>TIFFIN20</strong>: 20% OFF on orders above ₹300</p>
            </div>

            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
              <h4 className="font-extrabold text-charcoal-800">Delivery Rules</h4>
              <p className="text-charcoal-600">• Free delivery for orders above ₹149 (otherwise standard ₹30 fee)</p>
              <p className="text-charcoal-600">• Standard 5% GST food packaging tax</p>
              <p className="text-charcoal-600">• ₹150 refundable 20L water jar deposit</p>
            </div>

            <div className="pt-4 border-t border-cream-200 space-y-2">
              <h4 className="font-extrabold text-red-700">Danger Zone</h4>
              <p className="text-charcoal-500">
                Resetting will clear all browser changes, order histories, custom requests, and restore initial seed data.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all demo data back to default factory state?')) {
                    resetAllDemoData();
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-colors"
              >
                Reset All LocalStorage Demo Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Meal Modal */}
      {isMealModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="text-lg font-black text-charcoal-900">
                {editingMealId ? 'Edit Dish Details' : 'Add New Daily Dish'}
              </h3>
              <button
                onClick={() => setIsMealModalOpen(false)}
                className="text-charcoal-400 hover:text-charcoal-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMeal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Dish Name *</label>
                <input
                  type="text"
                  value={mealForm.name}
                  onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-charcoal-700 mb-1">Hindi Name</label>
                  <input
                    type="text"
                    value={mealForm.hindiName}
                    onChange={(e) => setMealForm({ ...mealForm, hindiName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-charcoal-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={mealForm.price}
                    onChange={(e) => setMealForm({ ...mealForm, price: Number(e.target.value) })}
                    required
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/50 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Category *</label>
                <select
                  value={mealForm.category}
                  onChange={(e) => setMealForm({ ...mealForm, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/50 font-bold"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Tiffin Combos">Tiffin Combos</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Portion Information *</label>
                <input
                  type="text"
                  value={mealForm.portion}
                  onChange={(e) => setMealForm({ ...mealForm, portion: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Description *</label>
                <textarea
                  rows={2}
                  value={mealForm.description}
                  onChange={(e) => setMealForm({ ...mealForm, description: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Food Image URL</label>
                <input
                  type="url"
                  value={mealForm.image}
                  onChange={(e) => setMealForm({ ...mealForm, image: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/50 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={mealForm.isCustomizable}
                    onChange={(e) =>
                      setMealForm({ ...mealForm, isCustomizable: e.target.checked })
                    }
                    className="rounded text-forest-600"
                  />
                  <span>Allow Customization Modal</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={mealForm.isBestseller}
                    onChange={(e) =>
                      setMealForm({ ...mealForm, isBestseller: e.target.checked })
                    }
                    className="rounded text-forest-600"
                  />
                  <span>Tag as Bestseller</span>
                </label>
              </div>

              <div className="pt-3 border-t border-cream-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMealModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 text-charcoal-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-500 hover:bg-forest-600 text-white font-bold"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
