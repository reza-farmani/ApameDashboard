"use client";
import { HiPencil, HiTrash } from "react-icons/hi2";
import React, { useEffect, useState } from "react";
import { getTodo } from "../_lib/data-services";

export default function TodoTable() {
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    taskName: string;
    acceptDate: string;
    status: string;
    priority: string;
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getTodo();
      setTodos(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="px-4 py-2 border">نام فعالیت</th>
            <th className="px-4 py-2 border">تاریخ پذیرش</th>
            <th className="px-4 py-2 border">وضعیت</th>
            <th className="px-4 py-2 border">اولویت</th>
            <th className="px-4 py-2 border">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index} className="text-sm text-gray-600">
              <td className="px-4 py-2 border">{todo.taskName}</td>
              <td className="px-4 py-2 border">{todo.acceptDate}</td>
              <td className="px-4 py-2 border">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    todo.status === "تکمیل شده"
                      ? "bg-green-500"
                      : todo.status === "درحال انجام"
                      ? "bg-blue-500"
                      : todo.status === "جدید"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                >
                  {todo.status}
                </span>
              </td>
              <td className="px-4 py-2 border">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    todo.priority === "بالا"
                      ? "bg-red-500"
                      : todo.priority === "متوسط"
                      ? "bg-orange-400"
                      : "bg-green-400"
                  }`}
                >
                  {todo.priority}
                </span>
              </td>
              <td className="px-4 py-2 border">
                <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2">
                  <HiPencil />
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                  <HiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
