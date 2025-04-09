
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/types/database';

export interface CartItem {
  product: Product;
  quantity: number;
  subscription?: 'none' | 'biweekly' | 'monthly';
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  subtotal: number;
  cartTotal: number;
  shippingCost: number;
  cartCount: number;
  addToCart: (product: Product, quantity: number, subscription?: 'none' | 'biweekly' | 'monthly') => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal > 75 ? 0 : 6;
  const cartTotal = subtotal + shippingCost;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addToCart = (product: Product, quantity: number, subscription: 'none' | 'biweekly' | 'monthly' = 'none') => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id && item.subscription === subscription);

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, subscription }];
      }
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };
  
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const value: CartContextType = {
    cart,
    isCartOpen,
    subtotal,
    cartTotal,
    shippingCost,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    closeCart,
    openCart,
    toggleCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
