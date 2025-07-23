import Image from 'next/image'
import React from 'react'
// import ThreeDImage from '../../../public/images/3DObject.png'; 
import ImageBase from '../../../public/images/Rectangle 66.png'; 
import Title from './Title';
import Paragraf from './Paragraf';
import Input from './Input';
import ArrowDown2 from '../../../public/images/Expand Arrow.png';
import Iran from '../../../public/images/iran.png';
import Button from './Button';
import Line from './Line';
import Link from './Link';
import Google from '../../../public/images/devicon_google.png';
import Apple from '../../../public/images/ic_baseline-apple.png';

const SignupBase = () => {
  return (
    <section className='w-full h-[100vh] bg-[#101327] flex flex-col items-center justify-center'>

      <div className='grid grid-cols-2 items-center justify-center bg-[#2B5288] pr-4 w-[250px] h-[60px] mt-5 rounded-full'>
        <button className='w-[100px] h-[50px] flex items-center justify-center py-extrabold cursor-pointer text-[#EAE0C8] rounded-full duration-300 hover:bg-[#EAE0C8] hover:text-[#2B5288]'>ثبت نام</button>
        <button className='w-[100px] h-[50px] flex items-center justify-center py-extrabold cursor-pointer text-[#EAE0C8] rounded-full duration-300 hover:bg-[#EAE0C8] hover:text-[#2B5288]'>ورود</button>
      </div>

      <div className='w-full h-full grid grid-cols-2 items-center justify-center'>
      <div className='col-span-1 flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center flex-col gap-2'>
                <Title value="فرم ثبت نام" size="58px" txcolor="#BBDEFB" font="py-bold"/>
                <Paragraf value='برای ثبت نام مشخصات خود را وارد کنید' size="16px" txcolor="#A6A5A5" font="py-bold" track="0.1px"/>
            </div>

            <div className='flex items-center justify-center gap-10 mt-12'>
              <Input placeholder='نام خود را وارد کنید...' bgcolor='#BBDEFB' color='#0D0369' w='240px' h='64px' size="16px"/>
              <Input placeholder='نام خانوادگی خود را وارد کنید...' bgcolor='#BBDEFB' color='#0D0369' w='240px' h='64px' size="16px"/>
            </div>

            <div className='flex items-center justify-center mt-12'>
              <Input placeholder='نام کاربری خود را وارد کنید...' bgcolor='#BBDEFB' color='#0D0369' w='514px' h='64px' size="16px"/>
            </div>

            <div className='flex items-center justify-center gap-10 mt-12'>
              <Input placeholder='شماره تماس خود را وارد کنید...' bgcolor='#BBDEFB' color='#0D0369' w='277px'  h='64px' size="16px" />
              <div className='w-[203px] h-[64px] placeholder:text-[#0D0369] bg-[#BBDEFB] text-[#0D0369] py-black rounded-[10px] flex items-center justify-center gap-2 cursor-pointer'>
                <Image alt='arrow down blue' src={ArrowDown2} className='w-[30px] h-[30px]'/>
                <Input placeholder='+98' bgcolor='' color='#0D0369' w='60px' h='' size="16px"/>
                <Image alt='arrow down blue' src={Iran} className='w-[45px] h-[35px] rounded-md'/>
              </div>
            </div>

            <div className='flex items-center justify-center mt-12'>
              <Button value='ثبت نام نهایی' bgcolor='#BBDEFB' color='#0D0369' w='514px' h='64px' size="22px"/>    
            </div>
            
            <div className='flex items-center justify-center gap-[10px] mt-12'>
              <Line />
              <Paragraf value='یا ثبت نام کنید با' size="16px" txcolor="#A6A5A5" font="py-bold" track="0.1px"/>
              <Line />
            </div>

            <div className='flex items-center justify-center gap-5 mt-12 '>
                <Link img={Apple}/>
                <Link img={Google}/>
            </div>
        </div>



        <div className='col-span-1 flex flex-col items-center justify-center'>
            <Image alt='3d-modul' src={ImageBase} className='w-[95%] ml-5'/>
            <Title value="آپــــامـه قلــب تـپـنـده ی تبـلیـغـات شـمـا" size="40px" txcolor="#FFFFFFD9" font="py-black"/>
            <div className='flex items-center justify-center gap-7 '>
                <Paragraf value='AGENCY' size="22px" txcolor="#A6A5A5" font="py-light" track="10px"/>
                <Paragraf value='APAME' size="22px" txcolor="#A6A5A5" font="py-light" track="10px"/>
              </div>
        </div>
    </div>


  </section>
  )
}

export default SignupBase