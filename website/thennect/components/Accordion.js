import React, { useState } from "react";

function Accordion(props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="flex flex-col p-3 border-b text-gray-light cursor-pointer"
    >
      <div className="flex flex-row items-center">
        <p
          className={`fontRegular flex-auto ${
            expanded ? "text-gray-dark font-black" : "font-normal"
          }`}
        >
          {props.title}
        </p>
        <img
          className="flex-none w-3"
          src="/chevron-down-solid.svg"
          alt="arrow down"
        />
      </div>
      <div
        className={`my-2 transition-max-height duration-700 ease-in-out overflow-y-scroll ${
          expanded ? "max-h-60" : "max-h-0"
        }`}
      >
        {props.description.map((item) => {
          return <li>{item}</li>;
        })}
      </div>
    </div>
  );
}

export default Accordion;
