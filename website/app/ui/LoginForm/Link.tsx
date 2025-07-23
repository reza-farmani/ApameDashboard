import Image from "next/image";


import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface LinkProps {
  img: string | StaticImport;
}

function Link({ img }: LinkProps) {
  return (
    <button className="w-[240px] h-[64px] bg-[#BBDEFB] flex items-center justify-center rounded-[10px] cursor-pointer hover:opacity-60 hover:scale-105 duration-300">
        <Image alt="google/apple" src={img}/>
    </button>
  )
}

export default Link