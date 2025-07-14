import Image from "next/image"
import { ReactNode } from "react"
import IconCloud from '../../../public/images/icon-cloud.png';

function ImageProduct({ children } : { children : ReactNode }) {
  return (
    <div className='sans-semiBold flex items-center justify-center flex-col border-2 w-full text-lg py-[7px] outline-none rounded-xl text-[#006BAD]  border-[#006BAD]'>
        <Image alt="icon-chose-photo" src={IconCloud}/>
        {children}
        <p>عکس محصول خود را آپلود کنید</p>
    </div>
  )
}

export default ImageProduct