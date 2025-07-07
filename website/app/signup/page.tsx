"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { CiUnread, CiRead } from "react-icons/ci";
import { GiExitDoor } from "react-icons/gi";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "خطا در ثبت نام");
      }

      setSubmitSuccess(true);
      reset();
      router.push("/login");
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen  px-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-3xl shadow-xl relative">
        <h1 className="text-2xl font-bold text-center text-[#364a68] mb-6">
          ثبت نام
        </h1>

        {submitError && (
          <p className="text-red-500 text-sm text-center mb-4">{submitError}</p>
        )}
        {submitSuccess && (
          <p className="text-green-500 text-sm text-center mb-4">
            ثبت نام با موفقیت انجام شد!
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="relative">
            <input
              type="text"
              placeholder="نام کاربری"
              className="w-full p-3 rounded-xl bg-stone-100 text-sm font-bold"
              {...register("name", {
                required: "نام الزامی است",
                minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
              })}
            />
            <FaUserTie className="absolute top-3 right-3 text-zinc-400" />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="ایمیل"
              className="w-full p-3 rounded-xl bg-stone-100 text-sm"
              {...register("email", {
                required: "ایمیل الزامی است",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "ایمیل معتبر نیست",
                },
              })}
            />
            <MdOutlineMailOutline className="absolute top-3 right-3 text-zinc-400" />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="tel"
              placeholder="شماره تلفن"
              className="w-full p-3 rounded-xl bg-stone-100 text-sm text-right"
              {...register("phone", {
                required: "شماره تلفن الزامی است",
                minLength: { value: 10, message: "حداقل ۱۰ رقم" },
                maxLength: { value: 15, message: "حداکثر ۱۵ رقم" },
                pattern: {
                  value: /^\d+$/,
                  message: "فقط اعداد مجاز است",
                },
              })}
            />
            <FaPhone className="absolute top-3 right-3 text-zinc-400" />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              className="w-full p-3 rounded-xl bg-stone-100 text-sm"
              {...register("password", {
                required: "رمز عبور الزامی است",
                minLength: { value: 6, message: "حداقل ۶ کاراکتر" },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 left-3 text-zinc-500"
            >
              {showPassword ? <CiRead /> : <CiUnread />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2 transition duration-300"
          >
            {isSubmitting ? "در حال ثبت..." : "ثبت نام"}
          </button>

          <div
            className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4 cursor-pointer hover:text-red-600"
            onClick={() => router.push("/dashboard")}
          >
            <p>خروج از صفحه ثبت‌نام</p>
            <GiExitDoor />
          </div>
        </form>
      </div>
    </section>
  );
}
