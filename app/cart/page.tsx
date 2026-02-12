"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQty, clear } = useCart();

  return (
    <div className="mx-auto max-w-4xl p-6 text-neutral-900 dark:text-neutral-100">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <button onClick={clear} className="text-sm underline">
          Clear cart
        </button>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-neutral-500">
          Your cart is empty. <Link href="/products" className="underline">Browse products</Link>
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-md border p-4 dark:border-neutral-800">
              <div>
                <div className="font-medium">{i.name}</div>
                <div className="text-sm text-neutral-500">
                  ${i.price.toFixed(2)} each
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={i.quantity}
                  onChange={(e) => updateQty(i.id, Number(e.target.value))}
                  className="w-16 rounded-md border p-1 text-sm dark:border-neutral-800"
                />
                <button onClick={() => removeItem(i.id)} className="text-sm underline">
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 flex items-center justify-between border-t pt-4 dark:border-neutral-800">
            <div className="text-sm text-neutral-500">{totalItems} items</div>
            <div className="text-lg font-semibold">${totalPrice.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
