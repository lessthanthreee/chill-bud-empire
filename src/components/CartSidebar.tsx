import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { 
  ShoppingCart, 
  Truck, 
  Clipboard, 
  CheckCircle2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/types/database";

type ShippingInfo = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

type CryptoOptions = 'btc' | 'eth' | 'doge' | 'sol' | 'bnb' | 'nano';

const cryptoAddresses: Record<CryptoOptions, string> = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  doge: "D5jNDpPSL4habXAiXXEBZ3F1rBsJ8kBSF2",
  sol: "5SinF1LcBNgMfZTgaBJJBnxuAgzV5qJ4TfyJDmUfpprD",
  nano: "nano_3rw4un6ys57hrb39sy1qx8qy5wukst1iiponztrz9qiz6qqa55kxzx4491or",
  bnb: "bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64m"
};

// Map of crypto options to their respective icons (using proper SVG icons)
const cryptoIcons: Record<CryptoOptions, React.ReactNode> = {
  btc: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16s16-7.163 16-16S24.837 0 16 0zm-.5 7.5h3.5a3.499 3.499 0 013.444 2.838l.02.162h2v2h-2v2h2v2h-2v6h-2v-6h-1v6h-2v-6h-4.5v2.5h-2v-2.5h-2v-2h2v-2h-2v-2h2V7.5h2.5zm1.5 2h-1.5v4h4a1.5 1.5 0 000-3H17v-1z"/>
       </svg>,
  eth: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
         <path fill="currentColor" d="M16.498 4v8.87l7.497 3.35z"/>
         <path fill="currentColor" opacity="0.8" d="M16.498 4L9 16.22l7.498-3.35z"/>
         <path fill="currentColor" d="M16.498 21.968v6.027L24 17.616z"/>
         <path fill="currentColor" opacity="0.8" d="M16.498 27.995v-6.028L9 17.616z"/>
         <path fill="currentColor" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
         <path fill="currentColor" opacity="0.8" d="M9 16.22l7.498 4.353v-7.701z"/>
       </svg>,
  doge: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm-5.5 9.5v13h5.249c6.891 0 8.751-4.375 8.751-6.489c0-2.669-1.67-6.511-8.751-6.511H10.5zm3.5 3h1.501c1.783 0 2.438.208 2.999.917c.561.709.561 1.917.561 2.584c0 1-.561 1.979-.561 2.396c-.561.625-1.216.834-2.999.834H14v-6.731z"/>
        </svg>,
  sol: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
         <path fill="currentColor" d="M23.01 11.42c-.15 0-.31.06-.43.18l-9.51 8.92c-.19.17-.43.26-.69.26H7.09c-.34 0-.66-.18-.84-.47a.996.996 0 010-1.06c.18-.29.5-.47.84-.47h4.46c.26 0 .5-.09.69-.26l9.51-8.92c.24-.22.61-.22.85 0l2.56 2.4c.12.11.18.27.18.43s-.06.31-.18.43l-12.7 11.91c-.19.17-.43.26-.69.26H.96c-.34 0-.66-.18-.84-.47a.996.996 0 010-1.06c.18-.29.5-.47.84-.47h9.72c.26 0 .5-.09.69-.26l12.7-11.91c.12-.11.18-.27.18-.43s-.06-.32-.18-.43l-.74-.7c-.24-.22-.24-.59 0-.81l.99-.93c.19-.17.43-.26.69-.26h7.76c.34 0 .66.18.84.47s.24.66 0 .96c-.18.29-.5.47-.84.47h-6.8c-.26 0-.5.09-.69.26l-.99.93c-.12.11-.18.27-.18.43s.06.32.18.43l.31.29c.12.11.28.17.43.17zm9.66 10.84c.34 0 .66.18.84.47s.24.66 0 .96c-.18.29-.5.47-.84.47h-4.62c-.26 0-.5.09-.69.26l-9.51 8.92c-.24.22-.61.22-.85 0l-2.56-2.4c-.12-.11-.18-.27-.18-.43s.06-.31.18-.43l12.7-11.91c.19-.17.43-.26.69-.26h9.78c.34 0 .66.18.84.47s.24.66 0 .96c-.18.29-.5.47-.84.47h-9.09c-.26 0-.5.09-.69.26l-10.77 10.11c-.12.11-.18.27-.18.43s.06.32.18.43l1.13 1.06c.24.22.61.22.85 0l9.51-8.92c.19-.17.43-.26.69-.26h4.23z"/>
       </svg>,
  bnb: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
         <path fill="currentColor" d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zM11.2 7L7 11.2l4.2 4.2 4.2-4.2L11.2 7zm9.6 0l-4.2 4.2 4.2 4.2 4.2-4.2L20.8 7zM7 20.8l4.2 4.2 4.2-4.2-4.2-4.2-4.2 4.2zm9.6 0l4.2 4.2 4.2-4.2-4.2-4.2-4.2 4.2zM16 12.418L12.418 16 16 19.582 19.582 16 16 12.418z"/>
       </svg>,
  nano: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-.042-26.052c-4.226 0-7.842 3.054-8.563 7.202-.592 3.554 1.291 7.147 4.575 8.818.0277.119.0576.227.0893.33.3856 1.159 1.47 1.822 2.602 1.822.358 0 .7232-.067 1.075-.211 1.441-.5796 2.081-2.255 1.418-3.726-.6625-1.47-2.341-2.194-3.782-1.615-1.128.453-1.798 1.583-1.762 2.738l-.052-.0298c-2.619-1.33-4.219-4.141-3.777-6.91.4844-2.995 3.166-5.246 6.225-5.246 3.54 0 6.446 2.914 6.446 6.461 0 .037-.0007.074-.002.111h-.0007c-.0318 1.658-1.409 3.014-3.068 3.014-1.692 0-3.068-1.378-3.068-3.068 0-1.692 1.376-3.068 3.068-3.068.2342 0 .4662.026.6953.078.271.583.4542.196.4284.405-.0244.204-.19.364-.3906.381-.0276.002-.0549.004-.0824.004-.1269 0-.2499-.012-.3705-.033-.1629-.028-.3288.025-.4391.141-.1113.118-.1628.277-.1424.436a.5778.5778 0 0 0 .6209.4848c.1481-.022.2919-.037.4356-.037 2.245 0 4.082 1.839 4.082 4.082v.0423c0 .008-.0002.017-.0002.0255 0 2.245-1.838 4.083-4.082 4.083-2.244 0-4.082-1.838-4.082-4.083 0-.116.005-.232.0148-.3479.0131-.1486-.0399-.2954-.1461-.403-.0991-.1006-.2361-.1502-.3727-.1502-.0132 0-.0264.000481-.0396.00148-1.93.12-3.501 1.707-3.586 3.639-.046 1.299.4618 2.536 1.389 3.392a4.677 4.677 0 0 0 3.355 1.394c2.599 0 4.703-2.103 4.703-4.703h.0007v-.0125c0-.0038.0001-.0075.0001-.0113 0-2.842-2.313-5.155-5.155-5.155-3.441 0-6.247 2.804-6.247 6.247 0 3.467 2.827 6.294 6.294 6.294 4.444 0 8.06-3.617 8.06-8.06 0-5.377-4.372-9.75-9.75-9.75z"/>
        </svg>
};

