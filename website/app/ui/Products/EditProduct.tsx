import { ReactNode } from "react"

function EditProduct({ children } : { children : ReactNode }) {
  return (
    <div className='sans-black flex items-center justify-center w-[45px] h-[45px] bg-[#01814131] hover:bg-[#ebfff7] duration-300 hover:scale-95 rounded-full shadow'>
        {children}
    </div>
  )
}


export default EditProduct
