import React, { ReactNode } from 'react'

function CodeProduct({ children } : { children : ReactNode }) {
  return (
    <div className='sans-black text-center mr-[-50px] text-[#C47F00] flex items-center justify-center'>
        {children}
    </div>
  )
}

export default CodeProduct