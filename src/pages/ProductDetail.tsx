
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
import { Product, useCart } from "@/context/CartContext";
import { ChevronLeft, Minus, Plus, ShieldCheck } from "lucide-react";
import ProductCard from "@/components/ProductCard";

// Sample products
const products: Product[] = [
  {
    id: 1,
    name: "Delta 8 Gummies - Berry Blast",
    category: "Edibles",
    description: "Delicious berry-flavored Delta 8 THC gummies for a relaxing experience. Each gummy contains 25mg of premium Delta 8 THC and is made with high-quality, natural ingredients. Perfect for unwinding after a long day or enhancing your weekend relaxation.",
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
    description: "Premium Delta 8 THC vape cartridge with OG Kush terpenes. This 1mL cartridge features 900mg of Delta 8 THC and 50mg of CBD for a balanced effect. OG Kush terpenes provide a classic earthy, piney flavor profile with hints of citrus. Compatible with standard 510-thread batteries.",
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
    description: "Fast-acting Delta 8 THC tincture with refreshing mint flavor. This 30mL bottle contains 1000mg of Delta 8 THC and 200mg of CBD in a premium MCT oil base. The sublingual application allows for quick absorption and precise dosing. Perfect for those who prefer a discreet consumption method.",
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
    description: "Premium Delta 8 infused hemp flower with Blue Dream terpenes. Our specially cultivated hemp flower is carefully infused with Delta 8 THC and Blue Dream terpenes for a smooth, flavorful experience. Each 3.5g jar contains approximately 18% Delta 8 THC and features the classic sweet berry aroma of Blue Dream.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1603909223429-69bb7d179de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
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
    image: "https://images.unsplash.com/photo-1638506211509-b62e84bc97f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
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
    image: "https://images.unsplash.com/photo-1603822332146-bee875f31cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
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
    image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
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
    image: "https://images.unsplash.com/photo-1600082294245-8bb80e80f0e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
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
  const { addToCart } = useCart();

  useEffect(() => {
    // Find the product by ID
    const productId = parseInt(id || "0");
    const foundProduct = products.find(p => p.id === productId) || null;
    setProduct(foundProduct);

    // Find related products (same category, excluding current product)
    if (foundProduct) {
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }

    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
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
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden border border-border">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover aspect-square"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
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

          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {product.effects && product.effects.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Effects</h3>
              <div className="flex flex-wrap gap-2">
                {product.effects.map((effect) => (
                  <Badge key={effect} variant="secondary">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="bg-secondary/50 rounded-lg p-4 flex items-center space-x-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <p className="font-medium">Lab Tested</p>
              <p className="text-muted-foreground">All products are tested for purity and potency</p>
            </div>
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

      {/* Related Products */}
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
