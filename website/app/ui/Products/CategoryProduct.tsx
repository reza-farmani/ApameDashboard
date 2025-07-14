import { ReactNode } from "react"

function CategoryProduct({ children } : { children : ReactNode }) {
  return (
    <div className='sans-bold text-sm text-center mr-[-35px] flex items-center justify-center'>
        {children}
    </div>
  )
}

export default CategoryProduct