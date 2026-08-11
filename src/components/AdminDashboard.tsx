import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit3, Trash2, RotateCcw, Image, ShoppingBag, Package, DollarSign, Search, Check, Sparkles, Upload } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    categories,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    heroImage,
    setHeroImage,
    promoImage,
    setPromoImage,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'banners'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Product Form State (For Add / Edit)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Makeup',
    price: 35,
    discountPrice: 0,
    shortDescription: '',
    fullDescription: '',
    ingredients: '',
    benefits: '',
    howToUse: '',
    stock: 25,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80']
  });

  // Banner edit states
  const [newHeroUrl, setNewHeroUrl] = useState(heroImage);
  const [newPromoUrl, setNewPromoUrl] = useState(promoImage);

  // Filter products in admin
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Total Revenue Calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const openAddForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[0]?.name || 'Makeup',
      price: 35,
      discountPrice: 0,
      shortDescription: '',
      fullDescription: '',
      ingredients: '',
      benefits: '',
      howToUse: '',
      stock: 25,
      rating: 4.9,
      images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80']
    });
    setIsFormOpen(true);
  };

  const openEditForm = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      discountPrice: prod.discountPrice || 0,
      shortDescription: prod.shortDescription,
      fullDescription: prod.fullDescription,
      ingredients: prod.ingredients,
      benefits: prod.benefits,
      howToUse: prod.howToUse,
      stock: prod.stock,
      rating: prod.rating,
      images: prod.images.length > 0 ? [...prod.images] : ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80']
    });
    setIsFormOpen(true);
  };

  // Image File Reader convert to Base64
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number = 0) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const updatedImages = [...formData.images];
      updatedImages[index] = base64String;
      setFormData({ ...formData, images: updatedImages });
      addToast('success', 'Image Loaded', 'Product picture loaded successfully.');
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const sanitizedData = {
      ...formData,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stock: Number(formData.stock),
      rating: Number(formData.rating)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, sanitizedData);
    } else {
      addProduct(sanitizedData);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-[#0e301d] text-white p-8 rounded-3xl border border-[#2eaf67]/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Zaha Store Management
          </span>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">
            Admin Product Dashboard
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            Add, update, or remove cosmetic products, change hero banners, and track customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProductsToDefault}
            className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2"
            title="Reset catalog to luxury initial products"
          >
            <RotateCcw className="w-4 h-4 text-[#d4af37]" />
            <span>Reset Demo Data</span>
          </button>

          <button
            id="admin-add-product-btn"
            onClick={openAddForm}
            className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-[#0e301d] text-xs font-bold hover:bg-white transition-colors inline-flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Products</span>
            <h3 className="text-2xl font-bold text-[#0e301d]">{products.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Orders</span>
            <h3 className="text-2xl font-bold text-[#0e301d]">{orders.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f2faf4] text-[#1e8d4f] flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sales Revenue</span>
            <h3 className="text-2xl font-bold text-[#0e301d]">${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-px">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'products'
              ? 'border-[#1e8d4f] text-[#1e8d4f]'
              : 'border-transparent text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Product Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-[#1e8d4f] text-[#1e8d4f]'
              : 'border-transparent text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Customer Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('banners')}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'banners'
              ? 'border-[#1e8d4f] text-[#1e8d4f]'
              : 'border-transparent text-zinc-400 hover:text-zinc-700'
          }`}
        >
          Homepage Banners
        </button>
      </div>

      {/* TAB 1: PRODUCT CATALOG TABLE */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden space-y-4 p-6">
          
          {/* Table Search Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search catalog by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:border-[#1e8d4f] outline-hidden"
              />
            </div>

            <span className="text-xs text-zinc-400">
              Showing {filteredProducts.length} items
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-700">
              <thead className="bg-stone-50 uppercase tracking-wider text-[10px] text-zinc-400 font-bold border-y border-stone-200">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3 font-semibold text-[#0e301d]">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt=""
                          className="w-10 h-10 object-cover rounded-lg border border-stone-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold line-clamp-1">{prod.name}</div>
                          <div className="text-[10px] text-zinc-400">ID: {prod.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-[#1e8d4f]">{prod.category}</td>
                    <td className="p-3 font-bold">
                      ${prod.discountPrice || prod.price}
                      {prod.discountPrice && (
                        <span className="text-[10px] text-zinc-400 line-through ml-1">${prod.price}</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        prod.stock > 10
                          ? 'bg-[#f2faf4] text-[#1e8d4f]'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {prod.stock} left
                      </span>
                    </td>
                    <td className="p-3 font-bold text-amber-600">★ {prod.rating}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => openEditForm(prod)}
                        className="p-2 rounded-lg bg-stone-100 hover:bg-[#1e8d4f] hover:text-white transition-colors"
                        title="Edit product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: ORDERS LIST */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#0e301d]">Customer Orders</h3>
          
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div>
                      <span className="font-bold text-[#0e301d] text-sm">Order #{ord.id}</span>
                      <span className="text-zinc-400 ml-2">({ord.createdAt})</span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#f2faf4] text-[#1e8d4f] font-bold">
                      {ord.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-bold text-zinc-700 block mb-1">Customer:</span>
                      <p>{ord.shippingDetails.fullName} ({ord.shippingDetails.phone})</p>
                      <p className="text-zinc-500">{ord.shippingDetails.address}, {ord.shippingDetails.city}</p>
                    </div>

                    <div>
                      <span className="font-bold text-zinc-700 block mb-1">Payment Method:</span>
                      <p className="font-semibold text-[#1e8d4f]">{ord.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Paid'}</p>
                      <p className="font-bold text-sm text-[#0e301d] mt-1">Total: ${ord.total}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic">No customer orders placed yet. Test checkout to see orders appear here!</p>
          )}
        </div>
      )}

      {/* TAB 3: BANNER MANAGEMENT */}
      {activeTab === 'banners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Hero Banner Editor */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0e301d] flex items-center gap-2">
              <Image className="w-5 h-5 text-[#1e8d4f]" />
              Hero Section Banner
            </h3>

            <div className="aspect-video rounded-2xl overflow-hidden border border-stone-200">
              <img src={newHeroUrl} alt="Hero Banner Preview" className="w-full h-full object-cover" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1">Image URL</label>
              <input
                type="text"
                value={newHeroUrl}
                onChange={(e) => setNewHeroUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
              />
            </div>

            <button
              onClick={() => setHeroImage(newHeroUrl)}
              className="w-full py-3 rounded-xl bg-[#0e301d] text-[#d4af37] text-xs font-bold hover:bg-[#1e8d4f] hover:text-white transition-colors"
            >
              Update Hero Image
            </button>
          </div>

          {/* Promotional Banner Editor */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0e301d] flex items-center gap-2">
              <Image className="w-5 h-5 text-[#1e8d4f]" />
              Promotional Banner
            </h3>

            <div className="aspect-video rounded-2xl overflow-hidden border border-stone-200">
              <img src={newPromoUrl} alt="Promo Banner Preview" className="w-full h-full object-cover" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1">Image URL</label>
              <input
                type="text"
                value={newPromoUrl}
                onChange={(e) => setNewPromoUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
              />
            </div>

            <button
              onClick={() => setPromoImage(newPromoUrl)}
              className="w-full py-3 rounded-xl bg-[#0e301d] text-[#d4af37] text-xs font-bold hover:bg-[#1e8d4f] hover:text-white transition-colors"
            >
              Update Promo Image
            </button>
          </div>

        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL FORM */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto my-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-serif text-2xl font-bold text-[#0e301d]">
                {editingProduct ? 'Edit Product' : 'Add New Cosmetic Product'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              {/* Product Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Velvet Rose Lipstick"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price, Discount Price, Stock, Rating */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Discount Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Optional"
                    value={formData.discountPrice || ''}
                    onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Stock Qty *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Initial Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <label className="block font-bold text-zinc-700">Product Image Upload / URL</label>
                
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={formData.images[0] || ''}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    placeholder="Paste image URL or upload file below"
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>

                {/* File Dropzone Upload */}
                <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center hover:border-[#1e8d4f] transition-colors cursor-pointer relative bg-white">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileUpload(e, 0)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-5 h-5 text-[#1e8d4f] mx-auto mb-1" />
                  <span className="text-zinc-600 font-semibold block">Click to upload your own picture</span>
                  <span className="text-[10px] text-zinc-400">Supports JPG, PNG, WEBP</span>
                </div>
              </div>

              {/* Short & Full Description */}
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  placeholder="Brief 1-sentence product summary"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed formulation story, skin feel, texture..."
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              {/* Ingredients & Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Key Ingredients</label>
                  <input
                    type="text"
                    placeholder="e.g. Jojoba oil, Rosehip, Niacinamide"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Benefits</label>
                  <input
                    type="text"
                    placeholder="e.g. 24h hydration, dewy glow"
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0e301d] text-[#d4af37] font-bold hover:bg-[#1e8d4f] hover:text-white transition-colors"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
