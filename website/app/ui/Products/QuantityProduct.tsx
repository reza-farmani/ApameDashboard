import React, { ReactNode } from 'react'

function QuantityProduct({ children } : { children : ReactNode }) {
  return (
    <div className='sans-black text-center mr-[-85px] text-[#006BAD] flex items-center justify-center'>
        {children}
    </div>
  )
}

export default QuantityProduct