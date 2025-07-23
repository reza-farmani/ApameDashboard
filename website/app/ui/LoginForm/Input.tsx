import React from 'react'

interface InputProps {
  placeholder: string;  
  bgcolor: string;
  color: string;
  w: string;
  h: string;
  size: string;
}

function Input({ placeholder, bgcolor, color, w, h, size }: InputProps) {
  return (
    <input type="text" placeholder={placeholder}  style={{ backgroundColor: bgcolor, color: color, width: w, height: h, fontSize: size   }}  className='placeholder:text-[#0D0369] outline-none border-none py-bold rounded-[10px] pr-3 flex items-center justify-center'/>
  )
}

export default Input