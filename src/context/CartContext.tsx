
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

type SubscriptionFrequency = "none" | "biweekly" | "monthly";

type CartItem = {
  product: Product;
  quantity: number;
  subscription: SubscriptionFrequency;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, subscription?: SubscriptionFrequency) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateSubscription: (productId: number, subscription: SubscriptionFrequency) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on initial render
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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Calculate total and count with subscription discounts
    const total = cart.reduce((sum, item) => {
      let itemPrice = item.product.price;
      // Apply 10% discount for subscription items
      if (item.subscription !== "none") {
        itemPrice = itemPrice * 0.9;
      }
      return sum + (itemPrice * item.quantity);
    }, 0);
    
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, subscription: SubscriptionFrequency = "none") => {
    setCart(prevCart => {
      // Check if product with same subscription exists
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.subscription === subscription
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item
        return prevCart.map((item, index) => 
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { product, quantity, subscription }];
      }
    });
    
    // Open cart drawer when an item is added
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

  const updateSubscription = (productId: number, subscription: SubscriptionFrequency) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, subscription } 
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
        updateSubscription,
        clearCart,
        isCartOpen,
        toggleCart,
        closeCart,
        openCart,
        cartTotal,
        cartCount
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
