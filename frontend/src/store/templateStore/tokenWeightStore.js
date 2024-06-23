import { create } from 'zustand';

// Define the store
const useTokenWeightStore = create((set) => ({
  initialFormFields: {
    communityName: "",
    description: "",
    tokenSupply: 0,
    tokenPrice: 0,
    tokenWithDrawPrice: 0,
    communityImage: "",
    tokenImage: "",
    userAddress: "", // Adding userAddress
  },
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
  resetFormFields: () => set((state) => ({
    formFields: { ...state.initialFormFields }
  })),
}));

export default useTokenWeightStore;
