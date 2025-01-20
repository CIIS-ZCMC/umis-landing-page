import { create } from "zustand";

const useAuthHook = create((set) => ({
  title: "Login to One ZCMC",
  description: null,
  isPasswordExpired: false,
  mandatoryChangePassword: false,
  setTitle: (value) => set({ title: value }),
  setDescription: (value) => set({ description: value }),
  setIsPasswordExpired: (value) => set({ isPasswordExpired: value }),
  setMandatoryChangePassword: (value) =>
    set({ mandatoryChangePassword: value }),
}));

export default useAuthHook;
