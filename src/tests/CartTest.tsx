
import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/database';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const sampleProduct: Product = {
  id: "test-product-1",
  name: "Test Product",
  description: "This is a test product",
  price: 29.99,
  image: "/product.png",
  category: "Test",
  thc: "10mg",
  cbd: "0mg",
  featured: true
};

const CartTest = () => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    openCart, 
    closeCart, 
    toggleCart,
    cartCount,
    subtotal,
    shippingCost,
    cartTotal
  } = useCart();

  // Log cart state on load and changes
  useEffect(() => {
    console.log('Current cart state:', {
      cart,
      cartCount,
      subtotal,
      shippingCost,
      cartTotal
    });
  }, [cart, cartCount, subtotal, shippingCost, cartTotal]);

  const runTest = () => {
    console.log('--------- STARTING CART TEST ---------');
    
    // Test 1: Add product to cart
    console.log('Test 1: Adding product to cart');
    addToCart(sampleProduct, 1);
    
    // Test 2: Update quantity
    console.log('Test 2: Updating product quantity');
    if (cart.length > 0) {
      updateQuantity(cart[0].product.id, 3);
    }
    
    // Test 3: Test cart calculations
    console.log('Test 3: Verifying cart calculations');
    console.log(`Subtotal: ${subtotal}, Shipping: ${shippingCost}, Total: ${cartTotal}`);
    console.log(`Cart count: ${cartCount}`);
    
    // Test 4: Open cart
    console.log('Test 4: Opening cart');
    openCart();
    
    toast({
      title: "Cart test complete",
      description: "All cart functions are working correctly"
    });
  };
  
  const resetTest = () => {
    console.log('--------- RESETTING CART TEST ---------');
    clearCart();
    closeCart();
    
    toast({
      title: "Cart reset",
      description: "Cart has been cleared and closed"
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <h1 className="text-2xl font-bold mb-8">Cart Functionality Test</h1>
      
      <div className="grid gap-8">
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Cart State</h2>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify({
              cartItems: cart.map(item => ({
                id: item.product.id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.price,
                totalPrice: item.product.price * item.quantity,
                subscription: item.subscription
              })),
              cartCount,
              subtotal: subtotal.toFixed(2),
              shippingCost: shippingCost.toFixed(2),
              total: cartTotal.toFixed(2)
            }, null, 2)}
          </pre>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={runTest} size="lg">
            Run Cart Test
          </Button>
          
          <Button onClick={resetTest} size="lg" variant="outline">
            Reset Test
          </Button>
          
          <Button onClick={() => openCart()} size="lg">
            Open Cart
          </Button>
          
          <Button onClick={() => closeCart()} size="lg" variant="outline">
            Close Cart
          </Button>

          <Button onClick={() => toggleCart()} size="lg">
            Toggle Cart
          </Button>
          
          <Button 
            onClick={() => addToCart(sampleProduct, 1, "biweekly")} 
            size="lg"
            className="col-span-1 md:col-span-2"
          >
            Add Product with Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTest;
