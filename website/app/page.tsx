"use client";

import dynamic from "next/dynamic";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  CreditCard,
} from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardPage() {
  const customers = 1250;
  const invoices = 320;
  const totalSales = 48500000;
  const profitPercent = 68;
  const avgOrder = 152000;

  const chartOptions = {
    chart: { id: "sales-chart", toolbar: { show: false } },
    xaxis: {
      categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
    },
    colors: ["#7366FF"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 },
    },
  };

  const chartSeries = [{ name: "فروش", data: [10, 40, 35, 50, 49, 60] }];

  const gaugeOptions = {
    chart: {
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: "70%",
          background: "transparent",
        },
        track: {
          background: "#E6E6E6",
          strokeWidth: "100%",
          margin: 0,
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            offsetY: 40,
            color: "#888",
            fontSize: "16px",
          },
          value: {
            show: true,
            fontSize: "28px",
            fontWeight: 700,
            color: "#111",
            offsetY: -10,
            formatter: (val: any) => `${val}%`,
          },
        },
      },
    },
    colors: ["#7366FF"],
    stroke: {
      lineCap: "round",
    },
    labels: ["درصد هدف فروش"],
  };

  const gaugeSeries = [profitPercent];

  const invoicesList = [
    {
      id: "INV-1001",
      customer: "علی رضایی",
      amount: 1200000,
      status: "پرداخت‌شده",
    },
    {
      id: "INV-1002",
      customer: "سارا محمدی",
      amount: 850000,
      status: "در انتظار",
    },
    {
      id: "INV-1003",
      customer: "شرکت پارسا",
      amount: 2350000,
      status: "پرداخت‌شده",
    },
    {
      id: "INV-1004",
      customer: "رضا توکلی",
      amount: 640000,
      status: "لغو‌شده",
    },
  ];

  const lastCustomers = [
    { name: "مهدی کریمی", phone: "0912-1234567" },
    { name: "الهام شریفی", phone: "0935-9876543" },
    { name: "محمد فراهانی", phone: "0910-4455667" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">📊 داشبورد</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center">
          <Users className="text-indigo-500 mb-2" size={28} />
          <h3 className="text-gray-500 text-sm">مشتریان</h3>
          <p className="text-2xl font-bold">
            {customers.toLocaleString("fa-IR")}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center">
          <FileText className="text-green-500 mb-2" size={28} />
          <h3 className="text-gray-500 text-sm">فاکتورها</h3>
          <p className="text-2xl font-bold">{invoices}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center">
          <DollarSign className="text-yellow-500 mb-2" size={28} />
          <h3 className="text-gray-500 text-sm">فروش کل</h3>
          <p className="text-2xl font-bold">
            {totalSales.toLocaleString("fa-IR")} تومان
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center">
          <TrendingUp className="text-red-500 mb-2" size={28} />
          <h3 className="text-gray-500 text-sm">میانگین سفارش</h3>
          <p className="text-2xl font-bold">
            {avgOrder.toLocaleString("fa-IR")} تومان
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center">
          <h3 className="text-gray-500 text-sm mb-2">درصد سود</h3>
          <div className="w-16 h-16">
            <CircularProgressbar
              value={profitPercent}
              text={`${profitPercent}%`}
              styles={buildStyles({
                pathColor: "#7366FF",
                textColor: "#333",
              })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* نمودار فروش */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">روند فروش</h2>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={300}
          />
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">درصد تحقق هدف فروش</h2>
          <Chart
            options={gaugeOptions}
            series={gaugeSeries}
            type="radialBar"
            height={300}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* جدول فاکتورها */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard size={20} className="text-indigo-500" /> آخرین فاکتورها
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="p-2 text-right">کد فاکتور</th>
                <th className="p-2 text-right">مشتری</th>
                <th className="p-2 text-right">مبلغ</th>
                <th className="p-2 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {invoicesList.map((inv) => (
                <tr key={inv.id} className="border-b">
                  <td className="p-2">{inv.id}</td>
                  <td className="p-2">{inv.customer}</td>
                  <td className="p-2">
                    {inv.amount.toLocaleString("fa-IR")} تومان
                  </td>
                  <td
                    className={`p-2 font-semibold ${
                      inv.status === "پرداخت‌شده"
                        ? "text-green-600"
                        : inv.status === "لغو‌شده"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {inv.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users size={20} className="text-green-500" /> آخرین مشتریان
          </h2>
          <ul>
            {lastCustomers.map((cust, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between border-b py-2"
              >
                <span className="font-medium">{cust.name}</span>
                <span className="text-gray-500 text-sm">{cust.phone}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
