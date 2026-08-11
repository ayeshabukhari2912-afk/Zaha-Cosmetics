import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Truck, CreditCard, ShieldCheck, ShoppingBag, ArrowLeft, Printer } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShippingDetails, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    placeOrder,
    lastPlacedOrder,
    setLastPlacedOrder,
    setCurrentPage
  } = useStore();

  const [formData, setFormData] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Totals
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );
  const shippingFee = subtotal > 60 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder(formData, paymentMethod);
      setIsSubmitting(false);
    }, 800);
  };

  // 1. Order Confirmation View
  if (lastPlacedOrder) {
    return (
      <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Success Header Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 text-center space-y-4 shadow-lg"
        >
          <div className="w-20 h-20 rounded-full bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center mx-auto border border-[#2eaf67]/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-[#1e8d4f]">
            Order Successfully Placed
          </span>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0e301d]">
            Thank You for Your Order!
          </h1>

          <p className="text-sm text-zinc-600 max-w-md mx-auto">
            Your Zaha Cosmetics order <strong className="text-[#0e301d]">#{lastPlacedOrder.id}</strong> has been received and is currently being processed by our beauty concierges.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/60">
            <Truck className="w-4 h-4 text-amber-600" />
            <span>Estimated Delivery: 2-3 Business Days ({lastPlacedOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Paid Online'})</span>
          </div>
        </motion.div>

        {/* Order Details Breakdown */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <h3 className="font-serif text-lg font-bold text-[#0e301d]">Order Summary</h3>
            <span className="text-xs text-zinc-400">{lastPlacedOrder.createdAt}</span>
          </div>

          {/* Purchased Items */}
          <div className="space-y-3 divide-y divide-stone-100">
            {lastPlacedOrder.items.map((item) => (
              <div key={item.product.id} className="pt-3 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-xl border border-stone-200"
                  />
                  <div>
                    <h4 className="font-bold text-[#0e301d]">{item.product.name}</h4>
                    <span className="text-zinc-500">Qty: {item.quantity} × ${item.product.discountPrice || item.product.price}</span>
                  </div>
                </div>
                <span className="font-bold text-[#0e301d]">
                  ${(item.product.discountPrice || item.product.price) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Shipping Address Summary */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1 text-zinc-700">
            <span className="font-bold text-[#0e301d] block mb-1">Shipping To:</span>
            <p><strong>Name:</strong> {lastPlacedOrder.shippingDetails.fullName}</p>
            <p><strong>Phone:</strong> {lastPlacedOrder.shippingDetails.phone}</p>
            <p><strong>Address:</strong> {lastPlacedOrder.shippingDetails.address}, {lastPlacedOrder.shippingDetails.city} ({lastPlacedOrder.shippingDetails.postalCode})</p>
          </div>

          {/* Pricing Summary */}
          <div className="space-y-2 pt-4 border-t border-stone-200 text-xs text-zinc-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-800">${lastPlacedOrder.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-semibold text-zinc-800">
                {lastPlacedOrder.shippingFee === 0 ? 'FREE' : `$${lastPlacedOrder.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#0e301d] pt-2 border-t border-stone-200">
              <span>Total Paid / Due</span>
              <span className="text-[#1e8d4f] text-lg">${lastPlacedOrder.total}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => window.print()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-stone-300 text-xs font-semibold text-zinc-700 hover:bg-stone-50"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>

            <button
              onClick={() => {
                setLastPlacedOrder(null);
                setCurrentPage('shop');
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0e301d] text-[#d4af37] text-xs font-bold hover:bg-[#1e8d4f] hover:text-white transition-colors"
            >
              <span>Continue Shopping</span>
            </button>
          </div>

        </div>

      </div>
    );
  }

  // 2. Empty Cart Check
  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#0e301d]">No Items in Checkout</h2>
        <p className="text-xs text-zinc-500">Your cart is currently empty. Please add cosmetics products before checking out.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="bg-[#0e301d] text-[#d4af37] px-6 py-3 rounded-full text-xs font-bold hover:bg-[#1e8d4f] hover:text-white transition-colors"
        >
          Browse Shop
        </button>
      </div>
    );
  }

  // 3. Checkout Form View
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back button & Page Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#1e8d4f] hover:text-[#0e301d] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0e301d]">
          Secure Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Customer & Delivery Info */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0e301d] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#1e8d4f]" />
              Shipping & Delivery Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-zinc-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-zinc-700 mb-1">Complete Delivery Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="House / Apartment #, Street, Block"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Lahore / New York"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  placeholder="e.g. 54000"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#1e8d4f] focus:ring-2 focus:ring-[#2eaf67]/20 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0e301d] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#1e8d4f]" />
              Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cash on Delivery option */}
              <label
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'COD'
                    ? 'border-[#1e8d4f] bg-[#f2faf4]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 text-[#1e8d4f] focus:ring-[#2eaf67]"
                />
                <div>
                  <span className="font-bold text-xs text-[#0e301d] block">Cash on Delivery (COD)</span>
                  <span className="text-[11px] text-zinc-500">Pay in cash when your order arrives at your doorstep.</span>
                </div>
              </label>

              {/* Online Payment placeholder option */}
              <label
                onClick={() => setPaymentMethod('ONLINE')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'ONLINE'
                    ? 'border-[#1e8d4f] bg-[#f2faf4]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'ONLINE'}
                  onChange={() => setPaymentMethod('ONLINE')}
                  className="mt-1 text-[#1e8d4f] focus:ring-[#2eaf67]"
                />
                <div>
                  <span className="font-bold text-xs text-[#0e301d] block">Online Payment / Card</span>
                  <span className="text-[11px] text-zinc-500">Visa, Mastercard, or Mobile Wallet placeholder.</span>
                </div>
              </label>
            </div>

            {paymentMethod === 'ONLINE' && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-zinc-600 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-600 mb-1">Card Number (Demo)</label>
                  <input
                    type="text"
                    placeholder="4000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-6 sticky top-28">
            <h3 className="font-serif text-lg font-bold text-[#0e301d] pb-3 border-b border-stone-200">
              Your Order ({cart.length} Items)
            </h3>

            {/* Cart items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#0e301d] truncate">{item.product.name}</h4>
                    <span className="text-zinc-500">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-[#0e301d]">
                    ${(item.product.discountPrice || item.product.price) * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-zinc-600 border-t border-stone-200 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-800">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-semibold text-zinc-800">
                  {shippingFee === 0 ? <span className="text-[#2eaf67]">FREE</span> : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#0e301d] pt-3 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-lg text-[#1e8d4f]">${total}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              id="place-order-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-[#0e301d] text-[#d4af37] font-bold text-sm hover:bg-[#1e8d4f] hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShieldCheck className="w-5 h-5 text-[#2eaf67]" />
              <span>{isSubmitting ? 'Processing Order...' : 'Place Order Now'}</span>
            </button>

            <p className="text-[11px] text-center text-zinc-400 leading-relaxed">
              By clicking "Place Order", you agree to Zaha Cosmetics purchase terms and shipping guidelines.
            </p>

          </div>
        </div>

      </form>
    </div>
  );
};
