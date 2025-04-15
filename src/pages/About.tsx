
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
        <h1 className="text-4xl font-bold mb-6">About Cleveland Cartridge Co.</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your trusted source for premium Delta 8 THC products. The DoorDash for Delta-8!
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Cleveland Cartridge Co. was founded in 2023 with a simple mission: to provide high-quality, 
            lab-tested Delta 8 THC products to Cleveland and beyond. As lifelong advocates for the 
            benefits of cannabinoids, we saw the potential for Delta 8 to offer relaxation, relief, 
            and enjoyment in a legal, accessible way.
          </p>
          <p className="text-muted-foreground">
            What started as a delivery service in Cleveland has grown into a trusted source 
            for premium Delta 8 products shipping to states where Delta-8 is legal. Our commitment to quality, transparency, and customer 
            education has earned us a loyal following throughout the country.
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
            src="https://images.unsplash.com/photo-1536819114556-1e10f967fb61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
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
                We're proud to be a Cleveland-based business supporting our local community and economy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compliance Section - Expanded */}
      <div className="bg-secondary/50 rounded-xl p-8 my-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Legal Compliance</h2>
          
          <div className="space-y-4 max-h-80 overflow-y-auto pr-4">
            <p className="text-muted-foreground">
              All of our products comply with the 2018 Farm Bill and contain less than 0.3% Delta-9 THC, 
              making them federally legal. We also adhere to all relevant state regulations regarding the sale 
              and distribution of hemp-derived products.
            </p>
            
            <p className="text-muted-foreground">
              We take our responsibility seriously and require age verification for all purchases. 
              Customers must be 21 years or older to purchase our products, in accordance with our policies.
            </p>
            
            <p className="text-muted-foreground">
              <strong>DISCLAIMER:</strong> The legality of Delta-8 THC varies by state. Consumers are responsible for knowing their local laws before purchasing. Cleveland Cartridge Co. makes no guarantees about the legal status of our products in your jurisdiction.
            </p>
            
            <p className="text-muted-foreground">
              <strong>CONSUMER NOTICE:</strong> Delta-8 THC products may cause impairment and may produce psychoactive effects similar to those of Delta-9 THC. Do not drive or operate heavy machinery while using Delta-8 THC products. Keep out of reach of children and pets.
            </p>
            
            <p className="text-muted-foreground">
              <strong>MANUFACTURING COMPLIANCE:</strong> Our manufacturing partners follow Good Manufacturing Practices (GMP) and our products undergo rigorous third-party laboratory testing for potency, purity, and contaminants. Certificates of Analysis (COAs) are available upon request for all products.
            </p>
            
            <p className="text-muted-foreground">
              <strong>DATA PROTECTION:</strong> We utilize industry-standard encryption and security protocols to protect customer data. Personal information, including shipping addresses, is encrypted and stored securely. We never share, sell, or otherwise distribute customer information to third parties except as required for shipping and payment processing.
            </p>
            
            <p className="text-muted-foreground">
              <strong>LEGAL JURISDICTION:</strong> Any disputes arising from the use or purchase of our products shall be governed by and construed in accordance with the laws of the State of Ohio, without regard to its conflict of law provisions.
            </p>
            
            <div className="flex items-center mt-6">
              <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></div>
              <p className="text-sm text-muted-foreground">
                The statements on this website have not been evaluated by the Food and Drug Administration. 
                These products are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section - Modified */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-4">Meet the Founders</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          The visionaries behind Cleveland Cartridge Co. who are dedicated to bringing 
          you the finest Delta-8 products from Cleveland to the nation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">JD</span>
            </div>
            <h3 className="text-xl font-medium">Jason Dunn</h3>
            <p className="text-muted-foreground">Founder & Product Specialist</p>
          </div>
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">MR</span>
            </div>
            <h3 className="text-xl font-medium">Mike Reynolds</h3>
            <p className="text-muted-foreground">Technical Operations</p>
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
