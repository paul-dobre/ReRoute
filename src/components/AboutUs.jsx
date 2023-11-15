import React from 'react'
import styles from "../style";

const AboutUs = () => {
  return (
    <section className={`flex md:flex-row flex-col`}>
      <div className="w-full">
        <img src="/nature.png" alt="nature" className="w-full" />
      </div>
      <div className={`absolute mt-[400px] sm:px-16 px-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center`}>
        <h1 className={`${styles.heading2}`}>About ReRoute </h1>
        <p className={`${styles.paragraph} mt-5`}>ReRoute is a geospatial platform of dynamic routing algorithms tailored to interact with shapefiles. Our platform processes and navigates geospatial data, providing efficient and intelligent routing for a variety of applications.</p>
        <p className={`${styles.paragraph} mt-10`}>We are a group of four ambasing fans. We love ambasing and want to share us ambasing with the world. Thank you for watching us ambasing all over the place!</p>
      </div>
    </section>
  )
}

export default AboutUs