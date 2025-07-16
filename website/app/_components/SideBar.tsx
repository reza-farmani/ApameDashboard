"use client";
import { useSidebarStore } from "../hooks/sidebarStore";
import Link from "next/link";
import { sidebarMenu } from "../constants/menu";

interface SubMenuItem {
  to: string;
  title: string;
  submenu?: SubMenuItem[];
}

function SideBar() {
  const { openMenus, toggleMenu } = useSidebarStore();

  const renderSubMenu = (submenu: SubMenuItem[], level = 1) => {
    return (
      <ul className={`ml-${level * 4} mt-1 flex flex-col gap-1`}>
        {submenu.map((sub, index) => {
          const hasNested = sub.submenu && sub.submenu.length > 0;
          const isOpen = openMenus[sub.to];

          return (
            <li key={sub.to || index}>
              {hasNested ? (
                <>
                  <button
                    onClick={() => toggleMenu(sub.to)}
                    className="flex items-center justify-between w-full p-2 text-gray-600 hover:text-white hover:bg-[#006BAD] rounded-lg sans-bold"
                  >
                    {sub.title}
                    <span>{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && renderSubMenu(sub.submenu!, level + 1)}
                </>
              ) : (
                <Link
                  href={sub.to}
                  className="block p-2 text-gray-600 hover:text-white hover:bg-[#006BAD] rounded-lg sans-bold"
                >
                  {sub.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {sidebarMenu.map((item) => {
          const Icon = item.icon;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isOpen = openMenus[item.to];

          return (
            <li key={item.to}>
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.to)}
                    className="flex items-center gap-3 text-gray-600 text-base sans-bold p-3 px-6 w-full cursor-pointer text-left transition-all duration-300 hover:text-white hover:bg-[#006BAD] rounded-lg"
                    type="button"
                  >
                    <item.icon />
                    <span>{item.text}</span>
                    <span className="mr-auto select-none">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>
                  {isOpen && renderSubMenu(item.submenu)}
                </>
              ) : (
                <Link
                  href={item.to}
                  className="flex items-center gap-3 text-gray-600 text-base sans-bold p-3 px-6 w-full cursor-pointer text-left transition-all duration-300 hover:text-white hover:bg-[#006BAD] rounded-lg"
                >
                  <item.icon />
                  <span>{item.text}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideBar;
