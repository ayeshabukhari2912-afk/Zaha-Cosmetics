import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, Leaf, Award, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutUsPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2faf4] text-[#1e8d4f] border border-[#2eaf67]/30 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>The Essence of Zaha</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#0e301d] tracking-tight">
          Beauty Inspired <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#1e8d4f]">by You</span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          At Zaha Cosmetics, we believe true beauty is an authentic expression of self-confidence. Our luxury formulations harmonize organic parrot-green botanicals with pure gold illumination to honor your natural radiance.
        </p>
      </div>

      {/* Visual Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-21/9 bg-stone-100">
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80"
          alt="Zaha Cosmetics Botanical Laboratory"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e301d]/80 via-transparent to-transparent flex items-end p-8 sm:p-12">
          <div className="text-white max-w-xl space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">Crafted with Precision</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Pure Organic Botanical Science</h3>
          </div>
        </div>
      </div>

      {/* Story, Mission, Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0e301d]">Our Story</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Founded with a vision to redefine luxury cosmetics, Zaha began as an artisanal beauty atelier blending cold-pressed plant extracts with high-pigment velvet minerals.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0e301d]">Our Mission</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            To create dermatologist-approved, skin-loving cosmetic essentials that deliver uncompromising performance without harmful chemicals or synthetic fillers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0e301d]">Our Vision</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            To inspire clean beauty confidence across the globe, setting a new gold standard for sustainable eco-luxury cosmetics in parrot-green harmony.
          </p>
        </div>

      </div>

      {/* Why Choose Zaha Cosmetics */}
      <div className="bg-gradient-to-r from-[#0e301d] to-[#1e8d4f] text-white p-8 sm:p-14 rounded-3xl space-y-8 shadow-xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Uncompromised Standards</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Why Choose Zaha Cosmetics</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#d4af37]" />
            <h4 className="font-serif font-bold text-lg">100% Organic</h4>
            <p className="text-xs text-stone-200">Sourced from certified ethical botanical growers globally.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-2">
            <Heart className="w-8 h-8 text-[#d4af37]" />
            <h4 className="font-serif font-bold text-lg">Cruelty-Free</h4>
            <p className="text-xs text-stone-200">Never tested on animals. Leaping Bunny certified vegan.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-2">
            <Award className="w-8 h-8 text-[#d4af37]" />
            <h4 className="font-serif font-bold text-lg">Dermatologist Approved</h4>
            <p className="text-xs text-stone-200">Hypoallergenic and suitable for even sensitive skin.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-2">
            <Leaf className="w-8 h-8 text-[#d4af37]" />
            <h4 className="font-serif font-bold text-lg">Sustainable Packaging</h4>
            <p className="text-xs text-stone-200">Recyclable glass and eco-friendly parrot green cartons.</p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 bg-[#d4af37] text-[#0e301d] font-bold px-8 py-4 rounded-full text-sm hover:bg-white hover:text-[#0e301d] transition-colors"
          >
            <span>Explore Our Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
