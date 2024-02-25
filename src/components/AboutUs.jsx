import React from 'react';
import styles from "../style";

const AboutUs = () => {
    return (
      <section className="relative">
            <section className="relative h-screen flex flex-col items-center justify-center text-center text-white py-0 px-3">
                <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <video className="min-w-full min-h-full absolute object-cover" src="Hero_video_2.mp4" type="video/mp4" autoPlay muted loop style={{ filter: 'none' }}></video>
                </div>
            </section>
            <div className="absolute inset-0 overflow-auto justify-center text-blue-300">
                <div className="mx-auto max-w-3xl p-8 bg-black bg-opacity-25 rounded-lg text-center">
                    <h1 className={`${styles.heading2} text-blue-600`}>About ReRoute </h1>
                    <p className={`${styles.paragraph} mt-5 text-blue-200`}><em style={{ fontSize: '24px' }}>"The Fastest route is not always the Best route."</em></p>
                    <p className={`${styles.paragraph} mt-10 text-blue-100`}>ReRoute is a geospatial platform with dynamic routing capabilities, using algorithms tailored to interact with user specified shapefiles. Our platform processes geospatial data for the purpose of navigating and fleet management. Namely, to navigate around areas rather than through them. This may be for a wide variety of reasons, such as an area may be deemed hazardous depending on cargo, or a certain section of the transportation network cannot be driven through, either for legal reasons or for external factors.</p>
                    <p className={`${styles.paragraph} mt-15 text-blue-100`}>In addition to routing around an area, the platform will also <em>ReRoute</em> out of said area with the fastest possible public route, should they find themselves astray.</p>
                    <p className={`${styles.paragraph} mt-20 text-blue-100`}>Group 8 embarked on the journey to create this lifechanging platform as a simple capstone project. They had aspirations of attaining high grades, and gaining a professional degree. However, upon spending countless hours working together through the problems, researching methods to achieve what we set out to, enacting them, it became something more than a "simple" capstone project. It became a <strong>DREAM.</strong> </p>
                </div>
            </div>
      </section>
    )
};

export default AboutUs;