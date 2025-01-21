import { create } from "zustand";
import { umis } from "../services/services";
import { API_END_POINTS } from "../constant/APIEndPointsConstant";
import { handleFailedStatus, validateStatusOk } from "../utils/Validation";

const useMemorandumHook = create((set) => ({
  memorandums: [],
  getMemorandum: (callBack) => {
    umis
      .get(API_END_POINTS.MEMORANDUM.LIST)
      .then((res) => validateStatusOk(res))
      .then((res) => {
        const { data, message } = res;
        set({ memorandums: data });

        callBack(200, message);
      })
      .catch((err) => callBack(...handleFailedStatus(err)));
  },
}));

export default useMemorandumHook;
