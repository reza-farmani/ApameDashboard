import React from 'react'

interface ParagrafProps {
    value: string;              
    size: string;
    txcolor: string;
    font: string;
    track: string;
}

const Paragraf = ({ value, size, txcolor, font, track } : ParagrafProps) => {
  return (
    <p style={{ fontSize: size, color: txcolor, fontFamily: font, letterSpacing: track }}>{value}</p>
  )
}

export default Paragraf   