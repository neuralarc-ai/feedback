import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

const LABELS = ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'];

export default function StarRating({ rating, onRate }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const activeValue = hover || rating;

  return (
    <div className="relative flex gap-1.5" role="radiogroup" aria-label="Rating">
      {/* Tooltip above stars */}
      {hover > 0 && (
        <div
          className="absolute -top-8 left-0 right-0 flex justify-center pointer-events-none animate-fade-in"
        >
          <span className="px-2 py-1 rounded bg-na-white text-na-bg text-xs font-medium shadow-md whitespace-nowrap">
            {LABELS[hover - 1]}
          </span>
        </div>
      )}
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= activeValue;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star} star - ${LABELS[star - 1]}`}
            className="relative text-2xl transition-all duration-200 hover:scale-125 focus:outline-none focus-visible:ring-1 focus-visible:ring-star-active/50 rounded"
            onClick={() => onRate(rating === star ? 0 : star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <span
              className={`transition-colors duration-200 ${
                active ? 'text-star-active' : 'text-star-inactive'
              }`}
            >
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
}
