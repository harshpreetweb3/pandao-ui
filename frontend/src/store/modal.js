import { create } from "zustand";

const useModalStore = create((set) => ({
  open: true,
  successOpen: false,
  setSuccessOpen: () => set((state) => ({ successOpen: !state.successOpen })),
  setOpen: () => set((state) => ({ open: !state.open })),
}));
export default useModalStore;
