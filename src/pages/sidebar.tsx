
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  FileText,
  ClipboardList,
  MessageSquare,
  Settings,
  MoreHorizontal,
  X,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={22} /> },
  { id: "courses", label: "Courses", icon: <BookOpen size={22} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={22} /> },
  { id: "reports", label: "Reports", icon: <FileText size={22} /> },
  {
    id: "assignment",
    label: "Assignment",
    icon: <ClipboardList size={22} />,
    badge: 4,
  },
  {
    id: "message",
    label: "Message",
    icon: <MessageSquare size={22} />,
    badge: 3,
  },
  { id: "settings", label: "Settings", icon: <Settings size={22} /> },
];

const sidebarVariants: Variants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: -300,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const itemVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const Sidebar: React.FC<{
  activeItem: string;
  onItemClick: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}> = ({ activeItem, onItemClick, isOpen, onClose }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (id: string) => {
    onItemClick(id);
    if (!isDesktop) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay with Blur */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 h-screen
          bg-white/80 backdrop-blur-xl border-r border-white/20
          shadow-2xl shadow-purple-500/5
          flex flex-col
          lg:translate-x-0
        `}
        variants={sidebarVariants}
        initial={false}
        animate={isDesktop || isOpen ? "visible" : "hidden"}
       
        style={{ 
          transform: isOpen ? "none" : undefined, 
        }}
      >
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
        </div>

        {/* Header / Logo */}
        <div className="px-8 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 -skew-x-12 bg-[#a7e629]">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
               Dev Learn
              </span>
            </div>
            
            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100/50 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4 scrollbar-hide">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                variants={itemVariants}
                onClick={() => handleItemClick(item.id)}
                className={`
                  relative w-full flex items-center gap-4 px-4 py-2 rounded-xl transition-all duration-300 group
                  ${isActive ? "text-white shadow-lg shadow-green-500/25" : "text-gray-600 hover:text-gray-900"}
                `}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active Background Gradient */}
                {isActive && (
                  <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-[#a7e629] rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover Background (Glass effect) */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gray-100/0 group-hover:bg-gray-100/50 rounded-xl transition-colors duration-300" />
                )}

                {/* Content */}
                <span className="relative z-10 flex items-center justify-center">
                  {item.icon}
                </span>
                <span className={`relative z-10 font-medium text-sm tracking-wide ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>

                {/* Badge */}
                {item.badge && (
                  <span className={`
                    relative z-10 ml-auto flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full
                    ${isActive ? "bg-white text-green-600" : "bg-green-100 text-green-600 group-hover:bg-green-200"}
                  `}>
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 m-4 mt-auto rounded-lg bg-white/50 border border-white/40 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                 <span className="text-sm font-bold text-indigo-600">RF</span>
                 {/* <img src="..." alt="User" /> */}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-900 truncate">Robert Fox</h4>
              <p className="text-xs text-gray-500 truncate">@robertfox</p>
            </div>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Log out</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};
