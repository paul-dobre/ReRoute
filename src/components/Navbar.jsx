import React from 'react'
import styles from '../style.js'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className = "flex w-full justify-between flex items-center p-4 h-[100px]">
      <div className = " ml-20 absolute justify-end">
        <Link to="/">
          <img src="/ReRoute_Logo.png" alt="ReRoute" className = "lg:w-[150px] sm:w-[100px] xs:w-[80px] "/>
        </Link> 
      </div>  

      <ul className = "flex justify-center flex-row w-full">
        <li className = "text-white mr-10 hover:text-secondary"> 
          <Link to="/about">About</Link>
        </li>
        <li className = "text-white mr-10 hover:text-secondary">
          <a href="" className=''>Algorithm</a>
        </li>
        <li className = "text-white mr-10 hover:text-secondary">
          <Link to="/help">Help</Link>
          
        </li>  
      </ul>
    </nav>
  ) 
}

export default Navbar