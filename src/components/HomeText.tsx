import { motion } from 'framer-motion';

import ColourfulText from '@/components/ui/colourful-text';
const HomeText = () => {
  return (
    <section className="w-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-4 md:py-4">
      <div className="max-w-6xl relative mx-auto text-center">
        {/* Decorative Image - Left */}
        <motion.div 
          className='absolute top-28 -left-48 w-24 h-24 bg-transparent'
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          {/* <img src={photo} className='w-full px-4 h-full object-cover -z-10' alt="" /> */}
        </motion.div>
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ColourfulText text="GROW UP" /> YOUR<br/> SKILL <ColourfulText text='IN MINUTES' />
        </motion.h1>
        {/* Decorative Image - Right */}
        <motion.div 
          className='absolute top-20 -right-24 skew-x-12 w-18 h-24 bg-transparent'
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
            {/* <img src={photo2} className='w-full px-4 h-full object-cover -z-10' alt="" /> */}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Get Started Button with Shimmer */}
          <button className="relative px-8 md:px-10 py-2 md:py-2 text-black bg-[#a7e629] rounded-full font-semibold text-base md:text-lg hover:bg-white transition-colors overflow-hidden">
            <span className="relative z-10">Get Started</span>
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

          {/* Try for Free Link */}
          <a 
            href="#" 
            className="text-white font-medium text-base md:text-lg hover:text-[#a7e629] transition-colors underline underline-offset-4"
          >
            Try for free
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeText;
