
import React from 'react';

interface SliderProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const bgStyle = {
    background: `linear-gradient(to right, #3b82f6 ${percentage}%, #d1d5db ${percentage}%)`,
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      style={bgStyle}
      className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-thumb"
    />
  );
};

export default Slider;
