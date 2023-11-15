import React from 'react'

const Info = () => {
  return (
    <section className={`flex flex-col py-4`}>
        <div className='grid grid-cols-2 items-center py-4'>
            <div className='justify-center mr-[150px]'>
                <h1 className='text-[#95A1F9] text-[35px] font-poppins font-semibold'>
                    Dynamic Routing Wizardry for Real-Time Optimization
                </h1>
                <p className='text-[20px] text-white font-poppins mt-10'>
                    Experience the enchantment of our Dynamic Routing Wizardry! Our cutting-edge algorithm works its magic in real-time, dynamically optimizing truck routes. Whether it's navigating unexpected traffic, road closures, or evolving delivery priorities, our platform ensures your fleet stays ahead, always delivering with unparalleled efficiency and cost-effectiveness.
                </p>
            </div>
            <div className='flex justify-end'>
                <img src="/compass.png" alt="compass" className='w-[500px]'/>
            </div>
        </div>
        <div className='grid grid-cols-2 items-center py-4 mt-[150px]'>
            <div className='flex justify-start'>
                <img src="/map.png" alt="map" className='w-[500px]'/>
            </div>
            <div className='text-start ml-[160px]'>
                <h1 className='text-[#95A1F9] text-[35px] font-poppins font-semibold justify-end'>
                    Savvy Smart Routes for Intelligent Route Planning
                </h1>
                <p className='text-[20px] text-white font-poppins mt-10'>
                    Unleash the power of Savvy Smart Routes and elevate your logistics game! Our platform's intelligent route planning goes beyond the ordinary, adapting and learning with every delivery. It's like having a logistical genius on your team, crafting routes that not only save time and fuel but also evolve over time to meet the unique demands of your operations.
                </p>
            </div>
        </div>
        <div className='grid grid-cols-2 items-center py-4 mt-[150px]'>
            <div className='justify-center mr-[150px]'>
                <h1 className='text-[#95A1F9] text-[35px] font-poppins font-semibold block'>
                    Effortless Efficiency Dashboard for User-Friendly Management
                </h1>
                <p className='text-[20px] text-white font-poppins mt-10'>
                    Step into a new era of logistics management with our Effortless Efficiency Dashboard! Seamlessly designed and intuitively crafted, our dashboard empowers you to effortlessly manage your fleet. Gain real-time insights into your operations, make data-driven decisions, and navigate through the complexities of logistics with ease. 
                </p>
            </div>
            <div className='flex justify-end'>
                <img src="/phone.png" alt="phone" className='w-[500px]'/>
            </div>
        </div>

    </section>
  )
}

export default Info