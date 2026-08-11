export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: string; // 'Makeup' | 'Skincare' | 'Lip Care' | 'Face Care' | 'Hair Care' | 'Fragrances'
  price: number;
  discountPrice?: number;
  shortDescription: string;
  fullDescription: string;
  ingredients: string;
  benefits: string;
  howToUse: string;
  stock: number;
  rating: number;
  images: string[];
  reviews: Review[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  paymentMethod: 'COD' | 'ONLINE';
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export type ViewPage = 'home' | 'shop' | 'about' | 'contact' | 'checkout' | 'admin' | 'wishlist';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}
