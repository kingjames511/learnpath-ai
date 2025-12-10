import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const navigate = useNavigate()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full sticky top-0 z-50">
      {/* Main Navbar Container with padding for centered alignment */}
      <div className=" max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center h-16">
          
          {/* Logo Section - Left */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-white hover:text-[#a7e629] transition-colors">
             Dev.
            </a>
          </div>

          {/* Nav Items - Closer to Logo (Hidden on mobile) */}
          <div className="hidden md:flex  items-center space-x-8 ml-40">
            <a href="#home" className="text-white hover:text-[#a7e629] font-medium transition-colors">
              Home
            </a>
            <a href="#about" className="text-white hover:text-[#a7e629] font-medium transition-colors">
              About
            </a>
            <a href="#courses" className="text-white hover:text-[#a7e629] font-medium transition-colors">
              Courses
            </a>
            <a href="#contact" className="text-white hover:text-[#a7e629] font-medium transition-colors">
              Contact
            </a>
          </div>

          {/* Buttons - Right (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
             <button onClick={()=> navigate('/sign-in')} className="px-5 py-2  text-white font-medium hover:text-[#a7e629] transition-colors">
              Login
            </button>
            {/* Animated Button with Shimmer Effect */}
            <button className="relative px-4 py-2 text-black bg-[#a7e629] rounded-full capitalize font-semibold hover:bg-white transition-colors overflow-hidden">
              <span className="relative z-10">start for free</span>
              {/* Animated Shimmer Overlay */}
              <motion.div
                className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none -skew-x-12"
                animate={{
                  x: ['-100%', '400%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </button>
           
          </div>

          {/* Hamburger Menu Button - Mobile Only */}
          <div className="md:hidden ml-auto">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-[#a7e629] focus:outline-none focus:text-[#a7e629] transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Shown when hamburger is clicked) - Slides from bottom */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-[#191a2c] shadow-2xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="px-6 pt-4 pb-6 space-y-3 border-t-2 border-[#a7e629]">
          {/* Mobile Nav Items */}
          <a
            href="#home"
            className="block px-4 py-2 text-white hover:bg-[#a7e629]hover:text-[#a7e629] rounded-lg transition-colors font-medium"
          >
            Home
          </a>
          <a
            href="#about"
            className="block px-4 py-2 text-white hover:bg-[#a7e629]hover:text-[#a7e629] rounded-lg transition-colors font-medium"
          >
            About
          </a>
          <a
            href="#courses"
            className="block px-4 py-2 text-white hover:bg-[#a7e629]hover:text-[#a7e629] rounded-lg transition-colors font-medium"
          >
            Courses
          </a>
          <a
            href="#contact"
            className="block px-4 py-2 text-white hover:bg-[#a7e629]hover:text-[#a7e629] rounded-lg transition-colors font-medium"
          >
            Contact
          </a>

          {/* Mobile Buttons */}
          <div className="pt-3 space-y-2">
            <button className="w-full px-5 py-2 text-[#a7e629] rounded-lg font-medium hover:bg-[#a7e629]transition-colors">
              Sign Up
            </button>
            <button className="w-full px-5 py-2 bg-[#a7e629] text-white rounded-full font-medium hover:bg-[#a7e629] transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
