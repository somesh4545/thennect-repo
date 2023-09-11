import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LinkItem from "./Navigation/LinkItem";

const Header = () => {
  const [bg, setBg] = useState("bg-transparent");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  var listenScrollEvent = (e) => {
    if (window.scrollY > 100) {
      setBg("bg-opacity-100 backdrop-blur-lg");
    }
  };

  return (
    <>
      <header className={`mx-auto ${bg} sticky top-0 z-50`}>
        <div className="flex justify-between max-w-full p-5 px-5 md:px-20 transition duration-200">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <img
                  src="/logo.png"
                  className="cursor-pointer w-12 h-12 mr-2"
                  alt="TheNnect logo"
                />
                {/* <Image
                  src="/brand_name.png"
                  className="md:inline-flex cursor-pointer object-contain"
                  alt="brand-text"
                  height={32}
                  width={112}
                /> */}
                <h1 className="fontBold text-2xl primaryColor">TheNnect</h1>
              </div>
            </Link>
          </div>

          <div className="space-x-5 hidden items-center md:flex">
            <Link href={"/"}>
              <div className={`cursor-pointer`}>
                <span
                  className={`fontRegular text-xl ${
                    router.pathname == "/" ? "gradient-text font-bold" : ""
                  }`}
                >
                  Home
                </span>
              </div>
            </Link>
            <Link href={"/blogs"}>
              <div className={`cursor-pointer`}>
                <span
                  className={`fontRegular text-xl ${
                    router.pathname == "/blogs" ? "gradient-text font-bold" : ""
                  }`}
                >
                  Blogs
                </span>
              </div>
            </Link>
            <Link href={"/carrer-options"}>
              <div className={`cursor-pointer`}>
                <span
                  className={`fontRegular text-xl ${
                    router.pathname == "/carrer-options"
                      ? "gradient-text font-bold"
                      : ""
                  }`}
                >
                  Career Options
                </span>
              </div>
            </Link>
            <Link href={"/aboutus"}>
              <div className={`cursor-pointer`}>
                <span
                  className={`fontRegular text-xl ${
                    router.pathname == "/aboutus"
                      ? "gradient-text font-bold"
                      : ""
                  }`}
                >
                  About Us
                </span>
              </div>
            </Link>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Image
                  height={32}
                  width={24}
                  src="/hamburger.png"
                  alt="Navigation bar"
                  className="w-6"
                />
              ) : (
                <Image
                  alt="Navigation close"
                  height={32}
                  width={24}
                  src="/cut.png"
                  className="w-6"
                />
              )}
            </button>
          </div>
        </div>
        {isOpen ? (
          <div className="px-5 pb-5 md:hidden space-y-2 flex flex-col z-100 top-0">
            <Link href={"/"}>
              <div className={`cursor-pointer`}>
                <span
                  className={`fontRegular text-xl ${
                    router.pathname == "/" ? "gradient-text font-bold" : ""
                  }`}
                >
                  Home
                </span>
              </div>
            </Link>
            <Link href={"/blogs"}>
              <div className={`cursor-pointer`}>
                <span
                  className={`fontRegular text-xl ${
                    router.pathname == "/blogs" ? "gradient-text font-bold" : ""
                  }`}
                >
                  Blogs
                </span>
              </div>
            </Link>
            <Link href={"/carrer-options"}>
              <div className={`cursor-pointer`}>
                <span
                  className={`fontRegular text-xl ${
                    router.pathname == "/carrer-options"
                      ? "gradient-text font-bold"
                      : ""
                  }`}
                >
                  Career Options
                </span>
              </div>
            </Link>
            <Link href={"/aboutus"}>
              <div className={`cursor-pointer`}>
                <span
                  className={`fontRegular text-xl ${
                    router.pathname == "/aboutus"
                      ? "gradient-text font-bold"
                      : ""
                  }`}
                >
                  About Us
                </span>
              </div>
            </Link>
          </div>
        ) : null}
      </header>
    </>
  );
};

export default Header;
