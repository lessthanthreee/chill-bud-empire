
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart, Product } from "@/context/CartContext";
import { ShoppingCart, CalendarClock, BadgePercent } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, subscription: "none" | "biweekly" | "monthly" = "none") => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, subscription);
    
    const subscriptionText = subscription !== "none" 
      ? `with ${subscription} subscription (10% off)` 
      : "";
    
    toast({
      title: "Added to cart",
      description: `${product.name} ${subscriptionText}`,
    });
  };

  const handleAddSubscription = (e: React.MouseEvent, frequency: "biweekly" | "monthly") => {
    handleAddToCart(e, frequency);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
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
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={(e) => handleAddToCart(e)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add
            </Button>
            
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="px-2">
                        <CalendarClock className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Subscribe & Save</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={(e) => handleAddSubscription(e, "biweekly")}
                  className="flex items-center cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <CalendarClock className="mr-2 h-4 w-4" />
                      <span>Biweekly</span>
                    </div>
                    <Badge variant="outline" className="ml-2 bg-accent text-accent-foreground text-xs">
                      <BadgePercent className="h-3 w-3 mr-1" /> 10%
                    </Badge>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => handleAddSubscription(e, "monthly")}
                  className="flex items-center cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <CalendarClock className="mr-2 h-4 w-4" />
                      <span>Monthly</span>
                    </div>
                    <Badge variant="outline" className="ml-2 bg-accent text-accent-foreground text-xs">
                      <BadgePercent className="h-3 w-3 mr-1" /> 10%
                    </Badge>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
