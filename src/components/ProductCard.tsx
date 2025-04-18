
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Clock } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types/database";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't add coming soon products to cart
    if (product.comingSoon) {
      toast({
        title: "Product not available",
        description: "This product is coming soon and not yet available for purchase.",
        variant: "destructive"
      });
      return;
    }
    
    addToCart(product, 1, "none");
    
    toast({
      title: "Added to cart",
      description: `${product.name}`,
    });
  };

  const isComingSoon = product.comingSoon || product.inventory === 0;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform duration-300 hover:scale-105 ${isComingSoon ? 'opacity-70' : ''}`}
          />
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
          )}
          {isComingSoon && (
            <Badge className="absolute top-2 left-2 bg-amber-500">Coming Soon</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            <p className="font-semibold">${product.price.toFixed(2)}</p>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <Badge variant="outline" className="bg-secondary text-xs">
              THC: {product.thc}
            </Badge>
            <Badge variant="outline" className="bg-secondary text-xs">
              CBD: {product.cbd}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isComingSoon ? "outline" : "default"}
                    size="sm"
                    className="flex-1"
                    onClick={(e) => handleAddToCart(e)}
                    disabled={isComingSoon}
                  >
                    {isComingSoon ? (
                      <>
                        <Clock className="mr-2 h-4 w-4" />
                        Coming Soon
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isComingSoon ? "Coming soon" : "Add to cart"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
