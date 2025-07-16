"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FormData } from "../../(operations)/addproduct/page";
import { getProducts } from "@/app/_lib/data-services";
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

export default function ProductsTable({ categories }: { categories: string[] }) {
  const [products, setProducts] = useState<FormData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const fetchData = async () => {
    setLoading(true);
    const { data, count } = await getProducts({
      page: currentPage,
      pageSize: itemsPerPage,
      search,
      category,
    });

    setProducts(data ?? []);
    setTotalCount(count ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search, category]);

  async function handleDelete(id: string) {
    const confirmed = confirm("آیا از حذف این محصول مطمئن هستید؟");
    if (!confirmed) return;

    const res = await fetch(`/api/deleteProduct/${id}`, {
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
        <h1 className="text-4xl sans-bold text-[#006BAD] mt-[13px] ml-[200px]">
          لیست محصولات آپامه
        </h1>
        <Button />
      </div>


      <div className="my-8 flex flex-wrap gap-4 items-center p-4 rounded-lg border border-gray-200">
        <input
          type="text"
          placeholder="جستجو نام محصول"
          className="border rounded p-2 w-48"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="border rounded p-2 w-40"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">همه دسته‌ها</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>


      <div className="ml-[10%] mb-10 rounded-xl shadow-sm border border-gray-100 overflow-hidden w-[100%]">
        <div className="grid grid-cols-8 bg-gray-50 text-gray-600 sans-bold justify-center items-center pr-16">
          <div>تصویر</div>
          <div>نام محصول</div>
          <div className="pr-5">توضیحات</div>
          <div className="pr-5">دسته‌بندی</div>
          <div className="pr-5">قیمت</div>
          <div className="pr-5">کد محصول</div>
          <div className="pr-5">تعداد</div>
          <div className="pr-8">عملیات</div>
        </div>

        {loading ? (
          <div className="text-center p-6">در حال بارگذاری...</div>
        ) : products.length === 0 ? (
          <div className="text-center p-6">محصولی یافت نشد</div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-8 items-center justify-center border-t border-gray-100 mr-10"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 my-5 object-cover rounded"
                />
              </div>

              <NameProduct>{product.name}</NameProduct>
              <DescriptionProduct>{product.description}</DescriptionProduct>
              <CategoryProduct>{product.category}</CategoryProduct>
              <PriceProduct>${product.price}</PriceProduct>
              <CodeProduct>{product.productCode}</CodeProduct>
              <QuantityProduct>{product.quantity}</QuantityProduct>

              <div className="flex gap-6">
                <EditProduct>
                  <Link
                    href={`editproduct/${product.id}`}
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
                    onClick={() => handleDelete(product.id)}
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
