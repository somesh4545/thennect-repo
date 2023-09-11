import React from "react";
import Link from "next/link";

function LinkItem(props) {
  const { href, setActiveNav, activeNav, text } = props;
  return (
    <Link href={href}>
      <div className={`cursor-pointer`} onClick={() => setActiveNav(text)}>
        <span
          className={`fontRegular text-lg ${
            activeNav == text ? "gradient-text font-bold" : ""
          }`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
}

export default LinkItem;
