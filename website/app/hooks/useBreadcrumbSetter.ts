"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useBreadcrumbStore } from "../state/breadcrumpStore";
import { sidebarMenu } from "../constants/menu";

function findBreadcrumb(path: string) {
  for (const item of sidebarMenu) {
    if (item.to === path) return [{ title: item.text, slug: item.to }];
    if (item.submenu) {
      const match = item.submenu.find((sub) => sub.slug === path);
      if (match) {
        return [
          { title: match.title, slug: match.slug },
          { title: item.text, slug: item.to },
        ];
      }
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
      document.title = "آپامه" + "-" + crumbs[crumbs.length - 1].title;
  }, [pathname]);
}
