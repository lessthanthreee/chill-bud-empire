
import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, image, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(id, quantity - 1);
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <div className="flex items-center py-4 border-b border-border">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3 className="line-clamp-1">{name}</h3>
          <p className="ml-4">${(price * quantity).toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-2 min-w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
