import { create } from 'zustand';
import { BreadcrumbItem } from '@/types/types';

interface BreadcrumbState {
  breadcrumb: BreadcrumbItem[];
  crumbs: BreadcrumbItem[];
  setBreadcrumb: (crumbs: BreadcrumbItem[]) => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  breadcrumb: [], 
  crumbs: [],
  setBreadcrumb: (crumbs) => set({ 
    crumbs,
    breadcrumb: crumbs 
  }),
}));

