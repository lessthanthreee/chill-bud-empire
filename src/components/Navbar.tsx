
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { cartCount, toggleCart } = useCart();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary rounded-full h-10 w-10 flex items-center justify-center text-primary-foreground font-bold text-lg">CCC</div>
          <span className="text-xl font-bold text-foreground hidden sm:inline">Cleveland Cartridge Co.</span>
          <span className="text-xl font-bold text-foreground sm:hidden">CCC</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/products" className="text-muted-foreground hover:text-foreground">
            Products
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          
          {/* Cart Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCart}
            className="relative text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
          
          {/* Theme Toggle Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
