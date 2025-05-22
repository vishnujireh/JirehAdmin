import { create } from "zustand";

// Create a Zustand store for sidebar state
const useSidebarStore = create((set) => ({
  isOpen: true, // Default state
  toggleSidebar: () => 
    set((state) => {
      const newState = !state.isOpen;
      // Store state in localStorage so it persists on refresh
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebarState", newState ? "open" : "closed");
      }
      return { isOpen: newState };
    }),
  setSidebarState: (newState) => set(() => ({ isOpen: newState })),
}));

export default useSidebarStore;


