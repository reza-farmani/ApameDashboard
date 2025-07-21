"use client";
import ButtonBest from "./ui/ButtonBest";
import InputComponents from "./ui/InputComponents";
import { FiSearch } from "react-icons/fi";



export default function Page() {

  const handleChange = () => {};

  return (
    <main>
      <div className="mb-12 text-4xl"></div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 h-screen mr-28 ml-28 p-20 space-y-4" dir="rtl">

        <InputComponents onChange={handleChange} size="md" placeholder="جستجو کنید..." color="#006BAD" backgroundColor="#323333" icon={<FiSearch  className="text-2xl cursor-pointer hover:scale-105 hover:text-[#006BAD] transition-all duration-300"/>} iconColor="#fff"/>
        <InputComponents onChange={handleChange} size="lg" placeholder="جستجو کنید..." color="#006BAD" backgroundColor="#f0f0f0" icon={<FiSearch  className="text-2xl cursor-pointer hover:scale-105 hover:text-[#006BAD] transition-all duration-300"/>} iconColor="#222222"/>
        
        <ButtonBest size="md" bgcolor="red" value=" ثبت سفارش" textColor="white" />
        <br />
        <ButtonBest size="lg" bgcolor="#006BAD" value="درگاه پرداخت" textColor="white"/>
        <br />
        <ButtonBest size="xl" bgcolor="#05a864" value="تایید و ادامه" textColor="white"/>
      </div>
    </main>
  );
}
