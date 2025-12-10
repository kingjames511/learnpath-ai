import React, { useState } from 'react';
import { 
  MoreVertical, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckSquare, 
  Square, 
  X,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

// Mock Data
const COURSES_DATA = [
  {
    id: 1,
    name: "JavaScript Fundamentals",
    category: "Frontend Development",
    progress: 50,
    lastEdited: "23 Feb 2024",
    selected: true
  },
  {
    id: 2,
    name: "C# ASP .NET Core",
    category: "Backend Development",
    progress: 75,
    lastEdited: "17 Jan 2024",
    selected: false
  },
  {
    id: 3,
    name: "Python for Data Science",
    category: "Software Engineering",
    progress: 80,
    lastEdited: "15 Nov 2023",
    selected: true
  },
  {
    id: 4,
    name: "Machine Learning Basics",
    category: "Data Science",
    progress: 55,
    lastEdited: "10 Nov 2023",
    selected: true
  },
  {
    id: 5,
    name: "Neural Networks Deep Dive",
    category: "AI Engineering",
    progress: 90,
    lastEdited: "24 Aug 2023",
    selected: false
  },
  {
    id: 6,
    name: "UI/UX Design Principles",
    category: "Design",
    progress: 60,
    lastEdited: "05 Mar 2023",
    selected: true
  }
];

export const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Text */}
        <div>
          <p className="text-gray-500">In this page, you can view your learning progress and statistics.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {["Overview", "Analytics", "Report Generator"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#a7e629] text-black shadow-md shadow-lime-200"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Primary */}
          <div className="bg-[#191a2c] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-300">Total courses enrolled</h3>
              <button className="text-gray-400 hover:text-white"><MoreVertical size={18} /></button>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold">1,619</span>
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
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-500">Avg. quiz score</h3>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
            </div>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">63.34%</span>
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
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-500">Completed modules</h3>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
            </div>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">169</span>
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
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a7e629] focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#a7e629]/10 text-[#191a2c] rounded-xl text-sm font-medium hover:bg-[#a7e629]/20 transition-colors">
              Active Courses
              <X size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Filters
              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-bold">1</span>
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
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
                {COURSES_DATA.map((course) => (
                  <tr key={course.id} className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="p-4 text-center">
                      <button className={`transition-colors ${course.selected ? 'text-[#191a2c]' : 'text-gray-300 hover:text-gray-400'}`}>
                        {course.selected ? <CheckSquare size={20} /> : <Square size={20} />}
                      </button>
                    </td>
                    <td className="p-4 font-semibold text-gray-900">{course.name}</td>
                    <td className="p-4 text-gray-500">{course.category}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#a7e629] rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 w-8 text-right">{course.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">{course.lastEdited}</td>
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
                  </tr>
                ))}
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
        </div>

      </div>
    </div>
  );
};
