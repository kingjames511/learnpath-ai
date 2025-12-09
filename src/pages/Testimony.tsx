import React from 'react';

const Testimony: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        
        {/* Floating Avatar Images - Positioned Around */}
        <div className="absolute top-12 left-8 sm:left-16 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"></div>
        <div className="absolute top-20 left-32 sm:left-48 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg"></div>
        <div className="absolute bottom-32 left-16 sm:left-24 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg"></div>
        <div className="absolute top-32 sm:top-40 left-10 sm:left-16 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg"></div>
        
        <div className="absolute top-12 right-8 sm:right-16 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg"></div>
        <div className="absolute top-32 sm:top-40 right-32 sm:right-48 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg"></div>
        <div className="absolute bottom-32 right-16 sm:right-24 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg"></div>
        <div className="absolute top-48 sm:top-56 right-10 sm:right-16 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg"></div>

        {/* Main Content Container */}
        <div className="relative z-10 text-center">
          
          {/* Header Section */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Our Clients send us bunch of smilies with our services and we love them
            </p>
          </div>

          {/* Central Testimonial Card */}
          <div className="flex flex-col items-center max-w-2xl mx-auto">
            
            {/* Large Central Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl mb-6 sm:mb-8 ring-4 ring-white">
            </div>

            {/* Quote Icon */}
            <div className="text-purple-400 text-5xl sm:text-6xl mb-4 sm:mb-6">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 px-4 italic">
              "From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded incommode"
            </blockquote>

            {/* Client Name */}
            <p className="text-gray-900 font-semibold text-lg sm:text-xl mb-3 sm:mb-4">
              Becky Nelson
            </p>

            {/* Star Rating */}
            <div className="flex gap-1 sm:gap-1.5">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
