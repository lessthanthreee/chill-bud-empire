
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  SearchIcon, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  PackageCheck,
  PackageOpen,
  CircleDashed,
  CircleAlert,
  HelpCircle
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

// Sample order statuses
enum OrderStatus {
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
  OutForDelivery = "out_for_delivery"
}

// Sample order data (for demo purposes)
const sampleOrders = [
  {
    id: "ORD-2023-1234",
    email: "user@example.com",
    status: OrderStatus.Delivered,
    date: "2023-10-15",
    items: [
      { name: "Delta 8 Gummies - Berry Blast", quantity: 2, price: 29.99 },
      { name: "Delta 8 Vape Cartridge - OG Kush", quantity: 1, price: 34.99 }
    ],
    total: 94.97,
    tracking: {
      number: "TRK123456789",
      carrier: "USPS",
      events: [
        { date: "2023-10-15 08:30 AM", status: "Order Placed", location: "Online" },
        { date: "2023-10-15 02:15 PM", status: "Order Processed", location: "Columbus, OH" },
        { date: "2023-10-16 09:45 AM", status: "Shipment Prepared", location: "Columbus, OH" },
        { date: "2023-10-16 04:30 PM", status: "Picked Up by Carrier", location: "Columbus, OH" },
        { date: "2023-10-17 10:20 AM", status: "In Transit", location: "Cleveland, OH" },
        { date: "2023-10-18 08:15 AM", status: "Out for Delivery", location: "Akron, OH" },
        { date: "2023-10-18 02:45 PM", status: "Delivered", location: "Akron, OH" }
      ],
      estimatedDelivery: "2023-10-18"
    }
  },
  {
    id: "ORD-2023-5678",
    email: "user@example.com",
    status: OrderStatus.Shipped,
    date: "2023-10-20",
    items: [
      { name: "Delta 8 Tincture - Mint", quantity: 1, price: 49.99 }
    ],
    total: 49.99,
    tracking: {
      number: "TRK987654321",
      carrier: "UPS",
      events: [
        { date: "2023-10-20 10:15 AM", status: "Order Placed", location: "Online" },
        { date: "2023-10-20 03:30 PM", status: "Order Processed", location: "Columbus, OH" },
        { date: "2023-10-21 11:20 AM", status: "Shipment Prepared", location: "Columbus, OH" },
        { date: "2023-10-21 05:45 PM", status: "Picked Up by Carrier", location: "Columbus, OH" },
        { date: "2023-10-22 09:30 AM", status: "In Transit", location: "Cincinnati, OH" }
      ],
      estimatedDelivery: "2023-10-24"
    }
  },
  {
    id: "ORD-2023-9012",
    email: "another@example.com",
    status: OrderStatus.Processing,
    date: "2023-10-22",
    items: [
      { name: "Delta 8 Flower - Blue Dream", quantity: 1, price: 39.99 },
      { name: "Delta 8 Gummies - Watermelon", quantity: 2, price: 29.99 }
    ],
    total: 99.97,
    tracking: {
      number: null,
      carrier: null,
      events: [
        { date: "2023-10-22 02:45 PM", status: "Order Placed", location: "Online" },
        { date: "2023-10-22 04:10 PM", status: "Payment Confirmed", location: "Online" }
      ],
      estimatedDelivery: "2023-10-26"
    }
  }
];

