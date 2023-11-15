import React from 'react'
import Card from './Card'

const CardInfo = () => {
  return (
    <div className = "flex justify-center flex-row w-full">
      <Card label="LIGMA BALLS" color="bg-[#232521]" text_color="text-[#95A1F9]" border="border-[#95A1F9]"/>
      <Card/>
      <Card/>
    </div>  
  )
}

export default CardInfo