
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// Sample product data
const allProducts: Product[] = [
  {
    id: 1,
    name: "Delta 8 Gummies - Berry Blast",
    category: "Edibles",
    description: "Delicious berry-flavored Delta 8 THC gummies for a relaxing experience.",
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
    description: "Premium Delta 8 THC vape cartridge with OG Kush terpenes.",
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
    description: "Fast-acting Delta 8 THC tincture with refreshing mint flavor.",
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
    description: "Premium Delta 8 infused hemp flower with Blue Dream terpenes.",
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
    description: "Juicy watermelon-flavored Delta 8 THC gummies.",
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
    description: "Premium Delta 8 THC vape cartridge with Sour Diesel terpenes.",
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
    description: "Pure Delta 8 THC tincture for maximum customization.",
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
    description: "Premium Delta 8 infused hemp flower with Northern Lights terpenes.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1600082294245-8bb80e80f0e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    thc: "19%",
    cbd: "0.5%",
    strain: "Indica",
    effects: ["Relaxation", "Sleep"]
  }
];

const categories = ["All", "Edibles", "Vapes", "Tinctures", "Flower"];
const strains = ["All", "Indica", "Sativa", "Hybrid"];
const effects = ["Relaxation", "Sleep", "Energy", "Focus", "Euphoria", "Pain Relief", "Creativity"];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStrain, setSelectedStrain] = useState("All");
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  // Filter products based on search, category, strain, and effects
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    const matchesStrain = selectedStrain === "All" || product.strain === selectedStrain;
    
    const matchesEffects = selectedEffects.length === 0 || 
                          (product.effects && 
                          selectedEffects.every(effect => product.effects?.includes(effect)));
    
    return matchesSearch && matchesCategory && matchesStrain && matchesEffects;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const toggleEffect = (effect: string) => {
    setSelectedEffects(prev => 
      prev.includes(effect) 
        ? prev.filter(e => e !== effect) 
        : [...prev, effect]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedStrain("All");
    setSelectedEffects([]);
    setSortBy("featured");
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Delta 8 Products</h1>
        <p className="text-muted-foreground max-w-3xl">
          Browse our selection of premium Delta 8 THC products. All products are lab-tested 
          and compliant with federal and Ohio state regulations.
        </p>
      </div>

      {/* Filters and Search for Desktop */}
      <div className="hidden md:block mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStrain} onValueChange={setSelectedStrain}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Strain" />
              </SelectTrigger>
              <SelectContent>
                {strains.map((strain) => (
                  <SelectItem key={strain} value={strain}>
                    {strain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-shrink-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {effects.map((effect) => (
            <label
              key={effect}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                selectedEffects.includes(effect)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              } cursor-pointer transition-colors`}
            >
              <Checkbox
                checked={selectedEffects.includes(effect)}
                onCheckedChange={() => toggleEffect(effect)}
                className="mr-2 h-3.5 w-3.5 border-none"
              />
              {effect}
            </label>
          ))}
          {(searchTerm !== "" || selectedCategory !== "All" || selectedStrain !== "All" || selectedEffects.length > 0) && (
            <Button
              variant="link"
              onClick={resetFilters}
              className="text-sm text-muted-foreground"
            >
              Reset filters
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Category</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Strain</h3>
                  <Select value={selectedStrain} onValueChange={setSelectedStrain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strain" />
                    </SelectTrigger>
                    <SelectContent>
                      {strains.map((strain) => (
                        <SelectItem key={strain} value={strain}>
                          {strain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Effects</h3>
                  <div className="space-y-2">
                    {effects.map((effect) => (
                      <div key={effect} className="flex items-center space-x-2">
                        <Checkbox
                          id={`effect-${effect}`}
                          checked={selectedEffects.includes(effect)}
                          onCheckedChange={() => toggleEffect(effect)}
                        />
                        <label
                          htmlFor={`effect-${effect}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {effect}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline" 
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Product Results */}
      <div className="pb-16">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={resetFilters}>Reset All Filters</Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
