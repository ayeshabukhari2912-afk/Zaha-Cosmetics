import React from 'react';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const WishlistPage: React.FC = () => {
  const { products, wishlist, setCurrentPage } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1e8d4f] hover:text-[#0e301d] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0e301d]">
            Your Saved Wishlist ({wishlistedProducts.length})
          </h1>
        </div>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0e301d]">Your Wishlist is Empty</h2>
          <p className="text-xs text-zinc-500">
            Click the heart icon on any product card to save your favorite lipsticks, serums, and fragrances for later.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[#0e301d] text-[#d4af37] px-6 py-3 rounded-full text-xs font-bold hover:bg-[#1e8d4f] hover:text-white transition-colors"
          >
            Explore Cosmetics Catalog
          </button>
        </div>
      )}

    </div>
  );
};
