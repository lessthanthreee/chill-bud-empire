
import { Product } from "@/types/database";

export const products: Product[] = [
  {
    id: "1",
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
