import create from 'zustand';

const useCustomAlertStore = create((set) => ({
  alertText: "",
  open: false,
  setOpen: (isOpen) => set({ open: isOpen }),
  setText: (newText) => set({ alertText: newText }),
}));

export default useCustomAlertStore;
