"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiUnread, CiRead } from "react-icons/ci";
import { GiExitDoor } from "react-icons/gi";
import { supabase } from "../_lib/supabase";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  console.log("---------------");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    const { error, data: res } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    console.log(res);

    if (error) {
      setSubmitError(error.message);
    } else {
      router.push("/dashboard");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-3xl shadow-xl relative">
        <h1 className="text-2xl font-bold text-center text-[#364a68] mb-6">
          ورود
        </h1>

        {submitError && (
          <p className="text-red-500 text-sm text-center mb-4">{submitError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="ایمیل"
              className="w-full p-3 rounded-xl bg-stone-100 text-sm"
              {...register("email", {
                required: "ایمیل الزامی است",
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
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              className="w-full p-3 rounded-xl bg-stone-100 text-sm"
              {...register("password", {
                required: "رمز عبور الزامی است",
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
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl p-2 transition duration-300"
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </button>

          <div
            className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4 cursor-pointer hover:text-red-600"
            onClick={() => router.push("/signup")}
          >
            <p>ثبت‌نام</p>
            <GiExitDoor />
          </div>
        </form>
      </div>
    </section>
  );
}
