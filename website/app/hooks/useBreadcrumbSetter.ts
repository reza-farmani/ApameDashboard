"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useBreadcrumbStore } from "../state/breadcrumpStore";
import { sidebarMenu } from "../constants/menu";
import { BreadcrumbItem } from "@/types/types"; 

function findBreadcrumb(
  path: string,
  menu = sidebarMenu,
  parents: BreadcrumbItem[] = []
): BreadcrumbItem[] {
  for (const item of menu) {
    const current: BreadcrumbItem = {
      title: item.text ?? item.title,
      to: item.to,
    };

    if (item.to === path) {
      return [...parents, current];
    }

    if (item.submenu) {
      const result = findBreadcrumb(path, item.submenu, [...parents, current]);
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
  }, [pathname]);
}
