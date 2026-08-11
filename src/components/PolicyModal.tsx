import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PolicyModal: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal } = useStore();

  if (!activePolicyModal) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      text: `Zaha Cosmetics respects your privacy. We strictly safeguard all customer information, order details, and addresses using 256-bit SSL encryption. We never sell, share, or rent your personal data to third parties. All transaction records are maintained strictly for order fulfillment and customer support.`
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      text: `By purchasing from Zaha Cosmetics, you agree to our standard store policies. All product descriptions, ingredient declarations, and prices are stated accurately. Prices are subject to promotions and special discount updates. We reserve the right to limit order quantities on exclusive limited-edition releases.`
    },
    shipping: {
      title: 'Shipping Policy',
      icon: Truck,
      text: `We offer complimentary Express Shipping on all orders exceeding $60. Standard domestic delivery takes 2-3 business days. Orders placed before 2:00 PM EST ship same day in our signature parrot green recyclable gift packaging with tracking numbers sent via SMS/email.`
    },
    returns: {
      title: 'Return Policy',
      icon: RotateCcw,
      text: `Your beauty satisfaction is our top priority. We offer a 30-day money-back guarantee on all cosmetics. If a shade doesn't match your complexion or if you are unsatisfied for any reason, contact our Concierge team at support@zahacosmetics.com for a prepaid return label and full refund.`
    }
  };

  const currentPolicy = contentMap[activePolicyModal];
  const Icon = currentPolicy.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActivePolicyModal(null)}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xl z-10 space-y-4"
        >
          <button
            onClick={() => setActivePolicyModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-zinc-400 hover:text-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0e301d]">
              {currentPolicy.title}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-zinc-700 leading-relaxed">
            {currentPolicy.text}
          </div>

          <button
            onClick={() => setActivePolicyModal(null)}
            className="w-full py-3 rounded-xl bg-[#0e301d] text-[#d4af37] text-xs font-bold hover:bg-[#1e8d4f] hover:text-white transition-colors"
          >
            Close Policy
          </button>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};
