import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse R2R's range of precision-engineered doors & windows — teak, steel, uPVC, aluminium, WPC and glass — all built to your exact spec.",
  alternates: { canonical: "/products" },
};

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return children;
}
