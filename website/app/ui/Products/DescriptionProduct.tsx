import { ReactNode } from "react"

function DescriptionProduct({ children } : { children : ReactNode }) {
  return (
    <div className='sans-semiBold text-sm text-center flex items-center justify-center ml-[35px] text-[#242424c2]'>
        {children}
    </div>
  )
}

export default DescriptionProduct