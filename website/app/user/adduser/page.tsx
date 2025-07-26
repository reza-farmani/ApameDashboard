"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function AddUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    setMessage("");
    const res = await fetch("/api/invite-user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    if (!res.ok) return setMessage(`❌ ${json.error}`);
    setMessage("✅ کاربر با موفقیت اضافه شد");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white rounded shadow max-w-md"
    >
      <h2 className="text-lg font-bold mb-4">افزودن کاربر جدید</h2>

      <label className="block mb-2">نام</label>
      <input
        className="border p-2 w-full mb-2"
        {...register("name", { required: "نام الزامی است" })}
        type="text"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
      )}

      <label className="block mb-2">ایمیل</label>
      <input
        className="border p-2 w-full mb-2"
        {...register("email", { required: "ایمیل الزامی است" })}
        type="email"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
      )}

      <label className="block mb-2">رمز عبور</label>
      <input
        className="border p-2 w-full mb-2"
        {...register("password", {
          required: "رمز عبور الزامی است",
          minLength: { value: 6, message: "حداقل ۶ کاراکتر" },
        })}
        type="password"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
      )}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        ایجاد کاربر
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </form>
  );
}
