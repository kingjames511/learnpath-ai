import React, { useEffect } from "react";
import { fetchYoutubeCourse } from "../../scripts/fetch-youtube-course";
const Home = () => {
  // useEffect(() => {
  //   const get = async () => {
  //     await fetchYoutubeCourse();
  //     console.log("fetched");
  //   };

  //   get();
  // }, []);
  return (
    <div className="container flex-center">
      <div text-red-500 w-full text-center>
        Landing page
      </div>
    </div>
  );
};

export default Home;
