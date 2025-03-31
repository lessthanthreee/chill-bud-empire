
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CalendarClock,
  CheckCircle2,
  Package,
  Truck,
  BadgePercent,
  Clock,
  Sparkles,
  Lock,
  Repeat,
  CircleDollarSign,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

const SubscriptionItem = ({ 
  title, 
  price, 
  image, 
  category, 
  discount,
  frequency
}: { 
  title: string; 
  price: number; 
  image: string; 
  category: string;
  discount: number;
  frequency: string;
}) => {
  const discountedPrice = price * (1 - discount / 100);
  
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-primary">
          <BadgePercent className="h-3 w-3 mr-1" /> {discount}% off
        </Badge>
      </div>
      <CardContent className="pt-6">
        <Badge variant="outline" className="mb-2">{category}</Badge>
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{title}</h3>
        <div className="flex items-center">
          <span className="text-lg font-semibold">${discountedPrice.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground line-through ml-2">${price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground ml-2">/ {frequency}</span>
        </div>
        <div className="flex items-center mt-4 text-sm text-muted-foreground">
          <Repeat className="h-4 w-4 mr-1" />
          <span>Delivered {frequency}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Subscribe & Save</Button>
      </CardFooter>
    </Card>
  );
};

const Subscriptions = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Delta 8 Subscriptions</h1>
        <p className="text-muted-foreground max-w-3xl">
          Subscribe to your favorite Delta 8 products and never run out. Enjoy regular deliveries, save 10% on every order, 
          and manage your subscriptions with ease. Perfect for regular users who want convenience and savings.
        </p>
      </div>

      {/* Benefits Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="bg-secondary/30 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <BadgePercent className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Save 10% on Every Order</h3>
                <p className="text-sm text-muted-foreground">
                  Subscribers automatically save 10% on all products compared to one-time purchases.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/30 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Repeat className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Flexible Delivery Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Choose between biweekly or monthly deliveries. Easily adjust or skip deliveries anytime.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/30 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">No Commitment</h3>
                <p className="text-sm text-muted-foreground">
                  Cancel anytime with no fees or penalties. You're always in complete control.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Subscriptions */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Subscriptions</h2>
          <Button asChild variant="outline">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SubscriptionItem 
            title="Delta 8 Gummies - Berry Blast"
            price={29.99}
            image="https://images.unsplash.com/photo-1611255514601-a0f225770fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            category="Edibles"
            discount={10}
            frequency="monthly"
          />
          <SubscriptionItem 
            title="Delta 8 Vape Cartridge - OG Kush"
            price={34.99}
            image="https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            category="Vapes"
            discount={10}
            frequency="biweekly"
          />
          <SubscriptionItem 
            title="Delta 8 Tincture - Mint"
            price={49.99}
            image="https://images.unsplash.com/photo-1614859334151-716b3808b8d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            category="Tinctures"
            discount={10}
            frequency="monthly"
          />
          <SubscriptionItem 
            title="Delta 8 Flower - Blue Dream"
            price={39.99}
            image="https://images.unsplash.com/photo-1603909223429-69bb7d179de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            category="Flower"
            discount={10}
            frequency="biweekly"
          />
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">How Subscriptions Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">1. Choose Your Products</h3>
            <p className="text-muted-foreground">
              Browse our selection and select any product for subscription. You'll save 10% compared to one-time purchases.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <CalendarClock className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">2. Set Your Schedule</h3>
            <p className="text-muted-foreground">
              Select your preferred delivery frequency: biweekly or monthly. Choose what works best for your usage.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <Truck className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">3. Enjoy Regular Deliveries</h3>
            <p className="text-muted-foreground">
              Sit back and relax as your favorite products arrive on schedule. You'll never run out again.
            </p>
          </div>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-6 mt-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4 md:mb-0 md:mr-6">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center md:text-left md:flex-1">
              <h3 className="font-medium text-lg mb-2">Complete Flexibility</h3>
              <p className="text-muted-foreground mb-4">
                Easily manage your subscriptions in your account dashboard. Skip deliveries, change frequency, 
                swap products, or cancel anytime with no penalties.
              </p>
            </div>
            <Button className="mt-4 md:mt-0">
              Start Saving Today
            </Button>
          </div>
        </div>
      </div>

      {/* Subscription Types */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Subscription Options</h2>
        
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="biweekly" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Biweekly Subscription
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center">
              <CalendarClock className="h-4 w-4 mr-2" />
              Monthly Subscription
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="biweekly">
            <Card>
              <CardHeader>
                <CardTitle>Biweekly Subscription</CardTitle>
                <CardDescription>
                  Perfect for regular users who want to maintain a consistent supply
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Delivery Every 2 Weeks</h4>
                    <p className="text-sm text-muted-foreground">Products delivered every 14 days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">10% Savings on Every Order</h4>
                    <p className="text-sm text-muted-foreground">Save more with frequent deliveries</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Ideal For</h4>
                    <p className="text-sm text-muted-foreground">Daily users who go through products quickly</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/products">Browse Biweekly Options</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Subscription</CardTitle>
                <CardDescription>
                  Our most popular option for casual to moderate users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Delivery Every Month</h4>
                    <p className="text-sm text-muted-foreground">Products delivered every 30 days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">10% Savings on Every Order</h4>
                    <p className="text-sm text-muted-foreground">Consistent savings with less frequent deliveries</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Ideal For</h4>
                    <p className="text-sm text-muted-foreground">Weekly or occasional users who want a regular supply</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/products">Browse Monthly Options</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I manage my subscription?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                You can manage all aspects of your subscription through your account dashboard. This includes 
                changing delivery frequency, skipping deliveries, swapping products, updating payment information, 
                and canceling your subscription.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time with no penalties or fees. Simply log into 
                your account, navigate to your subscriptions, and click on "Cancel Subscription." You'll continue 
                to receive any deliveries that have already been processed.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>How does payment work for subscriptions?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                You'll be charged for each delivery according to your selected frequency. Payment is processed 
                2 days before your scheduled delivery date. We accept cryptocurrency payments for all subscriptions. 
                You'll receive a payment reminder email 3 days before each charge.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I skip a delivery?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes, you can easily skip any upcoming delivery. Just log into your account at least 3 days before your 
                next scheduled delivery and select "Skip Delivery." You won't be charged for skipped deliveries, and 
                your regular schedule will resume afterward.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>Can I change products in my subscription?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Absolutely! You can swap products at any time through your account. Changes made at least 3 days before 
                your next delivery will apply to that delivery. Otherwise, changes will take effect on the following delivery.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Newsletter */}
      <div className="bg-secondary/30 rounded-lg p-8 mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8 md:flex-1">
            <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for exclusive offers, new product announcements, and helpful Delta 8 information.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Enter your email" type="email" className="pl-10" />
            </div>
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Saving?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Browse our selection of premium Delta 8 products and start your subscription today. Enjoy the convenience 
          of regular deliveries and save 10% on every order.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/products">Browse Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
