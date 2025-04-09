import { Product } from "@/types/database";

export const products: Product[] = [
  {
    id: "1",
    name: "CBD Oil Tincture",
    description: "Full spectrum CBD oil tincture, 1000mg, natural flavor.",
    price: 59.99,
    image: "/placeholder.svg",
    category: "Oils",
    featured: true,
    inventory: 100,
    thc: "<0.3%",
    cbd: "1000mg"
  },
  {
    id: "2",
    name: "Delta 8 Gummies",
    description: "Assorted flavors, 25mg Delta 8 per gummy, 20 count.",
    price: 29.99,
    image: "/placeholder.svg",
    category: "Edibles",
    featured: false,
    inventory: 150,
    thc: "25mg",
    cbd: "0mg"
  },
  {
    id: "3",
    name: "Hemp Flower - Sour Diesel",
    description: "High-quality hemp flower, Sour Diesel strain, 1/4 ounce.",
    price: 39.99,
    image: "/placeholder.svg",
    category: "Flower",
    featured: true,
    inventory: 80,
    thc: "<0.3%",
    cbd: "15%"
  },
  {
    id: "4",
    name: "CBD Vape Cartridge",
    description: "Broad spectrum CBD vape cartridge, various flavors, 500mg.",
    price: 34.99,
    image: "/placeholder.svg",
    category: "Vapes",
    featured: false,
    inventory: 120,
    thc: "<0.3%",
    cbd: "500mg"
  },
  {
    id: "5",
    name: "CBD Capsules",
    description: "Full spectrum CBD capsules, 30 count, 25mg per capsule.",
    price: 44.99,
    image: "/placeholder.svg",
    category: "Capsules",
    featured: false,
    inventory: 90,
    thc: "<0.3%",
    cbd: "25mg"
  },
  {
    id: "6",
    name: "Delta 9 Chocolate Bar",
    description: "Delicious milk chocolate bar infused with Delta 9 THC, 100mg total.",
    price: 19.99,
    image: "/placeholder.svg",
    category: "Edibles",
    featured: true,
    inventory: 60,
    thc: "10mg per piece",
    cbd: "0mg"
  },
  {
    id: "7",
    name: "Hemp Pre-Rolls",
    description: "Convenient pre-rolled hemp joints, various strains, pack of 5.",
    price: 24.99,
    image: "/placeholder.svg",
    category: "Flower",
    featured: false,
    inventory: 110,
    thc: "<0.3%",
    cbd: "Varies by strain"
  },
  {
    id: "8",
    name: "THC-A Diamonds",
    description: "99% Pure THCA Diamonds",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Concentrates",
    featured: true,
    inventory: 30,
    thc: "99%",
    cbd: "0%"
  },
  {
    id: "9",
    name: "Premium Vape Replacement Pod",
    description: "Premium replacement vape pods, compatible with most standard vape devices.",
    price: 14.99,
    image: "/placeholder.svg",
    category: "Vapes",
    featured: true,
    inventory: 200,
    thc: "0%",
    cbd: "0%"
  },
  {
    id: "10",
    name: "Disposable Vape Pen",
    description: "Disposable vape pen, ready to use, rechargeable.",
    price: 24.99,
    image: "/placeholder.svg",
    category: "Vapes",
    featured: true,
    inventory: 200,
    thc: "0%",
    cbd: "0%"
  },
];

export default products;
