import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  isHomePage?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ isHomePage = false }) => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    setCurrentPage
  } = useStore();

  // Shop Page Filter & Sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating'>('popular');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filtered & Sorted Products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      // 2. Category
      if (selectedCategory && selectedCategory !== 'All') {
        if (product.category !== selectedCategory) return false;
      }

      // 3. Price
      const effectivePrice = product.discountPrice || product.price;
      if (effectivePrice > maxPrice) return false;

      // 4. Rating
      if (product.rating < minRating) return false;

      // 5. In Stock Only
      if (inStockOnly && product.stock <= 0) return false;

      // 6. On Sale Only
      if (onSaleOnly && (!product.discountPrice || product.discountPrice >= product.price)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      }
      if (sortBy === 'price-desc') {
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // 'popular' default
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, searchTerm, selectedCategory, maxPrice, minRating, inStockOnly, onSaleOnly, sortBy]);

  // If used on Home Page, show Best Selling Products title & max 8 items
  if (isHomePage) {
    const bestSellers = products.filter((p) => p.isBestSeller || p.rating >= 4.8).slice(0, 8);

    return (
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A4C639] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#A4C639]" />
              Iconic Formulations
            </div>
            <h2 className="text-3xl sm:text-4xl serif font-bold text-[#1A1A1A]">
              Best Selling Products
            </h2>
          </div>

          <button
            id="view-all-shop-btn"
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#A4C639] transition-colors border-b-2 border-[#A4C639] pb-1 self-start md:self-auto"
          >
            <span>View All Products ({products.length})</span>
            <span className="text-xs">→</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>
    );
  }

  // Full Shop Page layout
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setMaxPrice(100);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('popular');
  };

  const hasActiveFilters = Boolean(
    searchTerm || selectedCategory || maxPrice < 100 || minRating > 0 || inStockOnly || onSaleOnly
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Shop Page Banner / Header */}
      <div className="bg-[#1A1A1A] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-[#A4C639]/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A4C639]">
            Zaha Organic Cosmetics
          </span>
          <h1 className="text-3xl sm:text-5xl serif font-bold text-white">
            {selectedCategory ? `${selectedCategory} Collection` : 'All Beauty Products'}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm">
            Explore our handcrafted organic formulations. Filter by category, price, or ratings to find your perfect signature match.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <span className="serif text-[180px] font-bold text-[#A4C639]">ZAHA</span>
        </div>
      </div>

      {/* Top Search & Filter Control Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search lipstick, serum, fragrance..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-[#A4C639] focus:ring-2 focus:ring-[#A4C639]/20 outline-hidden text-xs bg-stone-50/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Toggle Mobile & Sorting Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 text-[#1A1A1A] rounded-xl text-xs font-semibold hover:bg-stone-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#A4C639]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#A4C639]" />
            )}
          </button>

          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-[#1A1A1A] font-semibold text-xs focus:border-[#A4C639] outline-hidden cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filters */}
        <aside className={`md:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs ${
          showFiltersMobile ? 'block' : 'hidden md:block'
        }`}>
          
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <h3 className="serif text-lg font-bold text-[#1A1A1A]">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#A4C639] font-bold hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Category
            </label>
            <div className="flex flex-col gap-1 text-xs">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-left px-3 py-2 rounded-xl font-semibold transition-colors ${
                  !selectedCategory
                    ? 'bg-[#A4C639]/15 text-[#1A1A1A] font-bold border border-[#A4C639]/30'
                    : 'text-zinc-600 hover:bg-stone-50'
                }`}
              >
                All Categories
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`text-left px-3 py-2 rounded-xl font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === cat.name
                      ? 'bg-[#A4C639]/15 text-[#1A1A1A] font-bold border border-[#A4C639]/30'
                      : 'text-zinc-600 hover:bg-stone-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-zinc-400 bg-stone-100 px-2 py-0.5 rounded-full">
                    {products.filter((p) => p.category === cat.name).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex justify-between text-xs font-bold">
              <span className="uppercase tracking-widest text-[10px] text-zinc-400">Max Price</span>
              <span className="text-[#1A1A1A]">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#A4C639] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>$10</span>
              <span>$150+</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2 pt-4 border-t border-stone-100">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Minimum Rating
            </label>
            <div className="flex flex-col gap-1">
              {[0, 4.0, 4.5, 4.8].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setMinRating(stars)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    minRating === stars
                      ? 'bg-[#A4C639]/15 text-[#1A1A1A] font-bold border border-[#A4C639]/30'
                      : 'text-zinc-600 hover:bg-stone-50'
                  }`}
                >
                  {stars === 0 ? 'All Ratings' : `★ ${stars}+ Stars`}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded-xs border-stone-300 text-[#A4C639] focus:ring-[#A4C639]"
              />
              In Stock Only
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="rounded-xs border-stone-300 text-[#A4C639] focus:ring-[#A4C639]"
              />
              On Discount / Sale Only
            </label>
          </div>

        </aside>

        {/* Products Grid */}
        <div className="md:col-span-9 space-y-6">
          
          {/* Active Filter Chips Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs text-zinc-400 font-medium">Active filters:</span>
              
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A4C639]/15 text-[#1A1A1A] border border-[#A4C639]/30 text-xs font-semibold">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-rose-500">×</button>
                </span>
              )}

              {searchTerm && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A4C639]/15 text-[#1A1A1A] border border-[#A4C639]/30 text-xs font-semibold">
                  Query: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:text-rose-500">×</button>
                </span>
              )}

              {maxPrice < 100 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A4C639]/15 text-[#1A1A1A] border border-[#A4C639]/30 text-xs font-semibold">
                  Under ${maxPrice}
                  <button onClick={() => setMaxPrice(100)} className="hover:text-rose-500">×</button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A4C639]/15 text-[#1A1A1A] border border-[#A4C639]/30 text-xs font-semibold">
                  {minRating}+ Stars
                  <button onClick={() => setMinRating(0)} className="hover:text-rose-500">×</button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 underline font-medium hover:text-rose-700 ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Showing <strong className="text-zinc-800">{filteredProducts.length}</strong> beauty products</span>
          </div>

          {/* Grid display or Empty state */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-stone-300 space-y-4">
              <div className="w-16 h-16 bg-[#A4C639]/15 text-[#A4C639] rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="serif text-2xl font-bold text-[#1A1A1A]">No Products Found</h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                We couldn't find any cosmetics matching your current search criteria or filter options.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#A4C639] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#A4C639] hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
