import { Edit2, Play, X, Filter, Clock } from "lucide-react";
interface Course {
  id: number;
  title: string;
  chapters: number;
  instructor: string;
  duration: string;
}
 export const ProfilePanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const courses: Course[] = [
    {
      id: 1,
      title: "Figma for UX Design",
      chapters: 16,
      instructor: "Tim Fibrosis",
      duration: "10:30",
    },
    {
      id: 2,
      title: "Mobile App Design",
      chapters: 12,
      instructor: "Tim Fibrosis",
      duration: "08:30",
    },
    {
      id: 3,
      title: "Interaction Design",
      chapters: 17,
      instructor: "Tim Fibrosis",
      duration: "10:30",
    },
    {
      id: 4,
      title: "Google UX Design",
      chapters: 19,
      instructor: "Tim Fibrosis",
      duration: "11:30",
    },
    {
      id: 5,
      title: "Google UX Design",
      chapters: 19,
      instructor: "Tim Fibrosis",
      duration: "11:30",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Profile Panel - Modal on mobile, sidebar on desktop */}
      <div
        className={`
        fixed top-0 right-0 h-full bg-white shadow-2xl z-50
        w-80 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0 lg:relative lg:shadow-none lg:border-l lg:border-gray-200
        overflow-y-auto
      `}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Edit2 size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Profile Avatar with Progress Ring */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-3">
              {/* Progress ring */}
              <svg className="w-32 h-32 -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="4"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="4"
                  strokeDasharray="364.4"
                  strokeDashoffset="91.1"
                  strokeLinecap="round"
                />
              </svg>
              {/* Avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">RF</span>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Robert Fox</h3>
            <p className="text-sm text-gray-500">@robertfox</p>
          </div>

          {/* Weekly Goal Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-800">
                Weekly Goal
              </h3>
              <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                <Filter size={16} />
                Filter
              </button>
            </div>

            {/* Course List */}
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Play size={14} className="text-white fill-white ml-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-800 mb-1">
                      {course.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{course.chapters} Chapters</span>
                      <span>•</span>
                      <span>{course.instructor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Card */}
          <div className="mt-6 bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-white font-semibold text-lg mb-2">
                Go premium to
                <br />
                get access of all
                <br />
                courses
              </h3>
              <button className="bg-white text-indigo-900 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors mt-2">
                Upgrade plan
              </button>
            </div>
            {/* Decorative blocks */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <div className="w-16 h-20 bg-pink-300 rounded-lg transform rotate-12 opacity-80"></div>
              <div className="w-16 h-20 bg-blue-300 rounded-lg transform -rotate-6 opacity-80"></div>
              <div className="w-16 h-20 bg-orange-300 rounded-lg transform rotate-6 opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
