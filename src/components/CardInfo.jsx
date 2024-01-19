import React from 'react'
import Card from './Card'
import styles from "../style.js";

const CardInfo = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
    <div className={`${styles.cardBox}`}>
      <img className="mr-[150 px] object-contain w-full rounded-t-lg h-48 md:h-36 md:w-48 md:rounded-none md:rounded-s-lg" src="optimization.svg" alt=""/>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">Real Time Optimization</h5>
          <p className="mb-3 font-normal text-secondary">Efficiently adapt and optimize routes in real-time for seamless and responsive navigation.</p>
        </div> 
      </div>

      <div className={`${styles.cardBox}`}>
      <img className=" object-contain w-full rounded-t-lg h-48 md:h-36 md:w-48 md:rounded-none md:rounded-s-lg" src="route_image.svg" alt=""/>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Intelligent Route Planning</h5>
          <p className="mb-3 font-normal text-secondary">Crafting seamless and efficient routes tailored to real-time conditions for optimal navigation and resource utilization</p>
        </div> 
        </div> 
                   
      <div className={`${styles.cardBox}`}>
      <img className=" object-contain w-full rounded-t-lg h-48 md:h-36 md:w-48 md:rounded-none md:rounded-s-lg" src="responsive-symbol-with-a-widescreen-monitor-a-cellphone-and-a-tablet.svg" alt=""/>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">User-Friendly Dashboard</h5>
          <p className="mb-3 font-normal text-secondary">Providing intuitive controls and real-time insights for effortless fleet navigation and decision-making.</p>
        </div> 
        </div> 
        
      </div>
  );
}

export default CardInfo