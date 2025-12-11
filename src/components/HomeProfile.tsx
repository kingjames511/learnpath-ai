import { motion } from 'framer-motion';
import student from '../assets/student.png'

import { cn } from "../lib/utlis";
export function GridBackgroundDemo() {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Backgrounds
      </p>
    </div>
  );
}

const HomeProfile = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container - 3 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SECTION - First Write-ups */}
          <motion.div 
            className="space-y-8 order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Happy Students Stats */}
            <div className="flex items-start jusitify-center md:ml-24 gap-4">
              <div className="w-10 h-10 bg-[#a7e629] rounded-full flex items-center justify-center text-2xl">
                😊
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl p-0 m-0 font-bold text-white">600</h3>
                <p className="text-gray-400 text-sm p-0 m-0">Happy Student</p>
              </div>
            </div>

            {/* Quote */}
            <div className="space-y-2 md:ml-24 ">
              <p className="text-white text-2xl w-full max-w-xl md:text-3xl leading-relaxed">
                "Explore Unlimited Courses That Fit You The Process of Skill Development."
              </p>
              <a 
                href="#sign-in" 
                className="inline-flex items-center gap-2 text-white hover:text-[#a7e629] transition-colors font-medium"
              >
                LET'S GO <span>→</span>
              </a>
            </div>

            {/* Profile */}
            <div className="flex items-center  md:ml-24 gap-3">
              <div className="w-12 h-12 bg-gray-600 rounded-full overflow-hidden">
                <img 
                  src={student}
                  alt="Marvin McKinney" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white p-0 m-0 font-medium">Marvin</p>
                <p className="text-gray-400 p-0 m-0 text-sm">McKinney</p>
              </div>
            </div>
          </motion.div>

          {/* CENTER SECTION - Main Image */}
          <motion.div 
            className="order-2 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden">
              {/* Grid Background Effect using Aceternity Pattern */}
              <div
                className={cn(
                  "absolute inset-0 z-0",
                  "[background-size:40px_40px]",
                  "[background-image:linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)]",
                )}
              />
              {/* Radial gradient for faded look */}
              <div className="pointer-events-none absolute inset-0 bg-[#191a2c] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-0"></div>
              
              {/* Main Image */}
              <div className="relative z-10">
                <img 
                  src={student} 
                  alt="Student" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT SECTION - Second Write-ups */}
          <motion.div 
            className="space-y-8 order-3 lg:order-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Circular Text - "GET IN TOUCH" */}
            <div className="flex justify-center">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="fill-white text-[8px] font-medium tracking-widest">
                    <textPath href="#circlePath">
                      GET IN TOUCH • GET IN TOUCH • GET IN TOUCH NOW
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl">✈</span>
                </div>
              </div>
            </div>

            {/* 5 Star Rating */}
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-white m-0 p-0">5 Star Rating</h3>
              <p className="text-gray-400 text-sm m-0 p-0">Avg rating 4.8 makes us world best</p>
              <div className="flex justify-center items-center gap-0 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>
            </div>

            {/* Active Students */}
            <div className=" flex flex-col justify-end items-center">
              <h3 className="text-2xl text-left md:text-3xl font-bold text-white m-0 p-0">2.5M+</h3>
              <p className="text-gray-400 text-sm">Total active student</p>
            </div>

            {/* Total Courses */}
            <div className="text-center ">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">137</h3>
              <p className="text-gray-400 text-sm">Total Course</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HomeProfile;
