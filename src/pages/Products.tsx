
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, CreditCard, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/database";
import { products as sampleProducts } from "@/data/products";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
          setProducts(data as Product[]);
        } else {
          // Fallback to sample products if no products in database
          setProducts(sampleProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        // Use sample products as fallback
        setProducts(sampleProducts);
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
            <div className="grid grid-cols-1 gap-8">
              <div className="h-96 bg-secondary rounded"></div>
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

  // Get available and coming soon products
  const availableProduct = products.find(p => !p.comingSoon) || products[0] || null;
  const comingSoonProducts = products.filter(p => p.comingSoon);

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Premium Delta-8 THC Products</h1>
        <p className="text-muted-foreground max-w-3xl">
          Cleveland's #1 Delta-8 delivery service. We're like DoorDash, but for Delta-8! 
          Get same-day delivery in Cleveland or nationwide shipping to states where Delta-8 is legal.
          Each product is lab-tested for purity and potency.
        </p>
      </div>

      {/* Main Product Display */}
      {availableProduct && (
        <div className="mb-16">
          <div className="grid grid-cols-1 gap-8 items-center">
            <div className="rounded-lg overflow-hidden border border-border max-w-md mx-auto">
              <img
                src={availableProduct.image}
                alt={availableProduct.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{availableProduct.name}</h2>
              <p className="text-muted-foreground">{availableProduct.description}</p>
              
              <div className="text-2xl font-semibold">
                ${availableProduct.price.toFixed(2)}
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Same-Day Delivery in Cleveland</h4>
                    <p className="text-sm text-muted-foreground">Free shipping on orders over $75 nationwide to states where Delta-8 is legal</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Lab Tested Quality</h4>
                    <p className="text-sm text-muted-foreground">All products third-party tested for purity and potency</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Secure Crypto Payment</h4>
                    <p className="text-sm text-muted-foreground">Multiple cryptocurrency options for private transactions</p>
                  </div>
                </div>
              </div>
              
              <ProductCard product={availableProduct} />
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Products */}
      {comingSoonProducts.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
          </div>
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertTitle>We're expanding our product line!</AlertTitle>
            <AlertDescription>
              This product is currently in production and will be available soon. Sign up for our newsletter to get notified when it drops!
            </AlertDescription>
          </Alert>
          
          <div className="max-w-md mx-auto">
            {comingSoonProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Delta-8 THC Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4">What is Delta-8 THC?</h3>
            <p className="mb-4">
              Delta-8 THC is a naturally occurring cannabinoid found in small amounts in the cannabis plant. 
              It offers a milder, more clear-headed experience compared to traditional Delta-9 THC.
            </p>
            <p>
              Our Delta-8 products are derived from legal hemp and comply with the 2018 Farm Bill. Each batch is 
              lab-tested to ensure purity and legal compliance.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Benefits & Effects</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Mild euphoria and relaxation</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Clear-headed experience</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Lower anxiety potential than Delta-9</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Legal in many states where Delta-9 THC is not</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                <span>Available for delivery across Cleveland and shipping to legal states</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
