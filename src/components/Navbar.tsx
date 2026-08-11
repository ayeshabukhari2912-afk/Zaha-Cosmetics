import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles, Settings } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ViewPage } from '../types';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const {
    currentPage,
    setCurrentPage,
    cart,
    wishlist,
    setCartDrawerOpen,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navLinks: { label: string; page: ViewPage; action?: () => void }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop', action: () => setSelectedCategory(null) },
    { label: 'Categories', page: 'shop', action: () => {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('featured-categories')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }},
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
    { label: 'Admin Panel', page: 'admin' }
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.action) {
      link.action();
    } else {
      setCurrentPage(link.page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-[#1A1A1A] text-[#FAF9F6] text-xs font-medium py-2 px-4 text-center flex items-center justify-center gap-2 tracking-wide border-b border-[#A4C639]/30">
        <Sparkles className="w-3.5 h-3.5 text-[#A4C639] animate-pulse" />
        <span>Luxury Organic Beauty • Free Express Shipping over $60 • Code <strong className="text-[#A4C639]">ZAHA10</strong> for 10% OFF</span>
      </div>

      {/* Main Sticky Nav */}
      <nav className="glass border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#1A1A1A] hover:text-[#A4C639] hover:bg-stone-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <button
                id="brand-logo-btn"
                onClick={() => {
                  setCurrentPage('home');
                  setSelectedCategory(null);
                }}
                className="inline-flex flex-col items-center lg:items-start group text-left"
              >
                <div className="flex items-center gap-1.5">
                  <span className="serif text-2xl sm:text-3xl font-bold tracking-tighter text-[#1A1A1A] group-hover:text-[#A4C639] transition-colors">
                    ZAHA
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#A4C639]" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#C5A059] -mt-1">
                  COSMETICS
                </span>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(link)}
                  className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1 ${
                    currentPage === link.page && link.label !== 'Categories'
                      ? 'text-[#A4C639] font-bold'
                      : 'text-[#1A1A1A] hover:text-[#A4C639]'
                  }`}
                >
                  {link.label === 'Admin Panel' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A4C639]/15 text-[#1A1A1A] border border-[#A4C639]/40 text-[10px] font-bold uppercase tracking-wider hover:bg-[#A4C639] hover:text-white transition-all shadow-2xs">
                      <Settings className="w-3 h-3 text-[#A4C639] hover:text-white" />
                      Admin
                    </span>
                  ) : (
                    link.label
                  )}
                  {currentPage === link.page && link.label !== 'Categories' && link.label !== 'Admin Panel' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#A4C639] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Toggle */}
              <button
                id="search-open-btn"
                onClick={onOpenSearch}
                className="p-2.5 rounded-full text-[#1A1A1A] hover:text-[#A4C639] hover:bg-[#A4C639]/10 transition-colors relative"
                title="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                id="wishlist-btn"
                onClick={() => setCurrentPage('wishlist')}
                className="p-2.5 rounded-full text-[#1A1A1A] hover:text-[#A4C639] hover:bg-[#A4C639]/10 transition-colors relative"
                title="View wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#A4C639] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Toggle */}
              <button
                id="cart-drawer-toggle-btn"
                onClick={() => setCartDrawerOpen(true)}
                className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-full hover:bg-[#A4C639] transition-all shadow-sm hover:shadow-md group"
                title="View cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#A4C639] group-hover:text-white group-hover:scale-110 transition-all" />
                <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Cart</span>
                <span className="bg-[#A4C639] group-hover:bg-white group-hover:text-[#1A1A1A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-5 text-center transition-colors">
                  {cartCount}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  currentPage === link.page
                    ? 'bg-[#f2faf4] text-[#1e8d4f] font-semibold'
                    : 'text-zinc-700 hover:bg-stone-50'
                }`}
              >
                <span>{link.label}</span>
                {link.label === 'Admin Panel' && (
                  <span className="text-xs bg-[#2eaf67] text-white px-2 py-0.5 rounded-full">
                    Manage Store
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