// Helper function to get status info
const getStatusInfo = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Processing:
      return { 
        icon: <CircleDashed className="h-6 w-6 text-amber-500" />, 
        text: "Processing", 
        color: "text-amber-500",
        progress: 25
      };
    case OrderStatus.Shipped:
      return { 
        icon: <Truck className="h-6 w-6 text-blue-500" />, 
        text: "Shipped", 
        color: "text-blue-500",
        progress: 50
      };
    case OrderStatus.OutForDelivery:
      return { 
        icon: <PackageCheck className="h-6 w-6 text-indigo-500" />, 
        text: "Out for Delivery", 
        color: "text-indigo-500",
        progress: 75
      };
    case OrderStatus.Delivered:
      return { 
        icon: <CheckCircle2 className="h-6 w-6 text-green-500" />, 
        text: "Delivered", 
        color: "text-green-500",
        progress: 100
      };
    case OrderStatus.Cancelled:
      return { 
        icon: <CircleAlert className="h-6 w-6 text-red-500" />, 
        text: "Cancelled", 
        color: "text-red-500",
        progress: 0
      };
    default:
      return { 
        icon: <CircleDashed className="h-6 w-6 text-gray-500" />, 
        text: "Unknown", 
        color: "text-gray-500", 
        progress: 0
      };
  }
};

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchType, setSearchType] = useState<"order" | "tracking">("order");
  const [searchResult, setSearchResult] = useState<typeof sampleOrders[0] | null>(null);
  const [orderNotFound, setOrderNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderNotFound(false);
    
    if (searchType === "order") {
      if (!orderNumber || !email) {
        toast({
          title: "Missing Information",
          description: "Please enter both order number and email address.",
          variant: "destructive"
        });
        return;
      }
      
      // Search for order in sample data (in a real app, this would be an API call)
      const order = sampleOrders.find(
        o => o.id.toLowerCase() === orderNumber.toLowerCase() && 
        o.email.toLowerCase() === email.toLowerCase()
      );
      
      if (order) {
        setSearchResult(order);
      } else {
        setOrderNotFound(true);
        setSearchResult(null);
        toast({
          title: "Order Not Found",
          description: "We couldn't find an order matching the information provided. Please check and try again.",
          variant: "destructive"
        });
      }
    } else {
      // Tracking number search
      if (!trackingNumber) {
        toast({
          title: "Missing Information",
          description: "Please enter a tracking number.",
          variant: "destructive"
        });
        return;
      }
      
      // Search for tracking number in sample data
      const order = sampleOrders.find(
        o => o.tracking.number?.toLowerCase() === trackingNumber.toLowerCase()
      );
      
      if (order) {
        setSearchResult(order);
      } else {
        setOrderNotFound(true);
        setSearchResult(null);
        toast({
          title: "Tracking Number Not Found",
          description: "We couldn't find a shipment with this tracking number. Please check and try again.",
          variant: "destructive"
        });
      }
    }
  };

  const resetSearch = () => {
    setOrderNumber("");
    setEmail("");
    setTrackingNumber("");
    setSearchResult(null);
    setOrderNotFound(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
        <p className="text-muted-foreground max-w-3xl">
          Stay updated on the status of your Delta 8 order. Enter your order number and email, 
          or your tracking number to check the current status and delivery information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Search Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Track Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-6">
                <Button
                  type="button"
                  variant={searchType === "order" ? "default" : "outline"}
                  onClick={() => setSearchType("order")}
                  className="flex-1"
                >
                  <Package className="h-4 w-4 mr-2" />
                  By Order Number
                </Button>
                <Button
                  type="button"
                  variant={searchType === "tracking" ? "default" : "outline"}
                  onClick={() => setSearchType("tracking")}
                  className="flex-1"
                >
                  <Truck className="h-4 w-4 mr-2" />
                  By Tracking Number
                </Button>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                {searchType === "order" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="order-number">Order Number</Label>
                      <Input
                        id="order-number"
                        placeholder="e.g. ORD-2023-1234"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email used for your order"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="tracking-number">Tracking Number</Label>
                    <Input
                      id="tracking-number"
                      placeholder="e.g. TRK123456789"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full">
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
              </form>

              <div className="mt-6 text-sm text-muted-foreground">
                <p className="flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Can't find your order number? Check your order confirmation email.
                </p>
              </div>
            </CardContent>
          </Card>

          {orderNotFound && (
            <Card className="mt-6 border-red-200 bg-red-50 dark:bg-red-950/10">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <CircleAlert className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-red-700 dark:text-red-300">Order Not Found</h3>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      We couldn't find any orders matching your information. Please check the details and try again, 
                      or contact customer support if you need assistance.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-red-300 text-red-700 hover:bg-red-100 dark:hover:bg-red-950/50"
                      onClick={resetSearch}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!searchResult && !orderNotFound && (
            <div className="bg-secondary/50 rounded-lg p-6 mt-6">
              <h3 className="font-medium mb-3 flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                Delivery Information
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our standard shipping within Ohio typically takes 2-5 business days. Expedited shipping 
                options may be available depending on your location. All orders are shipped with tracking.
              </p>
              <p className="text-sm text-muted-foreground">
                For questions about your order, please contact our customer support 
                team at clevelandcartridge@gmail.com or call us at (555) 123-4567.
              </p>
            </div>
          )}
        </div>

        {/* Order Details */}
        {searchResult && (
          <div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Order #{searchResult.id}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Placed on {new Date(searchResult.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {getStatusInfo(searchResult.status).icon}
                    <span className={`ml-2 font-medium ${getStatusInfo(searchResult.status).color}`}>
                      {getStatusInfo(searchResult.status).text}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Order Placed</span>
                    <span>Delivered</span>
                  </div>
                  <Progress value={getStatusInfo(searchResult.status).progress} className="h-2" />
                </div>

                {/* Shipping Details */}
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Shipping Details
                  </h3>
                  
                  {searchResult.tracking.number ? (
                    <div className="bg-secondary/30 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Carrier:</span> {searchResult.tracking.carrier}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Tracking #:</span> {searchResult.tracking.number}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Estimated Delivery:</span> {searchResult.tracking.estimatedDelivery}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-secondary/30 p-4 rounded-md">
                      <p className="text-sm">
                        Tracking information will be available once your order ships.
                      </p>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Order Items
                  </h3>
                  
                  <div className="space-y-3">
                    {searchResult.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center pt-2 font-medium">
                      <span>Total</span>
                      <span>${searchResult.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Tracking Timeline
                  </h3>
                  
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-[1px] before:bg-border">
                    {searchResult.tracking.events.map((event, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-primary"></div>
                        <div>
                          <p className="font-medium">{event.status}</p>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{event.date}</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={resetSearch}>
                  Track Another Order
                </Button>
                <Button variant="outline">Download Invoice</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Shipping FAQ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How long does shipping take?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Standard shipping within Ohio typically takes 2-5 business days. Expedited shipping 
                options are available during checkout. Local pickup in Columbus is usually available within 24 hours.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Where do you ship to?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We currently ship only within the state of Ohio. Due to varying legal restrictions 
                on Delta 8 products, we cannot ship to other states at this time.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I change my shipping address?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You can change your shipping address if your order hasn't been processed yet. 
                Please contact our customer support team immediately with your order number and new shipping details.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What if my package is lost or damaged?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If your package is lost, damaged, or hasn't arrived within the expected timeframe, 
                please contact our customer support team. We'll work with the carrier to locate your 
                package or process a replacement if necessary.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-secondary/50 rounded-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-6">
              If you have questions about your order or need additional assistance with tracking, 
              our customer support team is here to help.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <SearchIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Order Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Email us at clevelandcartridge@gmail.com with your order number
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Shipping Issues</h3>
                  <p className="text-sm text-muted-foreground">
                    Call us at (555) 123-4567, Monday-Friday, 9am-5pm ET
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="Your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-id">Order ID (if applicable)</Label>
                    <Input id="order-id" placeholder="e.g. ORD-2023-1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea 
                      id="message"
                      className="w-full min-h-[120px] px-3 py-2 border rounded-md border-input bg-background"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
