// store.js
import {create} from 'zustand';

const useViewStore = create((set) => ({
  view: '1',
  setView: (newView) => set({ view: newView }),
}));

export default useViewStore;
