import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, ShippingDetails, ViewPage, ToastMessage, Review } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_HERO_IMAGE, INITIAL_PROMO_IMAGE } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  currentPage: ViewPage;
  setCurrentPage: (page: ViewPage) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (prod: Product | null) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  heroImage: string;
  setHeroImage: (url: string) => void;
  promoImage: string;
  setPromoImage: (url: string) => void;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
  
  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'reviews'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  
  // Category actions
  updateCategory: (id: string, updated: Partial<Category>) => void;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Review action
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  
  // Order placement
  placeOrder: (shippingDetails: ShippingDetails, paymentMethod: 'COD' | 'ONLINE') => Order;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  
  // Policy modal
  activePolicyModal: 'privacy' | 'terms' | 'shipping' | 'returns' | null;
  setActivePolicyModal: (policy: 'privacy' | 'terms' | 'shipping' | 'returns' | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('zaha_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('zaha_categories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CATEGORIES;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zaha_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('zaha_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('zaha_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Hero & Promo images
  const [heroImage, setHeroImageState] = useState<string>(() => {
    return localStorage.getItem('zaha_hero_image') || INITIAL_HERO_IMAGE;
  });

  const [promoImage, setPromoImageState] = useState<string>(() => {
    return localStorage.getItem('zaha_promo_image') || INITIAL_PROMO_IMAGE;
  });

  // UI States
  const [currentPage, setCurrentPage] = useState<ViewPage>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | 'shipping' | 'returns' | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('zaha_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('zaha_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('zaha_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zaha_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('zaha_orders', JSON.stringify(orders));
  }, [orders]);

  const setHeroImage = (url: string) => {
    setHeroImageState(url);
    localStorage.setItem('zaha_hero_image', url);
    addToast('success', 'Banner Updated', 'Hero banner image has been updated.');
  };

  const setPromoImage = (url: string) => {
    setPromoImageState(url);
    localStorage.setItem('zaha_promo_image', url);
    addToast('success', 'Banner Updated', 'Promotional banner image has been updated.');
  };

  const addToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'reviews'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: 'zaha-' + Date.now().toString().slice(-4),
      createdAt: new Date().toISOString().split('T')[0],
      reviews: []
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast('success', 'Product Created', `"${newProduct.name}" added to catalog.`);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    if (selectedProductModal?.id === id) {
      setSelectedProductModal((prev) => (prev ? { ...prev, ...updatedFields } : null));
    }
    addToast('success', 'Product Updated', 'Product information updated successfully.');
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    setWishlist((prev) => prev.filter((wId) => wId !== id));
    if (selectedProductModal?.id === id) {
      setSelectedProductModal(null);
    }
    addToast('info', 'Product Deleted', `"${prod?.name || 'Product'}" removed from catalog.`);
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setHeroImageState(INITIAL_HERO_IMAGE);
    setPromoImageState(INITIAL_PROMO_IMAGE);
    localStorage.removeItem('zaha_hero_image');
    localStorage.removeItem('zaha_promo_image');
    addToast('info', 'Catalog Reset', 'Products reset to luxury defaults.');
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    addToast('success', 'Category Updated', 'Category details saved.');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });
    addToast('success', 'Added to Cart', `${quantity}x ${product.name} added.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast('info', 'Removed from Wishlist', `${product?.name || 'Item'} removed.`);
        return prev.filter((id) => id !== productId);
      } else {
        addToast('success', 'Saved to Wishlist', `${product?.name || 'Item'} added to wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Reviews
  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...p.reviews];
          // Recalculate average rating
          const avgRating = Number(
            (
              updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
              updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: avgRating
          };
        }
        return p;
      })
    );

    addToast('success', 'Review Published', 'Thank you for your beauty feedback!');
  };

  // Place Order
  const placeOrder = (shippingDetails: ShippingDetails, paymentMethod: 'COD' | 'ONLINE'): Order => {
    const subtotal = cart.reduce(
      (sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity,
      0
    );
    const shippingFee = subtotal > 60 ? 0 : 8;
    const total = subtotal + shippingFee;

    const newOrder: Order = {
      id: 'ZAHA-' + Math.floor(10000 + Math.random() * 90000),
      items: [...cart],
      shippingDetails,
      paymentMethod,
      subtotal,
      shippingFee,
      discountAmount: 0,
      total,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    addToast('success', 'Order Confirmed!', `Order #${newOrder.id} successfully placed.`);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        orders,
        currentPage,
        setCurrentPage,
        selectedCategory,
        setSelectedCategory,
        selectedProductModal,
        setSelectedProductModal,
        cartDrawerOpen,
        setCartDrawerOpen,
        searchQuery,
        setSearchQuery,
        heroImage,
        setHeroImage,
        promoImage,
        setPromoImage,
        toasts,
        addToast,
        removeToast,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        updateCategory,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addReview,
        placeOrder,
        lastPlacedOrder,
        setLastPlacedOrder,
        activePolicyModal,
        setActivePolicyModal
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
