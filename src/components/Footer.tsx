import React, { useState } from 'react';
import { Instagram, Facebook, MessageCircle, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, setActivePolicyModal, addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    addToast('success', 'Subscribed to Zaha VIP', 'Welcome! You will receive exclusive beauty previews and private discounts.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-12 border-t border-[#A4C639]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Bio Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="serif text-3xl font-bold tracking-tighter text-white">
                ZAHA
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#A4C639]" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#C5A059] block -mt-2">
              COSMETICS
            </span>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              “Enhance your beauty. Express yourself.” <br />
              Handcrafted organic cosmetics, high-impact pigments, and parrot-green botanical formulations for timeless radiance.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="p-2.5 rounded-full bg-white/10 hover:bg-[#A4C639] transition-colors text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="p-2.5 rounded-full bg-white/10 hover:bg-[#A4C639] transition-colors text-white">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#tiktok" className="p-2.5 rounded-full bg-white/10 hover:bg-[#A4C639] transition-colors text-white">
                <Sparkles className="w-4 h-4" />
              </a>
              <a href="#whatsapp" className="p-2.5 rounded-full bg-white/10 hover:bg-[#A4C639] transition-colors text-white">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3 text-xs">
            <h4 className="serif text-base font-bold text-[#A4C639] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <button onClick={() => { setCurrentPage('home'); setSelectedCategory(null); }} className="hover:text-[#A4C639] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('shop'); setSelectedCategory(null); }} className="hover:text-[#A4C639] transition-colors">
                  Shop Collection
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-[#A4C639] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-[#A4C639] transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin')} className="text-[#A4C639] font-bold hover:underline">
                  Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care / Policies Column */}
          <div className="space-y-3 text-xs">
            <h4 className="serif text-base font-bold text-[#A4C639] uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <button onClick={() => setActivePolicyModal('privacy')} className="hover:text-[#A4C639] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('terms')} className="hover:text-[#A4C639] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('shipping')} className="hover:text-[#A4C639] transition-colors">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('returns')} className="hover:text-[#A4C639] transition-colors">
                  Return Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3 text-xs">
            <h4 className="serif text-base font-bold text-[#A4C639] uppercase tracking-wider">Join Zaha VIP</h4>
            <p className="text-stone-300">
              Subscribe for private sales, beauty masterclasses, and 10% off your first purchase.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-hidden focus:border-[#A4C639] text-xs"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#A4C639] text-white font-bold text-xs uppercase tracking-widest hover:brightness-105 transition-colors inline-flex items-center justify-center gap-1.5 shadow-md shadow-[#A4C639]/20"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright & payment security */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Zaha Cosmetics. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#A4C639]" />
            <span>Secure Cash on Delivery & Encrypted Online Checkout</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
