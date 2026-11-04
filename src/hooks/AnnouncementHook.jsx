import { create } from "zustand";
import { umis } from "../services/services";
import { API_END_POINTS } from "../constant/APIEndPointsConstant";
import { handleFailedStatus, validateStatusOk } from "../utils/Validation";

const useAnnouncementHook = create((set) => ({
  announcements: [],
  getAnnouncement: (callBack) => {
    umis
      .get(API_END_POINTS.ANNOUNCEMENT.LIST)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res || {};
        const safeData = Array.isArray(data)
          ? data
          : Array.isArray(res)
          ? res
          : [];
        set({ announcements: safeData });

        if (typeof callBack === "function") callBack(200, message);
      })
      .catch((err) => {
        if (typeof callBack === "function") {
          callBack(...handleFailedStatus(err));
        }
      });
  },
}));

export default useAnnouncementHook;
