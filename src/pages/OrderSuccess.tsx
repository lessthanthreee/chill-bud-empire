
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Award, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId') || 'N/A';

  useEffect(() => {
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': queryParams.get('total') || 0,
        'currency': 'USD',
        'transaction_id': orderId
      });
    }
    
    // Clear cart from localStorage (optional)
    // localStorage.removeItem('cart');
  }, [orderId]);

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Thanks for your order!</h1>
        <p className="text-lg text-muted-foreground mb-2">Order #{orderId}</p>
        <p className="text-muted-foreground">
          We've sent a confirmation email with all the details.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold">What happens next?</h2>
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-center font-medium">1</span>
                <div className="space-y-1">
                  <p className="font-medium leading-none">Order Processing</p>
                  <p className="text-sm text-muted-foreground">We're preparing your items for delivery.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-center font-medium">2</span>
                <div className="space-y-1">
                  <p className="font-medium leading-none">Shipping</p>
                  <p className="text-sm text-muted-foreground">Your order will be shipped within 24 hours.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-center font-medium">3</span>
                <div className="space-y-1">
                  <p className="font-medium leading-none">Delivery</p>
                  <p className="text-sm text-muted-foreground">You'll receive a tracking number once your order ships.</p>
                </div>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold">Special Offer</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Get 10% off your next order with code:
            </p>
            <div className="bg-secondary p-3 text-center rounded-md font-mono text-lg font-bold mb-4">
              THANKYOU10
            </div>
            <p className="text-xs text-muted-foreground">
              Valid for 30 days. Cannot be combined with other offers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col h-full">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4 flex-grow">
              If you have any questions about your order, please contact our customer service team.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button asChild>
                <Link to="/products">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
