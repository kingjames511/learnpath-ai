import HomeProfile from "../components/HomeProfile";
import HomeText from "../components/HomeText";
import Navbar from "../components/Navbar";
// import { useGSAPScroll } from "../Hook/useGSAPScroll";

const Home = () => {
  // Use the custom GSAP scroll hook for scroll-triggered animations
  // const sections = [
  //   {
  //     ref: heroRef,
  //     pin: true,
  //     pinSpacing: false,
  //   },
  //   {
  //     ref: aboutRef,
  //     slideFrom: "bottom" as const,
  //     pin: true,
  //     pinSpacing: false,
  //   },
  //   {
  //     ref: testimonyRef,
  //     slideFrom: "bottom" as const,
  //   },
  // ];

  // Use the custom GSAP scroll hook for scroll-triggered animations
  // useGSAPScroll({ sections });

  return (
    <div className="w-full h-screen bg-[#191a2c] overflow-hidden flex justify-center">
     
      <section id="home" className="  flex flex-col justify-around z-10">
        <Navbar />
        <HomeText />
        <HomeProfile />
      </section>
    </div>
  );
};

export default Home;
