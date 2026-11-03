import { create } from "zustand";
import { ACTION_SIGN_IN } from "../utils/config";

const useAuthHook = create((set) => ({
  title: "Login to One ZCMC",
  description: null,
  isPasswordExpired: false,
  mandatoryChangePassword: false,
  action: ACTION_SIGN_IN,
  twoFactorType: "totp",
  setTwoFactorType: (value) => set({ twoFactorType: value }),
  setTitle: (value) => set({ title: value }),
  setDescription: (value) => set({ description: value }),
  setIsPasswordExpired: (value) => set({ isPasswordExpired: value }),
  setMandatoryChangePassword: (value) =>
    set({ mandatoryChangePassword: value }),
  setAction: (value) => set({ action: value }),
}));

export default useAuthHook;
