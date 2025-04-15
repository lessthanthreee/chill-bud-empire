
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { ShieldCheck, Truck, CreditCard, Star } from "lucide-react";
import VapeScene from "@/components/VapeScene";

const Index = () => {
  // Get featured products
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 md:py-32">
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Cleveland's <br className="hidden sm:block" />
                <span className="text-primary">Delta-8 Delivery</span>
              </h1>
              <p className="mb-8 max-w-lg mx-auto md:mx-0 text-lg text-muted-foreground md:text-xl">
                Think DoorDash, but for Delta-8! Fast local delivery across Cleveland and shipping to states where Delta-8 is legal.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  asChild
                  className="min-w-[150px]"
                >
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="min-w-[150px]"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <VapeScene />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Cleveland Cartridge Co.?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're Cleveland's #1 Delta-8 delivery service, bringing premium products right to your door with exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card border-none">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Lab Tested</h3>
                <p className="text-muted-foreground">
                  All our Delta-8 products are third-party lab tested for purity and potency. Your safety is our priority.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Same-day delivery in Cleveland. Free shipping on orders over $75 nationwide to states where Delta-8 is legal.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Crypto Payments</h3>
                <p className="text-muted-foreground">
                  We accept multiple cryptocurrencies for secure and private transactions on all our Delta-8 products.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground">
                  Over 500+ happy customers and counting. Join Cleveland's favorite Delta-8 delivery service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Most Popular Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cleveland's favorite Delta-8 products, delivered to your door with the speed and convenience you deserve.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - here's what Cleveland Delta-8 enthusiasts have to say.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 px-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4">"Best Delta-8 delivery in Cleveland! My order arrived within 2 hours. The product quality is amazing and consistent. Will definitely order again!"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">JD</div>
                  <div className="ml-3">
                    <p className="font-medium">James D.</p>
                    <p className="text-sm text-muted-foreground">Cleveland Heights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 px-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4">"I love that I can pay with crypto! The shipping to Columbus was fast and discreet. The Delta-8 pods are much better quality than what I've found locally."</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">SM</div>
                  <div className="ml-3">
                    <p className="font-medium">Sarah M.</p>
                    <p className="text-sm text-muted-foreground">Columbus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 px-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4">"Literally the DoorDash of Delta-8! Super easy ordering process and the delivery person was friendly and professional. The product quality exceeded my expectations!"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">KL</div>
                  <div className="ml-3">
                    <p className="font-medium">Kevin L.</p>
                    <p className="text-sm text-muted-foreground">Lakewood</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary/10 rounded-xl overflow-hidden">
            <div className="md:grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Cleveland's #1 Delta-8 Delivery Service
                </h2>
                <p className="text-muted-foreground mb-6">
                  Experience the convenience of having premium Delta-8 products delivered right to your door. Same-day delivery in Cleveland and shipping nationwide to states where Delta-8 is legal.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="min-w-[150px]">
                    <Link to="/products">Shop Now</Link>
                  </Button>
                  <Button variant="outline" asChild className="min-w-[150px]">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block relative h-full w-full min-h-[300px]">
                <img 
                  src="/product.png"
                  alt="Delta-8 vape pod" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
