import type { StepProps } from "../../types/onBoarding";
import { useState, useEffect } from "react";

export default function TimeCommitment({
  data,
  updateData,
  errors,
}: StepProps) {
  const [displayValue, setDisplayValue] = useState(data.weeklyHours || 5);

  useEffect(() => {
    setDisplayValue(data.weeklyHours || 5);
  }, [data.weeklyHours]);

  const handleChange = (value: number) => {
    setDisplayValue(value);
    updateData("weeklyHours", value);
  };

  const getTimeDescription = (hours: number) => {
    if (hours <= 2)
      return { text: "Casual learner", emoji: "🌙", color: "blue" };
    if (hours <= 5)
      return { text: "Part-time learner", emoji: "⏰", color: "green" };
    if (hours <= 10)
      return { text: "Committed learner", emoji: "🔥", color: "orange" };
    if (hours <= 20)
      return { text: "Intensive learner", emoji: "💪", color: "red" };
    return { text: "Full-time learner", emoji: "🚀", color: "purple" };
  };

  const description = getTimeDescription(displayValue);

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-7">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          How much time can you commit?
        </h1>
        <p className="text-gray-600 text-lg">
          Set a realistic weekly learning goal - you can always adjust later.
        </p>
      </div>

      {/* Time Display */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 animate-pulse h-24 rounded-full bg-gradient-to-br bg-purple-600 shadow-xl mb-6 animate-pulse-slow">
            <span className="text-6xl">{description.emoji}</span>
          </div>

          <div className="mb-2">
            <span className="text-6xl font-bold text-gray-900">
              {displayValue}
            </span>
            <span className="text-3xl text-gray-600 ml-2">
              {displayValue === 1 ? "hour" : "hours"}
            </span>
          </div>

          <p className={`text-xl font-semibold text-${description.color}-600`}>
            {description.text}
          </p>
        </div>

        {/* Slider */}
        <div className="px-5 mb-5">
          <input
            type="range"
            min="1"
            max="40"
            value={displayValue}
            onChange={(e) => handleChange(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${
                (displayValue / 40) * 100
              }%, #e5e7eb ${(displayValue / 40) * 100}%, #e5e7eb 100%)`,
            }}
          />

          {/* Slider Labels */}
          <div className="flex justify-between  text-sm text-gray-500">
            <span>1 hour</span>
            <span>40 hours</span>
          </div>
        </div>

        {/* Quick Select Buttons */}
        <div className="grid grid-cols-4 gap-2 mx-4">
          {[5, 10, 15, 20].map((hours) => (
            <button
              key={hours}
              onClick={() => handleChange(hours)}
              className={`
                py-2 px-3 rounded-xl font-semibold transition-all duration-200
                ${
                  displayValue === hours
                    ? "bg-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {hours}h
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {errors.weeklyHours && (
        <div className="mt-6 text-center animate-shake">
          <p className="text-red-600 text-sm font-medium">
            {errors.weeklyHours}
          </p>
        </div>
      )}
    </div>
  );
}
