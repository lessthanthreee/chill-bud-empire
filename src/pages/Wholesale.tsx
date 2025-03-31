
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  CheckCheck, 
  Truck, 
  Building, 
  Package, 
  BadgePercent, 
  Clock, 
  ShieldCheck, 
  FileText,
  Store,
  FileCheck,
  FileSpreadsheet
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Wholesale = () => {
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Received",
      description: "Thank you for your interest in our wholesale program. We'll review your application and get back to you within 2 business days.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Wholesale Program</h1>
        <p className="text-muted-foreground max-w-3xl">
          Partner with us to bring premium Delta 8 products to your customers. Our wholesale program 
          offers competitive pricing, reliable shipping, and high-quality products for retailers and distributors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Benefits and Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Wholesale Benefits</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2.5 rounded-full mr-4 mt-1">
                <BadgePercent className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Competitive Pricing</h3>
                <p className="text-muted-foreground">
                  Enjoy discounts of up to 40% off retail pricing, with tiered pricing based on order volume. 
                  The more you order, the more you save.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2.5 rounded-full mr-4 mt-1">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Premium Products</h3>
                <p className="text-muted-foreground">
                  All products are thoroughly tested by third-party labs for potency and purity. 
                  Provide your customers with the highest quality Delta 8 products on the market.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2.5 rounded-full mr-4 mt-1">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Fast Shipping</h3>
                <p className="text-muted-foreground">
                  We offer expedited shipping options to ensure your inventory arrives quickly. 
                  Bulk orders are processed within 1-2 business days.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2.5 rounded-full mr-4 mt-1">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Reorder Convenience</h3>
                <p className="text-muted-foreground">
                  Easy reordering process with the option to create recurring orders. 
                  Your account manager will help ensure you never run out of stock.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2.5 rounded-full mr-4 mt-1">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Compliance Support</h3>
                <p className="text-muted-foreground">
                  We provide all necessary compliance documentation for your records, including COAs, 
                  lab testing results, and proper labeling for retail.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold mb-6">Wholesale Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Starter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">25%</div>
                <p className="text-sm text-muted-foreground">Off retail pricing</p>
                <Separator className="my-3" />
                <div className="text-sm text-muted-foreground">
                  Min. order: $500
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/50 shadow-md">
              <CardHeader className="pb-3 bg-primary/5 rounded-t-lg">
                <CardTitle className="text-lg">Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 text-primary">30%</div>
                <p className="text-sm text-muted-foreground">Off retail pricing</p>
                <Separator className="my-3" />
                <div className="text-sm text-muted-foreground">
                  Min. order: $1,000
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">40%</div>
                <p className="text-sm text-muted-foreground">Off retail pricing</p>
                <Separator className="my-3" />
                <div className="text-sm text-muted-foreground">
                  Min. order: $2,500
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-secondary/50 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <Store className="h-5 w-5 text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Custom Pricing Available</h3>
                <p className="text-sm text-muted-foreground">
                  For large volume orders or long-term partnerships, we offer custom pricing tailored to your specific needs. 
                  Contact us to discuss your requirements and get a personalized quote.
                </p>
                <Button variant="outline" className="mt-4">
                  Request Custom Quote
                </Button>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center p-4 border rounded-lg">
              <FileCheck className="h-5 w-5 text-primary mr-3" />
              <div>
                <h3 className="font-medium">Product Catalog</h3>
                <p className="text-sm text-muted-foreground">Download our wholesale catalog</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <FileText className="h-5 w-5 text-primary mr-3" />
              <div>
                <h3 className="font-medium">Terms & Conditions</h3>
                <p className="text-sm text-muted-foreground">Wholesale program policies</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <FileSpreadsheet className="h-5 w-5 text-primary mr-3" />
              <div>
                <h3 className="font-medium">Order Form</h3>
                <p className="text-sm text-muted-foreground">Bulk order spreadsheet template</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <Building className="h-5 w-5 text-primary mr-3" />
              <div>
                <h3 className="font-medium">Reseller Certificate</h3>
                <p className="text-sm text-muted-foreground">Required form for wholesalers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Apply for Wholesale</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name *</Label>
                  <Input id="business-name" required placeholder="Your company name" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Name *</Label>
                    <Input id="contact-name" required placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-title">Title/Position *</Label>
                    <Input id="contact-title" required placeholder="Your role" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address *</Label>
                    <Input id="contact-email" type="email" required placeholder="Your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number *</Label>
                    <Input id="contact-phone" type="tel" required placeholder="Your phone" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business-website">Business Website</Label>
                  <Input id="business-website" type="url" placeholder="https://www.yourbusiness.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business-address">Business Address *</Label>
                  <Input id="business-address" required placeholder="Street address" />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="business-city">City *</Label>
                    <Input id="business-city" required placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-state">State *</Label>
                    <Input id="business-state" required placeholder="State" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-zip">ZIP Code *</Label>
                    <Input id="business-zip" required placeholder="ZIP" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type *</Label>
                  <select 
                    id="business-type" 
                    required
                    className="w-full px-3 py-2 border rounded-md border-input bg-background"
                  >
                    <option value="">Select business type</option>
                    <option value="retailStore">Retail Store</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="dispensary">Dispensary</option>
                    <option value="distributor">Distributor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reseller-permit">Reseller Permit Number *</Label>
                  <Input id="reseller-permit" required placeholder="Your reseller/tax ID" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="order-volume">Estimated Monthly Order Volume *</Label>
                  <select 
                    id="order-volume" 
                    required
                    className="w-full px-3 py-2 border rounded-md border-input bg-background"
                  >
                    <option value="">Select estimated volume</option>
                    <option value="$500-$1000">$500 - $1,000</option>
                    <option value="$1001-$2500">$1,001 - $2,500</option>
                    <option value="$2501-$5000">$2,501 - $5,000</option>
                    <option value="$5001+">$5,001+</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="products-interest">Products of Interest</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="gummies" />
                      <Label htmlFor="gummies" className="font-normal">Gummies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="vapes" />
                      <Label htmlFor="vapes" className="font-normal">Vape Cartridges</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="tinctures" />
                      <Label htmlFor="tinctures" className="font-normal">Tinctures</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="flower" />
                      <Label htmlFor="flower" className="font-normal">Flower</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea 
                    id="additional-info" 
                    placeholder="Tell us more about your business and needs"
                    className="resize-none"
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I confirm that I am a legitimate business owner interested in wholesaling Delta 8 products 
                    and that my business operates in compliance with all applicable laws and regulations.
                  </Label>
                </div>
                
                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
            <CardFooter className="border-t pt-6 flex-col items-start">
              <div className="flex items-start">
                <CheckCheck className="h-5 w-5 text-primary mr-3" />
                <p className="text-sm text-muted-foreground">
                  Applications are typically reviewed within 1-2 business days. If approved, you'll receive 
                  access to our wholesale portal and be contacted by a dedicated account manager.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">What Our Partners Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-secondary/30">
            <CardContent className="pt-6">
              <p className="italic text-muted-foreground mb-4">
                "Partnering with Delta Cannabis has been a game-changer for our store. Their products are consistently high-quality, 
                and their wholesale program offers better margins than any other supplier we've worked with."
              </p>
              <div className="flex items-center">
                <div className="font-medium">John D.</div>
                <div className="mx-2">•</div>
                <div className="text-sm text-muted-foreground">Green Path Wellness</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/30">
            <CardContent className="pt-6">
              <p className="italic text-muted-foreground mb-4">
                "The customer support is exceptional. Our account manager helps us forecast inventory needs and always makes sure 
                our orders arrive on time. The Delta 8 gummies are our best-selling product category now."
              </p>
              <div className="flex items-center">
                <div className="font-medium">Sarah M.</div>
                <div className="mx-2">•</div>
                <div className="text-sm text-muted-foreground">Elevate Dispensary</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/30">
            <CardContent className="pt-6">
              <p className="italic text-muted-foreground mb-4">
                "As a new retailer, I was worried about finding reliable suppliers. Delta Cannabis not only provided excellent products 
                but also helped us understand compliance requirements and best practices for selling Delta 8."
              </p>
              <div className="flex items-center">
                <div className="font-medium">Mark T.</div>
                <div className="mx-2">•</div>
                <div className="text-sm text-muted-foreground">Calm Collective</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What is the minimum order quantity?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our minimum opening order is $500 for the Starter tier. Subsequent orders must meet a $300 minimum. 
                Higher tiers require higher minimums as outlined in our pricing section.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How quickly do orders ship?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Most wholesale orders are processed within 1-2 business days. Shipping time depends on your location within Ohio, 
                typically 2-3 business days. Expedited shipping options are available for an additional fee.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do you offer private labeling?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, we offer private labeling services for orders over $2,500. This includes custom packaging and labeling with your 
                brand. Please contact us for more information about our private label program and requirements.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What payment methods do you accept for wholesale?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We accept cryptocurrency payments for all wholesale orders. For established wholesale partners with a 
                positive payment history, we may offer additional payment options. Your account manager can discuss 
                these options with you.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Join our growing network of successful retailers and distributors. Apply for our wholesale program today 
          and start offering premium Delta 8 products to your customers.
        </p>
        <Button size="lg" className="mx-auto">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default Wholesale;
