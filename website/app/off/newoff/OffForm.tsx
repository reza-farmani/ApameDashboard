"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type OffFormProps = {
  categories: string[];
};

type FormValues = {
  category: string;
  discount: number;
};

export default function OffForm({ categories }: OffFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    const res = await fetch("/api/setCatDiscount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      setResult(
        `تخفیف ${data.discount}% روی دسته "${data.category}" اعمال شد.`
      );
    } else {
      setResult("خطا در ثبت تخفیف: " + result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 max-w-md mx-auto space-y-4 bg-white border border-gray-200 rounded-lg shadow"
    >
      <div>
        <label htmlFor="category" className="block mb-1 font-medium">
          انتخاب دسته‌بندی
        </label>
        <select
          id="category"
          {...register("category", { required: "انتخاب دسته‌بندی الزامی است" })}
          className="w-full border p-2 rounded"
        >
          <option value="">-- انتخاب کنید --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="discount" className="block mb-1 font-medium">
          درصد تخفیف
        </label>
        <input
          type="number"
          id="discount"
          {...register("discount", {
            required: "درصد تخفیف را وارد کنید",
            min: { value: 1, message: "حداقل مقدار ۱٪ است" },
            max: { value: 100, message: "حداکثر مقدار ۱۰۰٪ است" },
          })}
          className="w-full border p-2 rounded"
          placeholder="مثلاً 20"
        />
        {errors.discount && (
          <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        ثبت تخفیف
      </button>

      {result && <p className="text-green-600 font-medium mt-2">{result}</p>}
    </form>
  );
}
