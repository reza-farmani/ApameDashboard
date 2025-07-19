"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";
import AcceptIcon from '../../../public/images/accept-icon.png';
import Image from "next/image";
import AcceptProduct from "@/app/ui/addProduct/AcceptProduct";
import TitlePage from "@/app/ui/addProduct/TitlePage";
import ImageProduct from "@/app/ui/addProduct/ImageProduct";
import IconError from '../../../public/images/icon-error.png';

export type FormData = {
  name: string;
  description: string;
  category: string;
  price: number;
  productCode: string;
  quantity: number;
  image: FileList;
  id: string;
  discount: number
};

export default function AddProductPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    //////////////////////////////////////////////////////
    const imageFile = data.image[0];

    if (!imageFile) {
      alert("هیچ فایلی انتخاب نشده است.");
      return;
    }

    // فقط نام فایل بدون پوشه یا مسیر
    const rawName = imageFile.name.replace(/^.*[\\/]/, "");
    const fileName = `${Date.now()}-${rawName}`; // مسیر نهایی: مستقیم در باکت

    // آپلود به ریشه‌ی باکت
    const { error: uploadError } = await supabase.storage
      .from("product-image")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("❌ خطا در آپلود تصویر:", uploadError);
      alert("آپلود تصویر ناموفق بود.");
      return;
    }

    // دریافت URL عمومی
    const { data: publicUrlData } = supabase.storage
      .from("product-image")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData?.publicUrl || "";
    /////////////////////////////////////////////////////////

    const res = await fetch("/api/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, image: imageUrl }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("ثبت محصول ناموفق بود.");
    }

    console.log("Public Image URL:", imageUrl);
  };

  return (
    <main className="p-8 max-w-2xl mx-auto bg-white shadow rounded-2xl shadow-[#006BAD]">
      <TitlePage>افزودن محصول جدید</TitlePage>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          {...register("name", { required: "نام محصول الزامی است" })}
          placeholder="نام محصول"
          className='sans-semiBold border-2 w-full text-lg py-[7px] outline-none rounded-xl text-[#006BAD] placeholder:text-[#006BAD] pr-3 border-[#006BAD] ml-[35px]'
        />
        {errors.name && <div className="flex gap-1 sans-semiBold text-red-500 mt-[-2%] mr-1"><p>{errors.name.message}</p><Image alt="icon-error" src={IconError} className="w-[20px] shadow-normal-button mb-1"/></div> }
        <textarea
          {...register("description", {
            required: "توضیحات الزامی است",
            minLength: { value: 10, message: "حداقل 10 کاراکتر" },
          })}
          placeholder="توضیحات"
          className='sans-semiBold border-2 w-full text-lg py-[7px] outline-none rounded-xl text-[#006BAD] placeholder:text-[#006BAD] pr-3 border-[#006BAD] ml-[35px]'
        />
        {errors.description && <div className="flex gap-1 sans-semiBold text-red-500 mt-[-2%] mr-1"><p>{errors.description.message}</p><Image alt="icon-error" src={IconError} className="w-[20px] shadow-normal-button mb-1"/></div> }



        <input
          {...register("category", { required: "دسته‌بندی الزامی است" })}
          placeholder="دسته‌بندی"
          className='sans-semiBold border-2 w-full text-lg py-[7px] outline-none rounded-xl text-[#006BAD] placeholder:text-[#006BAD] pr-3 border-[#006BAD] ml-[35px]'
        />

          {errors.category && <div className="flex gap-1 sans-semiBold text-red-500 mt-[-2%] mr-1"><p>{errors.category.message}</p><Image alt="icon-error" src={IconError} className="w-[20px] shadow-normal-button mb-1"/></div> }  


        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "قیمت الزامی است",
            min: { value: 0, message: "باید مثبت باشد" },
          })}
          placeholder="قیمت"
          className='sans-semiBold border-2 w-full text-lg py-[7px] outline-none rounded-xl text-[#006BAD] placeholder:text-[#006BAD] pr-3 border-[#006BAD] ml-[35px]'
        />
        {errors.price && <div className="flex gap-1 sans-semiBold text-red-500 mt-[-2%] mr-1"><p>{errors.price.message}</p><Image alt="icon-error" src={IconError} className="w-[20px] shadow-normal-button mb-1"/></div> }


        <input
          {...register("productCode", { required: "کد محصول الزامی است" })}
          placeholder="کد محصول"
          className='sans-semiBold border-2 w-full text-lg py-[7px] outline-none rounded-xl text-[#006BAD] placeholder:text-[#006BAD] pr-3 border-[#006BAD] ml-[35px]'
        />

        {errors.productCode && <div className="flex gap-1 sans-semiBold text-red-500 mt-[-2%] mr-1"><p>{errors.productCode.message}</p><Image alt="icon-error" src={IconError} className="w-[20px] shadow-normal-button mb-1"/></div> }


        <input
          type="number"
          {...register("quantity", {
            required: "تعداد الزامی است",
            min: { value: 1, message: "حداقل 1 عدد" },
          })}
          placeholder="تعداد"
          className='sans-semiBold border-2 w-full text-lg py-[7px] outline-none rounded-xl text-[#006BAD] placeholder:text-[#006BAD] pr-3 border-[#006BAD] ml-[35px]'
        />
        {errors.quantity && <div className="flex gap-1 sans-semiBold text-red-500 mt-[-2%] mr-1"><p>{errors.quantity.message}</p><Image alt="icon-error" src={IconError} className="w-[20px] shadow-normal-button mb-1"/></div>}

        <ImageProduct>
        <input
          type="file"
          accept="image/*"
          placeholder="a"
          {...register("image", { required: "انتخاب تصویر الزامی است" })}
          className="w-[600px] py-14 px-48  absolute text-[#ffffff00]"
        />
        
        </ImageProduct>

        {errors.image && <div className="flex gap-1 sans-semiBold text-red-500 mt-[-2%] mr-1"><p>{errors.image.message}</p><Image alt="icon-error" src={IconError} className="w-[20px] shadow-normal-button mb-1"/></div> }

        <AcceptProduct disabled={{ isSubmitting }}>
          <span>{isSubmitting ? "در حال ارسال..." : "ثبت محصول"}</span>
          <Image alt="accept-icon" src={AcceptIcon} className="w-[34px] h-[40px]"/>
        </AcceptProduct>
      </form>
    </main>
  );
}
