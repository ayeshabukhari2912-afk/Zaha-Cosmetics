import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromotionalBanner: React.FC = () => {
  const { promoImage, setCurrentPage, setSelectedCategory } = useStore();

  return (
    <section className="relative my-16 sm:my-24 py-20 lg:py-28 overflow-hidden rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-xl">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={promoImage}
          alt="Zaha Cosmetics Promo Banner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Ink Gradient Overlay for supreme text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/80 to-transparent" />
      </div>

      {/* Banner Content */}
      <div className="relative z-10 max-w-2xl space-y-6 text-white p-6 sm:p-10">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#A4C639]/50 text-[#A4C639] text-[10px] font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#A4C639]" />
          <span>Limited Time Organic Offer</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl serif font-bold leading-tight tracking-tight text-white">
          Your Beauty. <br />
          <span className="text-[#A4C639] italic font-normal">Your Confidence.</span>
        </h2>

        {/* Text */}
        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg">
          Discover our carefully selected collection of organic beauty essentials. Handcrafted with parrot-green botanicals and pure active extracts.
        </p>

        {/* Button */}
        <div className="pt-2">
          <button
            id="promo-shop-collection-btn"
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-3 bg-[#A4C639] text-white font-bold px-8 py-4 text-xs uppercase tracking-widest hover:brightness-105 transition-all duration-300 shadow-xl shadow-[#A4C639]/30 group"
          >
            <span>Shop Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
