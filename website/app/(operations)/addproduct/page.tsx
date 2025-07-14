"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";

type FormData = {
  name: string;
  description: string;
  category: string;
  price: number;
  productCode: string;
  quantity: number;
  image: FileList;
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
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">افزودن محصول جدید</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          {...register("name", { required: "نام محصول الزامی است" })}
          placeholder="نام محصول"
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <textarea
          {...register("description", {
            required: "توضیحات الزامی است",
            minLength: { value: 10, message: "حداقل 10 کاراکتر" },
          })}
          placeholder="توضیحات"
          className="w-full border p-2 rounded"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <input
          {...register("category", { required: "دسته‌بندی الزامی است" })}
          placeholder="دسته‌بندی"
          className="w-full border p-2 rounded"
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}

        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "قیمت الزامی است",
            min: { value: 0, message: "باید مثبت باشد" },
          })}
          placeholder="قیمت"
          className="w-full border p-2 rounded"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <input
          {...register("productCode", { required: "کد محصول الزامی است" })}
          placeholder="کد محصول"
          className="w-full border p-2 rounded"
        />
        {errors.productCode && (
          <p className="text-red-500">{errors.productCode.message}</p>
        )}

        <input
          type="number"
          {...register("quantity", {
            required: "تعداد الزامی است",
            min: { value: 1, message: "حداقل 1 عدد" },
          })}
          placeholder="تعداد"
          className="w-full border p-2 rounded"
        />
        {errors.quantity && (
          <p className="text-red-500">{errors.quantity.message}</p>
        )}

        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "انتخاب تصویر الزامی است" })}
          className="w-full border p-2 rounded"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "در حال ارسال..." : "ثبت محصول"}
        </button>
      </form>
    </main>
  );
}
