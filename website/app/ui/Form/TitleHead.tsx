"use client";

import { useState } from 'react';

const TitleHead: React.FC = () => {
  const [size, setSize] = useState<string>('30px');
  const [color, setColor] = useState<string>('#000000');
  const [text, setText] = useState<string>('This is a customizable title'); 

  return (
    <div className='mt-16'>

        <div className='flex items-center justify-center space-x-5 ml-[20.5%]'>
            <div className='border-2 border-red-500 py-[10px] sans-bold rounded-md'>
                <label className='p-[13px] bg-red-500 text-white rounded-r-sm'>سایز سرتیتر:</label>
                <input
                     type="number"
                    value={parseInt(size, 10)}
                     onChange={(e) => setSize(`${e.target.value}px`)}
                     min="10"
                     className='text-xl outline-none pr-2 w-[160px] sans-black'
                />
            </div>


            <div className='border-2 border-gray-500 sans-bold rounded-md flex items-center justify-center'>
                <label className='p-[13px] bg-gray-500 text-white rounded-r-sm'> رنگ سرتیتر:</label>
                <input
                     type="color"
                     value={color}
                     onChange={(e) => setColor(e.target.value)}
                     className='text-xl outline-none w-[160px]  h-[5vh]'
                />
            </div>


            <div className='border-2 border-[#00b47e] sans-bold rounded-md flex items-center justify-center'> 
                <label className='p-[13px] bg-[#00b47e] text-white rounded-r-sm'>انتخاب سرتیتر</label>
                 <input
                     type="text"
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                     className='text-xl outline-none w-[250px] sans-semiBold text-center'
                 />
            </div>

        </div>

        <h1 className='mr-[3.3%] mt-[1%] bg-gray-200 w-[950px] sans-bold h-[20vh] p-2 border-2 border-black rounded-md' style={{ fontSize: size, color: color }}>
            {text}
        </h1>

    </div> 
  );
};

export default TitleHead;

