"use client";

import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { useBreadcrumbStore } from "../state/breadcrumpStore";
import Link from "next/link";

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
          .map((item: { to: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
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
