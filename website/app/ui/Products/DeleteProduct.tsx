import React, { ReactNode } from 'react'

function DeleteProduct({ children } : { children : ReactNode }) {
  return (
    <div className='sans-black flex items-center justify-center w-[45px] h-[45px] bg-[#ff000031] hover:bg-[#ebfff7] duration-300 hover:scale-95 rounded-full shadow'>
        {children}
    </div>
  )
}

export default DeleteProduct