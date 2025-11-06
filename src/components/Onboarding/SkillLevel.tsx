import type { StepProps } from "../../types/onBoarding";

const skillLevels = [
  {
    id: "beginner",
    label: "Beginner",
    icon: "🌱",
    description: "Just starting out, little to no experience",
    color: "green",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    icon: "🚀",
    description: "Some experience, comfortable with basics",
    color: "blue",
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: "⚡",
    description: "Strong foundation, looking to level up",
    color: "purple",
  },
  {
    id: "expert",
    label: "Expert",
    icon: "🏆",
    description: "Highly experienced, seeking mastery",
    color: "orange",
  },
];

export default function SkillLevel({ data, updateData, errors }: StepProps) {
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          What's your skill level?
        </h1>
        <p className="text-gray-600 ">
          This helps us recommend courses at the right difficulty for you.
        </p>
      </div>

      {/* Skill Level Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-4 md:mx-auto">
        {skillLevels.map((level) => {
          const isSelected = data.skillLevel === level.id;

          return (
            <button
              key={level.id}
              onClick={() => updateData("skillLevel", level.id)}
              className={`
                group relative p-6 rounded-xl border-2 transition-all duration-300
                ${
                  isSelected
                    ? `border-${level.color}-500 bg-gradient-to-br from-${level.color}-50 to-white shadow-md`
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:scale-[1.01]"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl mb-4
                transition-all duration-300
                ${
                  isSelected
                    ? `bg-${level.color}-500 shadow-lg rotate-6`
                    : "bg-gray-100 group-hover:bg-gray-200"
                }
              `}
              >
                <span className={isSelected ? "scale-110" : ""}>
                  {level.icon}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {level.label}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {level.description}
              </p>

              {/* Selection Indicator */}
              {isSelected && (
                <div
                  className={`absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-${level.color}-500 shadow-lg animate-scaleIn`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Error */}
      {errors.skillLevel && (
        <div className="mt-6 text-center animate-shake">
          <p className="text-red-600 text-sm font-medium">
            {errors.skillLevel}
          </p>
        </div>
      )}
    </div>
  );
}
