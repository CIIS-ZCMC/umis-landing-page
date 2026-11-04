import { create } from "zustand";
import { prApi } from "../services/services";
import { API_END_POINTS } from "../constant/APIEndPointsConstant";

export const SEARCH_CATEGORIES = [
  {
    id: "pr",
    label: "Purchase Requests (PR & PO)",
    shortLabel: "PR Tracking",
    description: "Track procurement, purchase requests, stock positions, and purchase orders in real-time.",
    placeholder: "Search by 10-digit transaction code, PR #, or PO #...",
    isLive: true,
  },
  {
    id: "memo",
    label: "Memorandums & Issuances",
    shortLabel: "Memorandums",
    description: "Browse official hospital memorandums, office orders, and circulars.",
    placeholder: "Search memorandums by title, subject, or series number...",
    isLive: false,
  },
  {
    id: "careers",
    label: "Careers & Job Openings",
    shortLabel: "Careers",
    description: "Search open medical, administrative, and allied healthcare vacancies.",
    placeholder: "Search by job position, plantilla item, or qualifications...",
    isLive: false,
  },
  {
    id: "referral",
    label: "Patient Referrals",
    shortLabel: "Referrals",
    description: "Look up patient navigation and inter-hospital referral records.",
    placeholder: "Search by referral transaction number or patient ID...",
    isLive: false,
  },
];

const useUniversalSearchHook = create((set, get) => ({
  isOpen: false,
  activeCategory: "pr",
  query: "",
  results: null,
  isLoading: false,
  error: null,

  openModal: (category = "pr", initialQuery = "") => {
    set({
      isOpen: true,
      activeCategory: category,
      query: initialQuery,
      error: null,
    });
    if (initialQuery.trim()) {
      get().executeSearch(initialQuery.trim(), category);
    }
  },

  closeModal: () => {
    set({ isOpen: false });
  },

  setActiveCategory: (catId) => {
    const prevCat = get().activeCategory;
    if (prevCat !== catId) {
      set({
        activeCategory: catId,
        results: null,
        error: null,
      });
      const q = get().query.trim();
      if (q) {
        get().executeSearch(q, catId);
      }
    }
  },

  setQuery: (query) => set({ query }),

  clear: () =>
    set({
      query: "",
      results: null,
      error: null,
    }),

  executeSearch: async (customQuery, customCategory) => {
    const category = customCategory || get().activeCategory;
    const q = (typeof customQuery === "string" ? customQuery : get().query).trim();

    if (!q) {
      set({ error: "Please enter a search term or reference code." });
      return;
    }

    set({ isLoading: true, error: null });

    // Handle Category: Purchase Requests
    if (category === "pr") {
      try {
        const response = await prApi.get(API_END_POINTS.PR_TRACKER.FIND(q));
        const { data } = response.data || {};
        set({
          results: { type: "pr", data },
          query: q,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        const status = err?.response?.status || 500;
        const message =
          status === 404
            ? "No purchase request or transaction found matching this code. Please verify the 10-digit code, PR #, or PO # and try again."
            : err?.response?.data?.message || "Unable to retrieve tracking information at this moment.";
        set({
          results: null,
          isLoading: false,
          error: message,
        });
      }
      return;
    }

    // Future Categories (Extensible placeholders)
    if (category === "memo") {
      set({
        isLoading: false,
        results: { type: "memo", data: [] },
        error: "Memorandum search integration will be available in an upcoming release.",
      });
      return;
    }

    if (category === "careers") {
      set({
        isLoading: false,
        results: { type: "careers", data: [] },
        error: "Career application tracking integration will be available soon.",
      });
      return;
    }

    if (category === "referral") {
      set({
        isLoading: false,
        results: { type: "referral", data: [] },
        error: "Patient referral tracking integration will be available soon.",
      });
      return;
    }

    set({ isLoading: false });
  },
}));

export default useUniversalSearchHook;
