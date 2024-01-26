import React from "react";
import styles from "../style";
import Button from "./Button";
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';


const Hero = () => {

  const navigate = useNavigate();

  const handleStartRouting = () => {
    navigate('/startrouting');
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center text-white py-0 px-3">
    <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video className="min-w-full min-h-full absolute object-cover" src="Hero_video_2.mp4" type="video/mp4" autoPlay muted loop style={{ filter: 'none' }}></video>
    </div>

    <div className="video-content space-y-2 z-10 max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
      <p className="text-secondary md:text-3xl sm:text-2xl text-xl font-bold">REVOLUTIONARY</p>
      <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold pb-8">Reactive Spatial Routing</h1>
      <div className = "md:text-3xl sm:text-2xl text-xl font-mono pyinline-bock">
        <TypeAnimation 
      sequence={[
        'Navigate with Efficiency',2000,
        'Navigate with Versatility', 2000,
        'Navigate with Adaptability', 2000,
        'Navigate with Reliability', 2000, 
        'Navigate with ReRoute :)', 2000, 
      ]}
      wrapper="span" speed={50} />
      </div>
      <button className="text-primary w-[150px] h-[50px] duration-500 bg-white hover:bg-secondary hover:text-white rounded-full hover:bg-gr my-6 mx-auto">Start Routing</button> 
                        
    </div>
</section>
  );
};

export default Hero;
