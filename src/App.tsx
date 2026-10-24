import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { MobileBottomNav } from './components/common/MobileBottomNav';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { WaterPage } from './pages/WaterPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SubscriptionCheckoutPage } from './pages/SubscriptionCheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { OrdersPage } from './pages/OrdersPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-200 text-charcoal-800 font-sans selection:bg-forest-100 selection:text-forest-800">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <ToastContainer />

      <main className="flex-1 pb-20 md:pb-0 w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/water" element={<WaterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/subscription-checkout" element={<SubscriptionCheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default App;
