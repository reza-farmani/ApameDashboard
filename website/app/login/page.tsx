'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type FormData = {
  emailOrPhone: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'خطایی رخ داده است');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">ورود</h1>

        {errorMsg && <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <input
              type="text"
              placeholder="ایمیل یا شماره تلفن"
              className="w-full p-3 border rounded-lg bg-gray-100 text-right"
              {...register('emailOrPhone', {
                required: 'وارد کردن ایمیل یا شماره تلفن الزامی است',
                validate: (value) => {
                  const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
                  const isPhone = /^[\d]{10,15}$/.test(value);
                  return isEmail || isPhone || 'لطفاً ایمیل یا شماره تلفن معتبر وارد کنید';
                },
              })}
            />
            {errors.emailOrPhone && (
              <p className="text-red-500 text-xs mt-1">{errors.emailOrPhone.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="رمز ورود"
              className="w-full p-3 border rounded-lg bg-gray-100 text-right"
              {...register('password', {
                required: 'رمز عبور الزامی است',
                minLength: {
                  value: 6,
                  message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute left-3 top-3 text-sm text-blue-600"
            >
              {showPassword ? 'مخفی' : 'نمایش'}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              فراموشی رمز عبور؟
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isSubmitting ? 'در حال ورود...' : 'ورود به حساب'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            حساب کاربری ندارید؟{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              ثبت نام
            </a>
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-2 text-gray-600 hover:text-red-700 text-sm"
          >
            خروج از صفحه ورود
          </button>
        </div>
      </div>
    </div>
  );
}
