import React from 'react'
import Card from './Card'

const CardInfo = () => {
  return (
    <div className = "flex justify-between flex-row w-full">
      <Card className = "mr-[150px]" label="Real-Time Optimization" color="bg-[#232521]" text_color="text-[#95A1F9]" dynamic="optimization.svg"/>
      <Card label="Intelligent Route Planning" color="bg-[#232521]" text_color="text-[#95A1F9]" dynamic="route_image.svg"/>
      <Card className = " ml-[150px]" label="User-Friendly Dashboard" color="bg-[#232521]" text_color="text-[#95A1F9]" dynamic="responsive-symbol-with-a-widescreen-monitor-a-cellphone-and-a-tablet.svg"/>
    </div>  
  )
}

export default CardInfo