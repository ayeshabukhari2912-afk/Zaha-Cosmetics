import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl bg-[#0e301d] text-white border border-[#2eaf67]/40 backdrop-blur-md"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />}
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-wide text-[#d4af37]">{toast.title}</h4>
              <p className="text-xs text-zinc-200 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
