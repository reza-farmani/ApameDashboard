"use client";

import { useBreadcrumbStore } from "../state/breadcrumpStore";
import Link from "next/link";

export default function Breadcrumbs() {
  const breadcrumb = useBreadcrumbStore((s) => s.breadcrumb);

  return (
    <nav
      dir="rtl"
      className="text-lg text-gray-800 mb-6 font-bold ml-auto max-w-max"
    >
      <ol className="flex flex-row-reverse items-center gap-2">
        {breadcrumb
          .slice()
          .reverse()
          .map((item) => (
            <li key={item.to} className="flex items-center text-lg">
              <span className="mx-2 text-gray-500">/</span>
              <Link href={item.to} className="hover:underline">
                {item.title}
              </Link>
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
