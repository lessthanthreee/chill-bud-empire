
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ChevronDown, Check, Truck, ShieldCheck, CreditCard, Clock, AlertCircle } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { products as sampleProducts } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [subscription, setSubscription] = useState<'none' | 'biweekly' | 'monthly'>('none');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // First try to fetch from Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.log("Supabase error, trying local data:", error);
          // If Supabase fails, try to find in sample products
          const localProduct = sampleProducts.find(p => p.id === id);
          
          if (localProduct) {
            setProduct(localProduct);
          } else {
            // If not found in sample products either, use a default
            throw new Error("Product not found");
          }
        } else if (data) {
          setProduct(data as Product);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
        
        // Try one more time with sample products
        const fallbackProduct = sampleProducts.find(p => p.id === id);
        if (fallbackProduct) {
          setProduct(fallbackProduct);
          setError(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      if (product.comingSoon || product.inventory === 0) {
        toast({
          title: "Product not available",
          description: "This product is coming soon and not yet available for purchase.",
          variant: "destructive"
        });
        return;
      }
      
      addToCart(product, quantity, subscription);
      toast({
        title: "Added to cart",
        description: `${quantity} ${product.name} ${subscription !== 'none' ? `(${subscription} subscription)` : ''} added to your cart`,
      });
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const selectSubscription = (option: 'none' | 'biweekly' | 'monthly') => {
    setSubscription(option);
    setShowOptions(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-secondary rounded w-1/2 mb-12"></div>
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
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-muted-foreground mb-6">{error || "Product not found"}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const isComingSoon = product.comingSoon || product.inventory === 0;

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-lg overflow-hidden border border-border">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className={`w-full h-auto object-cover aspect-square ${isComingSoon ? 'opacity-70' : ''}`}
          />
          
          {isComingSoon && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-amber-500">Coming Soon</Badge>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <Star className="w-5 h-5 fill-primary text-primary" />
              <Star className="w-5 h-5 fill-primary text-primary" />
              <Star className="w-5 h-5 fill-primary text-primary" />
              <Star className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="ml-2 text-muted-foreground">(12 reviews)</span>
          </div>
          
          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          {isComingSoon && (
            <Alert>
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                This product is coming soon and not yet available for purchase. 
                Check back later for updates on availability.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isComingSoon}
                >
                  -
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={isComingSoon}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subscription</label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                  onClick={toggleOptions}
                  disabled={isComingSoon}
                >
                  <span>
                    {subscription === 'none' ? 'One-time purchase' : 
                     subscription === 'biweekly' ? 'Biweekly delivery' : 'Monthly delivery'}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
                
                {showOptions && (
                  <div className="absolute mt-1 w-full z-10 bg-background border border-border rounded-md shadow-lg">
                    <div 
                      className="p-2 hover:bg-accent flex items-center justify-between cursor-pointer"
                      onClick={() => selectSubscription('none')}
                    >
                      <span>One-time purchase</span>
                      {subscription === 'none' && <Check className="h-4 w-4" />}
                    </div>
                    <div 
                      className="p-2 hover:bg-accent flex items-center justify-between cursor-pointer"
                      onClick={() => selectSubscription('biweekly')}
                    >
                      <div>
                        <div>Biweekly delivery</div>
                        <div className="text-xs text-muted-foreground">Save 5%</div>
                      </div>
                      {subscription === 'biweekly' && <Check className="h-4 w-4" />}
                    </div>
                    <div 
                      className="p-2 hover:bg-accent flex items-center justify-between cursor-pointer"
                      onClick={() => selectSubscription('monthly')}
                    >
                      <div>
                        <div>Monthly delivery</div>
                        <div className="text-xs text-muted-foreground">Save 10%</div>
                      </div>
                      {subscription === 'monthly' && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleAddToCart} 
            size="lg" 
            className="w-full"
            disabled={isComingSoon}
            variant={isComingSoon ? "outline" : "default"}
          >
            {isComingSoon ? (
              <>
                <Clock className="mr-2 h-5 w-5" />
                Coming Soon
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
          
          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium">Fast Shipping</h4>
                <p className="text-sm text-muted-foreground">Free shipping on orders over $75</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <ShieldCheck className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium">Premium Quality</h4>
                <p className="text-sm text-muted-foreground">Superior materials and construction</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CreditCard className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium">Secure Payment</h4>
                <p className="text-sm text-muted-foreground">Multiple cryptocurrency options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full border-b justify-start rounded-none">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-6">
            <div className="prose max-w-none">
              <h3 className="text-xl font-medium mb-4">Product Details</h3>
              <p>The Cleveland Cartridge Co. Premium Replacement Pod offers superior quality and performance for your vaping needs. Each pod is carefully designed and manufactured with premium materials to ensure consistent vapor production and flavor delivery.</p>
              <p>Our pods feature a leak-resistant design and extended coil life, making them the perfect choice for both casual and experienced vapers.</p>
              <h4 className="text-lg font-medium mt-4 mb-2">Key Features:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Leak-resistant design</li>
                <li>Consistent vapor production</li>
                <li>Enhanced flavor delivery</li>
                <li>Extended coil life</li>
                <li>Easy installation and replacement</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specs" className="pt-6">
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
                <h3 className="text-xl font-medium mb-4">Contents</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                    <span>1 x Premium Replacement Pod</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                    <span>1 x User Manual</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">•</div>
                    <span>1 x Quality Certificate</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
              
              {/* Review Summary */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <Star className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-semibold">4.3 out of 5</span>
                <span className="text-muted-foreground">(12 reviews)</span>
              </div>
              
              {/* Individual Reviews */}
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">John D.</span>
                    <span className="text-muted-foreground text-sm">2 weeks ago</span>
                  </div>
                  <div className="flex mb-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </div>
                  <p>Excellent quality pod. Delivers consistent vapor and flavor. Will definitely buy again!</p>
                </div>
                
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Sarah M.</span>
                    <span className="text-muted-foreground text-sm">1 month ago</span>
                  </div>
                  <div className="flex mb-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p>Great replacement pod. Much better than the original ones that came with my device. The only reason for 4 stars instead of 5 is that I wish they lasted a bit longer.</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Michael T.</span>
                    <span className="text-muted-foreground text-sm">2 months ago</span>
                  </div>
                  <div className="flex mb-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <Star className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p>Decent pod, but I had some leaking issues after about a week of use. Customer service was very responsive though and sent me a replacement.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
