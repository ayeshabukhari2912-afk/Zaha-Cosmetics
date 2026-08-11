import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailsModal: React.FC = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addReview,
    setCurrentPage,
    setCartDrawerOpen
  } = useStore();

  const product = selectedProductModal;
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'benefits' | 'howToUse'>('description');
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const images = product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  ];
  const activeImage = images[selectedImageIndex] || images[0];
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setSelectedProductModal(null);
    setCurrentPage('checkout');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setCartDrawerOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    addReview(product.id, {
      customerName: reviewerName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim()
    });

    setReviewerName('');
    setReviewComment('');
    setReviewRating(5);
    setShowReviewForm(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProductModal(null)}
          className="fixed inset-0"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Close Button */}
          <button
            id="close-product-modal-btn"
            onClick={() => setSelectedProductModal(null)}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-100 hover:bg-[#0e301d] hover:text-white text-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Image Gallery */}
              <div className="md:col-span-6 space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={activeImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  {hasDiscount && (
                    <span className="absolute top-3 left-3 bg-[#2eaf67] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                </div>

                {/* Thumbnails Row */}
                {images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          selectedImageIndex === idx
                            ? 'border-[#1e8d4f] ring-2 ring-[#2eaf67]/30'
                            : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Product Core Details */}
              <div className="md:col-span-6 space-y-5">
                
                {/* Category & Ratings */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1e8d4f]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-zinc-800">{product.rating}</span>
                    <span className="text-xs text-zinc-400">({product.reviews.length} reviews)</span>
                  </div>
                </div>

                {/* Product Name */}
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0e301d]">
                  {product.name}
                </h2>

                {/* Pricing & Stock */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-3">
                    {hasDiscount ? (
                      <>
                        <span className="text-3xl font-bold text-[#0e301d]">
                          ${product.discountPrice}
                        </span>
                        <span className="text-base text-zinc-400 line-through">
                          ${product.price}
                        </span>
                        <span className="text-xs font-bold text-[#2eaf67] bg-[#f2faf4] px-2.5 py-1 rounded-full border border-[#2eaf67]/30">
                          Save ${product.price - (product.discountPrice || 0)}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-[#0e301d]">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    product.stock > 0
                      ? 'bg-[#f2faf4] text-[#1e8d4f] border border-[#2eaf67]/30'
                      : 'bg-rose-50 text-rose-600 border border-rose-200'
                  }`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Quantity Controls & Action Buttons */}
                <div className="space-y-4 pt-4 border-t border-stone-200">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1.5 text-zinc-700 hover:bg-stone-200 transition-colors font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-sm font-bold text-[#0e301d]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                        className="px-3 py-1.5 text-zinc-700 hover:bg-stone-200 transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                    <button
                      id="modal-add-to-cart-btn"
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0}
                      className="sm:col-span-7 inline-flex items-center justify-center gap-2 bg-[#0e301d] text-white py-3.5 px-6 rounded-2xl font-bold text-sm hover:bg-[#1e8d4f] transition-all disabled:opacity-50"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      id="modal-buy-now-btn"
                      onClick={handleBuyNow}
                      disabled={product.stock <= 0}
                      className="sm:col-span-5 inline-flex items-center justify-center gap-2 bg-[#d4af37] text-[#0e301d] py-3.5 px-4 rounded-2xl font-bold text-sm hover:bg-[#e5ca70] transition-all disabled:opacity-50 shadow-sm"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-zinc-700 hover:bg-stone-50 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-zinc-500'}`} />
                    <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                </div>

                {/* Shipping & Guarantee */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100 text-xs text-zinc-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#1e8d4f]" />
                    <span>Fast Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1e8d4f]" />
                    <span>100% Authentic Guarantee</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Tabbed Info: Description, Ingredients, Benefits, How To Use */}
            <div className="pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
                {(['description', 'ingredients', 'benefits', 'howToUse'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-[#1e8d4f] text-[#1e8d4f]'
                        : 'border-transparent text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    {tab === 'howToUse' ? 'How To Use' : tab}
                  </button>
                ))}
              </div>

              <div className="py-6 text-sm text-zinc-700 leading-relaxed">
                {activeTab === 'description' && (
                  <p className="whitespace-pre-line">{product.fullDescription || product.shortDescription}</p>
                )}
                {activeTab === 'ingredients' && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                    <p className="font-mono text-xs text-stone-700">{product.ingredients || 'Organic botanicals, essential oils, natural pigments.'}</p>
                  </div>
                )}
                {activeTab === 'benefits' && (
                  <div className="whitespace-pre-line space-y-2">
                    {product.benefits || '• Formulated for deep hydration and natural radiant glow.\n• Free from parabens, sulfates, and synthetic fragrances.'}
                  </div>
                )}
                {activeTab === 'howToUse' && (
                  <p className="whitespace-pre-line">{product.howToUse || 'Apply as desired onto clean skin or lips for instant radiance.'}</p>
                )}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="pt-8 border-t border-stone-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0e301d]">Customer Reviews</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-zinc-800">{product.rating} out of 5</span>
                  </div>
                </div>

                <button
                  id="write-review-toggle-btn"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 rounded-xl bg-[#f2faf4] text-[#1e8d4f] text-xs font-semibold hover:bg-[#0e301d] hover:text-white transition-colors border border-[#2eaf67]/30"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </button>
              </div>

              {/* Write Review Form */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                  <h4 className="font-bold text-sm text-[#0e301d]">Share Your Experience</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-600 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah M."
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:border-[#1e8d4f] outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-600 mb-1">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:border-[#1e8d4f] outline-hidden bg-white cursor-pointer"
                      >
                        <option value={5}>★★★★★ (5 Stars - Excellent)</option>
                        <option value={4}>★★★★☆ (4 Stars - Good)</option>
                        <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                        <option value={2}>★★☆☆☆ (2 Stars - Poor)</option>
                        <option value={1}>★☆☆☆☆ (1 Star - Terrible)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 mb-1">Your Review</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write your honest thoughts about texture, scent, and results..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:border-[#1e8d4f] outline-hidden bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0e301d] text-[#d4af37] px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1e8d4f] hover:text-white transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#0e301d]">{rev.customerName}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#2eaf67] bg-[#f2faf4] px-2 py-0.5 rounded-full font-semibold">
                            <Check className="w-3 h-3" /> Verified Buyer
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-400">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-current' : 'text-stone-300'}`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-zinc-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500 italic">No reviews yet for this product. Be the first to leave a review!</p>
                )}
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
