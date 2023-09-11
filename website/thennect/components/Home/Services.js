import React from "react";
import ServiceCard from "./ServiceCard";

function Services() {
  return (
    <>
      <div className="py-10 px-5 md:px-20">
        <div className="flex justify-center mb-3">
          <h2 className="header">Key Features</h2>
        </div>
        <div className="flex flex-col md:flex-row">
          <ServiceCard
            title="One-on-On"
            description={"We provide an open platform for one-to-one mentoring"}
            imgSrc="/service1.png"
          />
          <ServiceCard
            title="Pontoon"
            description={
              "A Bridge between connections to cater to the issues in a clear and concise manner"
            }
            imgSrc="/service2.png"
          />
          <ServiceCard
            title="Connect and grow"
            description={
              "A continuous connection between the mentor and mentee to focus on passing expertise & precise skills to each other so they can develop and grow."
            }
            imgSrc="/service3.png"
          />
        </div>
      </div>

      {/* future  */}
      <div className="py-10 px-5 md:px-20">
        <div className="flex justify-center mb-3">
          <h2 className="header">Upcoming</h2>
        </div>
        <div className="flex flex-col md:flex-row">
          <ServiceCard title="Career consulting services" />
          <ServiceCard title="Expert-recommended certification courses" />
          <ServiceCard title="In-house career finding programs" />
          <ServiceCard title="Group & corporate mentoring programmes" />
        </div>
      </div>
    </>
  );
}

export default Services;
