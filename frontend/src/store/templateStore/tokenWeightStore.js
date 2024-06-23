import { create } from 'zustand';

// Define the store
const useTokenWeightStore = create((set) => ({
  formFields: {
    communityName: "",
    description: "",
    tokenSupply: 0,
    tokenPrice: 0,
    tokenWithDrawPrice: 0,
    communityImage: "",
    tokenImage: "",
    userAddress: "", // Adding userAddress
  },
  setFormFields: (fields) => set((state) => ({
    formFields: {
      ...state.formFields,
      ...fields,
    },
  })),
}));

export default useTokenWeightStore;
