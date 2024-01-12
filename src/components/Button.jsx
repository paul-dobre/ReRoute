import React from 'react'
import styles from "../style";

const Button = ({label,color,text_color,border,onClick}) => {
  return (
    <div className={`flex items-center justify-center border-[2px] ${border} px-6 ${color} my-4 w-[210px] h-[80px] mt-[50px] text-center rounded-xl ${text_color} font-poppins font-normal cursor-pointer`}
    onClick={onClick}
    >
      {label}
    </div>
  )
}

export default Button