import { cn } from "@/lib/utils";

type RatingProps = {
  value: number;
  max?: number;
  onValueChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
};

export function Rating({
  value,
  max = 5,
  onValueChange,
  readOnly = false,
  className,
}: RatingProps) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="radiogroup"
      aria-label="Rating"
    >
      {Array.from({ length: max }, (_, index) => {
        const rating = index + 1;
        const filled = rating <= value;

        return (
          <button
            key={rating}
            type="button"
            disabled={readOnly}
            onClick={() => onValueChange?.(rating)}
            aria-label={`${rating} de ${max}`}
            aria-checked={filled}
            className={cn(
              "text-2xl leading-none transition-colors",
              filled ? "text-yellow-400" : "text-gray-300",
              !readOnly && "cursor-pointer hover:text-yellow-500",
              readOnly && "cursor-default",
            )}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}