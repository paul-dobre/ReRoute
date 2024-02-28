import React from 'react'
import styles from "../style";

const InfoAboutUs = () => {
  return (
    <section className = "items-center font-poppins xl:h-screen w-full">

<div className="flex flex-col items-center justify-center lg:py-6 md:px-6 text-center py-8 bg-opacity-50">
    <p className="font-mono text-white inline-block px-4 py-2 rounded-lg" style={{ fontSize: '35px' }}>
        <em>"The Fastest route is not always the Best route."</em>
    </p>
    <p className="text-white inline-block px-4 py-2 rounded-lg" style={{ fontSize: '40px', marginLeft: '1000px' }}>
        <em>- Ammar</em>
    </p>
</div>


        <div className="justify-center flex-1 my-52 lg:py-6 md:px-6 bg-primary">
            <div className="flex flex-wrap">
                <div className = "w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                        <video className="relative object-cover w-full h-96 rounded-3xl" 
                        src="Info_video_6.mp4" 
                        type="video/mp4" autoPlay muted loop style={{ filter: 'none' }}>
                        </video>
                </div>
                <div className = "w-full  px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <h1 className = "mb-4 text-4xl text-[#95A1F9] text-[35px] font-semibold">
                        FINDING YOUR WAY
                    </h1>
                    <p className="text-[20px] text-white font-poppins mt-10">
                    In addition to routing around an area, the platform will also   
                    <em>ReRoute</em>  out of said area with the
                    fastest possible public route, should they find themselves astray.
                    </p>
                </div>
            </div>
        </div>

        <div className="justify-center flex-1 lg:py-6 md:px-6 bg-primary">
            <div className="flex flex-wrap">
                <div className = "w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <h1 className = "mb-4 text-4xl text-secondary text-[35px] font-semibold">
                        A JOURNEY TO REMEMBER
                    </h1>
                    <p className="text-[20px] text-white font-poppins mt-10">
                    Group 8 embarked on the journey to create this life-changing platform as a simple capstone project. 
                    They had aspirations of attaining high grades and gaining a professional degree. 
                    However, upon spending countless hours working together through the problems, researching methods to achieve what we set out to, 
                    enacting them, it became something more than a "simple" capstone project. It became a <strong>DREAM.</strong>
                    </p>
                </div>
                <div className = "w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                        <video className="relative object-cover w-full h-96 rounded-3xl" 
                        src="Info_video_5.mp4" 
                        type="video/mp4" autoPlay muted loop style={{ filter: 'none' }}>
                        </video>
                </div>
            </div>
        </div>
    </section>
  )
}

export default InfoAboutUs