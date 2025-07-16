"use client";

import Link from "next/link"
import Image from "next/image"
import IconPlus from '../../public/images/Plus Math.png';

function Button() {

  return (
    <Link href="/addproduct" className="bg-[#006BAD] text-white rounded-2xl py-4 px-6 flex items-center justify-center w-[300px] h-[60px] gap-2 left-[100px] mt-[10px] absolute hover:scale-90 duration-300 hover:text-white hover:bg-green-600 button-addproduct">
        <span className="text-lg sans-bold pt-1">اضافه کردن محصول جدید</span>
        <Image src={ IconPlus} alt="icon-plus" className="w-7 h-7 "/>
    </Link>
  )
}

export default Button