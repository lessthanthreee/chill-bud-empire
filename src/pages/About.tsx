
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Cannabis, Leaf, ShieldCheck, Truck } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">About Chill Bud Empire</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your trusted source for premium Delta 8 THC products in Ohio.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Chill Bud Empire was founded in 2022 with a simple mission: to provide high-quality, 
            lab-tested Delta 8 THC products to the Ohio community. As lifelong advocates for the 
            benefits of cannabinoids, we saw the potential for Delta 8 to offer relaxation, relief, 
            and enjoyment in a legal, accessible way.
          </p>
          <p className="text-muted-foreground">
            What started as a small operation has grown into one of Ohio's most trusted sources 
            for premium Delta 8 products. Our commitment to quality, transparency, and customer 
            education has earned us a loyal following throughout the state.
          </p>
          <p className="text-muted-foreground">
            We pride ourselves on working directly with trusted manufacturers who adhere to strict 
            quality control standards. Every product in our inventory undergoes comprehensive 
            third-party lab testing to ensure purity, potency, and compliance with all state 
            and federal regulations.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1605001891523-a9eddafc0555?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
            alt="Cannabis farm" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-none">
            <CardContent className="pt-6 px-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Quality & Safety</h3>
              <p className="text-muted-foreground">
                We're committed to providing only the highest quality, lab-tested products that meet rigorous safety standards.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-none">
            <CardContent className="pt-6 px-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We partner with suppliers who use sustainable farming practices and eco-friendly packaging whenever possible.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-none">
            <CardContent className="pt-6 px-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Cannabis className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Education</h3>
              <p className="text-muted-foreground">
                We believe in educating our customers about Delta 8 products, their effects, and responsible consumption.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-none">
            <CardContent className="pt-6 px-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Community</h3>
              <p className="text-muted-foreground">
                We're proud to be an Ohio-based business supporting our local community and economy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compliance Section */}
      <div className="bg-secondary/50 rounded-xl p-8 my-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Legal Compliance</h2>
          <p className="text-muted-foreground mb-6">
            All of our products comply with the 2018 Farm Bill and contain less than 0.3% Delta-9 THC, 
            making them federally legal. We also adhere to all Ohio state regulations regarding the sale 
            and distribution of hemp-derived products.
          </p>
          <p className="text-muted-foreground mb-6">
            We take our responsibility seriously and require age verification for all purchases. 
            Customers must be 21 years or older to purchase our products, in accordance with Ohio state law.
          </p>
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></div>
            <p className="text-sm text-muted-foreground">
              The statements on this website have not been evaluated by the Food and Drug Administration. 
              These products are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section (Optional) */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-4">Our Team</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Meet the passionate individuals behind Chill Bud Empire who are dedicated to bringing 
          you the finest Delta 8 products in Ohio.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" 
                alt="Team member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Alex Thompson</h3>
            <p className="text-muted-foreground">Founder & CEO</p>
          </div>
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" 
                alt="Team member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Jordan Rivera</h3>
            <p className="text-muted-foreground">Product Specialist</p>
          </div>
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" 
                alt="Team member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Morgan Lee</h3>
            <p className="text-muted-foreground">Customer Relations</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Browse our selection of premium Delta 8 products and find the perfect match for your needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/products">Shop Now</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
