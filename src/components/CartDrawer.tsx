import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    setCurrentPage,
    addToast
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!cartDrawerOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal > 60 || subtotal === 0 ? 0 : 8;
  const total = subtotal - discountAmount + shippingFee;

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ZAHA10') {
      setDiscountPercent(10);
      addToast('success', 'Promo Applied!', '10% discount applied to your order.');
    } else {
      addToast('error', 'Invalid Code', 'Try using code "ZAHA10" for 10% off.');
    }
  };

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    setCurrentPage('checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCartDrawerOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#0e301d] text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                <h2 className="font-serif text-xl font-bold tracking-tight">Your Shopping Cart</h2>
                <span className="bg-[#2eaf67] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </div>

              <button
                id="close-cart-drawer-btn"
                onClick={() => setCartDrawerOpen(false)}
                className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => {
                  const effectivePrice = item.product.discountPrice || item.product.price;
                  const itemTotal = effectivePrice * item.quantity;
                  const img = item.product.images[0] || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';

                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 rounded-2xl bg-stone-50 border border-stone-200/80 items-center"
                    >
                      {/* Product Image */}
                      <img
                        src={img}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 object-cover rounded-xl border border-stone-200 shrink-0"
                      />

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif font-bold text-sm text-[#0e301d] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-[#1e8d4f] font-semibold">
                          ${effectivePrice} <span className="text-zinc-400 font-normal">each</span>
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden text-xs">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-zinc-600 hover:bg-stone-100 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-1 font-bold text-zinc-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-zinc-600 hover:bg-stone-100 font-bold"
                            >
                              +
                            </button>
                          </div>

                          {/* Item Total Price */}
                          <span className="font-bold text-sm text-[#0e301d]">
                            ${itemTotal}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-zinc-400 hover:text-rose-500 transition-colors self-start"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0e301d]">Your Cart is Empty</h3>
                  <p className="text-xs text-zinc-500 max-w-xs">
                    Explore Zaha Cosmetics collection and discover products tailored for your glow.
                  </p>
                  <button
                    onClick={() => {
                      setCartDrawerOpen(false);
                      setCurrentPage('shop');
                    }}
                    className="bg-[#0e301d] text-[#d4af37] px-6 py-3 rounded-full text-xs font-bold hover:bg-[#1e8d4f] hover:text-white transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
                
                {/* Promo Code Input */}
                <form onSubmit={applyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. ZAHA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:border-[#1e8d4f] outline-hidden uppercase font-semibold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0e301d] text-white rounded-xl text-xs font-bold hover:bg-[#1e8d4f] transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>

                {/* Totals Breakdown */}
                <div className="space-y-1.5 text-xs text-zinc-600 border-t border-stone-200 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-zinc-800">${subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#2eaf67]">
                      <span>Discount (10% OFF)</span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-zinc-800">
                      {shippingFee === 0 ? <span className="text-[#2eaf67]">FREE</span> : `$${shippingFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#0e301d] border-t border-stone-200 pt-2 mt-2">
                    <span>Total Amount</span>
                    <span className="text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  id="cart-proceed-to-checkout-btn"
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl bg-[#0e301d] text-[#d4af37] font-bold text-sm hover:bg-[#1e8d4f] hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2eaf67]" />
                  <span>Encrypted 256-Bit Checkout Security</span>
                </div>

              </div>
            )}

          </motion.div>

        </div>
      </div>
    </AnimatePresence>
  );
};
