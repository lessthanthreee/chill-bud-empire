
// Custom type definitions for our database schema
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  thc: string;
  cbd: string;
  strain: string | null;
  effects: string[] | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  city: string;
  state: string;
  zip_code: string;
  order_total: number;
  payment_method: string;
  payment_address: string;
  payment_status: string;
  shipping_status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  subscription: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
  products?: {
    name: string;
    category: string;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

// Additional type for enhanced reviews with UI-specific properties
export interface ReviewWithUI extends Review {
  expanded?: boolean;
}
