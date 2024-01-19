import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "../style.js";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [toggle, setNav] = useState(false);
  const menuRef = useRef(null);

  const toggleNav = () => {
    setNav(!toggle);
  };

  useEffect(() => {
    const handleResize = () => {
      // menu close greater than mobile/med
      if (window.innerWidth > 768) {
        setNav(false);
      }
    };

    const closeNavOnClickOutside = (event) => {
      if (
        toggle &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setNav(false);
      }
    };

    const handleClickOutside = (event) => {
      closeNavOnClickOutside(event);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div className="flex justify-between items-center h-24 max-w-screen-xl mx-auto px-4 text-white">
      <div className="mb-4 md:w-auto">
        <Link to="/">
          <img
            src="/ReRoute_Logo_Scale_1.svg"
            alt="ReRoute"
            className="w-full md:w-[150px] sm:w-[150px] xs:w-[150px] xxs:w-[100px] mx-auto"
          />
        </Link>
      </div>
      <ul
        className={`p-12 hidden md:flex ${toggle ? "md:hidden" : ""} ml-auto`}
      >
        <li className={`${styles.navtext}`}>
          <Link to="/about">About</Link>
        </li>
        <li className={`${styles.navtext}`}>
          <a href="" className="">
            Algorithm
          </a>
        </li>
        <li className={`${styles.navtext}`}>
          <Link to="/help">Help</Link>
        </li>
        <li className={`${styles.navbutton}`}>
          <Link to="/startrouting">Get Started</Link>
        </li>
      </ul>

      <div
        onClick={toggleNav}
        className="md:hidden flex flex-1 justify-end items-center"
      >
        {toggle ? (
          <AiOutlineClose size={20} className={`${styles.menu}`} />
        ) : (
          <AiOutlineMenu size={20} className={`${styles.menu}`} />
        )}
        <Link to="/startrouting" className={`${styles.navbutton}`}>
          Get Started
        </Link>
      </div>

      <div
        ref={menuRef}
        className={`transition-transform duration-500 ${toggle ? "transform translate-x-0" : "transform -translate-x-full"} z-50 fixed left-0 top-0 w-[60%] h-full border-r-gray-900 bg-primary`}
      >
        <div className="mb-4 md:w-[150px]">
          <Link to="/">
            <img
              src="/ReRoute_Logo_Scale_2.svg"
              alt="ReRoute"
              className={`${toggle ? "justify-start md:w-[150px] sm:w-[150px] xs:w-[150px] xxs:w-[150px]" : "justify-start w-full md:w-[150px]justify-start sm:w-[150px] xs:w-[150px] xxs:w-[150px] mx-auto"}`}
            />
          </Link>
        </div>
        <ul className="pt-12 uppercase">
          <li className={`${styles.navtextmenu}`}>
            <Link to="/about">About</Link>
          </li>
          <li className={`${styles.navtextmenu}`}>
            <a href="" className="">
              Algorithm
            </a>
          </li>
          <li className={`${styles.navtextmenu}`}>
            <Link to="/help">Help</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
