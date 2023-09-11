import React from "react";
import Header from "./../components/Header";
import Head from "next/head";
import Footer from "./../components/Footer";

function aboutus() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="h-full justify-between items-center space-y-10 md:space-x-10  flex flex-col md:flex-row py-10 px-5 md:px-20">
        <div className="flex-1">
          <span className="fontRegular text-sm font-bold text-gray-500 uppercase">
            About us
          </span>
          <p className="fontRegular mt-5 mb-4 text-justify">
            Mentorship is the influence, guidance, and direction given by a
            mentor. This might entail assisting you in achieving your
            professional or personal objectives, exposing you to fresh
            perspectives, pressing your limiting beliefs, imparting essential
            life lessons, and much more.
          </p>
          <p className="fontRegular text-justify">
            TheNnect is digital connective tissue that creates engagement
            between mentors and mentees to accelerate growth. TheNnect manages
            the matching process and benefits the mentor-mentee to develop a
            mutually beneficial one-on-one professional relationship. Our
            recommendations are narrowed down for an individual mentee on the
            basis of qualifications, interests, and goals.
          </p>
        </div>
        <div className="flex-1">
          <img src="/about us.png" alt="group of peoples" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default aboutus;
