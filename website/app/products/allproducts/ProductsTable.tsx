"use client";

import { useEffect, useState, useCallback } from "react";
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
import { HiPercentBadge } from "react-icons/hi2";

import DiscountModal from "@/app/ui/Products/DiscountModal"; 
import { supabase } from "@/app/_lib/supabase";

type DiscountFormData = {
  discount: number;
  minPrice: number;
  maxPrice: number;
};

export default function ProductsTable({
  categories,
}: {
  categories: string[];
}) {
  const [products, setProducts] = useState<FormData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const fetchData = useCallback(async () => {
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
  }, [currentPage, itemsPerPage, search, category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  function openDiscountModal(productId: string) {
    setSelectedProductId(productId);
    setDiscountModalOpen(true);
  }

  async function handleDiscountSubmit(data: DiscountFormData) {
    if (!selectedProductId) return;

    const { discount, minPrice, maxPrice } = data;

    const { error } = await supabase
      .from("products")
      .update({ discount })
      .eq("id", selectedProductId);

    if (error) {
      alert("خطا در اعمال تخفیف");
      console.error(error.message);
      return;
    }

    alert("تخفیف با موفقیت اعمال شد");
    setDiscountModalOpen(false);
    setSelectedProductId(null);
    fetchData();
  }

  // حذف تخفیف (تنظیم discount به null)
  async function handleDeleteDiscount() {
    if (!selectedProductId) return;

    const confirmed = confirm("آیا از حذف تخفیف مطمئن هستید؟");
    if (!confirmed) return;

    const { error } = await supabase
      .from("products")
      .update({ discount: null })
      .eq("id", selectedProductId);

    if (error) {
      alert("خطا در حذف تخفیف");
      console.error(error.message);
      return;
    }

    alert("تخفیف با موفقیت حذف شد");
    setDiscountModalOpen(false);
    setSelectedProductId(null);
    fetchData();
  }

  return (
    <main className="p-8">
      <div className="flex justify-around ml-[5px]">
        <h1 className="text-4xl sans-black  text-[#006BAD] mt-[20px] ml-[1080px]">
          لیست محصولات آپامه
        </h1>
      </div>
      <Button />

      <div className=" flex flex-wrap gap-4 items-center p-4 rounded-lg border border-gray-200 mt-[1%]">
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
                {typeof product.image === "string" && product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 my-5 object-cover rounded"
                  />
                ) : (
                  <div className="w-20 h-20 my-5 object-cover rounded bg-gray-200 flex items-center justify-center text-gray-400">
                    بدون تصویر
                  </div>
                )}
              </div>

              <NameProduct>{product.name}</NameProduct>
              <DescriptionProduct>{product.description}</DescriptionProduct>
              <CategoryProduct>{product.category}</CategoryProduct>
              <PriceProduct>
                {product.discount && product.discount > 0 ? (
                  <>
                    <span className="line-through text-gray-400 mr-2">
                      ${product.price}
                    </span>
                    <span className="text-green-600 font-bold">
                      $
                      {Math.floor(product.price * (1 - product.discount / 100))}
                    </span>
                  </>
                ) : (
                  <>${product.price}</>
                )}
              </PriceProduct>

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


                <button
                  title="اعمال یا حذف تخفیف"
                  onClick={() => openDiscountModal(product.id)}
                  className="text-4xl text-blue-500 hover:text-blue-700"
                >
                  <HiPercentBadge />
                </button>
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


      <DiscountModal
        isOpen={discountModalOpen}
        onClose={() => {
          setDiscountModalOpen(false);
          setSelectedProductId(null);
        }}
        onSubmitDiscount={handleDiscountSubmit}
        onDeleteDiscount={handleDeleteDiscount}
      />
    </main>
  );
}
