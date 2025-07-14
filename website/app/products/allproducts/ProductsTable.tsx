"use client";

import Link from "next/link";
import { HiTrash, HiPencil } from "react-icons/hi2";

export default function ProductsTable({ products }: { products: any[] }) {
  async function handleDelete(id: string) {
    const confirmed = confirm("آیا از حذف این محصول مطمئن هستید؟");
    if (!confirmed) return;

    const res = await fetch(`/server/deleteProduct/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("خطا در حذف محصول");
    }
  }

  return (
    <main className="p-8">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">محصولات</h1>

      <div className="mr-28 ml-28 mb-10 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-8 bg-gray-50 text-gray-600 text-sm font-semibold px-6 py-3">
          <div>تصویر</div>
          <div>نام محصول</div>
          <div>توضیحات</div>
          <div>دسته‌بندی</div>
          <div>قیمت</div>
          <div>کد محصول</div>
          <div>تعداد</div>
          <div>عملیات</div>
        </div>

        {products?.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-8 items-center border-t border-gray-100 px-6 py-4 text-sm"
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
            </div>

            <div className="font-medium text-gray-900">{product.name}</div>

            <div className="text-gray-600 pl-8 line-clamp-2">
              {product.description}
            </div>

            <div className="text-gray-600">{product.category}</div>

            <div className="text-green-600 font-semibold">${product.price}</div>

            <div className="text-black">{product.productCode}</div>

            <div>{product.quantity}</div>

            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition">
                <HiPencil />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
              >
                <HiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="operations/addproduct"
        className="mt-8 bg-blue-500 p-5 rounded-2xl mr-28 text-white hover:bg-blue-300 cursor-pointer"
      >
        اضافه کردن محصول جدید
      </Link>
    </main>
  );
}
