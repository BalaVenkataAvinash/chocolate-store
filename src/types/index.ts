export type UserRole = 'guest' | 'customer' | 'admin' | 'superadmin';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  avatarImage?: string;
  dob?: string;
  gender?: string;
  preferences?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export interface NutritionInfo {
  calories: string;
  totalFat: string;
  saturatedFat: string;
  cholesterol: string;
  sodium: string;
  totalCarb: string;
  protein: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'dark' | 'milk' | 'white' | 'gift' | 'beverage';
  price: number;
  originalPrice?: number;
  weight: string;
  description: string;
  ingredients: string;
  nutrition: NutritionInfo;
  rating: number;
  ratingsCount: number;
  badge?: 'Bestseller' | 'New' | 'Premium' | 'Limited';
  image: string;
  hoverImage?: string;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  deliveryOption: string;
  paymentMethod: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  videoLink?: string;
  buttonText: string;
  link: string;
}

export interface OfflineSale {
  id: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  date: string;
  paymentMethod: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  category: 'Chocolate melted' | 'Slow delivery' | 'Return order was not accepting' | 'Refund amount are not debited in mentioned days' | 'Other';
  description: string;
  status: 'Pending' | 'Resolved';
  adminNotes?: string;
  customerResolutionFeedback?: 'Resolved' | 'Not Resolved';
  date: string;
  notified: boolean;
}

export interface CustomerAddress {
  id: string;
  title: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

export interface SupportNotification {
  id: string;
  text: string;
  date: string;
  read: boolean;
  type: 'order' | 'support' | 'general';
  referenceId?: string;
}
