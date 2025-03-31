
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { ShoppingCart, Bitcoin, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CartSidebar = () => {
  const { cart, isCartOpen, closeCart, clearCart, cartTotal } = useCart();
  const [paymentDialogOpen, setPaymentDialogOpen] = React.useState(false);

  const handleCheckout = () => {
    setPaymentDialogOpen(true);
  };

  const handlePaymentComplete = () => {
    setPaymentDialogOpen(false);
    clearCart();
    closeCart();
  };

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={closeCart}>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Your Cart
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button 
                  variant="link" 
                  className="mt-2" 
                  onClick={closeCart}
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
                    image={item.product.image}
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
                  <span className="text-base font-medium">Subtotal</span>
                  <span className="text-base font-medium">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Button onClick={handleCheckout} className="w-full">
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
        </SheetContent>
      </Sheet>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cryptocurrency Payment</DialogTitle>
            <DialogDescription>
              Please contact us to complete your payment with cryptocurrency.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-4 rounded-lg border p-4">
              <Bitcoin className="h-8 w-8 text-orange-500" />
              <div>
                <h4 className="font-medium">Pay with Cryptocurrency</h4>
                <p className="text-sm text-muted-foreground">
                  Contact us at 555-123-4567 to arrange payment and delivery. 
                  Reference your cart ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 rounded-lg border p-4">
              <CreditCard className="h-8 w-8 text-blue-500" />
              <div>
                <h4 className="font-medium">Pay in Person</h4>
                <p className="text-sm text-muted-foreground">
                  Visit our store in Columbus, Ohio to pay in person and pick up your order.
                </p>
              </div>
            </div>

            <Button onClick={handlePaymentComplete} className="w-full mt-4">
              I've Contacted for Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartSidebar;
