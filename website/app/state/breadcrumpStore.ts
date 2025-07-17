
import { create } from "zustand";
import { BreadcrumbItem } from "@/types/types"; 

type BreadcrumbState = {
  breadcrumb: BreadcrumbItem[];
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
};

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  breadcrumb: [],
  setBreadcrumb: (items) => set({ breadcrumb: items }),
}));


