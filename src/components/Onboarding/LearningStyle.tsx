import type { StepProps } from "../../types/onBoarding";

const learningStyles = [
  {
    id: "video",
    label: "Video Tutorials",
    icon: "🎥",
    description: "Watch and learn",
  },
  {
    id: "reading",
    label: "Articles & Docs",
    icon: "📚",
    description: "Read at your pace",
  },
  {
    id: "interactive",
    label: "Interactive",
    icon: "🎮",
    description: "Learn by doing",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "🛠️",
    description: "Build real things",
  },
];

export default function LearningStyle({ data, updateData, errors }: StepProps) {
  const toggleStyle = (styleId: string) => {
    const currentStyles = data.learningStyle;
    const newStyles = currentStyles.includes(styleId)
      ? currentStyles.filter((id) => id !== styleId)
      : [...currentStyles, styleId];

    updateData("learningStyle", newStyles);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-7">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          How do you prefer to learn?
        </h1>
        <p className="text-gray-600 text-md">
          Select all that apply - we'll match you with the right content format.
        </p>
      </div>

      {/* Learning Styles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-4 md:mx-auto">
        {learningStyles.map((style) => {
          const isSelected = data.learningStyle.includes(style.id);

          return (
            <button
              key={style.id}
              onClick={() => toggleStyle(style.id)}
              className={`
                group relative p-5 rounded-2xl border-2 transition-all duration-300
                ${
                  isSelected
                    ? "border-purple-600 bg-gradient-to-br from-indigo-50 to-white shadow-md "
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:scale-[1.01]"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                inline-flex items-center justify-center w-16 h-16 rounded-2xl text-xl mb-2
                transition-all duration-300
                ${
                  isSelected
                    ? "bg-purple-500 shadow-xl rotate-6 scale-110"
                    : "bg-gray-100 group-hover:bg-gray-200"
                }
              `}
              >
                {style.icon}
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {style.label}
              </h3>

              {/* Description */}
              <p className="text-gray-600">{style.description}</p>

              {/* Checkmark */}
              <div
                className={`
                absolute top-5 right-5 flex items-center justify-center w-8 h-8 rounded-full border-2
                transition-all duration-300
                ${
                  isSelected
                    ? "border-purple-500 bg-purple-500 scale-100"
                    : "border-gray-300 scale-0"
                }
              `}
              >
                {isSelected && (
                  <svg
                    className="w-5 h-5 text-white animate-scaleIn"
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
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selection Count */}
      {data.learningStyle.length > 0 && (
        <div className="mt-4 text-center animate-fadeIn">
          <p className="text-gray-600">
            <span className="font-semibold text-purple-600">
              {data.learningStyle.length}
            </span>{" "}
            {data.learningStyle.length === 1 ? "style" : "styles"} selected
          </p>
        </div>
      )}

      {/* Error */}
      {errors.learningStyle && (
        <div className="mt-6 text-center animate-shake">
          <p className="text-red-600 text-sm font-medium">
            {errors.learningStyle}
          </p>
        </div>
      )}
    </div>
  );
}
