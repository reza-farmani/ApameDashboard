"use client";

import { useBreadcrumbStore } from "../state/breadcrumpStore";
import Link from "next/link";
import { BreadcrumbItem } from "@/types/types";

export default function Breadcrumbs() {
  const breadcrumb = useBreadcrumbStore((s) => s.breadcrumb);

  return (
    <nav
      dir="rtl"
      className="sans-semiBold text-gray-800 mb-6  ml-auto max-w-max"
    >
      <ol className="flex flex-row-reverse items-center gap-2">
        {breadcrumb
          .slice()
          .reverse()
          .map((item: BreadcrumbItem) => (
            <li key={item.to} className="flex items-center text-lg">
              <span className="mx-2 text-gray-500">/</span>
              <h4 className="hover:underline">
                {item.title}
              </h4>
            </li>
          ))}
        <li>
          <Link href="/" className="hover:underline text-lg">
            خانه
          </Link>
        </li>
      </ol>
    </nav>
  );
}
