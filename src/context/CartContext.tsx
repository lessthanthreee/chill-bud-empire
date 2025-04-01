import React, { createContext, useContext, useState, useEffect } from "react";

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  thc: string;
  cbd: string;
  strain?: string;
  effects?: string[];
  featured?: boolean;
};

type CartItem = {
  product: Product;
  quantity: number;
  subscription?: "none" | "biweekly" | "monthly";
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, subscription?: "none" | "biweekly" | "monthly") => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  cartTotal: number;
  cartCount: number;
  subtotal: number;
  shippingCost: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart data from localStorage", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    
    const subtotalAmount = cart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
    
    setSubtotal(subtotalAmount);
    
    const shipping = subtotalAmount >= 75 ? 0 : 6;
    setShippingCost(shipping);
    
    setCartTotal(subtotalAmount + shipping);
    
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, subscription?: "none" | "biweekly" | "monthly") => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.subscription === subscription
      );
      
      if (existingItemIndex >= 0) {
        return prevCart.map((item, index) => 
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, quantity, subscription }];
      }
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        isCartOpen,
        toggleCart,
        closeCart,
        openCart,
        cartTotal,
        cartCount,
        subtotal,
        shippingCost
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
