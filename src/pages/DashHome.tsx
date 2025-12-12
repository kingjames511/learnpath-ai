import React, { useState, useEffect } from 'react';
import { 
  MoreVertical, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  Edit2, 
  Square, 
  X,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Services/contextApi/AuthContext';
import { getUserEnrolledCourses } from '../Services/courseService';
import type { UserCourse } from '../types/types';

export const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<UserCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const courses = await getUserEnrolledCourses(user!.id);
      setEnrolledCourses(courses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Stats
  const totalCourses = enrolledCourses.length;
  const avgScore = enrolledCourses.length > 0 
    ? (enrolledCourses.reduce((acc, curr) => acc + curr.progress, 0) / enrolledCourses.length).toFixed(1)
    : 0;
  const completedModules = enrolledCourses.filter(c => c.is_completed).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:px-8 font-sans">
      <div className="max-w-full mx-auto space-y-3">
        
        {/* Header Text */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className=''
        >
          <p className="text-gray-500">In this page, you can view your learning progress and statistics.</p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap gap-2"
        >
          {["Overview", "Analytics", "Report Generator"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2  rounded-md text-md font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#a7e629] text-black shadow-md shadow-lime-200"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Primary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#191a2c] text-white  p-6 shadow-md relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-300">Total courses enrolled</h3>
              <button className="text-gray-400 hover:text-white"><MoreVertical size={18} /></button>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold">{totalCourses}</span>
            </div>
            <div className="text-xs text-[#a7e629] font-medium mb-4">
              Top 5% of community
            </div>
            
            {/* Sparkline SVG */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 group-hover:opacity-40 transition-opacity">
               <svg viewBox="0 0 100 25" className="w-full h-full" preserveAspectRatio="none">
                 <path d="M0 25 L0 20 Q 10 20 20 15 T 40 10 T 60 15 T 80 5 T 100 0 V 25 Z" fill="#a7e629" />
                 <path d="M0 20 Q 10 20 20 15 T 40 10 T 60 15 T 80 5 T 100 0" fill="none" stroke="#a7e629" strokeWidth="2" />
               </svg>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white  p-6 shadow-sm border border-gray-100 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-500">Avg. quiz score</h3>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
            </div>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">{avgScore}%</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-red-500 font-medium mb-4">
              <TrendingDown size={14} />
              <span>14.8% to last week</span>
            </div>
             {/* Sparkline SVG */}
             <div className="absolute bottom-4 right-4 w-24 h-12">
               <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                 <path d="M0 20 Q 20 10 40 30 T 70 25 T 100 40" fill="none" stroke="#ef4444" strokeWidth="2" />
               </svg>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white  p-6 shadow-sm border border-gray-100 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-500">Completed modules</h3>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
            </div>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">{completedModules}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600 font-medium mb-4">
              <TrendingUp size={14} />
              <span>16.5% to last week</span>
            </div>
             {/* Sparkline SVG */}
             <div className="absolute bottom-4 right-4 w-24 h-12">
               <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                 <path d="M0 40 Q 20 35 40 10 T 70 15 T 100 5" fill="none" stroke="#16a34a" strokeWidth="2" />
               </svg>
            </div>
          </motion.div>
        </div>

        {/* Controls Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-between items-center"
        >
          <div className="relative w-full md:w-[500px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a7e629] focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#a7e629]/10 text-[#191a2c] rounded-md text-sm font-medium hover:bg-[#a7e629]/20 transition-colors">
              Active Courses
              <X size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Filters
              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-bold">1</span>
            </button>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-md shadow-xs border border-gray-100 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-gray-900">Course Progress</h2>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <Download size={18} />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#191a2c] text-[#a7e629] rounded-lg text-sm font-medium hover:bg-[#191a2c]/90 transition-colors shadow-lg shadow-gray-200">
                <Plus size={18} />
                New Course
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-sm">
                  <th className="p-4 w-12 text-center">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center mx-auto cursor-pointer">-</div>
                  </th>
                  <th className="p-4 font-medium">Course name</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium w-1/3">Progress</th>
                  <th className="p-4 font-medium">Last accessed</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">Loading courses...</td>
                    </tr>
                  ) : enrolledCourses.length === 0 ? (
                     <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">No courses enrolled yet.</td>
                    </tr>
                  ) : (
                    enrolledCourses.map((userCourse, index) => (
                      <motion.tr 
                        key={userCourse.id} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                        className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <td className="p-4 text-center">
                          <button className={`transition-colors text-gray-300 hover:text-gray-400`}>
                            <Square size={20} />
                          </button>
                        </td>
                        <td className="p-4 font-semibold text-gray-900">{userCourse.course?.title || "Unknown Course"}</td>
                        <td className="p-4 text-gray-500">{userCourse.course?.topics?.[0] || "General"}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#a7e629] rounded-full"
                                style={{ width: `${userCourse.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-600 w-8 text-right">{userCourse.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-500">{new Date(userCourse.last_accessed).toLocaleDateString()}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-[#191a2c] hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-center">
            <div className="flex gap-1">
              {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
                <button 
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    page === 1 
                      ? "bg-[#191a2c] text-[#a7e629]" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
