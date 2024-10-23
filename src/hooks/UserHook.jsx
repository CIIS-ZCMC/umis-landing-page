import { create } from "zustand";
import { umis } from "../services/services";
import { handleFailedStatus, validateStatusOk } from "../utils/Validation";

const useUserHook = create((set) => ({
  user: null,
  systems: [],
  signIn: (form, callBack) => {
    umis
      .post("/sign-in", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { user, message } = res;

        set(() => ({ user: user }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  signUp: (form, callBack) => {
    umis
      .post("/sign-up", { body: form })
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { user, message } = res;

        set(() => ({ user: user }));
        callBack(200, message);
      })
      .catch((err) => console.log(err));
  },
  newPassword: (form, callBack) => {
    umis
      .post("/new-password", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { user, message } = res;

        set(() => ({ user: user }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  reauthenticate: (callBack) => {
    umis
      .post("re-authenticate")
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { user, message } = res;

        set(() => ({ user: user }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  redirect: () => {},
  signOut: (callBack) => {
    umis
      .delete("signout")
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { message } = res;

        set(() => ({ user: null }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
}));

export default useUserHook;
