import React, { useState, useEffect } from 'react';
import { MoreHorizontal, MessageSquare, PlayCircle, CheckCircle, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPersonalizeRecomendation, searchCourses } from '../Services/recomendationService';
import { useAuth } from '../Services/contextApi/AuthContext';
import { enrollUserInCourse, getUserEnrolledCourses, updateCourseProgress } from '../Services/courseService';
import type { Course as CourseType } from '../types/types';

// Mock Data for Next Courses (can be replaced later)
const NEXT_COURSES = [
  {
    id: 101,
    title: "Digital design thinking",
    description: "Gain the basic skills in User Experience...",
    icon: "bg-blue-100 text-blue-600"
  },
  {
    id: 102,
    title: "Digital design thinking",
    description: "Gain the basic skills in User Experience...",
    icon: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 103,
    title: "Digital design thinking",
    description: "Gain the basic skills in User Experience...",
    icon: "bg-purple-100 text-purple-600"
  }
];

const FILTERS = ["All", "Design", "Figma", "Python", "Framer", "Photography", "Science"];

const Course: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
  const [completedCourseIds, setCompletedCourseIds] = useState<Set<string>>(new Set());
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [recommendations, enrolled] = await Promise.all([
        getPersonalizeRecomendation(user!.id),
        getUserEnrolledCourses(user!.id)
      ]);
      setCourses(recommendations);
      setEnrolledCourseIds(new Set(enrolled.map(e => e.course_id)));
      setCompletedCourseIds(new Set(enrolled.filter(e => e.progress === 100).map(e => e.course_id)));
    } catch (error) {
      console.error("Failed to fetch data", error);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchData(); // Reset to recommendations if empty
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await searchCourses(searchQuery);
      setCourses(results);
    } catch (error) {
      console.error("Search failed", error);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (e: React.MouseEvent, course: CourseType) => {
    e.stopPropagation(); // Prevent opening video modal
    if (!user || enrolledCourseIds.has(course.id)) return;

    setEnrollingId(course.id);
    setError(null);
    try {
      await enrollUserInCourse(user.id, course.id);
      setEnrolledCourseIds(prev => new Set(prev).add(course.id));
    } catch (error) {
      console.error("Failed to enroll", error);
      setError("Failed to enroll in course. Please try again.");
    } finally {
      setEnrollingId(null);
    }
  };

  const handleComplete = async () => {
    if (!user || !selectedCourse) return;
    
    setError(null);
    try {
      await updateCourseProgress(user.id, selectedCourse.id, 100);
      setCompletedCourseIds(prev => new Set(prev).add(selectedCourse.id));
      // Optionally close modal or show success message
    } catch (error) {
      console.error("Failed to update progress", error);
      setError("Failed to mark as completed. Please try again.");
    }
  };

  const clearFilters = () => {
    setActiveFilter("All");
    setSearchQuery("");
    fetchData();
  };

  // Filter logic
  const filteredCourses = courses.filter(course => {
    if (activeFilter === "All") return true;
    return course.topics?.some(topic => topic.includes(activeFilter)) || false;
  });

  const CourseSkeleton = () => (
    <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-lg flex flex-col h-full animate-pulse">
      {/* Video Placeholder */}
      <div className="w-full aspect-video bg-gray-200 rounded-md mb-4" />
      
      {/* Title & Menu */}
      <div className="flex justify-between items-start mb-2">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-5 w-5 bg-gray-200 rounded-full" />
      </div>

      {/* Description */}
      <div className="space-y-2 mb-6 flex-grow">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <div>
          <div className="h-3 bg-gray-200 rounded w-12 mb-2" />
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
          </div>
        </div>
        <div className="h-9 w-28 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:px-8 lg:px-12 font-sans relative">
      <div className="max-w-full mx-auto">
        
        {/* Error Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Course</h1>
            <p className="text-gray-500 text-sm md:text-base">You'll never go wrong with our courses</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
             {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a7e629]/50 focus:border-[#a7e629] transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </form>

            {/* Filters */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      activeFilter === filter
                        ? "bg-[#a7e629] text-white shadow-sm shadow-green-200"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Course Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {loading ? (
               // Render 6 skeletons
               [...Array(6)].map((_, i) => (
                 <CourseSkeleton key={i} />
               ))
            ) : filteredCourses.length === 0 ? (
               <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                   <Search size={32} className="text-gray-400" />
                 </div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-1">No courses found</h3>
                 <p className="text-sm mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                 <button 
                   onClick={clearFilters}
                   className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                 >
                   Clear all filters
                 </button>
               </div>
            ) : (
              filteredCourses.map((course) => {
                const isEnrolled = enrolledCourseIds.has(course.id);
                const isCompleted = completedCourseIds.has(course.id);
                const isEnrolling = enrollingId === course.id;

                return (
                  <motion.div
                    layout
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white  p-4  shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group flex flex-col"
                    onClick={() => setSelectedCourse(course)} 
                  >
                    {/* Video Placeholder */}
                    <div className="relative w-full aspect-video overflow-hidden mb-4 bg-gray-100 group-hover:ring-4 ring-blue-50 transition-all">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors z-10">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 text-[#a7e629] ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <img 
                        src={course.thumbnail_url || `https://img.youtube.com/vi/${course.url?.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x360?text=Course+Thumbnail';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1 pr-4">
                        {course.title}
                      </h3>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>

                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
                      {course.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-xs font-semibold text-gray-900 block mb-2">Mentor</span>
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                               <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="mentor" className="w-full h-full object-cover" />
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-900 text-white text-xs flex items-center justify-center">
                            +2
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={(e) => handleEnroll(e, course)}
                        disabled={isEnrolling || isCompleted}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          isCompleted
                            ? "bg-green-100 text-green-700"
                            : isEnrolled 
                              ? "bg-green-50 text-green-600 hover:bg-green-100"
                              : "bg-[#191a2c] text-[#a7e629] hover:bg-[#191a2c]/90 shadow-lg shadow-[#a7e629]/20"
                        }`}
                      >
                        {isEnrolling ? (
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : isCompleted ? (
                          <>
                            <CheckCircle size={16} />
                            Done
                          </>
                        ) : isEnrolled ? (
                          <>
                            <PlayCircle size={16} />
                            Continue
                          </>
                        ) : (
                          <>
                            <PlayCircle size={16} />
                            Enroll Now
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* Next Course Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Next course</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEXT_COURSES.map((course) => (
              <div key={course.id} className="bg-white rounded-md p-4 border border-gray-100 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${course.icon}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold text-gray-900 mb-1 truncate">{course.title}</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-2">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedCourse(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 truncate pr-4">{selectedCourse.title}</h3>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`${selectedCourse.url}?autoplay=1`} 
                  title="Course Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Modal Footer */}
              <div className="p-4 flex items-center justify-between bg-gray-50">
                 <div className="text-sm text-gray-500">
                   {completedCourseIds.has(selectedCourse.id) ? "You have completed this course!" : "Watch the video to complete the course."}
                 </div>
                 
                 {enrolledCourseIds.has(selectedCourse.id) && (
                   <button
                     onClick={handleComplete}
                     disabled={completedCourseIds.has(selectedCourse.id)}
                     className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                       completedCourseIds.has(selectedCourse.id)
                         ? "bg-green-100 text-green-700 cursor-default"
                         : "bg-[#a7e629] text-[#191a2c] hover:bg-[#96d123] shadow-md"
                     }`}
                   >
                     {completedCourseIds.has(selectedCourse.id) ? (
                       <>
                         <CheckCircle size={18} />
                         Completed
                       </>
                     ) : (
                       <>
                         <CheckCircle size={18} />
                         Mark as Completed
                       </>
                     )}
                   </button>
                 )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Course;
