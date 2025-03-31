
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/context/CartContext";
import { Cannabis, Leaf, ShieldCheck, Zap } from "lucide-react";

// Sample featured products for the homepage
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Delta 8 Gummies - Berry Blast",
    category: "Edibles",
    description: "Delicious berry-flavored Delta 8 THC gummies for a relaxing experience.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1611255514601-a0f225770fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    thc: "25mg",
    cbd: "0mg",
    strain: "Hybrid",
    effects: ["Relaxation", "Euphoria"],
    featured: true
  },
  {
    id: 2,
    name: "Delta 8 Vape Cartridge - OG Kush",
    category: "Vapes",
    description: "Premium Delta 8 THC vape cartridge with OG Kush terpenes.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    thc: "900mg",
    cbd: "50mg",
    strain: "Indica",
    effects: ["Pain Relief", "Sleep"],
    featured: true
  },
  {
    id: 3,
    name: "Delta 8 Tincture - Mint",
    category: "Tinctures",
    description: "Fast-acting Delta 8 THC tincture with refreshing mint flavor.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1614859334151-716b3808b8d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    thc: "1000mg",
    cbd: "200mg",
    strain: "Sativa",
    effects: ["Energy", "Focus"],
    featured: true
  },
  {
    id: 4,
    name: "Delta 8 Flower - Blue Dream",
    category: "Flower",
    description: "Premium Delta 8 infused hemp flower with Blue Dream terpenes.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1603909223429-69bb7d179de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    thc: "18%",
    cbd: "0.3%",
    strain: "Hybrid",
    effects: ["Creativity", "Relaxation"],
    featured: true
  }
];

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 md:py-32">
        <div className="leaf-pattern absolute inset-0 opacity-20"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Premium Delta 8 Products <br className="hidden sm:block" />
            <span className="text-primary">For Your Wellness</span>
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground md:text-xl">
            Experience the highest quality Delta 8 THC products, responsibly sourced and lab-tested for your peace of mind.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
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
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Chill Bud Empire?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the highest quality Delta 8 products with transparency and integrity.
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
                  All our products undergo rigorous third-party lab testing for purity and potency.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Organic Hemp</h3>
                <p className="text-muted-foreground">
                  Sourced from organic USA-grown hemp farms with sustainable practices.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Cannabis className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Expertly crafted products with attention to potency, flavor, and effectiveness.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none">
              <CardContent className="pt-6 px-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Local pickup in Columbus or quick delivery throughout Ohio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                Our most popular Delta 8 products curated for your enjoyment.
              </p>
            </div>
            <Button variant="link" asChild>
              <Link to="/products">View All Products →</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
                  Join the Chill Bud Community
                </h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter for product updates, special offers, and educational content about Delta 8 THC.
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
                  src="https://images.unsplash.com/photo-1541417860152-5375418232e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Delta 8 products" 
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
