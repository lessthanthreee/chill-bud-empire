
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart, Product } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
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
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
