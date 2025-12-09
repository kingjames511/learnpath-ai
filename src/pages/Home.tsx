import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeProfile from "../components/HomeProfile";
import HomeText from "../components/HomeText";
import Navbar from "../components/Navbar";
import { NoiseBackground } from "@/components/ui/noise-background";
import Testimony from "./Testimony";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const testimonyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Ensure refs are available
    if (!heroRef.current || !aboutRef.current || !testimonyRef.current) return;

    // Create ScrollTrigger for pinning hero section
    const pinTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });

    // Animate about section sliding in
    gsap.fromTo(
      aboutRef.current,
      {
        y: "100%",
      },
      {
        y: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      }
    );

    // Pin about section and slide in testimony
    const aboutPinTrigger = ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });

    // Animate testimony section sliding in
    gsap.fromTo(
      testimonyRef.current,
      {
        y: "100%",
      },
      {
        y: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      }
    );

    // Cleanup function
    return () => {
      pinTrigger.kill();
      aboutPinTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} id="home" className="h-screen bg-[#191a2c] relative z-10">
        <Navbar />
        <HomeText />
        <HomeProfile />
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl h-full mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-around h-full gap-12">
            
            {/* Left Content Section */}
            <div className="space-y-8 lg:w-1/2">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  A new way to learn
                  <br />
                  <span className="text-gray-800">& get knowledge</span>
                </h1>
                
                <p className="text-gray-600 text-base sm:text-lg max-w-md">
                  EduPro is here for you with various courses & materials from skilled tutors all around the world
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <NoiseBackground
                    containerClassName="w-fit p-2 rounded-full"
                    gradientColors={[
                      "rgb(192, 132, 252)",
                      "rgb(147, 51, 234)",
                      "rgb(168, 85, 247)",
                    ]}
                  >
                    <button className="h-full w-full cursor-pointer rounded-full bg-gradient-to-r from-neutral-100 via-neutral-100 to-white px-6 py-2 text-black shadow-[0px_2px_0px_0px_rgba(245,245,245,1)_inset,0px_0.5px_1px_0px_rgba(163,163,163,1)] transition-all duration-100 active:scale-[0.98] font-medium">
                      Join the Class &rarr;
                    </button>
                  </NoiseBackground>
                  <button className="px-6 py-3 bg-white text-gray-700 rounded-full font-medium border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Learn more
                  </button>
                </div>
              </div>
              
              {/* Statistics */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900">15,2K</div>
                  <div className="text-sm text-gray-600">Active students</div>
                </div>
                
                <div className="w-px bg-gray-300"></div>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900">4,5K</div>
                  <div className="text-sm text-gray-600">Tutors</div>
                </div>
                
                <div className="w-px bg-gray-300"></div>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8h4V6h-4V2h-2v4h-4v2h4v4h2V8z" fill="currentColor" />
                      <path d="M2 12c0 5.5 4.5 10 10 10s10-4.5 10-10" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-600">Resources</div>
                </div>
              </div>
            </div>
            
            {/* Right Image Cards Section */}
            <div className="w-auto relative bg-transparent h-[500px] lg:w-1/2">
              <div className="h-[250px] relative rounded-lg w-[200px] bg-[#B8A4E2]">
                <div className="absolute -left-4 -top-1 w-[50px] h-[50px] bg-gradient-to-br from-gray-50 to-purple-50 rounded-br-full"></div>
              </div>  
        
              <div className="relative h-[200px] w-[300px] mt-10 rounded-lg bg-[#AAD7EA]">
                <div className="absolute w-[150px] top-0 -right-0 flex justify-center items-center p-4 rounded-tl-2xl rounded-bl-2xl h-[50px] bg-gradient-to-br from-gray-50 to-purple-50">
                  <div className="w-full rounded-2xl bg-[#AAD7EA] h-8"></div>
                </div>
              </div>

              <div className="h-[250px] absolute top-10 left-52 w-[200px] rounded-lg bg-[#87A370]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimony Section */}
      <section ref={testimonyRef} id="testimony" className="relative z-30">
        <Testimony />
      </section>

      {/* You can add more sections here like Features, Courses, Contact, etc. */}
    </div>
  );
};

export default Home;
