import React from "react";
import { useForm } from "react-hook-form";

type DiscountFormData = {
  discount: number;
  minPrice: number;
  maxPrice: number;
};

type DiscountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitDiscount: (data: DiscountFormData) => void;
  onDeleteDiscount: () => void;
};

export default function DiscountModal({
  isOpen,
  onClose,
  onSubmitDiscount,
  onDeleteDiscount,
}: DiscountModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiscountFormData>();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
          اعمال تخفیف
        </h2>

        <form onSubmit={handleSubmit(onSubmitDiscount)} className="space-y-4">
          <div>
            <label className="block mb-1">درصد تخفیف (%)</label>
            <input
              type="number"
              {...register("discount", {
                required: "درصد تخفیف الزامی است",
                min: { value: 1, message: "حداقل 1٪" },
                max: { value: 99, message: "حداکثر 99٪" },
              })}
              className="w-full border p-2 rounded"
            />
            {errors.discount && (
              <span className="text-red-500 text-sm">
                {errors.discount.message}
              </span>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              اعمال تخفیف
            </button>

            <button
              type="button"
              onClick={onDeleteDiscount}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              حذف تخفیف
            </button>

            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              بستن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
