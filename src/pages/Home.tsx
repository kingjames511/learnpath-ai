import HomeProfile from "../components/HomeProfile";
import HomeText from "../components/HomeText";
import Navbar from "../components/Navbar";
const Home = () => {
  return (
    <div className=" h-full md:h-screen bg-[#191a2c]">
      <Navbar />
      <HomeText/>
      <HomeProfile/>
    </div>
  );
};

export default Home;
