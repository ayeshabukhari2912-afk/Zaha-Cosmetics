import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products, setSelectedProductModal, setSelectedCategory, setCurrentPage } = useStore();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10"
        >
          {/* Search Input Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#1e8d4f] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search by product name, category, or formulation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base font-medium text-zinc-800 placeholder-zinc-400 outline-hidden bg-transparent"
            />
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-100 text-zinc-400 hover:text-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Area */}
          <div className="p-6 max-h-96 overflow-y-auto space-y-4">
            {query.trim() ? (
              results.length > 0 ? (
                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                    Found {results.length} Products
                  </span>

                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSelectedProductModal(product);
                        onClose();
                      }}
                      className="p-3 rounded-2xl hover:bg-[#f2faf4] transition-colors cursor-pointer border border-transparent hover:border-[#2eaf67]/30 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-xl border border-stone-200"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-[#1e8d4f] uppercase">{product.category}</span>
                          <h4 className="font-serif font-bold text-sm text-[#0e301d]">{product.name}</h4>
                          <span className="text-xs font-bold text-zinc-800">${product.discountPrice || product.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-500 text-xs">
                  No cosmetics found matching "{query}". Try searching for "Serum", "Lipstick", or "Rose".
                </div>
              )
            ) : (
              <div className="space-y-3 text-xs">
                <span className="uppercase font-bold text-zinc-400 tracking-wider">Popular Beauty Categories</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Makeup', 'Skincare', 'Lip Care', 'Face Care', 'Hair Care', 'Fragrances'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentPage('shop');
                        onClose();
                      }}
                      className="px-3.5 py-2 rounded-full bg-stone-100 hover:bg-[#0e301d] hover:text-[#d4af37] transition-colors font-medium text-zinc-700"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
