export function StarRating({
  rating,
  count,
}: {
  rating: number;
  count?: number;
}) {
  const rounded = Math.round(rating * 10) / 10;  // 1 decimal
  const fullStars = Math.floor(rounded);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="flex" aria-label={`Rating ${rounded} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < fullStars ? "text-yellow-500" : "text-zinc-300"}
          >
            ★
          </span>
        ))}
      </span>

      {/*  Numeric rating */}
      <span className="text-zinc-700 dark:text-zinc-200">
        {rounded.toFixed(1)}
      </span>

      {/*  Review count */}
      {count !== undefined && (
        <span className="text-zinc-500">({count})</span>
      )}
    </div>
  );
}
