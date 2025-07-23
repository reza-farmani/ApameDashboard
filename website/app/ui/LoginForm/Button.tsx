import React from 'react'

interface ButtonProps {
  value: string;
  bgcolor: string;
  color: string;
  w: string;
  h: string;
  size: string;
}

function Button({ value, bgcolor, color, w, h, size }: ButtonProps) {
  return (
    <button style={{ backgroundColor: bgcolor, color: color, width: w, height: h, fontSize: size }} className='py-bold rounded-[10px] cursor-pointer hover:opacity-60 duration-300 hover:scale-95'>{value}</button>
  )
}

export default Button