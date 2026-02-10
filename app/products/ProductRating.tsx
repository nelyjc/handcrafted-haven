
export function StarRating({ rating, count }: { rating: number; count: number }) {
  const rounded = Math.round(rating * 10) / 10;
  const full = Math.floor(rounded);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < full ? "text-yellow-500" : "text-neutral-300"}>
            ★
          </span>
        ))}
      </span>
      <span>{rounded.toFixed(1)}</span>
      <span className="text-neutral-500">({count})</span>
    </div>
  );
}