const CartSidebar = () => {
  const { cart, isCartOpen, closeCart, clearCart, cartTotal, subtotal, shippingCost } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOptions>('btc');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToShipping = () => {
    setCheckoutStep('shipping');
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };

  const handleSelectCrypto = (crypto: CryptoOptions) => {
    setSelectedCrypto(crypto);
    setCopiedAddress(false);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(cryptoAddresses[selectedCrypto]);
    setCopiedAddress(true);
    toast({
      title: "Address copied!",
      description: "Crypto address has been copied to clipboard.",
    });
  };

  const generateUUID = () => {
    // Implementation follows RFC4122 version 4 UUID standard
    const hexDigits = '0123456789abcdef';
    let uuid = '';
    
    // Generate 36 characters: 32 hexadecimal digits and 4 hyphens
    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += '-';
      } else if (i === 14) {
        // Version 4 UUID has the 14th character as '4'
        uuid += '4';
      } else if (i === 19) {
        // The 19th character is either 8, 9, a, or b
        uuid += hexDigits.charAt(Math.floor(Math.random() * 4) + 8);
      } else {
        uuid += hexDigits.charAt(Math.floor(Math.random() * 16));
      }
    }
    
    return uuid;
  };

  const handleOrderComplete = async () => {
    try {
      setIsSubmitting(true);
      
      // Check if cart is empty
      if (cart.length === 0) {
        throw new Error("Your cart is empty");
      }
      
      // Validate shipping information
      const requiredFields = ['name', 'email', 'address', 'city', 'state', 'zipCode'];
      const missingFields = requiredFields.filter(field => !shippingInfo[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required shipping information: ${missingFields.join(', ')}`);
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(shippingInfo.email)) {
        throw new Error("Please enter a valid email address");
      }
      
      // Create order in database
      const orderPayload = {
        customer_name: shippingInfo.name,
        customer_email: shippingInfo.email,
        shipping_address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip_code: shippingInfo.zipCode,
        order_total: cartTotal,
        payment_method: selectedCrypto,
        payment_address: cryptoAddresses[selectedCrypto],
        payment_status: 'pending',
        shipping_status: 'processing'
      };
      
      console.log("Creating order with payload:", orderPayload);
      
      // Try to create the order in the database
      let orderResponse;
      try {
        orderResponse = await supabase
          .from('orders')
          .insert(orderPayload)
          .select();
      } catch (dbError) {
        console.error("Database connection error:", dbError);
        throw new Error("Unable to connect to the order database. Please try again later.");
      }
      
      const { data, error: orderError } = orderResponse;

      if (orderError) {
        console.error("Database error creating order:", orderError);
        
        // Provide more specific error messages based on error codes
        if (orderError.code === '23505') {
          throw new Error("This order appears to be a duplicate. Please check your order history.");
        } else if (orderError.code === '23503') {
          throw new Error("Order references invalid data. Please contact customer support.");
        } else {
          throw new Error(`Failed to create order: ${orderError.message}`);
        }
      }
      
      if (!data || data.length === 0) {
        throw new Error("Order was created but no data was returned");
      }
      
      const createdOrder = data[0] as Order;
      const orderId = createdOrder.id;
      
      console.log("Order created successfully with ID:", orderId);
      
      // Add order items - ensure product IDs are valid UUIDs
      const orderItems = cart.map(item => {
        // Check if product ID is a valid UUID
        const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.product.id);
        
        return {
          order_id: orderId,
          // Generate a new UUID if the ID is not a valid UUID or contains 'test-product'
          product_id: isValidUUID ? item.product.id : generateUUID(),
          quantity: item.quantity,
          price: item.product.price,
          subscription: item.subscription || null
        };
      });
      
      console.log("Creating order items:", orderItems);
      
      // Try to create the order items in the database
      let itemsResponse;
      try {
        itemsResponse = await supabase
          .from('order_items')
          .insert(orderItems);
      } catch (dbError) {
        console.error("Database connection error for order items:", dbError);
        throw new Error("Your order was created, but we encountered an issue with the order details. Our team has been notified.");
      }
      
      const { error: itemsError } = itemsResponse;
        
      if (itemsError) {
        console.error("Database error creating order items:", itemsError);
        throw new Error(`Failed to add order items: ${itemsError.message}`);
      }
      
      console.log("Order items created successfully");
      
      // Try to send order notification to the edge function
      try {
        // Prepare order data for notification
        const notificationData = {
          orderData: {
            id: orderId,
            customerName: shippingInfo.name,
            customerEmail: shippingInfo.email,
            total: cartTotal,
            items: cart.map(item => ({
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
              product_id: item.product.id
            })),
            shipping_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}`,
            payment_method: selectedCrypto
          }
        };
        
        // Send notification to edge function (this is non-blocking)
        fetch('https://klkncqrjpvvzwyoqmhfe.supabase.co/functions/v1/notify-new-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notificationData)
        }).catch(notifyError => {
          // Just log the error, don't throw it since the order is already created
          console.error("Failed to send order notification:", notifyError);
        });
      } catch (notifyError) {
        // Just log the error, don't throw it since the order is already created
        console.error("Error preparing order notification:", notifyError);
      }
      
      toast({
        title: "Order submitted!",
        description: "Thank you for your order. We'll ship your items soon.",
      });
      
      // Reset cart and form
      clearCart();
      closeCart();
      setCheckoutStep('cart');
      setShippingInfo({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
      });
      
    } catch (error: any) {
      console.error("Order submission error:", error);
      toast({
        title: "Order failed",
        description: error.message || "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseCart = () => {
    closeCart();
    if (checkoutStep !== 'cart') {
      setCheckoutStep('cart');
    }
  };

  function renderCartStep() {
    return (
      <>
        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button 
                variant="link" 
                className="mt-2" 
                onClick={handleCloseCart}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem
                  key={item.product.id}
                  id={item.product.id}
                  name={item.product.name}
                  price={item.product.price}
                  image={item.product.image || ''}
                  quantity={item.quantity}
                />
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="border-t border-border pt-4">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base">Subtotal</span>
                <span className="text-base font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Shipping
                  {shippingCost === 0 && (
                    <span className="text-xs text-green-500 ml-2">(Free over $75)</span>
                  )}
                </span>
                <span className="text-base font-medium">
                  {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button onClick={handleProceedToShipping} className="w-full">
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearCart} 
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </>
    );
  }

  function renderShippingStep() {
    return (
      <form onSubmit={handleProceedToPayment} className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={shippingInfo.name} 
              onChange={handleShippingInfoChange} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={shippingInfo.email} 
              onChange={handleShippingInfoChange} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Shipping Address</Label>
            <Input 
              id="address" 
              name="address" 
              value={shippingInfo.address} 
              onChange={handleShippingInfoChange} 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                name="city" 
                value={shippingInfo.city} 
                onChange={handleShippingInfoChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input 
                id="state" 
                name="state" 
                value={shippingInfo.state} 
                onChange={handleShippingInfoChange} 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input 
              id="zipCode" 
              name="zipCode" 
              value={shippingInfo.zipCode} 
              onChange={handleShippingInfoChange} 
              required 
            />
          </div>
        </div>

        <SheetFooter className="border-t border-border pt-4">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base">Subtotal</span>
              <span className="text-base font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base">Shipping</span>
              <span className="text-base font-medium">
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button type="submit" className="w-full">
                Proceed to Payment
              </Button>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setCheckoutStep('cart')} 
                className="w-full"
              >
                Back to Cart
              </Button>
            </div>
          </div>
        </SheetFooter>
      </form>
    );
  }

  function renderPaymentStep() {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          <div>
            <h3 className="font-medium mb-2">Select Payment Method</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We accept cryptocurrency payments only. Select your preferred crypto:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={selectedCrypto === 'btc' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => handleSelectCrypto('btc')}
              >
                {cryptoIcons.btc} Bitcoin
              </Button>
              <Button 
                variant={selectedCrypto === 'eth' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => handleSelectCrypto('eth')}
              >
                {cryptoIcons.eth} Ethereum
              </Button>
              <Button 
                variant={selectedCrypto === 'doge' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => handleSelectCrypto('doge')}
              >
                {cryptoIcons.doge} Dogecoin
              </Button>
              <Button 
                variant={selectedCrypto === 'sol' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => handleSelectCrypto('sol')}
              >
                {cryptoIcons.sol} Solana
              </Button>
              <Button 
                variant={selectedCrypto === 'bnb' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => handleSelectCrypto('bnb')}
              >
                {cryptoIcons.bnb} BNB
              </Button>
              <Button 
                variant={selectedCrypto === 'nano' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => handleSelectCrypto('nano')}
              >
                {cryptoIcons.nano} Nano
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Send Payment To:</h3>
            <div className="flex flex-col space-y-2">
              <div className="p-3 bg-secondary rounded-md break-all text-xs font-mono">
                {cryptoAddresses[selectedCrypto]}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={handleCopyAddress}
              >
                {copiedAddress ? 
                  <><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Copied!</> : 
                  <><Clipboard className="h-4 w-4 mr-2" /> Copy Address</>
                }
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Please send exactly ${cartTotal.toFixed(2)} worth of {selectedCrypto.toUpperCase()} to the address above.
              Once payment is complete, click "I've Sent Payment" below.
            </p>
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Shipping Information</h3>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Name:</span> {shippingInfo.name}</p>
              <p><span className="font-medium">Email:</span> {shippingInfo.email}</p>
              <p><span className="font-medium">Address:</span> {shippingInfo.address}</p>
              <p><span className="font-medium">City:</span> {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            </div>
          </div>
        </div>

        <SheetFooter className="border-t border-border pt-4">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                onClick={handleOrderComplete} 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "I've Sent Payment"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCheckoutStep('shipping')} 
                className="w-full"
                disabled={isSubmitting}
              >
                Back to Shipping
              </Button>
            </div>
          </div>
        </SheetFooter>
      </div>
    );
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={handleCloseCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col" side="left">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            {checkoutStep === 'cart' && (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Your Cart
              </>
            )}
            {checkoutStep === 'shipping' && (
              <>
                <Truck className="mr-2 h-5 w-5" />
                Shipping Information
              </>
            )}
            {checkoutStep === 'payment' && (
              <>
                {cryptoIcons[selectedCrypto]}
                Payment
              </>
            )}
          </SheetTitle>
        </SheetHeader>

        {checkoutStep === 'cart' && renderCartStep()}
        {checkoutStep === 'shipping' && renderShippingStep()}
        {checkoutStep === 'payment' && renderPaymentStep()}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
