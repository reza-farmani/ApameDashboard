"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getCustomers } from "@/app/_lib/data-services";
import Button from "@/app/ui/Button";
import NameProduct from "@/app/ui/Products/NameProduct";
import DescriptionProduct from "@/app/ui/Products/DescriptionProduct";
import CategoryProduct from "@/app/ui/Products/CategoryProduct";
import PriceProduct from "@/app/ui/Products/PriceProduct";
import CodeProduct from "@/app/ui/Products/CodeProduct";
import QuantityProduct from "@/app/ui/Products/QuantityProduct";
import EditProduct from "@/app/ui/Products/EditProduct";
import DeleteProduct from "@/app/ui/Products/DeleteProduct";
import IconEdit from "../../../public/images/icon-edit.png";
import IconDelete from "../../../public/images/Delet-icon.png";

export type FormData = {
  name: string;
  type: string;
  category: string;
  phoneNumber: number;
  address: string;
  id: string;
};

export default function customerTable() {
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
    const confirmed = confirm("آیا از حذف این محصول مطمئن هستید؟");
    if (!confirmed) return;

    const res = await fetch(`/api/deleteCustomer/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchData();
    } else {
      alert("خطا در حذف محصول");
    }
  }

  return (
    <main className="p-8">
      <div className="flex justify-around ml-[5px]">
        <h1 className="text-4xl sans-black  text-[#006BAD] mt-[20px] ml-[1080px]">
          لیست مشتریان آپامه
        </h1>
      </div>
      <Button />

      <div className=" flex flex-wrap gap-4 items-center p-4 rounded-lg border border-gray-200 mt-[1%]">
        <input
          type="text"
          placeholder="جستجو نام مشتری"
          className="border rounded p-2 w-48"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="ml-[10%] mb-10 rounded-xl shadow-sm border border-gray-100 overflow-hidden w-[100%]">
        <div className="grid grid-cols-8 bg-gray-50 text-gray-600 sans-bold justify-center items-center pr-16">
          <div>تصویر</div>
          <div>نام مشتری</div>
          <div className="pr-5">شماره تماس</div>
          <div className="pr-5">نوع مشتری</div>
          <div className="pr-5">آدرس</div>
        </div>

        {loading ? (
          <div className="text-center p-6">در حال بارگذاری...</div>
        ) : customers.length === 0 ? (
          <div className="text-center p-6">محصولی یافت نشد</div>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="grid grid-cols-8 items-center justify-center border-t border-gray-100 mr-10"
            >
              <div>
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-20 h-20 my-5 object-cover rounded"
                />
              </div>

              <NameProduct>{customer.name}</NameProduct>
              <CategoryProduct>{customer.type}</CategoryProduct>
              <PriceProduct>${customer.phoneNumber}</PriceProduct>
              <CodeProduct>{customer.address}</CodeProduct>

              <div className="flex gap-6">
                <EditProduct>
                  <Link
                    href={`editproduct/${customer.id}`}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      alt="icon-edit"
                      src={IconEdit}
                      className="w-[25px] h-[25px]"
                    />
                  </Link>
                </EditProduct>

                <DeleteProduct>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      alt="icon-delete"
                      src={IconDelete}
                      className="w-[25px] h-[25px]"
                    />
                  </button>
                </DeleteProduct>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            قبلی
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
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
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
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
