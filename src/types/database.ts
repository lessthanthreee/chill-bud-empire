
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  featured?: boolean;
  inventory?: number;
  thc?: string;
  cbd?: string;
  strain?: string;
  effects?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  product_id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  approved?: boolean;
  created_at?: string;
  products?: {
    name: string;
    category: string;
  };
}

export interface ReviewWithUI extends Review {
  expanded: boolean;
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
  created_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  subscription?: string;
}
