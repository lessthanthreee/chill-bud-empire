
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, CreditCard, Mail, CheckCircle, RefreshCw } from 'lucide-react';

const TestFunctions = () => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    openCart, 
    closeCart, 
    cartCount,
    subtotal,
    shippingCost,
    cartTotal
  } = useCart();
  
  const [emailTestResult, setEmailTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample products for testing
  const sampleProducts: Product[] = [
    {
      id: "test-product-1",
      name: "Premium Vape Cartridge",
      description: "High-quality vape cartridge with natural terpenes",
      price: 29.99,
      image: "/product.png",
      category: "Cartridges",
      thc: "80%",
      cbd: "1%",
      featured: true
    },
    {
      id: "test-product-2",
      name: "Disposable Vape Pen",
      description: "Ready-to-use disposable vape pen",
      price: 14.99,
      image: "/product.png",
      category: "Disposables",
      thc: "75%",
      cbd: "2%",
      featured: false
    },
    {
      id: "test-product-3",
      name: "Live Resin Cartridge",
      description: "Full-spectrum live resin cartridge",
      price: 39.99,
      image: "/product.png",
      category: "Premium",
      thc: "85%",
      cbd: "3%",
      featured: true
    }
  ];

  // Test cart functionality
  const testCartFunctions = () => {
    console.log('--------- TESTING CART FUNCTIONS ---------');
    
    // Clear the cart
    clearCart();
    console.log('Cart cleared');
    
    // Add multiple products
    addToCart(sampleProducts[0], 1);
    console.log('Added product 1');
    
    addToCart(sampleProducts[1], 2);
    console.log('Added product 2 (quantity: 2)');
    
    // Update quantity
    if (cart.length > 0) {
      updateQuantity(sampleProducts[0].id, 3);
      console.log('Updated product 1 quantity to 3');
    }
    
    toast({
      title: "Cart Test Complete",
      description: `Added products to cart. Cart now has ${cartCount} items.`,
    });
  };
  
  // Test checkout flow
  const testCheckoutFlow = () => {
    console.log('--------- TESTING CHECKOUT FLOW ---------');
    
    // Ensure cart has at least one item
    if (cart.length === 0) {
      addToCart(sampleProducts[0], 1);
      console.log('Added a product to empty cart');
    }
    
    // Open cart to start checkout flow
    openCart();
    
    toast({
      title: "Checkout Test Started",
      description: "Cart opened. Now you can test the checkout flow manually.",
    });
  };
  
  // Test email notification
  const testEmailNotification = async () => {
    console.log('--------- TESTING EMAIL NOTIFICATION ---------');
    setIsLoading(true);
    setEmailTestResult(null);
    
    try {
      const response = await fetch("https://klkncqrjpvvzwyoqmhfe.supabase.co/functions/v1/notify-new-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          orderData: {
            id: "test-order-" + Date.now().toString().slice(-6),
            customerName: "Test Customer",
            customerEmail: "test@example.com",
            total: 99.99,
            items: [
              { name: "Test Product 1", quantity: 2, price: 29.99 },
              { name: "Test Product 2", quantity: 1, price: 39.99 }
            ]
          }
        }),
      });
      
      const result = await response.json();
      console.log("Email notification test result:", result);
      
      setEmailTestResult(result.emailPreview || JSON.stringify(result, null, 2));
      
      toast({
        title: result.success ? "Email Test Successful" : "Email Test Failed",
        description: result.message || "See console for details",
        variant: result.success ? "default" : "destructive"
      });
      
    } catch (error) {
      console.error("Email test error:", error);
      setEmailTestResult("Error: " + (error instanceof Error ? error.message : String(error)));
      
      toast({
        title: "Email Test Failed",
        description: "There was an error testing email notifications.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <h1 className="text-3xl font-bold mb-8">Website Functionality Testing</h1>
      
      <Tabs defaultValue="cart">
        <TabsList className="mb-6">
          <TabsTrigger value="cart">
            <ShoppingCart className="h-4 w-4 mr-2" /> Cart Tests
          </TabsTrigger>
          <TabsTrigger value="checkout">
            <CreditCard className="h-4 w-4 mr-2" /> Checkout Tests
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" /> Email Tests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cart Functionality Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Test adding products to cart, updating quantities, and removing items.</p>
              
              <div className="bg-secondary p-4 rounded-md overflow-x-auto whitespace-pre-wrap mb-4">
                <h3 className="font-medium mb-2">Current Cart State:</h3>
                <pre className="text-sm">
                  {JSON.stringify({
                    cartItems: cart.map(item => ({
                      id: item.product.id,
                      name: item.product.name,
                      quantity: item.quantity,
                      price: item.product.price,
                      totalPrice: item.product.price * item.quantity,
                    })),
                    cartCount,
                    subtotal: subtotal.toFixed(2),
                    shippingCost: shippingCost.toFixed(2),
                    total: cartTotal.toFixed(2)
                  }, null, 2)}
                </pre>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button onClick={testCartFunctions} className="w-full sm:w-auto">
                <RefreshCw className="h-4 w-4 mr-2" /> Run Cart Tests
              </Button>
              <Button onClick={clearCart} variant="outline" className="w-full sm:w-auto">
                Clear Cart
              </Button>
              <Button onClick={() => openCart()} className="w-full sm:w-auto">
                <ShoppingCart className="h-4 w-4 mr-2" /> Open Cart
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Individual Product Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sampleProducts.map(product => (
                  <Card key={product.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="font-medium mt-2">${product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => {
                          addToCart(product, 1);
                          toast({
                            title: "Product Added",
                            description: `${product.name} added to cart`,
                          });
                        }} 
                        className="w-full"
                      >
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checkout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Checkout Flow Test</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Test the complete checkout flow from cart to payment.</p>
              <div className="flex flex-col sm:flex-row mt-4 gap-4">
                <Button onClick={testCheckoutFlow}>
                  <CreditCard className="h-4 w-4 mr-2" /> Start Checkout Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Test</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Test sending order notification emails.</p>
              <Button onClick={testEmailNotification} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Testing...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" /> Test Order Email
                  </>
                )}
              </Button>

              {emailTestResult && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Email Content Preview:</h3>
                  <div className="bg-secondary p-4 rounded-md overflow-x-auto whitespace-pre-wrap text-xs font-mono">
                    {emailTestResult}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestFunctions;
