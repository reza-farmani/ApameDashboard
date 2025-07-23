import React from 'react'

interface TitleProps {
  value: string;
  size: string;
  txcolor: string;  
  font: string;
}

const Title = ({ value, size, txcolor, font }: TitleProps) => {
  return (
    <h1 style={{ fontSize: size, color: txcolor, fontFamily: font }}>{value}</h1>
  )
}

export default Title