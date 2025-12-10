import React, { useState } from 'react';
import { MoreHorizontal, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const FILTERS = ["Design", "Figma", "Python", "Framer", "Photography", "Science"];

const COURSES = [
  {
    id: 1,
    title: "User experience design fundamental",
    description: "Gain the basic skills in User Experience. Study practice and theory...",
    videoUrl: "https://www.youtube.com/embed/p3tqJ5J-8kY?si=u2k5y7z4i8j9k0l1", // Placeholder
    mentors: [1, 2, 3, 4],
    category: "Design"
  },
  {
    id: 2,
    title: "Software testing and automation",
    description: "Gain the basic skills in User Experience. Study practice and theory...",
    videoUrl: "https://www.youtube.com/embed/p3tqJ5J-8kY?si=u2k5y7z4i8j9k0l1", // Placeholder
    mentors: [1, 2, 3],
    category: "Python"
  },
  {
    id: 3,
    title: "Drawing and painting procreate",
    description: "Gain the basic skills in User Experience. Study practice and theory...",
    videoUrl: "https://www.youtube.com/embed/p3tqJ5J-8kY?si=u2k5y7z4i8j9k0l1", // Placeholder
    mentors: [1, 2, 3],
    category: "Design"
  }
];

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

const Course: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("Design");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12 font-sans relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Course</h1>
            <p className="text-gray-500 text-sm md:text-base">You'll never go wrong with our courses</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-700">Filters</span>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {COURSES.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => setSelectedVideo(course.videoUrl)}
            >
              {/* Video Placeholder */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 group-hover:ring-4 ring-blue-50 transition-all">
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors z-10">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <img 
                  src={`https://img.youtube.com/vi/${course.videoUrl.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1 pr-4">
                  {course.title}
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                {course.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
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

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  <MessageSquare size={16} className="text-blue-500" />
                  Reviews
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Course Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Next course</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEXT_COURSES.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
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
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedVideo(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-black w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src={`${selectedVideo}?autoplay=1`} 
                title="Course Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Course;
