import { create } from "zustand";

type SidebarState = {
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
  resetMenus: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  openMenus: {},
  toggleMenu: (key) =>
    set((state) => ({
      openMenus: {
        ...state.openMenus,
        [key]: !state.openMenus[key],
      },
    })),
  resetMenus: () => set({ openMenus: {} }),
}));
