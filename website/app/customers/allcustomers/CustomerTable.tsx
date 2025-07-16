"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getCustomers } from "@/app/_lib/data-services";
import IconEdit from "../../../public/images/icon-edit.png";
import IconDelete from "../../../public/images/Delet-icon.png";

export type FormData = {
  name: string;
  type: string;
  category: string;
  phoneNumber: number;
  address: string;
  id: string;
  image?: string;
};

export default function CustomerTable() {
  const [customers, setCustomers] = useState<FormData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const fetchData = async () => {
    setLoading(true);
    const { data, count } = await getCustomers({
      page: currentPage,
      pageSize: itemsPerPage,
      search,
    });

    setCustomers(data ?? []);
    setTotalCount(count ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

  async function handleDelete(id: string) {
    const confirmed = confirm("آیا از حذف این مشتری مطمئن هستید؟");
    if (!confirmed) return;

    const res = await fetch(`/api/deleteCustomer/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchData();
    } else {
      alert("خطا در حذف مشتری");
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-[#006BAD] text-center mb-8">
        لیست مشتریان آپامه
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="جستجو نام مشتری"
          className="border border-gray-300 rounded p-2 w-64 text-right"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading ? (
        <div className="text-center p-6">در حال بارگذاری...</div>
      ) : customers.length === 0 ? (
        <div className="text-center p-6">مشتری‌ای یافت نشد</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="block"
            >
              <div
                key={customer.id}
                className="flex gap-4 p-4 border rounded-xl shadow hover:shadow-lg transition-all duration-300 bg-white cursor-pointer"
              >
                <img
                  src={customer.image || "/images/default-avatar.png"}
                  alt={customer.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 text-right">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {customer.name}
                  </h2>
                  <p className="text-gray-500 mt-1">نوع: {customer.type}</p>
                  <p className="text-gray-500 mt-1">
                    تلفن: {customer.phoneNumber}
                  </p>
                  <p className="text-gray-500 mt-1">آدرس: {customer.address}</p>
                </div>

                <div className="flex flex-col justify-between items-center gap-4">
                  <Link
                    href={`/customers/${customer.id}`}
                    className="text-blue-600 underline text-sm"
                  >
                    مشاهده جزئیات
                  </Link>

                  <Link href={`/editproduct/${customer.id}`}>
                    <Image src={IconEdit} alt="ویرایش" width={25} height={25} />
                  </Link>

                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="cursor-pointer"
                  >
                    <Image src={IconDelete} alt="حذف" width={25} height={25} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            قبلی
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-4 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            بعدی
          </button>
        </div>
      )}
    </main>
  );
}
