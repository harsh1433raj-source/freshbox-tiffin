# FreshBox Tiffin — Complete Frontend-Only Food Ordering Platform

> **"Ghar Jaisa Khana, Ab Aapke Darwaze Par."**  
> Freshly prepared meals, flexible monthly plans, and everyday essentials delivered with care.

FreshBox Tiffin is a complete, interactive, responsive Indian tiffin delivery platform built with React, Vite, TypeScript, and Tailwind CSS. It enables customers to order daily homestyle thalis, customize meal components (rotis, dal, sabzi, curd, spices), subscribe to monthly meal plans, purchase drinking water (bottles and 20L jars with refundable deposits), simulate checkout with recognizable Indian payment options, track orders live across 6 stages, and submit verified feedback.

---

## 🌟 Key Features

### 1. Daily Food Menu & Instant Customization (`/menu`)
- **Rich Menu**: 15+ homestyle dishes spanning Breakfast (Poha, Upma, Stuffed Paratha), Lunch, Dinner, Combos, Snacks, Beverages, and Desserts.
- **"Customize Your Tiffin" Modal**:
  - Choice of Roti & Bread (Tawa Roti, Butter Roti, Paratha, Aloo Paratha).
  - Rice & Grains portions (Basmati, Jeera Rice, Pulao).
  - Dal selection (Dal Tadka, Dal Makhani, Yellow Dal Fry).
  - Sabzi selection (Seasonal Mix Veg, Paneer Butter Masala).
  - Raita & Curd (Plain Dahi, Boondi Raita, Cucumber Raita).
  - Spice levels (Mild, Medium, Spicy, Desi Spicy) and special kitchen notes.
  - **Dynamic Price Recalculation**: Instant recalculation as customization addons are selected.

### 2. Dedicated Meal Add-ons: "Make Your Meal Extra Special"
- 7 comprehensive categories with distinct photography, units, and quantity selectors:
  - **Roti and Bread**: Tawa Roti (₹8), Two Rotis Pack (₹15), Butter Roti (₹12), Plain Paratha (₹20), Stuffed Paratha (₹35).
  - **Rice and Grains**: Extra Steamed Rice (₹25), Jeera Rice (₹40), Veg Pulao (₹40).
  - **Salad and Fresh Sides**: Green Salad (₹20), Cucumber Salad (₹20), Onion Salad (₹10), Sprouts Salad (₹35).
  - **Raita and Curd**: Plain Curd (₹20), Boondi Raita (₹30), Cucumber Raita (₹30), Mixed Veg Raita (₹35).
  - **Dal and Gravy**: Homestyle Dal (₹25), Dal Tadka (₹40), Seasonal Sabzi (₹30), Paneer Sabzi (₹60).
  - **Snacks and Accompaniments**: Green Chutney (₹10), Mint Chutney (₹10), Pickle (₹5), Papad (₹10), Roasted Papad (₹15), Masala Papad (₹25).
  - **Dairy and Other Extras**: Extra Paneer (₹40), Buttermilk/Chaas (₹20), Sweet Lassi (₹35), Sweet Dish (₹30), Gulab Jamun (₹30).
- Can be added alone or alongside any meal, with duplicate prevention in cart.

### 3. Drinking Water Store (`/water`)
- **Products**: 500 ml (₹10), 1 Litre (₹20), 2 Litre (₹30), and 20-Litre Water Jar (₹80).
- **Refundable Deposit**: ₹150 refundable deposit automatically applied for 20L jars unless exchanged.
- **Monthly Delivery Plans**: Daily Jar Plan (₹1,999/mo), Alternate Days Plan (₹1,199/mo), and Weekly Office Plan (₹699/mo).
- **Jar Return Tracking**: Interactive interface to schedule empty jar pickup and claim refund credits.
- Food items and water bottles/jars can be seamlessly purchased in the same cart.

### 4. Monthly Subscription Plans (`/subscriptions` & `/subscription-checkout`)
- **3 Flexible Plans**:
  - **Basic Daily Saver**: 1 meal/day (Lunch OR Dinner), 26 days (₹2,000).
  - **Standard Twin Meal**: 2 meals/day (Lunch & Dinner), 26 days (₹3,800).
  - **Premium All-Month Feast**: 2 meals/day + Sunday Special Feasts, 30 days (₹4,500).
- Comprehensive comparison table, slot selection (Lunch/Dinner), start date picker, dietary style selection (Regular, Strict Veg, Jain, Low Oil).
- Dedicated customer pause controls: customers can pause specific dates anytime to extend their plan.

### 5. Shopping Cart & Simulated Checkout (`/cart` & `/checkout`)
- Customization itemization breakdown, quantity steppers, and item removal.
- **Coupons**: `FRESH10` (10% off) and `WELCOME50` (flat ₹50 off) with live validation.
- Free delivery on orders above ₹149 (otherwise ₹30).
- **Recognizable Payment Brand Logos**:
  - Razorpay, UPI, Google Pay, PhonePe, Paytm, Visa, Mastercard, and Cash on Delivery.
  - Interactive payment confirmation simulation modal for online methods.
  - Generates unique order ID format: `FB-2026-XXXXX`.
  - Clears purchased items and persists order into localStorage.

