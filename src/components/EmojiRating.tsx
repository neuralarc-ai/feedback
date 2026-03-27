import { useState } from 'react';

interface EmojiRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

const LABELS = ['Oh no...', 'Not great', 'It was okay', 'Pretty good!', 'Roarsome!'];
const ROTATIONS = [-5, 3, -2, 4, -6];

export default function EmojiRating({ rating, onRate }: EmojiRatingProps) {
  const [hover, setHover] = useState(0);
  const hasSelection = rating > 0;

  return (
    <>
      <div className="emoji-rating-group" data-has-selection={hasSelection || undefined}>
        {[1, 2, 3, 4, 5].map((val) => {
          const isSelected = rating === val;
          const isHovered = hover === val;
          return (
            <button
              key={val}
              type="button"
              className={`rate-blob ${isSelected ? 'selected' : ''}`}
              data-val={val}
              style={{ '--rotate': ROTATIONS[val - 1] } as React.CSSProperties}
              aria-label={LABELS[val - 1]}
              onClick={() => onRate(rating === val ? 0 : val)}
              onMouseEnter={() => setHover(val)}
              onMouseLeave={() => setHover(0)}
            >
              <div className="face" />
              {(isSelected || isHovered) && (
                <span className="rate-label">{LABELS[val - 1]}</span>
              )}
            </button>
          );
        })}
      </div>
      <style>{blobStyles}</style>
    </>
  );
}

const blobStyles = `
.emoji-rating-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0 1.4rem 0;
}

.rate-blob {
  width: 42px;
  height: 42px;
  background-color: #fff;
  border:2px solid #222;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.rate-blob[data-val="1"] { border-radius: 61% 39% 41% 59% / 50% 41% 59% 50%; }
.rate-blob[data-val="2"] { border-radius: 39% 61% 59% 41% / 41% 50% 50% 59%; }
.rate-blob[data-val="3"] { border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%; }
.rate-blob[data-val="4"] { border-radius: 43% 57% 61% 39% / 60% 51% 49% 40%; }
.rate-blob[data-val="5"] { border-radius: 55% 45% 42% 58% / 46% 56% 44% 54%; }

.rate-blob:hover,
.rate-blob:focus-visible {
  transform: scale(1.15) rotate(calc(var(--rotate, 0) * 1deg));
  outline: none;
  border-color: #222;
}

.emoji-rating-group:has(.rate-blob:hover) .rate-blob:not(:hover),
.emoji-rating-group[data-has-selection] .rate-blob:not(.selected) {
  opacity: 0.35;
  transform: scale(0.88);
}

.rate-blob[data-val="1"]:hover, .rate-blob[data-val="1"].selected { background-color: #FF007B; border-color: #222; }
.rate-blob[data-val="2"]:hover, .rate-blob[data-val="2"].selected { background-color: #FF6B00; border-color: #222; }
.rate-blob[data-val="3"]:hover, .rate-blob[data-val="3"].selected { background-color: #EBF32B; border-color: #222; }
.rate-blob[data-val="4"]:hover, .rate-blob[data-val="4"].selected { background-color: #BCE2F4; border-color: #222; }
.rate-blob[data-val="5"]:hover, .rate-blob[data-val="5"].selected { background-color: #222; border-color: #222; }

/* Face */
.face {
  width: 22px;
  height: 22px;
  position: relative;
  pointer-events: none;
}
.face::before, .face::after {
  content: '';
  position: absolute;
  background-color: #222;
  transition: all 0.2s ease;
}
/* Eyes: two dots */
.face::before {
  width: 3.5px;
  height: 3.5px;
  border-radius: 50%;
  top: 5px;
  left: 3px;
  box-shadow: 11px 0 0 #222;
}
/* Default mouth: smile arc */
.face::after {
  width: 11px;
  height: 5px;
  border-bottom: 2px solid #222;
  border-radius: 50%;
  bottom: 4px;
  left: 5px;
  background: transparent;
}

/* Active face: darken */
.rate-blob:hover .face::before,
.rate-blob.selected .face::before {
  background-color: #222;
  box-shadow: 11px 0 0 #222;
}
.rate-blob:hover .face::after,
.rate-blob.selected .face::after {
  border-color: #222;
}

/* === Val 1: Oh no — open oval mouth === */
.rate-blob[data-val="1"] .face::after {
  border: 2px solid #222;
  border-radius: 50%;
  width: 7px;
  height: 9px;
  bottom: 1px;
  left: 7px;
  background: transparent;
}
.rate-blob[data-val="1"]:hover .face::after,
.rate-blob[data-val="1"].selected .face::after {
  border-color: #222;
}

/* === Val 2: Not great — flat line === */
.rate-blob[data-val="2"] .face::after {
  border: none;
  border-top: 2px solid #222;
  border-radius: 0;
  height: 0;
  bottom: 6px;
  width: 9px;
  left: 6px;
  background: transparent;
}
.rate-blob[data-val="2"]:hover .face::after,
.rate-blob[data-val="2"].selected .face::after {
  border-top-color: #222;
}

/* === Val 3: Okay — tilted line === */
.rate-blob[data-val="3"] .face::after {
  border: none;
  border-bottom: 2px solid #222;
  border-radius: 0;
  height: 0;
  bottom: 5px;
  width: 11px;
  left: 5px;
  transform: rotate(-5deg);
  background: transparent;
}
.rate-blob[data-val="3"]:hover .face::after,
.rate-blob[data-val="3"].selected .face::after {
  border-bottom-color: #222;
}

/* === Val 4: Pretty good — smile === */
.rate-blob[data-val="4"] .face::after {
  border-bottom: 2px solid #222;
  height: 6px;
  background: transparent;
}
.rate-blob[data-val="4"]:hover .face::after,
.rate-blob[data-val="4"].selected .face::after {
  border-bottom-color: #222;
}

/* === Val 5: Roarsome — tall eyes + big grin === */
.rate-blob[data-val="5"] .face::before {
  height: 7px;
  border-radius: 4px;
  top: 3px;
}
.rate-blob[data-val="5"] .face::after {
  border-bottom: 2.5px solid #222;
  height: 8px;
  bottom: 2px;
  background: transparent;
}
.rate-blob[data-val="5"]:hover .face::before,
.rate-blob[data-val="5"].selected .face::before {
  background-color: #fff;
  box-shadow: 11px 0 0 #fff;
}
.rate-blob[data-val="5"]:hover .face::after,
.rate-blob[data-val="5"].selected .face::after {
  border-bottom-color: #fff;
}

/* Label */
.rate-label {
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.6rem;
  font-weight: 600;
  white-space: nowrap;
  color: #333;
}

@keyframes blob-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2) rotate(5deg); }
  100% { transform: scale(1.15); }
}
.rate-blob.selected {
  animation: blob-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
`;
