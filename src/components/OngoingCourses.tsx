import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

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

const CourseCard = ({ course }: { course: Course }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className="flex-shrink-0 w-full sm:w-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Video Section */}
        <div className="relative aspect-video bg-gray-900">
          {!isPlaying ? (
            <>
              {/* Thumbnail */}
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />

              {/* Play Button Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <motion.div
                  className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-6 h-6 text-gray-900" fill="currentColor" />
                </motion.div>
              </div>

              {/* Duration Badges */}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-[10px] px-2 py-0.5 rounded">
                {course.currentTime}
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-[10px] px-2 py-0.5 rounded">
                {course.duration}
              </div>
            </>
          ) : (
            /* YouTube Iframe */
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${course.videoId}?autoplay=1`}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Course Info */}
        <div className="p-3">
          <p className="text-xs text-gray-500 mb-1">
            A Course by {course.instructor}
          </p>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
            {course.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export const OngoingCourses = () => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
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

      {/* Mobile: Horizontal Scroll with Drag */}
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
              <CourseCard course={course} />
            </div>
          ))}
          {/* Spacer for end padding */}
          <div className="w-1 flex-shrink-0" />
        </div>
      </div>

      {/* Desktop/Tablet: Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {coursesData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};
