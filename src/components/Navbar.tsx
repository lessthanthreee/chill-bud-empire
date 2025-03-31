
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { openCart, cartItems } = useCart();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-2xl font-bold text-foreground flex items-center">
          <span className="text-chill-500 mr-1">Chill</span> Bud Empire
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/products" className="text-muted-foreground hover:text-foreground">
            Products
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          
          {/* Theme Toggle Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={openCart}
            className="text-muted-foreground hover:text-foreground relative"
          >
            <ShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-chill-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
