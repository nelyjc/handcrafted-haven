"use client";

import { useState } from "react";

export default function ReviewsDevPage() {
  const [result, setResult] = useState<any>(null);
  const [list, setList] = useState<any>(null);

  const productId = "3c2e5a4d-9f1a-4e0b-8c91-1b5d9a2f1001";

  async function listReviews() {
    const res = await fetch(`/api/reviews?productId=${productId}`);
    const data = await res.json();
    setList(data);
  }

  async function createReview() {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        authorName: "Visitor Test",
        rating: 5,
        comment: `Love it! Created at ${new Date().toISOString()}`,
      }),
    });

    const data = await res.json();
    setResult(data);
    await listReviews();
  }

  async function updateReview() {
    const reviewId = result?.review?.id;
    if (!reviewId) return;

    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating: 4,
        comment: `Updated at ${new Date().toISOString()}`,
      }),
    });

    const data = await res.json();
    setResult(data);
    await listReviews();
  }

  async function deleteReview() {
    const reviewId = result?.review?.id;
    if (!reviewId) return;

    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });

    const data = await res.json();
    setResult(data);
    await listReviews();
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Reviews API Dev Test</h1>

      <p>
        <strong>productId:</strong> {productId}
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={listReviews}>List Reviews</button>
        <button onClick={createReview}>Create Review</button>
        <button onClick={updateReview}>Update Review</button>
        <button onClick={deleteReview}>Delete Review</button>
      </div>

      <h3 style={{ marginTop: 24 }}>Last action result</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>

      <h3 style={{ marginTop: 24 }}>Reviews for product</h3>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
}
