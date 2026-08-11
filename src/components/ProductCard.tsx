import React from 'react';
import { Star, Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProductModal
  } = useStore();

  const isWishlisted = isInWishlist(product.id);
  const mainImage = product.images[0] || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#A4C639] hover-lift transition-all duration-300 flex flex-col h-full shadow-2xs">
      
      {/* Top Badges & Image Area */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={mainImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-[#1A1A1A] text-[#A4C639] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3 text-[#A4C639]" />
              Bestseller
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#A4C639] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-[#1A1A1A] hover:text-rose-500 hover:bg-white'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Overlay Action Buttons */}
        <div className="absolute inset-x-0 bottom-3 px-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            id={`view-details-${product.id}`}
            onClick={() => setSelectedProductModal(product)}
            className="flex-1 py-2.5 px-3 bg-white/95 backdrop-blur-md text-[#1A1A1A] rounded-xl text-xs font-semibold hover:bg-[#1A1A1A] hover:text-white transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#A4C639]" />
            <span>Quick View</span>
          </button>

          <button
            id={`quick-add-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="p-2.5 bg-[#1A1A1A] text-[#A4C639] hover:bg-[#A4C639] hover:text-white rounded-xl transition-colors shadow-sm"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category Tag & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[10px] font-bold text-[#A4C639] uppercase tracking-widest">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-[#1A1A1A]">{product.rating}</span>
              {product.reviews.length > 0 && (
                <span className="text-[10px] text-zinc-400">({product.reviews.length})</span>
              )}
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProductModal(product)}
            className="serif text-lg font-bold text-[#1A1A1A] hover:text-[#A4C639] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Footer: Price & Add to Cart */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-[#1A1A1A]">
                  ${product.discountPrice}
                </span>
                <span className="text-xs text-zinc-400 line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-[#1A1A1A]">
                ${product.price}
              </span>
            )}
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => addToCart(product, 1)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#A4C639]/15 text-[#1A1A1A] hover:bg-[#A4C639] hover:text-white text-xs font-bold transition-all border border-[#A4C639]/30"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#A4C639] group-hover:text-white" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
