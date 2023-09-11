import React from "react";

const Hero = () => {
  return (
    <div className="h-full items-center flex flex-col md:flex-row py-10 px-5 space-y-10 md:space-y-0 md:px-20">
      <div className="flex-1 md:pr-10">
        <h2 className="fontRegular text-6xl mb-10  md:mb-7">
          Find <span className="gradient-text">best mentors</span>
          <br />
          to solve your problems
        </h2>
        <h3 className="fontRegular hidden md:flex text-lg text-gray-700 mb-7">
          Get started within minutes and find trusted mentors and also help
          other mentees
        </h3>
        <a
          href="https://thennect.page.link/download_app"
          className="gradient text-white text-2xl cursor-pointer items-center px-5 py-2 bg-cyan-600 rounded-full"
        >
          Get started
        </a>
      </div>
      <div className="flex-1">
        <img src="/hero.png" alt="growth image" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default Hero;
