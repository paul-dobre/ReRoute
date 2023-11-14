import React from "react";
import styles from "../style";
import Button from "./Button";

const Hero = () => {
  return (
    <section className={`flex md:flex-row flex-col ${styles.paddingY} fade-in`}>
      <div className="w-full">
        <img src="/road.jpg" alt="road" className="h-screen" />
      </div>
      <div className={`absolute mt-[200px] sm:px-16 px-10`}>
        <h1 className="text-white font-poppins font-semibold text-[35px]">Spatial Reactive Routing Platform</h1>
        <Button label="Start Routing" color="bg-[#0A0222]" text_color="text-[#95A1F9]" border="border-[#95A1F9]"/>
      </div>
    </section>
  );
};

export default Hero;
