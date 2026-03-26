import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

export default function StarRating({ rating, onRate }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1.5" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hover || rating);
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            className="relative text-2xl transition-all duration-200 hover:scale-125 focus:outline-none focus-visible:ring-1 focus-visible:ring-star-active/50 rounded"
            onClick={() => onRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <span
              className={`transition-colors duration-200 ${
                active ? 'text-star-active drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]' : 'text-star-inactive'
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
