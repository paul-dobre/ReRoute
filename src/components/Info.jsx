import React from 'react'

const Info = () => {
  return (
    <section className = "items-center font-poppins xl:h-screen w-full">
        <div className="justify-center flex-1 py-4 lg:py-6 md:px-6 bg-primary">
            <div className="flex flex-wrap">
                <div className = "w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                        <video className="relative object-cover w-full h-96 rounded-3xl" 
                        src="Info_video_2.mp4" 
                        type="video/mp4" autoPlay muted loop style={{ filter: 'none' }}>
                        </video>
                </div>
                <div className = "w-full  px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <h1 className = "mb-4 text-4xl text-[#95A1F9] text-[35px] font-semibold">
                        Dynamic Routing Wizardry for Real-Time Optimization
                    </h1>
                    <p className="text-[20px] text-white font-poppins mt-10">
                        Experience the enchantment of our Dynamic Routing Wizardry!
                        Our cutting-edge algorithm works its magic in real-time, 
                        dynamically optimizing truck routes. Whether it's navigating
                         unexpected traffic, road closures, or evolving delivery 
                        priorities, our platform ensures your fleet stays ahead, 
                        always delivering with unparalleled efficiency and 
                        cost-effectiveness.
                    </p>
                </div>
            </div>
        </div>
        
        <div className="justify-center flex-1 py-4 lg:py-6 md:px-6 bg-primary">
            <div className="flex flex-wrap">
                <div className = "w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <h1 className = "mb-4 text-4xl text-secondary text-[35px] font-semibold">
                        Savvy Smart Routes for Intelligent Route Planning
                    </h1>
                    <p className="text-[20px] text-white font-poppins mt-10">
                        Unleash the power of Savvy Smart Routes and elevate your logistics game!
                        Our platform's intelligent route planning goes beyond the ordinary, 
                        adapting and learning with every delivery. It's like having a logistical 
                        genius on your team, crafting routes that not only save time and fuel 
                        but also evolve over time to meet the unique demands of your operations.
                    </p>
                </div>
                <div className = "w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                        <video className="relative object-cover w-full h-96 rounded-3xl" 
                        src="Info_video_1.mp4" 
                        type="video/mp4" autoPlay muted loop style={{ filter: 'none' }}>
                        </video>
                </div>
            </div>
        </div>

        <div className="justify-center flex-1 py-4 lg:py-6 md:px-6 bg-primary">
            <div className="flex flex-wrap">
                <div className = "w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                        <video className="relative object-cover w-full h-96 rounded-3xl" 
                        src="Info_video_3.mp4" 
                        type="video/mp4" autoPlay muted loop 
                        style={{ filter: 'none' }}>
                        </video>
                </div>
                <div className = "w-full  px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <h1 className = "mb-4 text-4xl text-[#95A1F9] text-[35px] font-semibold">
                        Effortless Efficiency Dashboard for User-Friendly Management
                    </h1>
                    <p className="text-[20px] text-white font-poppins mt-10">
                    Step into a new era of logistics management with our Effortless 
                    Efficiency Dashboard! Seamlessly designed and intuitively crafted, 
                    our dashboard empowers you to effortlessly manage your fleet. 
                    Gain real-time insights into your operations, make data-driven 
                    decisions, and navigate through the complexities of logistics with ease. 
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Info