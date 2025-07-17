"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useBreadcrumbStore } from "../state/breadcrumpStore";
import { sidebarMenu } from "../constants/menu";
import { BreadcrumbItem } from "@/types/types";
import { IconType } from "react-icons";

type MenuItem = {
  to: string;
  icon: IconType;
  text: string;
  submenu?: SubMenuItem[];
};
type SubMenuItem = {
  title: string;
  to: string;
  submenu?: SubMenuItem[];
};

type AnyMenuItem = MenuItem | SubMenuItem;

// Type guard to check if item is a submenu item
function isSubMenuItem(item: AnyMenuItem): item is SubMenuItem {
  return (item as SubMenuItem).title !== undefined && (item as MenuItem).icon === undefined;
}

function findBreadcrumb(
  path: string,
  menu: AnyMenuItem[] = sidebarMenu as AnyMenuItem[],
  parents: BreadcrumbItem[] = []
): BreadcrumbItem[] {
  for (const item of menu) {
    const current: BreadcrumbItem = {
      title: isSubMenuItem(item) ? item.title : (item as MenuItem).text,
      to: item.to,
    };

    if (item.to === path) {
      return [...parents, current];
    }

    if (item.submenu) {
      const result = findBreadcrumb(path, item.submenu as AnyMenuItem[], [...parents, current]);
      if (result.length > 0) return result;
    }
  }
  return [];
}

export function useBreadcrumbSetter() {
  const pathname = usePathname();
  const setBreadcrumb = useBreadcrumbStore((s) => s.setBreadcrumb);

  useEffect(() => {
    const crumbs = findBreadcrumb(pathname);
    setBreadcrumb(crumbs);
    if (crumbs.length)
      document.title = "آپامه - " + crumbs[crumbs.length - 1].title;
  }, [pathname, setBreadcrumb]);
}
