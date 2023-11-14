import React from 'react'
import styles from "../style";

const Button = ({label,color,text_color,border}) => {
  return (
    <div className={`flex items-center justify-center border-[2px] ${border} px-6 ${color} my-4 w-[210px] h-[80px] text-center rounded-xl ${text_color} font-poppins font-normal cursor-pointer`}>
      {label}
    </div>
  )
}

export default Button