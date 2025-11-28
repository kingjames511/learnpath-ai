import { X, Play, Clock, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Course {
  id: number;
  title: string;
  chapters: number;
  instructor: string;
  duration: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const SkeletonCourse = () => (
  <div className="p-3 bg-gray-50 rounded-xl animate-pulse">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded-xl flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="w-12 h-6 bg-gray-200 rounded-lg" />
    </div>
  </div>
);

export const ProfilePanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
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

  const progress = 75;
  const circumference = 2 * Math.PI * 56;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <>
      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        role="complementary"
        aria-label="User profile panel"
        className={`
          fixed top-0 right-0 h-full bg-white/95 backdrop-blur-md shadow-2xl z-50
          w-[22rem] transform transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto scrollbar-hide
        `}
      >
        <button
          onClick={onClose}
          aria-label="Close profile panel"
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-xl transition-colors z-10"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <div className="p-8 space-y-8">
          {/* Profile Section */}
          <section className="flex flex-col items-center">
            <div className="relative mb-6">
              <svg className="w-36 h-36 -rotate-90" aria-hidden="true">
                <circle
                  cx="72"
                  cy="72"
                  r="56"
                  fill="none"
                  stroke="#F3F4F6"
                  strokeWidth="6"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="56"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 p-[3px] shadow-lg shadow-green-500/20">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-3xl font-bold text-green-600">RF</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-md">
                {progress}% Complete
              </div>
            </div>
            
            {loading ? (
              <>
                <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
                <div className="flex gap-4">
                  <div className="h-16 w-20 bg-gray-200 rounded-xl animate-pulse" />
                  <div className="h-16 w-20 bg-gray-200 rounded-xl animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Robert Fox</h2>
                <p className="text-sm text-gray-500 mb-4">@robertfox</p>
                <div className="flex gap-4 text-center">
                  <div className="px-4 py-2 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                    <p className="text-xs text-gray-500 font-medium">Courses</p>
                  </div>
                  <div className="px-4 py-2 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">12h</p>
                    <p className="text-xs text-gray-500 font-medium">This Week</p>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* Weekly Goal Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Weekly Goal</h3>
              <span className="text-xs text-gray-500 font-medium">{loading ? '...' : `${courses.length} courses`}</span>
            </div>

            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonCourse key={i} />
                ))}
              </div>
            ) : (
              <motion.div 
                key={isOpen ? 'open' : 'closed'}
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {courses.map((course) => (
                  <motion.article
                    key={course.id}
                    variants={itemVariants}
                    className="group p-3 hover:bg-gray-100 rounded-md transition-all duration-200 cursor-pointer"
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-green-500/20 group-hover:scale-105 transition-transform">
                        <Play size={16} className="text-white fill-white ml-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-medium">{course.chapters} Chapters</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="truncate">{course.instructor}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0 font-medium px-2 py-1 bg-white rounded-lg">
                        <Clock size={12} />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </section>

          {/* Premium Card */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-6 shadow-xl shadow-green-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
            
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Crown size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                  Unlock Premium
                </h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Access all courses and exclusive content
                </p>
              </div>
              <button className="w-full bg-white text-green-700 px-5 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2">
                <Sparkles size={16} />
                Upgrade Now
              </button>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
};
