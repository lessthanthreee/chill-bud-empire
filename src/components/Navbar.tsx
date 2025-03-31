import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-2xl font-bold text-foreground">
          Chill Bud Empire
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/products" className="text-muted-foreground hover:text-foreground">
            Products
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">
            About
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
