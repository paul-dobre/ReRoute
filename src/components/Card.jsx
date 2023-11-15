import React from 'react'

const Card = ({label,color,text_color,border, dynamic}) => {
  return (
    <div className={`flex flex-col items-center justify-center  ${border} px-[50px] 
    ${color} my-[50px] w-[325px] h-[375px] mt-[10px] text-center rounded-xl 
    ${text_color} font-poppins font-semibold text-2xl`}>
      <img className="mb-[40px] text-red-500" src={dynamic}/>
      {label}
      </div>
  )
}

export default Card