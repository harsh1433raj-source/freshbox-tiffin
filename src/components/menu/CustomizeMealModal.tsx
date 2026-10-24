import React, { useState } from 'react';
import { MenuItem, MealCustomization } from '../../types';
import { X, Check, Flame, MessageSquare, Utensils, Sparkles } from 'lucide-react';

interface CustomizeMealModalProps {
  meal: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCartWithCustomization: (
    customization: MealCustomization,
    finalPrice: number,
    quantity: number
  ) => void;
}

export const CustomizeMealModal: React.FC<CustomizeMealModalProps> = ({
  meal,
  isOpen,
  onClose,
  onAddToCartWithCustomization,
}) => {
  if (!isOpen) return null;

  // Options
  const rotiOptions = [
    { label: '4 Tawa Rotis (Standard)', price: 0 },
    { label: '4 Butter Rotis', price: 12 },
    { label: '5 Tawa Rotis (Extra)', price: 8 },
    { label: '2 Desi Ghee Parathas', price: 20 },
    { label: '2 Stuffed Aloo Parathas', price: 35 },
  ];

  const riceOptions = [
    { label: 'Steamed Basmati Rice (Standard)', price: 0 },
    { label: 'Extra Steamed Basmati Rice', price: 25 },
    { label: 'Fragrant Jeera Rice', price: 40 },
    { label: 'Royal Veg Pulao', price: 40 },
  ];

  const dalOptions = [
    { label: 'Homestyle Dal Tadka (Standard)', price: 0 },
    { label: 'Rich Dal Makhani', price: 20 },
    { label: 'Yellow Moong Dal Fry', price: 0 },
  ];

  const sabziOptions = [
    { label: 'Seasonal Mix Veg Sabzi (Standard)', price: 0 },
    { label: 'Paneer Butter Masala Upgrade', price: 40 },
    { label: 'Homestyle Aloo Matar Gobhi', price: 0 },
  ];

  const raitaOptions = [
    { label: 'No Raita / Curd', price: 0 },
    { label: 'Fresh Set Cow Curd (Dahi)', price: 20 },
    { label: 'Chilled Boondi Raita', price: 30 },
    { label: 'Cooling Cucumber Raita', price: 30 },
  ];

  const spiceLevels: ('Mild' | 'Medium' | 'Spicy' | 'Desi Spicy')[] = [
    'Mild',
    'Medium',
    'Spicy',
    'Desi Spicy',
  ];

  // State
  const [selectedRoti, setSelectedRoti] = useState(rotiOptions[0]);
  const [selectedRice, setSelectedRice] = useState(riceOptions[0]);
  const [selectedDal, setSelectedDal] = useState(dalOptions[0]);
  const [selectedSabzi, setSelectedSabzi] = useState(sabziOptions[0]);
  const [selectedRaita, setSelectedRaita] = useState(raitaOptions[0]);
  const [selectedSpice, setSelectedSpice] = useState<'Mild' | 'Medium' | 'Spicy' | 'Desi Spicy'>('Medium');
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Dynamic calculations
  const totalCustomizationAddon =
    selectedRoti.price +
    selectedRice.price +
    selectedDal.price +
    selectedSabzi.price +
    selectedRaita.price;

  const itemUnitPrice = meal.price + totalCustomizationAddon;
  const totalPrice = itemUnitPrice * quantity;

  const handleConfirm = () => {
    const customization: MealCustomization = {
      rotiChoice: `${selectedRoti.label} (${selectedRoti.price > 0 ? `+₹${selectedRoti.price}` : 'Included'})`,
      rotiPrice: selectedRoti.price,
      riceChoice: `${selectedRice.label} (${selectedRice.price > 0 ? `+₹${selectedRice.price}` : 'Included'})`,
      ricePrice: selectedRice.price,
      dalChoice: `${selectedDal.label} (${selectedDal.price > 0 ? `+₹${selectedDal.price}` : 'Included'})`,
      dalPrice: selectedDal.price,
      sabziChoice: `${selectedSabzi.label} (${selectedSabzi.price > 0 ? `+₹${selectedSabzi.price}` : 'Included'})`,
      sabziPrice: selectedSabzi.price,
      raitaChoice: `${selectedRaita.label} (${selectedRaita.price > 0 ? `+₹${selectedRaita.price}` : 'Included'})`,
      raitaPrice: selectedRaita.price,
      spiceLevel: selectedSpice,
      instructions: instructions.trim(),
      totalCustomizationAddon,
    };

    onAddToCartWithCustomization(customization, itemUnitPrice, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative p-4 sm:p-6 bg-gradient-to-r from-forest-700 to-forest-800 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-cream-200 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 sm:p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-warmOrange-500 text-forest-900 px-2 py-0.5 rounded font-mono">
              Customize Your Tiffin
            </span>
            <span className="text-[11px] sm:text-xs text-forest-200">Base: ₹{meal.price}</span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black font-sans tracking-tight leading-tight pr-6">
            {meal.name}
          </h3>
          {meal.hindiName && (
            <p className="text-warmOrange-200 text-[11px] sm:text-xs font-medium">{meal.hindiName}</p>
          )}
          <p className="text-[11px] sm:text-xs text-forest-200 mt-0.5 line-clamp-1">
            {meal.portion}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 divide-y divide-cream-300">
          {/* Section 1: Roti Choice */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-extrabold text-charcoal-800 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-forest-500" />
                Roti & Bread Choice
              </label>
              <span className="text-xs text-forest-600 font-semibold bg-forest-50 px-2 py-0.5 rounded">
                Choose 1
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {rotiOptions.map((opt) => {
                const isSelected = selectedRoti.label === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedRoti(opt)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-forest-500 bg-forest-50/70 text-forest-900 font-bold ring-1 ring-forest-500'
                        : 'border-cream-300 hover:border-cream-400 bg-cream-50/30 text-charcoal-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="font-semibold shrink-0 ml-1">
                      {opt.price === 0 ? 'Free' : `+₹${opt.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Rice Choice */}
          <div className="space-y-3 pt-5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-extrabold text-charcoal-800">
                Rice & Grains Portion
              </label>
              <span className="text-xs text-forest-600 font-semibold bg-forest-50 px-2 py-0.5 rounded">
                Choose 1
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {riceOptions.map((opt) => {
                const isSelected = selectedRice.label === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedRice(opt)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-forest-500 bg-forest-50/70 text-forest-900 font-bold ring-1 ring-forest-500'
                        : 'border-cream-300 hover:border-cream-400 bg-cream-50/30 text-charcoal-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="font-semibold shrink-0 ml-1">
                      {opt.price === 0 ? 'Free' : `+₹${opt.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Dal & Sabzi */}
          <div className="space-y-4 pt-5">
            <div>
              <label className="block text-sm font-extrabold text-charcoal-800 mb-2">
                Dal Selection
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {dalOptions.map((opt) => {
                  const isSelected = selectedDal.label === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedDal(opt)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        isSelected
                          ? 'border-forest-500 bg-forest-50/70 text-forest-900 font-bold ring-1 ring-forest-500'
                          : 'border-cream-300 hover:border-cream-400 bg-cream-50/30 text-charcoal-700'
                      }`}
                    >
                      <p className="line-clamp-1">{opt.label}</p>
                      <p className="text-[11px] text-forest-600 font-semibold">
                        {opt.price === 0 ? 'Included' : `+₹${opt.price}`}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-extrabold text-charcoal-800 mb-2">
                Sabzi Selection
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {sabziOptions.map((opt) => {
                  const isSelected = selectedSabzi.label === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedSabzi(opt)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        isSelected
                          ? 'border-forest-500 bg-forest-50/70 text-forest-900 font-bold ring-1 ring-forest-500'
                          : 'border-cream-300 hover:border-cream-400 bg-cream-50/30 text-charcoal-700'
                      }`}
                    >
                      <p className="line-clamp-1">{opt.label}</p>
                      <p className="text-[11px] text-forest-600 font-semibold">
                        {opt.price === 0 ? 'Included' : `+₹${opt.price}`}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Raita / Curd Addon */}
          <div className="space-y-3 pt-5">
            <label className="block text-sm font-extrabold text-charcoal-800">
              Add Raita or Curd
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {raitaOptions.map((opt) => {
                const isSelected = selectedRaita.label === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedRaita(opt)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-forest-500 bg-forest-50/70 text-forest-900 font-bold ring-1 ring-forest-500'
                        : 'border-cream-300 hover:border-cream-400 bg-cream-50/30 text-charcoal-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="font-semibold shrink-0 ml-1">
                      {opt.price === 0 ? 'No addon' : `+₹${opt.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Spice Level */}
          <div className="space-y-3 pt-5">
            <label className="text-sm font-extrabold text-charcoal-800 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-warmOrange-500" />
              Spice Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {spiceLevels.map((lvl) => {
                const isSelected = selectedSpice === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedSpice(lvl)}
                    className={`py-2 px-3 rounded-xl border text-center text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-warmOrange-500 border-warmOrange-500 text-white shadow-xs'
                        : 'border-cream-300 bg-white hover:bg-cream-100 text-charcoal-700'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: Special Cooking Instructions */}
          <div className="space-y-2 pt-5">
            <label className="text-sm font-extrabold text-charcoal-800 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-forest-500" />
              Special Kitchen Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="E.g. Less oil, no raw onion, extra lemon slice, well-roasted rotis..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
            />
          </div>
        </div>

        {/* Footer Bar with Price Recalculation & Add to Cart */}
        <div className="p-3 sm:p-5 bg-cream-100 border-t border-cream-300 flex items-center justify-between gap-2 sm:gap-4 shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-cream-300 rounded-xl p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-charcoal-700 hover:bg-cream-200 transition-colors text-xs sm:text-sm"
            >
              -
            </button>
            <span className="w-5 sm:w-6 text-center text-xs sm:text-sm font-bold text-charcoal-800">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-charcoal-700 hover:bg-cream-200 transition-colors text-xs sm:text-sm"
            >
              +
            </button>
          </div>

          {/* Confirm Button with dynamic price */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 bg-forest-500 hover:bg-forest-600 active:scale-98 text-white py-2.5 sm:py-3 px-3 sm:px-5 rounded-2xl font-extrabold text-xs sm:text-base flex items-center justify-between shadow-lg shadow-forest-500/20 transition-all"
          >
            <span>Add Custom Tiffin</span>
            <span className="font-mono bg-forest-700/60 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm">
              ₹{totalPrice}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
