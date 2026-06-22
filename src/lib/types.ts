export interface Product {
  id: string;
  name: string;
  category: "door" | "window";
  pricePerSqft: number;
  description: string;
  image: string;
  material: string;
  features: string[];
  inStock: boolean;
}
