interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}
export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-5">
      {/* Progress Bar Container */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Animated Progress */}
        <div
          className="absolute top-0 left-0 h-full animate-pulse bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Step Counter */}
      <div className="mt-3 text-center">
        <span className="text-sm text-gray-500 font-medium">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
