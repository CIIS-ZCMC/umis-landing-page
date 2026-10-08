export const API_END_POINTS = {
  ANNOUNCEMENT: {
    LIST: "announcements",
    ID: (id) => `announcements/${id}`,
    CREATE: "announcement",
  },
  MEMORANDUM: {
    LIST: "memorandums",
    ID: (id) => `memorandums/${id}`,
    CREATE: "memorandum",
  },
  PR_TRACKER: {
    FIND: (code) => `find-transaction/${code}`,
  },
};
