import React from 'react';
import { ExtraItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Plus } from 'lucide-react';

interface ExtraCardProps {
  extra: ExtraItem;
}

export const ExtraCard: React.FC<ExtraCardProps> = ({ extra }) => {
  const { addToCart, cart, updateCartQuantity } = useApp();

  const cartItem = cart.find(
    (item) => item.productId === extra.id && item.type === 'extra'
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart({
      productId: extra.id,
      type: 'extra',
      name: extra.name,
      hindiName: extra.hindiName,
      price: extra.price,
      basePrice: extra.price,
      quantity: 1,
      image: extra.image,
      portion: extra.unit
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-cream-300 p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-xs hover:shadow-card transition-all duration-200 group">
      {/* Visual Thumbnail */}
      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-cream-200 shrink-0">
        <img
          src={extra.image}
          alt={extra.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-1 left-1 bg-white/90 p-0.5 rounded shadow-xs">
          <div className="w-2.5 h-2.5 border border-emerald-600 rounded-xs flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-emerald-600"></div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h4 className="text-xs sm:text-sm font-extrabold text-charcoal-800 truncate">
            {extra.name}
          </h4>
        </div>
        {extra.hindiName && (
          <p className="text-[10px] text-warmOrange-600 font-medium">
            {extra.hindiName}
          </p>
        )}
        <p className="text-[11px] text-charcoal-500 line-clamp-1 mt-0.5">
          {extra.description}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs sm:text-sm font-black text-forest-700">
            ₹{extra.price}
          </span>
          <span className="text-[10px] text-charcoal-400 bg-cream-100 px-1.5 py-0.5 rounded">
            {extra.unit}
          </span>
        </div>
      </div>

      {/* Action Stepper / Add Button */}
      <div className="shrink-0">
        {quantity > 0 && cartItem ? (
          <div className="flex items-center gap-1.5 bg-forest-50 border border-forest-300 rounded-xl p-1">
            <button
              type="button"
              onClick={() => updateCartQuantity(cartItem.cartItemId, quantity - 1)}
              className="w-6 h-6 rounded-md bg-white text-forest-700 font-bold flex items-center justify-center hover:bg-cream-100 transition-colors shadow-xs text-xs"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-4 text-center text-xs font-bold text-forest-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateCartQuantity(cartItem.cartItemId, quantity + 1)}
              className="w-6 h-6 rounded-md bg-forest-500 text-white font-bold flex items-center justify-center hover:bg-forest-600 transition-colors shadow-xs text-xs"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 bg-cream-100 hover:bg-forest-500 hover:text-white text-forest-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-forest-200/60 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};
