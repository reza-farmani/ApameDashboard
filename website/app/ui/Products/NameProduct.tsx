import { ReactNode } from "react"


function NameProduct({ children } : { children : ReactNode }) {
  return (
    <div className='sans-bold flex items-center justify-center mr-[-60px]'>
        {children}
    </div>
  )
}

export default NameProduct