
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/database";
import { ChevronLeft, Minus, Plus, ShieldCheck, CalendarClock, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample products
const products: Product[] = [
  {
    id: 1,
    name: "Delta 8 Gummies - Berry Blast",
    category: "Edibles",
    description: "Delicious berry-flavored Delta 8 THC gummies for a relaxing experience. Each gummy contains 25mg of premium Delta 8 THC and is made with high-quality, natural ingredients. Perfect for unwinding after a long day or enhancing your weekend relaxation.",
    price: 29.99,
    image: "/product.png",
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
    description: "Premium Delta 8 THC vape cartridge with OG Kush terpenes. This 1mL cartridge features 900mg of Delta 8 THC and 50mg of CBD for a balanced effect. OG Kush terpenes provide a classic earthy, piney flavor profile with hints of citrus. Compatible with standard 510-thread batteries.",
    price: 34.99,
    image: "/product.png",
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
    description: "Fast-acting Delta 8 THC tincture with refreshing mint flavor. This 30mL bottle contains 1000mg of Delta 8 THC and 200mg of CBD in a premium MCT oil base. The sublingual application allows for quick absorption and precise dosing. Perfect for those who prefer a discreet consumption method.",
    price: 49.99,
    image: "/product.png",
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
    description: "Premium Delta 8 infused hemp flower with Blue Dream terpenes. Our specially cultivated hemp flower is carefully infused with Delta 8 THC and Blue Dream terpenes for a smooth, flavorful experience. Each 3.5g jar contains approximately 18% Delta 8 THC and features the classic sweet berry aroma of Blue Dream.",
    price: 39.99,
    image: "/product.png",
    thc: "18%",
    cbd: "0.3%",
    strain: "Hybrid",
    effects: ["Creativity", "Relaxation"],
    featured: true
  },
  {
    id: 5,
    name: "Delta 8 Gummies - Watermelon",
    category: "Edibles",
    description: "Juicy watermelon-flavored Delta 8 THC gummies. Each gummy contains 25mg of premium Delta 8 THC with a delicious watermelon flavor. Made with high-quality ingredients and perfect for nighttime relaxation. 20 gummies per container.",
    price: 29.99,
    image: "/product.png",
    thc: "25mg",
    cbd: "0mg",
    strain: "Indica",
    effects: ["Relaxation", "Sleep"]
  },
  {
    id: 6,
    name: "Delta 8 Vape Cartridge - Sour Diesel",
    category: "Vapes",
    description: "Premium Delta 8 THC vape cartridge with Sour Diesel terpenes. This 1mL cartridge contains 900mg of Delta 8 THC and 50mg of CBD with the energizing Sour Diesel terpene profile. Known for its distinctive fuel-like aroma with hints of citrus, this cartridge is perfect for daytime use.",
    price: 34.99,
    image: "/product.png",
    thc: "900mg",
    cbd: "50mg",
    strain: "Sativa",
    effects: ["Energy", "Euphoria"]
  },
  {
    id: 7,
    name: "Delta 8 Tincture - Unflavored",
    category: "Tinctures",
    description: "Pure Delta 8 THC tincture for maximum customization. This unflavored 30mL tincture contains 1000mg of pure Delta 8 THC in an MCT oil base. The neutral flavor profile makes it perfect for mixing with beverages or foods, or for those who prefer a clean, natural taste.",
    price: 44.99,
    image: "/product.png",
    thc: "1000mg",
    cbd: "0mg",
    strain: "Hybrid",
    effects: ["Relaxation", "Euphoria"]
  },
  {
    id: 8,
    name: "Delta 8 Flower - Northern Lights",
    category: "Flower",
    description: "Premium Delta 8 infused hemp flower with Northern Lights terpenes. Our specially cultivated hemp flower is carefully infused with Delta 8 THC and Northern Lights terpenes for a relaxing, sleep-inducing experience. Each 3.5g jar contains approximately 19% Delta 8 THC and features the sweet, spicy aroma characteristic of Northern Lights.",
    price: 39.99,
    image: "/product.png",
    thc: "19%",
    cbd: "0.5%",
    strain: "Indica",
    effects: ["Relaxation", "Sleep"]
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [subscription, setSubscription] = useState<"none" | "biweekly" | "monthly">("none");
  const { addToCart } = useCart();

  useEffect(() => {
    const productId = parseInt(id || "0");
    const foundProduct = products.find(p => p.id === productId) || null;
    setProduct(foundProduct);

    if (foundProduct) {
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }

    setSubscription("none");
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, subscription);
      
      const subscriptionText = subscription !== "none" 
        ? `with ${subscription} subscription (10% off)` 
        : "";
      
      toast({
        title: "Product added to cart",
        description: `${product.name} × ${quantity} ${subscriptionText}`,
      });
    }
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(parseInt(value));
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const calculatePrice = () => {
    if (!product) return 0;
    let price = product.price;
    
    if (subscription !== "none") {
      price = price * 0.9;
    }
    
    return price.toFixed(2);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Return to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-6">
        <Button
          variant="ghost"
          asChild
          className="flex items-center text-muted-foreground"
        >
          <Link to="/products">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="rounded-lg overflow-hidden border border-border">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover aspect-square"
          />
        </div>

        <div className="space-y-6">
          <Badge className="mb-2">{product.category}</Badge>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-2xl font-semibold">
              ${calculatePrice()}
            </p>
            {subscription !== "none" && (
              <Badge variant="outline" className="bg-accent text-accent-foreground">
                10% off
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-secondary">
              THC: {product.thc}
            </Badge>
            <Badge variant="outline" className="bg-secondary">
              CBD: {product.cbd}
            </Badge>
            {product.strain && (
              <Badge variant="outline" className="bg-secondary">
                {product.strain}
              </Badge>
            )}
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
              <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="effects" className="pt-4">
              {product.effects && product.effects.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.effects.map((effect) => (
                    <Badge key={effect} variant="secondary">
                      {effect}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No effects listed for this product.</p>
              )}
            </TabsContent>
            <TabsContent value="lab-results" className="pt-4">
              <p className="text-muted-foreground">
                View the <Link to="/lab-results" className="text-primary underline">lab results</Link> for this product to verify purity and potency.
              </p>
            </TabsContent>
          </Tabs>

          <div className="bg-secondary/50 rounded-lg p-4 flex items-center space-x-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <p className="font-medium">Lab Tested</p>
              <p className="text-muted-foreground">All products are tested for purity and potency</p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <CalendarClock className="h-5 w-5 mr-2" />
              Purchase Options
            </h3>
            <RadioGroup 
              defaultValue="none" 
              value={subscription}
              onValueChange={(val) => setSubscription(val as "none" | "biweekly" | "monthly")}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="one-time" />
                <Label htmlFor="one-time" className="flex-1">One-time purchase</Label>
                <span className="text-muted-foreground">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biweekly" id="biweekly" />
                <Label htmlFor="biweekly" className="flex-1 flex items-center">
                  Biweekly subscription
                  <Badge variant="outline" className="ml-2 bg-accent text-accent-foreground">
                    <Sparkles className="h-3 w-3 mr-1" /> 10% off
                  </Badge>
                </Label>
                <span className="text-muted-foreground">${(product.price * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="flex-1 flex items-center">
                  Monthly subscription
                  <Badge variant="outline" className="ml-2 bg-accent text-accent-foreground">
                    <Sparkles className="h-3 w-3 mr-1" /> 10% off
                  </Badge>
                </Label>
                <span className="text-muted-foreground">${(product.price * 0.9).toFixed(2)}</span>
              </div>
            </RadioGroup>
            {subscription !== "none" && (
              <p className="text-sm text-muted-foreground mt-3">
                Subscribe and save 10%. Easily manage deliveries in your account.
              </p>
            )}
          </div>

          <div className="pt-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center rounded-md border border-input">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Select value={quantity.toString()} onValueChange={handleQuantityChange}>
                  <SelectTrigger className="w-12 h-9 rounded-none border-0 focus:ring-0 text-center">
                    <SelectValue placeholder={quantity.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Order now for pickup in Columbus, Ohio or delivery within Ohio.</p>
              <p>Payment will be arranged via cryptocurrency after order placement.</p>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 mb-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
