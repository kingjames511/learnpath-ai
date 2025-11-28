import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface Course {
  id: string;
  videoId: string;
  thumbnail: string;
  instructor: string;
  title: string;
  currentTime: string;
  duration: string;
}

const coursesData: Course[] = [
  {
    id: "1",
    videoId: "jwVCjAKTL_w",
    thumbnail: "https://img.youtube.com/vi/5fb2aPlgoys/maxresdefault.jpg",
    instructor: "Adam Smith",
    title: "Figma Tutorial: A Crash Course for Beginners",
    currentTime: "3:50",
    duration: "9:32",
  },
  {
    id: "2",
    videoId: "5fb2aPlgoys",
    thumbnail: "https://img.youtube.com/vi/5fb2aPlgoys/maxresdefault.jpg",
    instructor: "Robert Hook",
    title: "Webflow Tutorial: Build Your First Website",
    currentTime: "3:50",
    duration: "9:32",
  },
  {
    id: "4",
    videoId: "HZq3vF5-41E",
    thumbnail: "https://img.youtube.com/vi/HZq3vF5-41E/maxresdefault.jpg",
    instructor: "Sarah Johnson",
    title: "React Tutorial for Beginners",
    currentTime: "2:15",
    duration: "12:45",
  },
  {
    id: "5",
    videoId: "1Rs2ND1ryYc",
    thumbnail: "https://img.youtube.com/vi/1Rs2ND1ryYc/maxresdefault.jpg",
    instructor: "Mike Brown",
    title: "Tailwind CSS Full Course",
    currentTime: "5:30",
    duration: "15:20",
  },
];

const CourseCard = ({
  course,
  onPlay,
}: {
  course: Course;
  onPlay: (course: Course) => void;
}) => {
  return (
    <motion.div
      className="flex-shrink-0 w-full sm:w-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Video Thumbnail Section */}
        <div className="relative aspect-video bg-gray-200 group overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=random&size=512`;
            }}
          />

          {/* Play Button Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer transition-opacity group-hover:bg-opacity-40"
            onClick={() => onPlay(course)}
          >
            <motion.div
              className="bg-white rounded-full p-3 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
            </motion.div>
          </div>

          {/* Duration Badges */}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
            {course.currentTime}
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
            {course.duration}
          </div>
        </div>

        {/* Course Info */}
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              A Course by {course.instructor}
            </p>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
              {course.title}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const OngoingCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Ongoing Courses ({coursesData.length})
        </h2>
        <a
          href="#"
          className="text-indigo-600 hover:text-indigo-700 font-medium text-xs sm:text-sm transition-colors"
        >
          View All Courses
        </a>
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="block md:hidden -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {coursesData.map((course) => (
            <div
              key={course.id}
              className="min-w-[260px] w-[75vw] max-w-[320px] flex-shrink-0 snap-start"
            >
              <CourseCard course={course} onPlay={setSelectedCourse} />
            </div>
          ))}
          <div className="w-1 flex-shrink-0" />
        </div>
      </div>

      {/* Desktop/Tablet: Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {coursesData.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onPlay={setSelectedCourse}
          />
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCourse(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl relative z-10"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedCourse.videoId}?autoplay=1`}
                  title={selectedCourse.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Course Details in Modal */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedCourse.title}
                    </h3>
                    <p className="text-gray-600">
                      Instructor:{" "}
                      <span className="font-medium text-gray-900">
                        {selectedCourse.instructor}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {selectedCourse.duration} Total
                    </span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                      Resuming at {selectedCourse.currentTime}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
