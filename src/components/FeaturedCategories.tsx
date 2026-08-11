import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FeaturedCategories: React.FC = () => {
  const { categories, setSelectedCategory, setCurrentPage } = useStore();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="featured-categories" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A4C639]">
            Curated Organic Formulations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            Explore By Category
          </h2>
          <div className="w-12 h-0.5 bg-[#A4C639] mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-zinc-600">
            Tailored botanical formulations designed to enhance every aspect of your daily skincare and makeup routine.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-[#A4C639] hover-lift transition-all flex flex-col h-full shadow-2xs"
            >
              {/* Image Container */}
              <div className="relative aspect-4/5 overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#A4C639] opacity-0 group-hover:opacity-20 transition-opacity" />
                
                {/* Arrow Icon Badge */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4 text-[#A4C639]" />
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-4 text-center bg-white flex-1 flex flex-col justify-center">
                <h3 className="serif text-base font-bold text-[#1A1A1A] group-hover:text-[#A4C639] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">
                  Collection
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
