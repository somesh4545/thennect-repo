import React from "react";

const data = [
  {
    id: 1,
    img: "./working1.png",
    title: "Sign up and make your mentoring profile",
  },
  { id: 2, img: "./working3.png", title: "Find your mentoring connection" },
  { id: 3, img: "./working2.png", title: "Connect and grow further" },
];

function Working() {
  return (
    <div className="py-10 px-5 md:px-20">
      <div className="flex justify-center mb-3">
        <h2 className="header">How it works</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col-reverse md:flex-row items-center mb-5 md:mb:1">
          <div className="w-full object-contain items-center justify-center flex">
            <img src={data[0].img} alt="working image 1" loading="lazy" />
          </div>
          <div className="w-full">
            <h2 className="text-2xl text-black font-bold pb-3">
              1. {data[0].title}
            </h2>
            <h3 className="text-sm text-justify mb-5">
              The Nnect is an open network with professionals and students from
              150+ streams signed up and volunteering to help individuals with
              mentoring in a wide range of industries, from across the world.
              Whether a student, professional, freelancer, or entrepreneur can
              benefit from this platform.
            </h3>
            <h3 className="text-sm text-justify">
              Create your profile within a minute, choose whether you would like
              to volunteer to be a mentor, find yourself a mentor, or both.
            </h3>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row-reverse items-center mb-5 md:mb:1">
          <div className="w-full object-contain flex items-center justify-center">
            <img src={data[1].img} alt="working image 2" loading="lazy" />
          </div>
          <div className="w-full">
            <h2 className="text-2xl text-black font-bold pb-3">
              2. {data[1].title}
            </h2>
            <h3 className="text-sm text-justify mb-5">
              With profile details provided by you, TheNnect’s mentoring
              algorithm will suggest a range of the best mentoring matches for
              you based on your qualification, experience, objectives, and goals
              and where you&#39;re looking for mentoring.
            </h3>
            <h3 className="text-sm text-justify">
              If you&#39;d like to be more proactive, you can search for mentors
              and mentees by a variety of search filters. Our mentor matching
              ideas take availability, industry, important focal areas,
              location, and keyword relevancy into account. You can request
              mentors for communication through the chatbox, or longer-term
              mentoring can be catered through meeting schedules.
            </h3>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center mb-5 md:mb:1">
          <div className="w-full object-contain items-center justify-center flex">
            <img src={data[2].img} alt="working image 3" loading="lazy" />
          </div>
          <div className="w-full">
            <h2 className="text-2xl text-black font-bold pb-3">
              3. {data[2].title}
            </h2>
            <h3 className="text-sm text-justify">
              Connecting on TheNnect is about establishing a network and
              nurturing long-term, mutually beneficial relationships with the
              people you connect with. After achieving a short-term goal, expand
              your connections, set a primary goal, and network with those who
              share a common passion with you.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Working;
