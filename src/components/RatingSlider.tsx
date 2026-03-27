interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const LABELS = ['Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];

export default function RatingSlider({ value, onChange }: RatingSliderProps) {
  const label = value > 0 ? LABELS[value - 1] : null;
  // Map 1-5 to 0-100 for the slider, 0 means unset (show at 0)
  const sliderVal = value === 0 ? 0 : (value - 1) * 25;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value);
    // Snap to nearest 1-5 step
    const snapped = Math.round(raw / 25) + 1;
    onChange(Math.min(5, Math.max(1, snapped)));
  };

  return (
    <>
      <div className="w-full">
      {/* Label badge */}
      <div className="flex justify-end mb-3">
        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
          label
            ? 'bg-na-surface text-na-white'
            : 'bg-na-surface text-na-text-dim'
        }`}>
          {label ?? 'Not rated'}
        </span>
      </div>

      {/* Slider track */}
      <div className="relative flex items-center">
        <input
          type="range"
          min={0}
          max={100}
          step={25}
          value={sliderVal}
          onChange={handleChange}
          className="w-full appearance-none h-[3px] rounded-full outline-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #111 0%, #111 ${sliderVal}%, #d4d4d4 ${sliderVal}%, #d4d4d4 100%)`,
          }}
          aria-label="Overall rating"
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuenow={value || undefined}
          aria-valuetext={label ?? undefined}
        />
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f5d800;
          border: 3px solid #111;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f5d800;
          border: 3px solid #111;
          cursor: pointer;
        }
      `}</style>
    </div>
    </>
  
  );
}
