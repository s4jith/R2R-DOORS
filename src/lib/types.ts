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

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  product: string;
  productId: string;
  width: number;
  height: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "delivered";
  createdAt: string;
}
