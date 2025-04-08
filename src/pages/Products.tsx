
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  thc: string;
  cbd: string;
  strain: string;
  effects: string[];
  featured: boolean;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Fallback to sample product if no products in database
          setProducts([{
            id: 1,
            name: "Premium Vape Replacement Pod",
            category: "Vapes",
            description: "High-quality replacement pod compatible with most popular vape devices. Made with premium materials for a consistent vaping experience.",
            price: 19.99,
            image: "/product.png",
            thc: "N/A",
            cbd: "N/A",
            strain: "N/A",
            effects: ["Smooth Vapor", "Consistent Flavor"],
            featured: true
          }]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        // Use sample product as fallback
        setProducts([{
          id: 1,
          name: "Premium Vape Replacement Pod",
          category: "Vapes",
          description: "High-quality replacement pod compatible with most popular vape devices. Made with premium materials for a consistent vaping experience.",
          price: 19.99,
          image: "/product.png",
          thc: "N/A",
          cbd: "N/A", 
          strain: "N/A",
          effects: ["Smooth Vapor", "Consistent Flavor"],
          featured: true
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Display loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-secondary rounded w-1/2 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-secondary rounded"></div>
              <div className="space-y-4">
                <div className="h-6 bg-secondary rounded w-1/4"></div>
                <div className="h-4 bg-secondary rounded w-full"></div>
                <div className="h-4 bg-secondary rounded w-full"></div>
                <div className="h-10 bg-secondary rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display error message
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Main product display
  const featuredProduct = products[0] || null;

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Premium Vape Replacement Pods</h1>
        <p className="text-muted-foreground max-w-3xl">
          Cleveland Cartridge Co. offers the highest quality replacement pods for your vaping needs. 
          Each pod is manufactured with premium materials to ensure the best possible vaping experience.
        </p>
      </div>

      {/* Product Display */}
      {featuredProduct && (
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{featuredProduct.name}</h2>
              <p className="text-muted-foreground">{featuredProduct.description}</p>
              
              <div className="text-2xl font-semibold">
                ${featuredProduct.price.toFixed(2)}
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Fast Shipping</h4>
                    <p className="text-sm text-muted-foreground">Free shipping on orders over $75, otherwise $6 flat rate</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Premium Quality</h4>
                    <p className="text-sm text-muted-foreground">Superior materials and construction for the best experience</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Secure Payment</h4>
                    <p className="text-sm text-muted-foreground">Multiple cryptocurrency payment options available</p>
                  </div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full md:w-auto"
                asChild
              >
                <a href="#buy-now">Buy Now</a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Specifications</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Material</span>
                <span className="font-medium">Premium Grade</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Capacity</span>
                <span className="font-medium">2ml</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Resistance</span>
                <span className="font-medium">1.2 ohm</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Compatibility</span>
                <span className="font-medium">Universal</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Weight</span>
                <span className="font-medium">8g</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Leak-resistant design</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Consistent vapor production</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Enhanced flavor delivery</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Extended coil life</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Easy installation and replacement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buy Now Section */}
      <div id="buy-now" className="mb-16 pt-8">
        <h2 className="text-2xl font-bold mb-6">Buy Now</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Single Pod</h3>
            <p className="text-3xl font-bold mb-4">${featuredProduct?.price.toFixed(2)}</p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>1 replacement pod</li>
              <li>$6 shipping</li>
            </ul>
            {featuredProduct && <ProductCard product={featuredProduct} />}
          </div>
          
          <div className="border border-primary rounded-lg p-6 text-center bg-primary/5 relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <h3 className="text-xl font-bold mb-2">Pack of 3</h3>
            <p className="text-3xl font-bold mb-4">${featuredProduct ? (featuredProduct.price * 2.75).toFixed(2) : '0.00'}</p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>3 replacement pods</li>
              <li>$6 shipping</li>
              <li className="text-primary font-medium">Save 8%</li>
            </ul>
            {featuredProduct && <ProductCard product={featuredProduct} />}
          </div>
          
          <div className="border rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Pack of 5</h3>
            <p className="text-3xl font-bold mb-4">${featuredProduct ? (featuredProduct.price * 4.5).toFixed(2) : '0.00'}</p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>5 replacement pods</li>
              <li>Free shipping</li>
              <li className="text-primary font-medium">Save 10%</li>
            </ul>
            {featuredProduct && <ProductCard product={featuredProduct} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
