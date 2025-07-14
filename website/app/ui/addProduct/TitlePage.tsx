import Image from 'next/image';
import { ReactNode } from 'react';
import IconAddProduct from '../../../public/images/add-product.png';

function TitlePage({ children } : { children : ReactNode }) {
  return (
    <div className='flex items-center justify-center gap-2 ml-[40%] mb-[3%] py-3 rounded-md pl-20'>
        <h1 className="text-2xl sans-black mt-[5px]">
           {children}
        </h1>
        <Image alt='icon-plus-black' src={IconAddProduct} className='w-[40px] h-[40px]'/>
    </div>
  )
}


export default TitlePage