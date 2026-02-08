"use client";

import { useState } from "react";

export default function SellerDevPage() {
  const [result, setResult] = useState<any>(null);

  async function createSeller() {
    const res = await fetch("/api/sellers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "Seller",
        username: `test_seller_${Date.now()}`,
        email: `test_seller_${Date.now()}@example.com`,
        password: "TestPassword123!",
        story:
          "I make small-batch goods with simple tools and a lot of patience.",
        image: "/sellers/test-seller.png",
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  async function updateSeller() {
    const sellerId = result?.seller?.id;
    if (!sellerId) return;

    const res = await fetch(`/api/sellers/${sellerId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        story: `Updated story at ${new Date().toISOString()}`,
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  async function deleteSeller() {
    const sellerId = result?.seller?.id;
    if (!sellerId) return;

    const res = await fetch(`/api/sellers/${sellerId}`, {
      method: "DELETE",
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Sellers API Dev Test</h1>

      <button onClick={createSeller}>Create Seller</button>
      <button onClick={updateSeller} style={{ marginLeft: 8 }}>
        Update Seller
      </button>
      <button onClick={deleteSeller} style={{ marginLeft: 8 }}>
        Delete Seller
      </button>

      <pre style={{ marginTop: 24 }}>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
