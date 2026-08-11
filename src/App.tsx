import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { ProductGrid } from './components/ProductGrid';
import { PromotionalBanner } from './components/PromotionalBanner';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactPage } from './components/ContactPage';
import { WishlistPage } from './components/WishlistPage';
import { SearchModal } from './components/SearchModal';
import { PolicyModal } from './components/PolicyModal';
import { ToastContainer } from './components/Toast';

const MainLayout: React.FC = () => {
  const { currentPage } = useStore();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa] text-zinc-800">
      
      {/* Sticky Header */}
      <Navbar onOpenSearch={() => setSearchModalOpen(true)} />

      {/* Main Dynamic View Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSection />
            <FeaturedCategories />
            <ProductGrid isHomePage={true} />
            <PromotionalBanner />
          </>
        )}

        {currentPage === 'shop' && <ProductGrid isHomePage={false} />}
        {currentPage === 'about' && <AboutUsPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'admin' && <AdminDashboard />}
        {currentPage === 'wishlist' && <WishlistPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlay Drawers */}
      <ProductDetailsModal />
      <CartDrawer />
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <PolicyModal />
      <ToastContainer />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
