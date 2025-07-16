import { supabase } from "@/app/_lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function CustomerPage({ params }: Props) {
  const { id } = params;

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (customerError || !customer) {
    return notFound();
  }

  const { data: factors, error: factorsError } = await supabase
    .from("factors")
    .select("*")
    .eq("id", id);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">مشخصات مشتری</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-10 border">
        <p className="text-lg">
          👤 <strong>نام:</strong> {customer.name}
        </p>
        <p className="text-lg">
          📞 <strong>تلفن:</strong> {customer.phoneNumber}
        </p>
        <p className="text-lg">
          📍 <strong>آدرس:</strong> {customer.address}
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        🧾 فاکتورهای مشتری
      </h2>

      {factors && factors.length > 0 ? (
        <div className="space-y-4">
          {factors.map((factor) => (
            <div
              key={factor.id}
              className="bg-white border rounded-lg p-5 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-blue-600">
                  فاکتور شماره {factor.factorNum}
                </h3>
                <div className="flex gap-4 text-sm">
                  <Link
                    href={`/factor/edit/${factor.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    ویرایش
                  </Link>
                  <form>
                    <button
                      type="submit"
                      className="text-red-500 hover:underline"
                    >
                      حذف
                    </button>
                  </form>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                <p>🗂️ نوع: {factor.factorType}</p>
                <p>📅 تاریخ: {factor.date}</p>
                <p>📦 تاریخ تحویل: {factor.deliverDate}</p>
                <p>💵 پیش‌پرداخت: {factor.preDeposite}</p>
                <p>💸 تخفیف: {factor.discount} تومان</p>
                <p>📌 وضعیت: {factor.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">
          هیچ فاکتوری برای این مشتری ثبت نشده است.
        </p>
      )}
    </main>
  );
}
