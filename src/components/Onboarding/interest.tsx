import type { StepProps } from "../../types/onBoarding";

const interests = [
  { id: "web-dev", label: "Web Development", icon: "💻", color: "indigo" },
  { id: "mobile-dev", label: "Mobile Development", icon: "📱", color: "blue" },
  { id: "data-science", label: "Data Science", icon: "📊", color: "purple" },
  {
    id: "machine-learning",
    label: "Machine Learning",
    icon: "🤖",
    color: "pink",
  },
  { id: "design", label: "Design & UX", icon: "🎨", color: "rose" },
  { id: "cloud", label: "Cloud Computing", icon: "☁️", color: "cyan" },
  { id: "security", label: "Cybersecurity", icon: "🔒", color: "green" },
  { id: "blockchain", label: "Blockchain", icon: "⛓️", color: "orange" },
];

export default function InterestSelection({
  data,
  updateData,
  errors,
}: StepProps) {
  const toggleInterest = (interestId: string) => {
    const currentInterests = data.interests;
    const newInterests = currentInterests.includes(interestId)
      ? currentInterests.filter((id) => id !== interestId)
      : [...currentInterests, interestId];

    updateData("interests", newInterests);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className=" font-bold text-gray-900 mb-2">
          What do you want to learn?
        </h3>
        <p className="text-gray-600">
          Select all topics that interest you - you can always adjust this
          later.
        </p>
      </div>

      {/* Interest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 max-w-3xl md:mx-auto">
        {interests.map((interest) => {
          const isSelected = data.interests.includes(interest.id);

          return (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`
                relative group flex items-center gap-4 p-3 rounded-xl border-2 
                transition-all duration-300 text-left
                ${
                  isSelected
                    ? `border-${interest.color}-500 bg-gradient-to-br from-${interest.color}-50 to-white shadow-md `
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  flex items-center justify-center w-12 h-12 rounded-xl text-xl
                  transition-all duration-300
                  ${
                    isSelected
                      ? `bg-${interest.color}-500 shadow-lg`
                      : "bg-gray-100 group-hover:bg-gray-200"
                  }
                `}
              >
                <span className={isSelected ? "scale-110" : ""}>
                  {interest.icon}
                </span>
              </div>

              {/* Label */}
              <span className="flex-1 text-md font-semibold text-gray-900">
                {interest.label}
              </span>

              {/* Checkmark */}
              <div
                className={`
                  flex items-center justify-center w-5 h-5 rounded-full border-2
                  transition-all duration-300
                  ${
                    isSelected
                      ? `border-${interest.color}-500 bg-${interest.color}-500`
                      : "border-gray-300"
                  }
                `}
              >
                {isSelected && (
                  <svg
                    className="w-4 h-4 text-white animate-scaleIn"
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

              {/* Hover glow effect */}
              {isSelected && (
                <div
                  className={`absolute inset-0 rounded-xl bg-${interest.color}-500 opacity-0 group-hover:opacity-10 transition-opacity`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Error Message */}
      {errors.interests && (
        <div className="mt-6 text-center animate-shake">
          <p className="text-red-600 text-sm font-medium">{errors.interests}</p>
        </div>
      )}

      {/* Selection Count */}
      {data.interests.length > 0 && (
        <div className="mt-6 text-center animate-fadeIn">
          <p className="text-gray-600">
            <span className="font-semibold text-indigo-600">
              {data.interests.length}
            </span>{" "}
            {data.interests.length === 1 ? "topic" : "topics"} selected
          </p>
        </div>
      )}
    </div>
  );
}