### 6. Live Order Tracking (`/track-order`)
- Automatic order loading from URL (`?orderId=...`) or multi-order switcher.
- **6 Visual Progress Stages**:
  1. Order Placed
  2. Confirmed
  3. Preparing Food
  4. Ready for Pickup
  5. Out for Delivery
  6. Delivered
- **Interactive Demo Simulator**: Advance stages with 1-click or jump directly to any stage.
- Shows assigned rider name (Suresh Kumar), vehicle number (`KA-01-HG-4589`), target 30-min delivery window, and ordered meal breakdown.
- Synchronized with Admin updates in real-time.

### 7. Customer Feedback & Review Moderation (`/feedback`)
- Multi-attribute ratings: Overall, Food Quality, Authentic Taste, Packaging & Delivery.
- Written review and suggestions fields.
- Admin review moderation: reviews start as `pending` and must be `approved` by Admin to appear on the public homepage.
- Average rating dynamically recalculated from approved reviews.

### 8. Customer Account Dashboard (`/account`)
- Profile details and editable delivery address.
- Active subscriptions with pause/resume meal calendar controls.
- Drinking water 20L jar deposit balance tracker.
- **Custom Food Request Form**: Request off-menu dishes, Gujarati thepla, halwa, or special diet meals, with status tracking (`Pending`, `Accepted`, `Rejected`).

### 9. Master Admin Panel (`/admin`)
- **Overview**: Real-time demo revenue, total orders, active subscribers, pending deliveries, and average rating.
- **Order Management**: Search, filter, view complete customer details, and advance/change order stages.
- **Menu Management**: Add new meals, edit prices, edit descriptions, upload images, and toggle stock.
- **Water Management**: Edit bottle and jar rates and refundable deposit amounts.
- **Subscription Management**: View subscriber roster, pause schedules, and cancel demo subscriptions.
- **Feedback Management**: Approve, mark pending, or hide customer reviews.
- **Custom Food Requests**: Review incoming customer special dishes, accept/reject, and quote prices.
- **Settings & Factory Reset**: 1-click button to reset all localStorage data back to initial seeds.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 6
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom FreshBox brand palette (Deep forest green `#176B45`, Warm orange `#F59E0B`, Warm cream `#FFF9F0`)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **State & Persistence**: React Context API + LocalStorage with automatic schema migration and fallback handling

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Launch

1. Navigate to the project directory:
   ```bash
   cd /Users/harshrajharsh/.gemini/antigravity/scratch/freshbox-tiffin
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port displayed in your terminal).

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 🧭 Routes & Site Map

| Route | Description |
|---|---|
| `/` | Homepage with Hero, Daily Tiffin, Extras, Water, Subscriptions, FAQs & Reviews |
| `/menu` | Daily Food Menu with search, category tabs, and customization modal |
| `/subscriptions` | Monthly Meal Plans with 3-tier cards & plan comparison table |
| `/water` | Drinking Water Store (bottles, 20L jars, deposits, return tracking) |
| `/cart` | Shopping Cart with coupon validation and recommended add-ons |
| `/checkout` | Order Checkout with address form & payment gateway logo selector |
| `/subscription-checkout` | Dedicated Monthly Subscription checkout & schedule configuration |
| `/order-success` | Order confirmation screen with direct "Track My Order" CTA |
| `/track-order` | Live 6-stage order tracking timeline with demo advancement simulator |
| `/orders` | Customer order history list with 1-click reorder and review links |
| `/feedback` | Star rating & review submission with admin approval workflow |
| `/account` | Customer Dashboard: subscriptions, pause controls, custom food requests |
| `/login` | 1-click demo login profiles (Rahul Sharma, Priya Iyer) |
| `/contact` | Kitchen operational hours, contact form, and WhatsApp UI button |
| `/admin` | Complete Master Admin Panel for orders, menu, water, reviews & reset |

---

## ⚠️ Demo Mode Limitations

- **Frontend-Only**: All interactions (orders, cart, status changes, subscriptions, feedback, custom dishes) are executed and stored entirely on the client side using the browser's `localStorage`.
- **No Real Payments**: Payment gateway options (Razorpay, UPI, Google Pay, PhonePe, Paytm, Visa, Mastercard) run a safe visual simulation. No real card numbers, CVVs, UPI PINs, or banking credentials are ever gathered.
- **Single-Browser Persistence**: Changes made in the Admin Dashboard (such as updating prices or advancing order status) will reflect instantly across customer pages within the **same browser session/profile**. Data does not synchronize across separate physical devices.
- **Simulated Communications**: WhatsApp and phone actions are simulated UI elements and do not send real SMS or cellular calls.
