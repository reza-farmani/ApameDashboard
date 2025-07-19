"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { FormEvent } from "react";

export type FormData = {
  name: string;
  phoneNumber: string;
  type: string;
  address: string;
};

export default function EditCustomerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomer() {
      const res = await fetch(`/api/getCustomer/${id}`);
      const data = await res.json();
      setCustomer(data.customer);
      setLoading(false);
    }

    fetchCustomer();
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/editCustomer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
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
      <h1 className="text-2xl font-bold mb-6">ویرایش مشتری</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="نام مشتری"
          value={customer?.name}
          onChange={(e) => setCustomer({ ...customer!, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="شماره تلفن"
          value={customer?.phoneNumber}
          onChange={(e) =>
            setCustomer({ ...customer!, phoneNumber: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="نوع مشتری"
          value={customer?.type}
          onChange={(e) =>
            setCustomer({ ...customer!, type: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
          <input
            type="text"
            placeholder="آدرس مشتری"
            value={customer?.address}
            onChange={(e) =>
              setCustomer({ ...customer!, address: e.target.value })
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
