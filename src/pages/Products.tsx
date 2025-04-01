
import React from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, CreditCard } from "lucide-react";

const Products = () => {
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
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={products[0].image}
              alt={products[0].name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{products[0].name}</h2>
            <p className="text-muted-foreground">{products[0].description}</p>
            
            <div className="text-2xl font-semibold">
              ${products[0].price.toFixed(2)}
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
            <p className="text-3xl font-bold mb-4">${products[0].price.toFixed(2)}</p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>1 replacement pod</li>
              <li>$6 shipping</li>
            </ul>
            <ProductCard product={products[0]} />
          </div>
          
          <div className="border border-primary rounded-lg p-6 text-center bg-primary/5 relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <h3 className="text-xl font-bold mb-2">Pack of 3</h3>
            <p className="text-3xl font-bold mb-4">${(products[0].price * 2.75).toFixed(2)}</p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>3 replacement pods</li>
              <li>$6 shipping</li>
              <li className="text-primary font-medium">Save 8%</li>
            </ul>
            <ProductCard product={products[0]} />
            <Button className="w-full">Add to Cart</Button>
          </div>
          
          <div className="border rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Pack of 5</h3>
            <p className="text-3xl font-bold mb-4">${(products[0].price * 4.5).toFixed(2)}</p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>5 replacement pods</li>
              <li>Free shipping</li>
              <li className="text-primary font-medium">Save 10%</li>
            </ul>
            <ProductCard product={products[0]} />
            <Button className="w-full">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
