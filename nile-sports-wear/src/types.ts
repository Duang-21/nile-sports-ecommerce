export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'performance' | 'athleisure' | 'essentials';
  image: string;
  rating: number;
  details: string;
  isNew?: boolean;
  isPopular?: boolean;
  sizes: string[];
  specs: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatar?: string;
  location?: string;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}
