"use client";

import { useState } from "react";

export default function ProductDevPage() {
  const [result, setResult] = useState<any>(null);
  const sellerId = "e7c2f5b9-8a3a-4e4f-bf8d-6e5c2a9d3f03";

  async function createProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sellerId,
        name: "Test Product – Clay Spoon Rest",
        price: 1299,
        category: "ceramic",
        image: "/products/test-clay-spoon-rest.png",
        shortDescription: "A small hand-thrown spoon rest for the stovetop.",
        longDescription:
          "Wheel-thrown in small batches and finished with a soft glaze. Perfect for keeping counters clean while cooking.",
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  async function updateProduct() {
    if (!result?.product?.id) return;

    const res = await fetch(`/api/products/${result.product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: 1499,
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  async function deleteProduct() {
    if (!result?.product?.id) return;

    const res = await fetch(`/api/products/${result.product.id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Products API Dev Test</h1>

      <button onClick={createProduct}>Create Product</button>
      <button onClick={updateProduct} style={{ marginLeft: 8 }}>
        Update Product
      </button>
      <button onClick={deleteProduct} style={{ marginLeft: 8 }}>
        Delete Product
      </button>

      <pre style={{ marginTop: 24 }}>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
