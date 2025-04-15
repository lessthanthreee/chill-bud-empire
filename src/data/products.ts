
import { Product } from "@/types/database";

export const products: Product[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Premium Delta-8 Vape Pod",
    description: "Our flagship Delta-8 THC vape pod delivers a smooth, consistent experience with premium hardware. Each pod contains 1g of lab-tested Delta-8 distillate.",
    price: 34.99,
    image: "/product.png", // Using existing product image
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
    image: "/product.png", // Using existing product image with note to replace
    category: "Cartridges",
    featured: false,
    inventory: 0,
    thc: "Delta-8 92%",
    cbd: "0%",
    comingSoon: true
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    name: "Rechargeable Premium Battery",
    description: "High-capacity rechargeable battery with extended life and premium finish. Compatible with all our cartridges and pods.",
    price: 59.99,
    image: "/product.png", // Using existing product image with note to replace
    category: "Accessories",
    featured: false,
    inventory: 0,
    thc: "N/A",
    cbd: "N/A",
    comingSoon: true
  },
  {
    id: "423e4567-e89b-12d3-a456-426614174003",
    name: "Delta-8 Disposable Vape",
    description: "Ready-to-use Delta-8 THC disposable vape pen with approximately 300 puffs. Perfect for beginners or on-the-go use.",
    price: 29.99,
    image: "/product.png", // Using existing product image
    category: "Disposables",
    featured: false,
    inventory: 75,
    thc: "Delta-8 88%",
    cbd: "0%"
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174004",
    name: "Delta-8 Starter Kit",
    description: "Complete starter kit including our premium rechargeable battery and one Delta-8 THC pod. Everything you need to begin your Delta-8 journey.",
    price: 79.99,
    image: "/product.png", // Using existing product image
    category: "Kits",
    featured: true,
    inventory: 50,
    thc: "Delta-8 90%",
    cbd: "0%"
  }
];

export default products;
