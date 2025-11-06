import type { StepProps } from "../../types/onBoarding";

const goals = [
  {
    id: "career-change",
    label: "Career Change",
    icon: "🎯",
    description: "Transition to a new field",
  },
  {
    id: "get-job",
    label: "Get a Job",
    icon: "💼",
    description: "Land my first tech role",
  },
  {
    id: "skill-up",
    label: "Skill Up",
    icon: "📈",
    description: "Advance in current role",
  },
  {
    id: "freelance",
    label: "Freelance",
    icon: "💻",
    description: "Start freelancing",
  },
  {
    id: "side-project",
    label: "Side Project",
    icon: "🚀",
    description: "Build something cool",
  },
  { id: "hobby", label: "Hobby", icon: "🎨", description: "Learn for fun" },
];

export default function LearningGoals({ data, updateData, errors }: StepProps) {
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          What's your learning goal?
        </h1>
        <p className="text-gray-600 text-lg">
          Choose the option that best describes what you want to achieve.
        </p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-4 md:mx-auto">
        {goals.map((goal) => {
          const isSelected = data.learningGoals === goal.id;

          return (
            <button
              key={goal.id}
              onClick={() => updateData("learningGoals", goal.id)}
              className={`
                group relative p-6 rounded-xl border-2 transition-all duration-300 text-center
                ${
                  isSelected
                    ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-white shadow-xl "
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:scale-[1.02]"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl mb-3
                transition-all duration-300
                ${
                  isSelected
                    ? "bg-indigo-500 shadow-lg scale-110"
                    : "bg-gray-100 group-hover:bg-gray-200"
                }
              `}
              >
                {goal.icon}
              </div>

              {/* Label */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {goal.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600">{goal.description}</p>

              {/* Check */}
              {isSelected && (
                <div className="absolute top-3 right-3 flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 shadow-lg animate-scaleIn">
                  <svg
                    className="w-4 h-4 text-white"
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
      {errors.learningGoals && (
        <div className="mt-6 text-center animate-shake">
          <p className="text-red-600 text-sm font-medium">
            {errors.learningGoals}
          </p>
        </div>
      )}
    </div>
  );
}
