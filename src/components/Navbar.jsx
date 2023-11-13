import React from 'react'
import styles from '../style.js'

const Navbar = () => {
  return (
    <nav className = "flex w-full justify-between flex items-center p-4 h-[100px]">
      <div className = " ml-20 absolute justify-end"> 
        <img src="/ReRoute_Logo.png" alt="ReRoute" className = "lg:w-[150px] sm:w-[100px] xs:w-[80px] "/>
        </div>  

      <ul className = "flex justify-center flex-row w-full">
        <li className = "text-white mr-10"> About Us</li>
        <li className = "text-white mr-10">Algorithm</li>
        <li className = "text-white mr-10"> Help </li>  
        <li className = "text-white"> Login </li>
      </ul>
    </nav>
  ) 
}

export default Navbar