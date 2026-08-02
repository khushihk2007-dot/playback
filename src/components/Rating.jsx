export function PunchedRating({ value = 0, max = 10, size = 10 }) {
  const filled = Math.round(value);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-[3px]">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`rounded-full transition-colors ${
              i < filled
                ? "bg-[color:var(--color-cinema)] shadow-[inset_0_1px_1px_rgba(0,0,0,0.35)]"
                : "bg-transparent border border-[color:var(--color-faded)]/60"
            }`}
            style={{ width: size, height: size }}
          />
        ))}
      </div>
      <span className="font-type text-xs text-[color:var(--color-ink)]">{value}/10</span>
    </div>
  );
}
