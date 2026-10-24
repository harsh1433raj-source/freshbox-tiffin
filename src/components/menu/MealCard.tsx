import React, { useState } from 'react';
import { MenuItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { CustomizeMealModal } from './CustomizeMealModal';
import { Star, Sliders, Plus, Check } from 'lucide-react';

interface MealCardProps {
  meal: MenuItem;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const { addToCart, cart, updateCartQuantity } = useApp();
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Check if standard uncustomized item is in cart
  const cartItem = cart.find(
    (item) => item.productId === meal.id && !item.customization
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleQuickAdd = () => {
    addToCart({
      productId: meal.id,
      type: 'meal',
      name: meal.name,
      hindiName: meal.hindiName,
      price: meal.price,
      basePrice: meal.price,
      quantity: 1,
      image: meal.image,
      portion: meal.portion
    });
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-cream-300 shadow-card hover:shadow-lift transition-all duration-300 overflow-hidden flex flex-col group">
        {/* Food Image Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-cream-200">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            {/* Pure Veg Badge */}
            <div className="bg-white/95 backdrop-blur-xs p-1 rounded-md shadow-xs flex items-center justify-center">
              <div className="w-3.5 h-3.5 border-2 border-emerald-600 rounded-xs flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
              </div>
            </div>

            {meal.isBestseller && (
              <span className="bg-warmOrange-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                Bestseller
              </span>
            )}
            {meal.calories && (
              <span className="bg-forest-900/80 text-cream-100 backdrop-blur-xs text-[10px] font-medium px-2 py-0.5 rounded-full">
                {meal.calories}
              </span>
            )}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-charcoal-800 text-xs font-bold px-2 py-1 rounded-xl shadow-xs flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-warmOrange-400 text-warmOrange-400" />
            <span>{meal.rating}</span>
          </div>

          {/* Hindi Name Overlay on bottom-left */}
          {meal.hindiName && (
            <div className="absolute bottom-2.5 left-3 text-white/90 text-xs font-medium drop-shadow-xs">
              {meal.hindiName}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-extrabold text-base sm:text-lg text-charcoal-800 leading-snug group-hover:text-forest-600 transition-colors">
                {meal.name}
              </h3>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-forest-700 font-sans">
                  ₹{meal.price}
                </span>
              </div>
            </div>

            <p className="text-xs text-charcoal-500 line-clamp-2 mt-1.5 leading-relaxed">
              {meal.description}
            </p>

            <div className="mt-2.5 inline-block text-[11px] font-medium text-forest-700 bg-forest-50 px-2.5 py-1 rounded-lg border border-forest-100">
              {meal.portion}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-cream-200 flex items-center justify-between gap-2">
            {meal.isCustomizable ? (
              <button
                type="button"
                onClick={() => setIsCustomizeOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 hover:text-forest-800 bg-cream-100 hover:bg-forest-100 px-3 py-2 rounded-xl transition-colors border border-forest-200/60"
              >
                <Sliders className="w-3.5 h-3.5 text-forest-600" />
                <span>Customize</span>
              </button>
            ) : (
              <span className="text-[11px] text-charcoal-400 italic">Chef's Recipe</span>
            )}

            {quantity > 0 && cartItem ? (
              <div className="flex items-center gap-2 bg-forest-50 border border-forest-300 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => updateCartQuantity(cartItem.cartItemId, quantity - 1)}
                  className="w-7 h-7 rounded-lg bg-white text-forest-700 font-bold flex items-center justify-center hover:bg-cream-100 transition-colors shadow-xs"
                >
                  -
                </button>
                <span className="w-5 text-center text-xs font-extrabold text-forest-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateCartQuantity(cartItem.cartItemId, quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-forest-500 text-white font-bold flex items-center justify-center hover:bg-forest-600 transition-colors shadow-xs"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleQuickAdd}
                className="inline-flex items-center gap-1.5 bg-forest-500 hover:bg-forest-600 active:scale-95 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-md shadow-forest-500/15 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Customize Modal */}
      {isCustomizeOpen && (
        <CustomizeMealModal
          meal={meal}
          isOpen={isCustomizeOpen}
          onClose={() => setIsCustomizeOpen(false)}
          onAddToCartWithCustomization={(customization, finalPrice, qty) => {
            addToCart({
              productId: meal.id,
              type: 'meal',
              name: meal.name,
              hindiName: meal.hindiName,
              price: finalPrice,
              basePrice: meal.price,
              quantity: qty,
              image: meal.image,
              portion: meal.portion,
              customization
            });
          }}
        />
      )}
    </>
  );
};
