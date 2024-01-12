import React from "react";
import styles from "../style";
import Button from "./Button";
import { useNavigate } from 'react-router-dom';


const Hero = () => {

  const navigate = useNavigate();

  const handleStartRouting = () => {
    navigate('/startrouting');
  };

  return (
    <section className={`flex md:flex-row flex-col`}>
      <div className="w-full">
        <img src="/road.jpg" alt="road" className="w-full" />
      </div>
      <div className={`absolute mt-[300px] sm:px-16 px-10 ml-[70px]`}>
        <h1 className="text-white font-poppins font-semibold text-[35px]">Spatial Reactive Routing Platform</h1>
        <Button label="Start Routing" color="bg-[#0A0222]" text_color="text-[#95A1F9]" border="border-[#95A1F9]" onClick={handleStartRouting}/>
      </div>
    </section>
  );
};

export default Hero;
