
import { create } from "zustand";
import { BreadcrumbItem } from "@/types/types"; 

export const useBreadcrumbStore = create((set) => ({
  breadcrumb: [] as BreadcrumbItem[],
  setBreadcrumb: (items: BreadcrumbItem[]) => set({ breadcrumb: items }),
}));


