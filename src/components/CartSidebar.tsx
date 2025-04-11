
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
  Bitcoin,
  DollarSign,
  PoundSterling,
  Euro
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Order, OrderItem } from "@/types/database";

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

// Map of crypto options to their respective icons
const cryptoIcons: Record<CryptoOptions, React.ReactNode> = {
  btc: <Bitcoin className="h-4 w-4 mr-2" />,
  eth: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
         <path fill="currentColor" d="M16.498 4v8.87l7.497 3.35z"/>
         <path fill="currentColor" opacity="0.8" d="M16.498 4L9 16.22l7.498-3.35z"/>
         <path fill="currentColor" d="M16.498 21.968v6.027L24 17.616z"/>
         <path fill="currentColor" opacity="0.8" d="M16.498 27.995v-6.028L9 17.616z"/>
         <path fill="currentColor" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
         <path fill="currentColor" opacity="0.8" d="M9 16.22l7.498 4.353v-7.701z"/>
       </svg>,
  doge: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm-5.5 9v4.5H13v-1.5h1.5v9H13V23h7v-1.5h-4v-9H20V14h2.5V9h-12z"/>
        </svg>,
  sol: <svg className="h-4 w-4 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
         <path fill="currentColor" d="M20.8 5.7c-.2-.2-.5-.3-.8-.3H4.9c-.5 0-.9.5-.5 1l3.8 3.9c.2.2.5.3.8.3H25c.5 0 .9-.5.5-1zM20.8 26.3c-.2-.2-.5-.3-.8-.3H4.9c-.5 0-.9.5-.5 1l3.8 3.9c.2.2.5.3.8.3H25c.5 0 .9-.5.5-1zM20.8 16c-.2-.2-.5-.3-.8-.3H4.9c-.5 0-.9.5-.5 1l3.8 3.9c.2.2.5.3.8.3H25c.5 0 .9-.5.5-1z"/>
       </svg>,
  bnb: <DollarSign className="h-4 w-4 mr-2" />,
  nano: <Euro className="h-4 w-4 mr-2" />
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

  const handleOrderComplete = async () => {
    try {
      setIsSubmitting(true);
      
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
      
      const { data, error: orderError } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select();

      if (orderError) {
        throw new Error(`Failed to create order: ${orderError.message}`);
      }
      
      if (!data || data.length === 0) {
        throw new Error("Order was created but no data was returned");
      }
      
      const createdOrder = data[0] as Order;
      const orderId = createdOrder.id;
      
      const orderItems = cart.map(item => ({
        order_id: orderId,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        subscription: item.subscription || undefined
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) {
        throw new Error(`Failed to add order items: ${itemsError.message}`);
      }
      
      // Send email notification about the new order
      try {
        const response = await fetch("https://klkncqrjpvvzwyoqmhfe.supabase.co/functions/v1/notify-new-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            orderData: {
              id: orderId,
              customerName: shippingInfo.name,
              customerEmail: shippingInfo.email,
              total: cartTotal,
              items: cart.map(item => ({
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.price
              }))
            }
          }),
        });
        
        console.log("Email notification response:", await response.json());
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Continue with checkout even if email fails
      }
      
      toast({
        title: "Order submitted!",
        description: "Thank you for your order. We'll ship your items soon.",
      });
      
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
      
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
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
                <Bitcoin className="mr-2 h-5 w-5" />
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
