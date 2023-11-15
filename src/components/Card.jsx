import React from 'react'

const Card = ({label,color,text_color,border}) => {
  return (
    <div className={`flex items-center justify-center border-[2px] ${border} px-[20px] 
    ${color} my-[50px] w-[325px] h-[375px] mt-[10px] text-center rounded-xl 
    ${text_color} font-poppins font-normal `}>
      {label}
      Card</div>
  )
}

export default Card