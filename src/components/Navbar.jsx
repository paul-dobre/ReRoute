import React from "react";
import {useState} from "react";
import styles from "../style.js";
import Button from "./Button";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


const Navbar = () => {
  const [nav, setNav] = useState(false)

  const toggleNav = () => {
    setNav(!nav)
    
  }
  return (
  <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <div className="mb-4 md:mb-0 md:w-auto">
        <Link to="/">
          <img
            src="/ReRoute_Logo_Scale_1.svg"
            alt="ReRoute"
            className="w-full md:w-[150px] sm:w-[100px] xs:w-[80px] mx-auto"
          />
        </Link>
      </div>
      <ul className="hidden md:flex">
        <li className="p-4 text-white mr-10 hover:text-secondary"> <Link to="/about">About</Link></li>
        <li className="p-4 text-white mr-10 hover:text-secondary"><a href="" className="">Algorithm</a></li>
        <li className="p-4 text-white mr-10 hover:text-secondary"><Link to="/help">Help</Link></li>
        <li className="flex p-4 text-white mr-10 hover:text-secondary"><Link to="/home">Get Started</Link></li>
        
      </ul>
      
      <div onClick={toggleNav} className ='md:hidden block rounded-lg'>
        {nav ? <AiOutlineClose size={20}  /> : <AiOutlineMenu size={20} className="hover:bg-transparent p-0 rounded-sm transform duration-500 hover:scale-150"/> }
        
      </div>
    <div className={nav ? "fixed left-0 top-0 w-[60%] h-full border-r-gray-900 bg-primary z-50" : "fixed left-[-100%] z-50"}>
    <Link to="/">
       <h1 className="w-full text-3xl font-bold text-white m-4"> ReRoute.</h1> 
       </Link>
      <ul className="pt-12 uppercase" >
        <li className="p-4 border-b border-gray-600 duration-500 hover:border-neutral-50 text-white mr-10 hover:text-secondary"> <Link to="/about">About</Link></li>
        <li className="p-4 border-b border-gray-600 duration-500 hover:border-neutral-50 text-white mr-10 hover:text-secondary"><a href="" className="">Algorithm</a></li>
        <li className="p-4 border-b border-gray-600 duration-500 hover:border-neutral-50 text-white mr-10 hover:text-secondary"><Link to="/help">Help</Link></li>
        <li className="p-4 text-white mr-10 hover:text-secondary"><a href="" className="">Start Routing</a></li>
      </ul>
    </div>
  </div>
  );
};

export default Navbar;
