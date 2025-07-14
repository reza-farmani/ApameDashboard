import React, { ReactNode } from 'react'

function PriceProduct({ children } : { children : ReactNode }) {
  return (
    <div className='sans-black text-center mr-[-70px] text-green-600 flex items-center justify-center'>
        {children}
    </div>
  )
}

export default PriceProduct