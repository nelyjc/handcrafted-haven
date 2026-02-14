import { StarRating } from "@/app/ui/StarRating";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  if (!reviews?.length) {
    return <div className="mt-6 text-sm text-neutral-500">No reviews yet.</div>;
  }

  return (
    <div className="mt-6 space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-md border p-4 dark:border-neutral-800">
          <div className="flex items-center justify-between gap-3">
            <div className="font-medium">{r.author_name}</div>
            <StarRating rating={Number(r.rating)} />
          </div>

          <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{r.comment}</div>

          {r.created_at && (
            <div className="mt-2 text-xs text-neutral-400">
              {new Date(r.created_at).toLocaleDateString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
