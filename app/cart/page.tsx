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

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_280px]">
  {/* Items */}
  <div className="space-y-4">
    {items.map((i) => (
      <div
        key={i.id}
        className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60 md:flex-row md:items-center md:justify-between"
      >
        {/* Left: image + info */}
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10">
            <img
              src={i.image || "/products/product-placeholder.png"}
              alt={i.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{i.name}</div>
            <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              ${i.price.toFixed(2)} each
            </div>

            <button
              onClick={() => removeItem(i.id)}
              className="mt-2 text-xs underline text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              Remove
            </button>
          </div>
        </div>

        {/* Right: qty + subtotal */}
        <div className="flex items-center justify-between gap-4 md:justify-end">
          <div className="flex items-center overflow-hidden rounded-lg border dark:border-neutral-800">
            <button
              type="button"
              onClick={() => updateQty(i.id, i.quantity - 1)}
              className="px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <input
              type="number"
              min={1}
              value={i.quantity}
              onChange={(e) => updateQty(i.id, Number(e.target.value))}
              className="w-14 border-x bg-transparent py-2 text-center text-sm outline-none dark:border-neutral-800"
              aria-label="Quantity"
            />

            <button
              type="button"
              onClick={() => updateQty(i.id, i.quantity + 1)}
              className="px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Subtotal
            </div>
            <div className="text-sm font-semibold">
              ${(i.price * i.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Summary */}
  <div className="h-fit rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
    <div className="text-sm font-semibold">Order summary</div>

    <div className="mt-3 space-y-2 text-sm">
      <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
        <span>Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex items-center justify-between border-t pt-3 dark:border-neutral-800">
        <span className="font-medium">Total</span>
        <span className="text-base font-semibold">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>

    <button
      className="mt-4 w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-neutral-900"
      type="button"
    >
      Checkout
    </button>

    <Link
      href="/products"
      className="mt-3 block w-full rounded-lg border border-neutral-200 px-4 py-2 text-center text-sm hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60"
    >
      Continue shopping
    </Link>
  </div>
</div>
    </div>
  );
}
