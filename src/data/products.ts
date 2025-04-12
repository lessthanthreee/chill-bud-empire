
import { Product } from "@/types/database";

export const products: Product[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Premium Vape Replacement Pod",
    description: "Premium replacement vape pod, compatible with most standard vape devices.",
    price: 34.99,
    image: "/product.png",
    category: "Vapes",
    featured: true,
    inventory: 100,
    thc: "0%",
    cbd: "0%"
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    name: "Coming Soon - Limited Edition Cartridge",
    description: "Limited edition cartridge with premium design. Currently in production.",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Cartridges",
    featured: false,
    inventory: 0,
    thc: "0%",
    cbd: "0%",
    comingSoon: true
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    name: "Coming Soon - Premium Battery",
    description: "High-capacity battery with extended life and premium finish. Currently in production.",
    price: 59.99,
    image: "/placeholder.svg",
    category: "Accessories",
    featured: false,
    inventory: 0,
    thc: "0%",
    cbd: "0%",
    comingSoon: true
  }
];

export default products;
