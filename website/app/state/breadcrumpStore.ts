import { create } from 'zustand';

export const useBreadcrumbStore = create((set) => ({
  breadcrumb: [],
  setBreadcrumb: (items: any) => set({ breadcrumb: items }),
}));
