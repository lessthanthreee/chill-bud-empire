
import { Product } from "@/types/database";

export const products: Product[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000", // Updated to UUID format
    name: "Premium Vape Replacement Pod",
    description: "Premium replacement vape pod, compatible with most standard vape devices.",
    price: 34.99,
    image: "/product.png",
    category: "Vapes",
    featured: true,
    inventory: 100,
    thc: "0%",
    cbd: "0%"
  }
];

export default products;
