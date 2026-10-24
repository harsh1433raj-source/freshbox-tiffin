import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Bike,
  Star,
  RotateCw,
  Clock,
  ArrowRight,
  Receipt,
  CheckCircle2
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders, addToCart } = useApp();
  const navigate = useNavigate();

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => {
      addToCart({
        productId: item.productId,
        type: item.type,
        name: item.name,
        hindiName: item.hindiName,
        price: item.price,
        basePrice: item.basePrice,
        quantity: item.quantity,
        image: item.image,
        portion: item.portion,
        customization: item.customization,
        deposit: item.deposit
      });
    });
    navigate('/cart');
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-charcoal-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-forest-900 font-sans">
          No Orders Placed Yet
        </h2>
        <p className="text-xs text-charcoal-500">
          Try ordering today's special veg thali or delicious homestyle rotis.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-forest-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md"
        >
          Explore Daily Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
          Order Records
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-forest-900 font-sans tracking-tight mt-1">
          My Order History
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          View past meals, track ongoing deliveries, or submit reviews.
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {orders.map((order) => {
          const isDelivered = order.orderStatus === 'Delivered';

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-cream-300 p-5 sm:p-6 shadow-card hover:shadow-lift transition-all space-y-5"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-cream-200">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-forest-800 text-base">
                      #{order.id}
                    </span>
                    <span className="text-[10px] bg-cream-100 text-charcoal-500 font-medium px-2 py-0.5 rounded">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-500">{order.customer.address}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-xl font-mono ${
                      isDelivered
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                  <span className="text-sm font-black text-charcoal-900 font-sans">
                    ₹{order.total}
                  </span>
                </div>
              </div>

              {/* Items Summary */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 text-xs">
                  {order.items.map((item) => (
                    <span
                      key={item.cartItemId}
                      className="bg-cream-50 border border-cream-200 px-3 py-1.5 rounded-xl font-medium text-charcoal-800"
                    >
                      {item.quantity}x {item.name}{' '}
                      {item.customization && (
                        <span className="text-[11px] text-forest-700 font-bold">
                          ({item.customization.spiceLevel})
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-cream-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-charcoal-500">
                  Payment: <strong className="text-charcoal-700">{order.paymentMethod}</strong> (
                  {order.paymentStatus})
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to={`/track-order?orderId=${order.id}`}
                    className="inline-flex items-center gap-1.5 bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>Track Order</span>
                  </Link>

                  <Link
                    to={`/feedback?orderId=${order.id}`}
                    className="inline-flex items-center gap-1.5 bg-cream-100 hover:bg-warmOrange-50 text-charcoal-800 hover:text-warmOrange-700 font-bold text-xs px-3.5 py-2 rounded-xl border border-cream-300 transition-colors"
                  >
                    <Star className="w-3.5 h-3.5 text-warmOrange-500" />
                    <span>Review Food</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleReorder(order)}
                    className="inline-flex items-center gap-1.5 bg-cream-100 hover:bg-forest-50 text-charcoal-800 hover:text-forest-700 font-bold text-xs px-3.5 py-2 rounded-xl border border-cream-300 transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-forest-600" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
