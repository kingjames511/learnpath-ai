import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  FileText,
  ClipboardList,
  MessageSquare,
  Settings,
  MoreHorizontal,
  Menu,
  X,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
  { id: "reports", label: "Reports", icon: <FileText size={20} /> },
  {
    id: "assignment",
    label: "Assignment",
    icon: <ClipboardList size={20} />,
    badge: 4,
  },
  {
    id: "message",
    label: "Message",
    icon: <MessageSquare size={20} />,
    badge: 3,
  },
  { id: "settings", label: "Settings", icon: <Settings size={20} /> },
];

export const Sidebar: React.FC<{
  activeItem: string;
  onItemClick: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}> = ({ activeItem, onItemClick, isOpen, onClose }) => {
  const handleItemClick = (id: string) => {
    onItemClick(id);
    onClose(); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 h-screen bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Logo */}
        <div className="p-6  border-b-2">
          <div className="flex items-center  gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">
              Dali Learn
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full mt-1 rounded-sm flex items-center gap-3 px-4 py-2 mb-1 transition-colors ${
                activeItem === item.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.badge && (
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                    activeItem === item.id
                      ? "bg-indigo-800 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">RF</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800">
                Robert Fox
              </div>
              <div className="text-xs text-gray-500">@robertfox</div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <button className="w-full mt-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Log out
          </button>
        </div>
      </div>
    </>
  );
};
