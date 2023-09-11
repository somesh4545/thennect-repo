import React from "react";

function Footer() {
  return (
    <footer className="bg-white md:flex md:items-center md:justify-between md:py-5 px-10 py-5 md:px-20 dark:bg-gray-800">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="/" className="hover:underline">
          TheNnect™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        {/* <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Contact Us
          </a>
        </li> */}
      </ul>
    </footer>
  );
}

export default Footer;
