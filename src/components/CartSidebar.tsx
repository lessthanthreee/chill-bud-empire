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
  Shield,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/types/database";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

const cryptoIcons: Record<CryptoOptions, React.ReactNode> = {
  btc: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16s16-7.163 16-16S24.837 0 16 0zm-.5 7.5h3.5a3.499 3.499 0 013.444 2.838l.02.162h2v2h-2v2h2v2h-2v6h-2v-6h-1v6h-2v-6h-4.5v2.5h-2v-2.5h-2v2h2V7.5h2.5zm1.5 2h-1.5v4h4a1.5 1.5 0 000-3H17v-1z"/>
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
         <path fill="currentColor" d="M23.01 11.42c-.15 0-.31.06-.43.18l-9.51 8.92c-.19.17-.43.26-.69.26H7.09c-.34 0-.66-.18-.84-.47a.996.996 0 010-1.06c.18-.29.5-.47.84-.47h4.46c.26 0 .5-.09.69-.26l9.51-8.92c.24-.22.61-.22.85 0l2.56 2.4c.12.11.18.27.18.43s-.06.31-.18.43l-12.7 11.91c-.19.17-.43-.26.69-.26H.96c-.34 0-.66-.18-.84-.47a.996.996 0 010-1.06c.18-.29.5-.47.84-.47h9.72c.26 0 .5-.09.69-.26l12.7-11.91c.12-.11.18-.27.18-.43s-.06-.32-.18-.43l-.74-.7c-.24-.22-.24-.59 0-.81l.99-.93c.19-.17.43-.26.69-.26h7.76c.34 0 .66.18.84.47s.24.66 0 .96c-.18.29-.5.47-.84.47h-6.8c-.26 0-.5.09-.69.26l-.99.93c-.12.11-.18.27-.18.43s.06.32.18.43l.31.29c.12.11.28.17.43.17zm9.66 10.84c.34 0 .66.18.84.47s.24.66 0 .96c-.18.29-.5.47-.84.47h-4.62c-.26 0-.5.09-.69.26l-9.51 8.92c-.24.22-.61.22-.85 0l-2.56-2.4c-.12-.11-.18-.27-.18-.43s.06-.31.18-.43l12.7-11.91c.19-.17.43-.26.69-.26h9.78c.34 0 .66.18.84.47s.24.66 0 .96c-.18.29-.5.47-.84.47h-9.09c-.26 0-.5.09-.69.26l-10.77 10.11c-.12.11-.18.27-.18.43s.06.32.18.43l1.13 1.06c.24.22.61.22.85 0l9.51-8.92c.19-.17.43-.26.69-.26h4.23z"/>
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
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // Ensure discount state exists
  const [promoStatus, setPromoStatus] = useState(null); // Unified status for promo code
  const [promoCodeStatus, setPromoCodeStatus] = useState<'idle' | 'checking' | 'applied' | 'invalid' | 'error'>('idle');

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
    const hexDigits = '0123456789abcdef';
    let uuid = '';
    
    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += '-';
      } else if (i === 14) {
        uuid += '4';
      } else if (i === 19) {
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
      
      if (cart.length === 0) {
        throw new Error("Your cart is empty");
      }
      
      const requiredFields = ['name', 'email', 'address', 'city', 'state', 'zipCode'];
      const missingFields = requiredFields.filter(field => !shippingInfo[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required shipping information: ${missingFields.join(', ')}`);
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(shippingInfo.email)) {
        throw new Error("Please enter a valid email address");
      }
      
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
      
      const { data, error: orderError } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select();

      if (orderError) {
        console.error("Database error creating order:", orderError);
        
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
      
      const orderItems = cart.map(item => ({
        order_id: orderId,
        product_id: null,
        quantity: item.quantity,
        price: item.product.price,
        subscription: item.subscription || null
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) {
        console.error("Database error creating order items:", itemsError);
        throw new Error(`Failed to add order items: ${itemsError.message}`);
      }
      
      console.log("Order items created successfully");
      
      try {
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
        
        fetch('https://klkncqrjpvvzwyoqmhfe.supabase.co/functions/v1/notify-new-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notificationData)
        }).catch(notifyError => {
          console.error("Failed to send order notification:", notifyError);
        });
      } catch (notifyError) {
        console.error("Error preparing order notification:", notifyError);
      }
      
      setShowPaymentInfo(true);
      
      clearCart();
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

  const handleClosePaymentInfo = () => {
    setShowPaymentInfo(false);
    closeCart();
  }

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
          <div className="flex items-center space-x-2 bg-muted/40 p-3 rounded-md border border-muted">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Your information is encrypted and stored securely.{" "}
              <button 
                type="button"
                className="underline font-medium" 
                onClick={() => setShowSecurityInfo(true)}
              >
                Learn more
              </button>
            </span>
          </div>
          
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
          {/* Promo Code Redeemer */}
          <div className="bg-muted p-4 rounded-md mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Promo Code:</span>
              <input
                type="text"
                className="border rounded px-2 py-1 text-sm flex-1"
                placeholder="Enter code"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                disabled={!!appliedDiscount}
                style={{ minWidth: 120 }}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  setPromoStatus(null);
                  // Simulate backend validation (replace with real API call)
                  setTimeout(() => {
                    if (!promoCode) {
                      setPromoStatus({ success: false, message: "Please enter a code." });
                    } else if (promoCode.toLowerCase() === "chill10") {
                      setPromoStatus({ success: true, message: "Code applied! 10% off.", discount: 10 });
                      setAppliedDiscount(10);
                    } else if (promoCode.toLowerCase() === "expired") {
                      setPromoStatus({ success: false, message: "Code expired." });
                    } else {
                      setPromoStatus({ success: false, message: "Invalid code." });
                    }
                  }, 600);
                }}
                disabled={!!appliedDiscount || !promoCode}
              >
                {appliedDiscount ? "Applied" : "Apply"}
              </Button>
              {appliedDiscount ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setAppliedDiscount(0);
                    setPromoCode("");
                    setPromoStatus(null);
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </div>
            {promoStatus && (
              <div className={`text-xs mt-1 ${promoStatus.success ? "text-green-600" : "text-red-500"}`}>
                {promoStatus.message}
              </div>
            )}
          </div>
          {/* End Promo Code Redeemer */}
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

            <div className="bg-muted p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Amount due:</span>
                <span className="text-sm font-bold">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Send to address:</span>
                  {copiedAddress ? (
                    <span className="text-xs text-green-500 flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Copied
                    </span>
                  ) : null}
                </div>
                <div 
                  className="relative bg-background border border-border rounded-md p-2 text-xs font-mono break-all cursor-pointer"
                  onClick={handleCopyAddress}
                >
                  {cryptoAddresses[selectedCrypto]}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 text-xs"
                    onClick={handleCopyAddress}
                  >
                    <Clipboard className="h-3 w-3 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Send exactly ${cartTotal.toFixed(2)} worth of {selectedCrypto.toUpperCase()} to the address above.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm">After you've sent the payment:</p>
              <Button 
                className="w-full"
                onClick={handleOrderComplete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Complete Order"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCheckoutStep('shipping')}
                className="w-full"
                disabled={isSubmitting}
              >
                Back to Shipping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={closeCart}>
        <SheetContent className="flex flex-col w-full sm:max-w-md">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          
          {checkoutStep === 'cart' && renderCartStep()}
          {checkoutStep === 'shipping' && renderShippingStep()}
          {checkoutStep === 'payment' && renderPaymentStep()}
        </SheetContent>
      </Sheet>

      <AlertDialog open={showPaymentInfo} onOpenChange={setShowPaymentInfo}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order Submitted Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Thank you for your order. We've sent a detailed email to <span className="font-medium">{shippingInfo.email}</span> with complete payment instructions.
              </p>
              <p className="bg-muted p-3 rounded-md text-sm">
                <strong>Important:</strong> To complete your purchase, please follow the cryptocurrency payment instructions in your email. Remember to include your order ID in the transaction memo for faster processing.
              </p>
              <p className="text-sm">
                If you have any questions or need help with the payment process, contact our support team at support@clevelandcartridge.co
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClosePaymentInfo}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showSecurityInfo} onOpenChange={setShowSecurityInfo}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Data Security</DialogTitle>
            <DialogDescription>
              How we protect your personal information
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Database Security</h4>
              <p>
                We implement PostgreSQL Row-Level Security (RLS) policies to ensure strict access control. 
                This cryptographically enforces that only authorized personnel can view your personal data.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Encryption Protocols</h4>
              <p>
                All data is encrypted at-rest using AES-256 encryption and in-transit via TLS 1.3 protocols.
                Your shipping information is compartmentalized from payment data for enhanced security.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Payment Privacy</h4>
              <p>
                We use cryptocurrency payments which offer enhanced anonymity compared to traditional payment methods. 
                Transaction records are kept separate from personal identifying information.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Data Retention</h4>
              <p>
                We only maintain your data for the minimum time required for business operations and legal compliance. 
                All sensitive information is automatically purged after the retention period.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowSecurityInfo(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartSidebar;
