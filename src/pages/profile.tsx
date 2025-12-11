import { X, Play, Clock, Sparkles, Crown } from "lucide-react";
import { motion  } from "framer-motion";
import type {Variants}  from "framer-motion"
import { useState, useEffect } from "react";
import { useAuth } from "../Services/contextApi/AuthContext";
import { getUserEnrolledCourses } from "../Services/courseService";
import { supabase } from "../lib/supabase";
import type { UserCourse } from "../types/types";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
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
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<UserCourse[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchData();
    }
  }, [isOpen, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coursesData, profileData] = await Promise.all([
        getUserEnrolledCourses(user!.id),
        supabase.from('user_profiles').select('*').eq('user_id', user!.id).single()
      ]);
      
      setEnrolledCourses(coursesData);
      setProfile(profileData.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const progress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((acc, curr) => acc + curr.progress, 0) / enrolledCourses.length)
    : 0;
    
  const circumference = 2 * Math.PI * 56;
  const offset = circumference - (progress / 100) * circumference;

  // Get initials from email or name
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'ME';
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || "User";
  const displayHandle = user?.email ? `@${user.email.split('@')[0]}` : "@user";

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
                <div className="w-28 h-28 rounded-full bg-[#a7e629] p-[3px] shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#a7e629]">{getInitials()}</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#a7e629] text-white text-xs font-semibold rounded-full shadow-md">
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
                <h2 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h2>
                <p className="text-sm text-gray-500 mb-4">{displayHandle}</p>
                <div className="flex gap-4 text-center">
                  <div className="px-4 py-2 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                    <p className="text-xs text-gray-500 font-medium">Courses</p>
                  </div>
                  <div className="px-4 py-2 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{profile?.weekly_hours || 0}h</p>
                    <p className="text-xs text-gray-500 font-medium">Weekly Goal</p>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* Weekly Goal Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Enrolled Courses</h3>
              <span className="text-xs text-gray-500 font-medium">{loading ? '...' : `${enrolledCourses.length} courses`}</span>
            </div>

            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
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
                {enrolledCourses.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No courses enrolled yet.</p>
                ) : (
                  enrolledCourses.map((userCourse) => (
                    <motion.article
                      key={userCourse.id}
                      variants={itemVariants}
                      className="group p-3 hover:bg-gray-100 rounded-md transition-all duration-200 cursor-pointer"
                      whileHover={{ scale: 1.02, x: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#a7e629]  flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Play size={16} className="text-white fill-white ml-0.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                            {userCourse.course?.title || "Unknown Course"}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="font-medium">{userCourse.progress}% Done</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="truncate">{userCourse.course?.difficulty || "General"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0 font-medium px-2 py-1 bg-white rounded-lg">
                          <Clock size={12} />
                          <span>{userCourse.course?.duration_hours || 0}h</span>
                        </div>
                      </div>
                    </motion.article>
                  ))
                )}
              </motion.div>
            )}
          </section>

          {/* Premium Card */}
          <section className="relative overflow-hidden rounded-2xl bg-[#426104] p-6 shadow-xl shadow-green-500/50">
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
