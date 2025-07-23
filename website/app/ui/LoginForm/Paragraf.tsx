import React from 'react'

interface ParagrafProps {
    value: string;
    size: string;
    txcolor: string;
    font: string;
}

const Paragraf = ({ value, size, txcolor, font } : ParagrafProps) => {
  return (
    <p style={{ fontSize: size, color: txcolor, fontFamily: font }}>{value}</p>
  )
}

export default Paragraf   