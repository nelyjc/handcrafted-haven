"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReviewForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, authorName, rating, comment }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Failed to submit review");
        return;
      }

      setAuthorName("");
      setRating(5);
      setComment("");
      router.refresh();
    } catch {
      setError("Failed to submit review");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 rounded-md border p-4 dark:border-neutral-800">
      <div className="text-sm font-semibold">Leave a review</div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">Your name</label>
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="rounded-md border p-2 text-sm dark:border-neutral-800"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rounded-md border p-2 text-sm dark:border-neutral-800"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <label className="text-xs text-neutral-500">Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[90px] rounded-md border p-2 text-sm dark:border-neutral-800"
          required
        />
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      <button
        type="submit"
        disabled={saving}
        className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-60 dark:bg-white dark:text-neutral-900"
      >
        {saving ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}
