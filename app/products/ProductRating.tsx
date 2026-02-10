export function StarRating({ rating, count }: { rating: number; count?: number }) {
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const rounded = Math.round(safeRating * 10) / 10;
  const fullStars = Math.floor(rounded);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < fullStars ? "text-yellow-500" : "text-neutral-300"}>
            ★
          </span>
        ))}
      </span>
      <span>{rounded.toFixed(1)}</span>
      {count !== undefined && <span className="text-gray-500">({count})</span>}
      
    </div>
  );
}
