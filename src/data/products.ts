
import { Product } from "@/types/database";

export const products: Product[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Premium Delta-8 Vape Pod",
    description: "Our flagship Delta-8 THC vape pod delivers a smooth, consistent experience with premium hardware. Each pod contains 1g of lab-tested Delta-8 distillate for the perfect balance of relaxation and clarity.",
    price: 34.99,
    image: "/product.png", 
    category: "Vapes",
    featured: true,
    inventory: 100,
    thc: "Delta-8 90%",
    cbd: "0%"
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    name: "Limited Edition Ceramic Cartridge",
    description: "Coming soon! Our limited edition ceramic cartridge featuring premium design and superior airflow. Pre-order now for first batch access.",
    price: 49.99,
    image: "/product.png",
    category: "Cartridges",
    featured: false,
    inventory: 0,
    thc: "Delta-8 92%",
    cbd: "0%",
    comingSoon: true
  }
];

export default products;
