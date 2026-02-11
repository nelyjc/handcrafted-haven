"use client";

import { CartProvider } from "@/app/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
