"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({
  product,
}: {
  product: { id: string; name: string; price: number; image?: string };
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product, 1);
    setAdded(true);

    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      onClick={handleClick}
      disabled={added}
      className={`
        w-full rounded-md px-4 py-2 text-sm font-medium transition-all duration-200
        ${
          added
            ? "scale-95 bg-green-600 text-white"
            : "bg-neutral-900 text-white hover:scale-105"
        }
        dark:bg-white dark:text-neutral-900
      `}
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
