import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Star,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Send,
  Heart,
  HelpCircle,
  Clock
} from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlOrderId = searchParams.get('orderId') || '';

  const { orders, feedbackList, addFeedback, user } = useApp();

  const [orderId, setOrderId] = useState(
    urlOrderId || (orders.length > 0 ? orders[0].id : 'FB-2026-10001')
  );
  const [customerName, setCustomerName] = useState(user.name || 'Rahul Sharma');
  const [rating, setRating] = useState(5);
  const [foodQualityRating, setFoodQualityRating] = useState(5);
  const [tasteRating, setTasteRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [comment, setComment] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please write a short review sharing your food experience.');
      return;
    }
    setError('');

    const matchedOrder = orders.find((o) => o.id === orderId);
    const mealReviewed = matchedOrder
      ? matchedOrder.items.map((i) => i.name).join(', ')
      : 'Regular Veg Tiffin';

    addFeedback({
      orderId,
      customerName,
      rating,
      foodQualityRating,
      tasteRating,
      deliveryRating,
      comment: comment.trim(),
      suggestions: suggestions.trim(),
      mealReviewed
    });

    setSubmitted(true);
    setComment('');
    setSuggestions('');
  };

  const StarRatingPicker = ({
    value,
    onChange,
    label
  }: {
    value: number;
    onChange: (v: number) => void;
    label: string;
  }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b border-cream-200 gap-1 sm:gap-2">
      <span className="text-xs font-bold text-charcoal-700">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-110 transition-transform focus:outline-none"
            aria-label={`${star} Stars`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= value
                  ? 'fill-warmOrange-400 text-warmOrange-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-warmOrange-600 bg-warmOrange-50 px-3 py-1 rounded-full border border-warmOrange-200">
          Customer Voice
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-forest-900 font-sans tracking-tight">
          Food Reviews & Kitchen Feedback
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Rate your meal quality, taste, and delivery. Approved reviews will appear on our homepage!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Feedback Submission Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-cream-200">
            <h3 className="text-base sm:text-lg font-extrabold text-charcoal-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-forest-600" />
              <span>Share Your Dining Experience</span>
            </h3>
            <span className="text-xs bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded font-mono">
              Demo Review
            </span>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-extrabold text-emerald-900">
                Thank you for your review!
              </h4>
              <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                Your feedback has been saved to localStorage and sent to the{' '}
                <Link to="/admin" className="font-bold underline">
                  Admin Dashboard
                </Link>{' '}
                for approval. Once approved, it will be visible on the public homepage.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 bg-forest-500 hover:bg-forest-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Submit Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">
                    Attach Order ID
                  </label>
                  <select
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        #{o.id} ({o.items.length} items)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Multi-attribute Star Ratings */}
              <div className="bg-cream-50/60 rounded-2xl p-4 border border-cream-200 space-y-1">
                <StarRatingPicker
                  label="Overall Meal Experience *"
                  value={rating}
                  onChange={setRating}
                />
                <StarRatingPicker
                  label="Food Quality & Freshness"
                  value={foodQualityRating}
                  onChange={setFoodQualityRating}
                />
                <StarRatingPicker
                  label="Authentic Homestyle Taste"
                  value={tasteRating}
                  onChange={setTasteRating}
                />
                <StarRatingPicker
                  label="Thermal Packaging & Delivery"
                  value={deliveryRating}
                  onChange={setDeliveryRating}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Written Review *
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you loved about the rotis, dal tadka, or packaging..."
                  className="w-full text-xs p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-cream-50/50"
                />
                {error && <p className="text-[11px] text-red-600 font-bold mt-1">{error}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Kitchen Suggestions & Dish Requests (Optional)
                </label>
                <input
                  type="text"
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  placeholder="E.g. Would love seasonal sarson ka saag or sweeter lassi"
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-cream-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-forest-500 hover:bg-forest-600 text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback for Admin Moderation</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Submitted Reviews Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="text-sm font-extrabold text-charcoal-800">
                Recent Reviews ({feedbackList.length})
              </h3>
              <span className="text-[11px] text-charcoal-400">
                Live from LocalStorage
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {feedbackList.map((fb) => (
                <div
                  key={fb.id}
                  className="p-4 rounded-2xl border border-cream-200 bg-cream-50/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-charcoal-800">{fb.customerName}</p>
                      <p className="text-[10px] text-charcoal-400 font-mono">
                        Order #{fb.orderId}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-0.5 text-warmOrange-400 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < fb.rating ? 'fill-warmOrange-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded font-mono ${
                          fb.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : fb.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {fb.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-charcoal-700 leading-relaxed italic">
                    "{fb.comment}"
                  </p>

                  {fb.mealReviewed && (
                    <p className="text-[10px] text-forest-700 font-medium">
                      Reviewed: {fb.mealReviewed}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
