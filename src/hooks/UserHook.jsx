import { create } from "zustand";
import { umis } from "../services/services";
import { handleFailedStatus, validateStatusOk } from "../utils/Validation";

const useUserHook = create((set, get) => ({
  user: null,
  systems: [],
  redcap: [],
  retrieveAdminAccess: (code) => {
    const systems = get().systems;
    const adminAccess = systems.find((sys) => sys.code === code);

    return adminAccess?.url ?? null;
  },
  retrieveRedcapAccess: (code) => {
    const redcapForm = get().redcap?.find((form) => form.code === code);

    return redcapForm?.link ?? null;
  },
  signIn: (form, callBack) => {
    umis
      .post("/sign-in", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;

        set(() => ({
          user: data,
          systems: data.side_bar_details.system,
          redcap: data.redcap_forms,
        }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  signInWithOTP: (form, callBack) => {
    umis
      .post("/sign-in-with-otp", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;

        set(() => ({
          user: data,
          systems: data.side_bar_details.system,
          redcap: data.redcap_forms,
        }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  verifyEmailAndSendOTP: (form, callBack) => {
    umis
      .post("/verify-email-and-send-otp", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { message } = res;

        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  newPassword: (form, callBack) => {
    umis
      .post("/new-password", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;

        set(() => ({
          user: data,
          systems: data.side_bar_details.system,
          redcap: data.redcap_forms,
        }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  reauthenticate: (callBack) => {
    umis
      .post("re-authenticate")
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;

        set(() => ({
          user: data,
          systems: data.side_bar_details.system,
          redcap: data.redcap_forms,
        }));
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  verifyOTP: (form, callBack) => {
    umis
      .post("/verify-otp", form)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { user, message } = res;
        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  skipForNow: (callBack) => {
    umis
      .post("/skip-for-now")
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { user, message } = res;

        set(() => ({
          user: user,
          systems: user.side_bar_details.system,
          redcap: user.redcap_forms,
        }));

        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
  resendOTP: (callBack) => {
    umis
      .post("/resend-otp")
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { message } = res;

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
