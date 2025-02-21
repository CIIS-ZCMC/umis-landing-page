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
        const { data, message } = res;
        set({ announcements: data });

        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
}));

export default useAnnouncementHook;
