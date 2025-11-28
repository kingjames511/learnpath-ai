import { useState } from "react";
import { 
  Menu, 
  Search, 
  Bell, 
  Bot 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC<{ 
  onMenuClick: () => void; 
  onProfileClick: () => void;
  title?: string 
}> = ({
  onMenuClick,
  onProfileClick,
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30 px-4 lg:px-6 flex items-center justify-between transition-all duration-300">
      {/* Left Section: Logo & Mobile Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100/80 rounded-xl transition-colors text-gray-600"
        >
          <Menu size={22} />
        </button>
        
        {/* Logo - Matches Sidebar Style */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 hidden sm:block">
           Welcome Back
          </span>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Expandable Search */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {isSearchExpanded && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 400, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                type="text"
                placeholder="Search..."
                className="absolute right-10 h-9 px-3 text-sm bg-gray-100/50 border border-gray-200 rounded-lg focus:outline-none"
                autoFocus
                onBlur={() => setIsSearchExpanded(false)}
              />
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className={`p-2 rounded-lg transition-colors ${isSearchExpanded ? 'bg-green-50 text-green-600' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <Search size={20} />
          </motion.button>
        </div>

        {/* AI Chat */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2  text-gray-500 hover:text-green-600 rounded-xl transition-colors relative group"
        >
          <Bot size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white scale-0 group-hover:scale-100 transition-transform" />
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-gray-100 text-gray-500 hover:text-green-600 rounded-xl transition-colors relative"
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
        </motion.button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 mx-1" />

        {/* User Profile */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onProfileClick}
          className="flex items-center gap-3 pl-1"
          aria-label="Toggle profile panel"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-green-500 to-emerald-500 p-[2px] shadow-md shadow-green-500/20">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
               {/* Replace with actual image if available */}
               <span className="text-xs font-bold text-green-700">RF</span>
            </div>
          </div>
        </motion.button>
      </div>
    </header>
  );
};
