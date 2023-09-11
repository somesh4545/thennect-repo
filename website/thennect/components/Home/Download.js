import React from "react";

function Download() {
  return (
    <div className="my-20 p-10 mx-5 md:mx-20 bg-black rounded-3xl flex flex-col items-center md:flex-row">
      <div className="w-full">
        <h2 className="header text-white">Download the app now</h2>
        <h5 className="text-gray-50 text-sm py-5">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
        </h5>
        <div className="md:space-x-5 space-y-5 md:space-y-0 flex flex-col md:flex-row">
          <a
            href="https://thennect.page.link/download_app"
            className="gradient text-white text-xl md:text-2xl flex flex-row justify-center cursor-pointer items-center px-5 py-2 bg-cyan-600 rounded-full"
          >
            <img
              src="/playstore.png"
              alt="play store logo"
              className="w-8 h-8 mr-2"
            />{" "}
            Google Play
          </a>

          <button className="gradient text-white text-xl md:text-2xl flex flex-row justify-center  cursor-pointer items-center px-5 py-2 bg-cyan-600 rounded-full">
            <img
              src="/appstore.png"
              alt="app store logo"
              className="w-8 h-8 mr-2"
            />{" "}
            Comming soon
          </button>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-10 md:mt-0">
        <img
          loading="lazy"
          alt="app-img"
          src="https://cdn.dribbble.com/users/427857/screenshots/14390260/media/8613d80ed1b4b6f57679223da9524083.png?compress=1&resize=400x300"
        />
      </div>
    </div>
  );
}

export default Download;
