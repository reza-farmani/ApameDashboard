"use client";

import Link from "next/link";
import { HiTrash, HiPencil } from "react-icons/hi2";
import { FormData } from '../../(operations)/addproduct/page';
import Image from "next/image";

////// create ui components with Arsham /////
import Button from "@/app/ui/Button";
import NameProduct from "@/app/ui/Products/NameProduct";
import DescriptionProduct from "@/app/ui/Products/DescriptionProduct";
import CategoryProduct from "@/app/ui/Products/CategoryProduct";
import PriceProduct from "@/app/ui/Products/PriceProduct";
import CodeProduct from "@/app/ui/Products/CodeProduct";
import QuantityProduct from "@/app/ui/Products/QuantityProduct";
import EditProduct from "@/app/ui/Products/EditProduct";
import IconEdit from '../../../public/images/icon-edit.png';
import IconDelete from '../../../public/images/Delet-icon.png';
import DeleteProduct from "@/app/ui/Products/DeleteProduct";


export default function ProductsTable({ products }: { products: FormData[] }) {
  async function handleDelete(id: string) {
    const confirmed = confirm("آیا از حذف این محصول مطمئن هستید؟");
    if (!confirmed) return;

    const res = await fetch(`/api/deleteProduct/${id}`, {
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
      <div className="flex justify-around ml-[5px]">
        <h1 className=" text-4xl sans-bold text-[#006BAD] mt-[13px] ml-[200px]">لیست محصولات آپامه</h1>
        <Button/>
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

        {products?.map((product) => (
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

            <DescriptionProduct> {product.description}</DescriptionProduct>

            <CategoryProduct>{product.category}</CategoryProduct>

            <PriceProduct>${product.price}</PriceProduct>

            <CodeProduct>{product.productCode}</CodeProduct>

            <QuantityProduct>{product.quantity}</QuantityProduct>

            <div className="flex gap-6">
              <EditProduct>
                <Link href={`editproduct/${product.id}`} className="w-full h-full flex items-center justify-center">
                   <Image alt="icon-edit" src={IconEdit} className="w-[25px] h-[25px]"/>
                </Link>
              </EditProduct>

              <DeleteProduct>   
                <button onClick={() => handleDelete(product.id)}className="w-full h-full flex items-center justify-center cursor-pointer">
                  <Image alt="icon-delete" src={IconDelete} className="w-[25px] h-[25px]"/>
                </button>
              </DeleteProduct>
            </div>
          </div>
        ))}
      </div>


    </main>
  );
}
