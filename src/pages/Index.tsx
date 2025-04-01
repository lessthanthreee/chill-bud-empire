
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { ShieldCheck, Truck, CreditCard, Star } from "lucide-react";
import VapeScene from "@/components/VapeScene";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 md:py-32">
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Premium Vape <br className="hidden sm:block" />
                <span className="text-primary">Replacement Pods</span>
              </h1>
              <p className="mb-8 max-w-lg mx-auto md:mx-0 text-lg text-muted-foreground md:text-xl">
                Cleveland Cartridge Co. offers the highest quality replacement pods for your vaping needs. Premium design with superior performance.
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
              <div className={`transition-all duration-500 ${scrollY > 100 ? 'scale-110' : 'scale-100'}`}>
                <VapeScene />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">Scroll down to see the pod assembly</p>
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
              We're committed to providing the highest quality vape replacement pods with exceptional customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card border-none">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  All our pods are manufactured with the highest quality materials for a superior vaping experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground">
                  Free shipping on orders over $75. Quick delivery to get your pods to you faster.
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
                  We accept multiple cryptocurrencies for secure and private transactions.
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
                  We stand behind our products with excellent customer service and support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Featured Product</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The highest quality vape replacement pod on the market. Experience the difference.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <ProductCard product={products[0]} />
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
                  Ready to Enhance Your Vaping Experience?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our premium replacement pods are designed for optimal performance and satisfaction. Order now and enjoy free shipping on orders over $75.
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
                  src="https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Vape replacement pod" 
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
