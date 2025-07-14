"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/getProduct/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      setProduct(data.product);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch(`/api/editProduct/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("محصول با موفقیت ویرایش شد");
      router.push("/");
    } else {
      alert("خطا در ویرایش محصول");
    }
  }

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">ویرایش محصول</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="نام محصول"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="توضیحات"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="دسته‌بندی"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="قیمت"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="کد محصول"
          value={product.productCode}
          onChange={(e) =>
            setProduct({ ...product, productCode: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="تعداد"
          value={product.quantity}
          onChange={(e) =>
            setProduct({ ...product, quantity: Number(e.target.value) })
          }
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          ذخیره تغییرات
        </button>
      </form>
    </main>
  );
}
