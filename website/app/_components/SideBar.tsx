"use client";

import { useState } from "react";
import Link from "next/link";
import { sidebarMenu } from "../constants/menu";

function SideBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const getMenu = (to: string) => {
    setOpenMenu((cur) => (cur === to ? null : to));
  };

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {sidebarMenu.map((item) => {
          const Icon = item.icon;
          const isOpen = openMenu === item.to;
          const hasSubmenu = item.submenu && item.submenu.length > 0;

          return (
            <li key={item.to}>
              <button
                onClick={() => hasSubmenu && getMenu(item.to)}
                className="flex items-center gap-3 text-gray-600 text-base font-medium p-3 px-6 w-full text-left transition-all duration-300 hover:text-gray-800 hover:bg-gray-100 rounded"
                type={hasSubmenu ? "button" : "link"}
              >
                <Icon />
                <span>{item.text}</span>
                {hasSubmenu && (
                  <span className="mr-auto select-none">
                    {isOpen ? "▲" : "▼"}
                  </span>
                )}
              </button>

              {hasSubmenu && isOpen && (
                <ul className="mt-1 ml-8 flex flex-col gap-1">
                  {item.submenu.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={sub.slug}
                        className="block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideBar;
