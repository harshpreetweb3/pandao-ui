import { create } from 'zustand';

const useModalStore = create((set) => ({

    open: true,

    setOpen: () => set((state) => ({ open: !state.open })),
}));
export default useModalStore