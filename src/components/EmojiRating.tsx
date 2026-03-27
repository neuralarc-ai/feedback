import { useState } from 'react';

export interface EmojiRatingProps {
  rating: number;
  onRate: (rating: number) => void;
  compact?: boolean;
}

const EMOJIS = [
  { label: 'Oh no...', color: '#FF2D78', bgSelected: '#FF2D78' },
  { label: 'Not great', color: '#FF8C00', bgSelected: '#FF8C00' },
  { label: 'It was okay', color: '#E2E600', bgSelected: '#E2E600' },
  { label: 'Pretty good!', color: '#A8D8EA', bgSelected: '#A8D8EA' },
  { label: 'Roarsome!', color: '#222222', bgSelected: '#222222' },
];

function EmojiSVG({ index, isActive, isHovered, size: s }: { index: number; isActive: boolean; isHovered: boolean; size: number }) {
  const big = isActive || isHovered;
  const stroke = big ? '#222' : '#c0c0c0';
  const fill = big ? EMOJIS[index].bgSelected : 'transparent';
  const detailFill = big ? '#222' : '#aaa';

  switch (index) {
    case 0:
      return (
        <svg width={s} height={s} viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" fill={fill} stroke={stroke} strokeWidth="2.5" />
          <circle cx="19" cy="22" r="2.5" fill={detailFill} />
          <circle cx="33" cy="22" r="2.5" fill={detailFill} />
          <ellipse cx="26" cy="36" rx="5" ry="6" fill={detailFill} />
          <ellipse cx="26" cy="39" rx="3" ry="2.5" fill={big ? fill : '#ccc'} />
        </svg>
      );
    case 1:
      return (
        <svg width={s} height={s} viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" fill={fill} stroke={stroke} strokeWidth="2.5" />
          <rect x="17" y="20" width="6" height="4" rx="1" fill={detailFill} />
          <rect x="29" y="20" width="6" height="4" rx="1" fill={detailFill} />
          <rect x="19" y="36" width="14" height="3" rx="1.5" fill={detailFill} />
        </svg>
      );
    case 2:
      return (
        <svg width={s} height={s} viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" fill={fill} stroke={stroke} strokeWidth="2.5" />
          <rect x="17" y="20" width="6" height="4" rx="1" fill={detailFill} />
          <rect x="29" y="20" width="6" height="4" rx="1" fill={detailFill} />
          <rect x="20" y="37" width="12" height="2" rx="1" fill={detailFill} />
        </svg>
      );
    case 3:
      return (
        <svg width={s} height={s} viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" fill={fill} stroke={stroke} strokeWidth="2.5" />
          <circle cx="19" cy="22" r="2.5" fill={detailFill} />
          <circle cx="33" cy="22" r="2.5" fill={detailFill} />
          <ellipse cx="26" cy="30" rx="3" ry="3.5" fill={detailFill} />
          <circle cx="10" cy="16" r="3" fill={big ? fill : 'transparent'} stroke={stroke} strokeWidth="1.5" />
          <circle cx="42" cy="16" r="3" fill={big ? fill : 'transparent'} stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 4:
      return (
        <svg width={s} height={s} viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" fill={fill} stroke={stroke} strokeWidth="2.5" />
          <path d="M16 22 C18 18, 22 18, 24 22" stroke={big ? '#fff' : '#aaa'} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M28 22 C30 18, 34 18, 36 22" stroke={big ? '#fff' : '#aaa'} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M17 32 C20 40, 32 40, 35 32" stroke={big ? '#fff' : '#aaa'} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M8 12 L5 6 L12 10" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={big ? fill : 'transparent'} />
          <path d="M44 12 L47 6 L40 10" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={big ? fill : 'transparent'} />
        </svg>
      );
    default:
      return null;
  }
}

export default function EmojiRating({ rating, onRate, compact = false }: EmojiRatingProps) {
  const [hover, setHover] = useState(0);
  const activeIndex = hover || rating;
  const emojiSize = compact ? 28 : 52;
  const activeSize = compact ? 32 : 52;

  return (
    <div className={`flex flex-col ${compact ? 'items-center' : 'items-start'}`}>
      <div className="flex items-center gap-1">

        {EMOJIS.map((emoji, i) => {
          const value = i + 1;
          const isActive = rating === value;
          const isHovered = hover === value;
          const big = isActive || isHovered;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={emoji.label}
              className={`relative z-10 flex flex-col items-center cursor-pointer bg-transparent border-none transition-transform duration-200 ${compact ? 'p-0.5' : 'p-1'}`}
              style={{ transform: big && !compact ? 'scale(1.15)' : 'scale(1)' }}
              onClick={() => onRate(rating === value ? 0 : value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
            >
              <EmojiSVG index={i} isActive={isActive} isHovered={isHovered} size={big && !compact ? activeSize : emojiSize} />
            </button>
          );
        })}
      </div>
      {!compact && activeIndex > 0 && (
        <p className="text-sm font-semibold text-na-white mt-1 ml-1 animate-fade-in">
          {EMOJIS[activeIndex - 1].label}
        </p>
      )}
    </div>
  );
}
