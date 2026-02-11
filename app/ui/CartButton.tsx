"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative text-lg">
      🛒
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
