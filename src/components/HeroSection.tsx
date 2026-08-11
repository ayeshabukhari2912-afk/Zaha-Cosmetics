import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { heroImage, setCurrentPage } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] py-12 lg:py-20 border-b border-stone-200">
      
      {/* Side Vertical Ribbon Badge */}
      <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 h-36 w-10 bg-[#A4C639] items-center justify-center shadow-lg z-20">
        <span className="vertical-text text-white text-[10px] font-bold tracking-[0.5em] uppercase">
          New Arrival
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left relative z-10"
          >
            {/* Background Watermark */}
            <div className="absolute -top-10 -left-6 opacity-10 pointer-events-none select-none z-0">
              <h2 className="serif text-8xl sm:text-9xl italic leading-none text-[#1A1A1A]">Zaha</h2>
            </div>

            <div className="relative z-10">
              {/* Tagline */}
              <span className="text-[#A4C639] font-bold uppercase tracking-[0.3em] text-[11px] mb-3 block">
                Elegance Defined
              </span>

              {/* Main Headline */}
              <h1 className="serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-[#1A1A1A] mb-6">
                Beauty That<br />
                <span className="italic text-[#A4C639]">Defines</span> You
              </h1>

              {/* Supporting Text */}
              <p className="text-zinc-600 max-w-md mx-auto lg:mx-0 text-sm leading-relaxed mb-8">
                Discover premium beauty products carefully selected to enhance your natural beauty. Our parrot-green organic collection brings vitality to your skincare routine.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  id="hero-shop-now-btn"
                  onClick={() => setCurrentPage('shop')}
                  className="w-full sm:w-auto bg-[#A4C639] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:brightness-105 transition-all shadow-xl shadow-[#A4C639]/20 inline-flex items-center justify-center gap-2 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-explore-collection-btn"
                  onClick={() => {
                    const categoriesEl = document.getElementById('featured-categories');
                    if (categoriesEl) {
                      categoriesEl.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setCurrentPage('shop');
                    }
                  }}
                  className="w-full sm:w-auto border border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all inline-flex items-center justify-center gap-2"
                >
                  Explore Collection
                </button>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-stone-200 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1 text-xs font-bold text-[#1A1A1A]">
                    <ShieldCheck className="w-4 h-4 text-[#A4C639]" />
                    <span>100% Organic</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-0.5">Dermatologist Tested</span>
                </div>

                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1 text-xs font-bold text-[#1A1A1A]">
                    <HeartHandshake className="w-4 h-4 text-[#A4C639]" />
                    <span>Cruelty Free</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-0.5">Vegan Certified</span>
                </div>

                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1 text-xs font-bold text-[#1A1A1A]">
                    <Truck className="w-4 h-4 text-[#A4C639]" />
                    <span>Fast Delivery</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-0.5">Free over $60</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Hero Showcase Panel with Parrot Green Background */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 bg-[#A4C639] rounded-3xl p-8 lg:p-12 relative flex flex-col items-center justify-center overflow-hidden min-h-[460px] shadow-2xl"
          >
            {/* Geometric Ring Shapes */}
            <div className="absolute -right-20 top-10 w-80 h-80 border-[40px] border-white/10 rounded-full pointer-events-none" />
            <div className="absolute -left-20 bottom-10 w-60 h-60 border-[20px] border-black/5 rounded-full pointer-events-none" />

            {/* Rotated Spotlight Product Card */}
            <div className="relative z-10 text-center w-full max-w-xs">
              <div className="w-full bg-white shadow-2xl p-4 flex flex-col items-center justify-between mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500 rounded-xl">
                <div className="w-full h-52 bg-stone-50 overflow-hidden relative border border-stone-100 rounded-lg">
                  <img
                    src={heroImage}
                    alt="Botanical Glow Hero Product"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#A4C639] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Star Item
                  </div>
                </div>

                <div className="text-left w-full mt-4 space-y-1">
                  <p className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">Premium Formulation</p>
                  <h4 className="serif text-xl font-bold text-[#1A1A1A]">Botanical Glow Elixir</h4>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[#A4C639] font-bold text-base">$48.00</span>
                    <button
                      onClick={() => setCurrentPage('shop')}
                      className="text-[10px] font-bold uppercase tracking-widest border-b border-[#1A1A1A] hover:text-[#A4C639] hover:border-[#A4C639] transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-white space-y-1">
                <h3 className="serif italic text-2xl font-bold">Award Winning Formula</h3>
                <p className="text-[10px] uppercase tracking-[0.4em] opacity-90 font-semibold">Certified Organic Beauty</p>
              </div>
            </div>

            {/* Bottom Dots Indicator */}
            <div className="absolute bottom-4 right-6 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
