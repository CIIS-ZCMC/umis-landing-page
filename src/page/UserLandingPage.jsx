import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/zcmc-logo-1.png";
import useUserHook from "../hooks/UserHook";
import useAnnouncementHook from "../hooks/AnnouncementHook";
import "../styles/user-landing-page.css";
import {
  AdminPanelSettings,
  Search,
  Close,
  GridView,
  ViewList,
  ExpandMore,
  ExpandLess,
  OpenInNew,
  Apps,
  AttachFile,
  AccessTime,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import {
  SYSTEM_CONFIGS,
  SYSTEM_CATEGORIES,
  resolveSystemConfig,
} from "../utils/SYSTEM_CONFIG";

const UserLandingPage = () => {
  const navigate = useNavigate();
  const { user, retrieveAdminAccess, signOut, reauthenticate, systems } = useUserHook();
  const { announcements, getAnnouncement } = useAnnouncementHook();

  // Fetch announcements on mount
  useEffect(() => {
    if (getAnnouncement) {
      getAnnouncement((status, feedback) => {
        // Handled
      });
    }
  }, [getAnnouncement]);

  // Theme Management (Light / Dark)
  const [theme, setTheme] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get("theme");
    if (urlTheme === "dark" || urlTheme === "light") return urlTheme;
    return localStorage.getItem("zcmc_portal_theme") || "light";
  });

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("zcmc_portal_theme", nextTheme);
  };

  // User Profile Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Announcement Category Filter & Sort
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "oldest"

  // Connected Systems Search, Category Filter, View Mode & Expand (Handles 10+ Systems)
  const [sysSearchQuery, setSysSearchQuery] = useState("");
  const [sysCategory, setSysCategory] = useState("All");
  const [sysViewMode, setSysViewMode] = useState("grid"); // "grid" | "compact"
  const [isSystemsExpanded, setIsSystemsExpanded] = useState(false);

  // User Data
  const displayName = user?.employee_details?.personal_information?.first_name || "-";
  const full_name = user?.name || "-";
  const employeeId = user?.employee_id || user?.employee_number || "-";
  const position = user?.designation || user?.position || "-";
  const department = user?.area_assigned || user?.office || "-";
  const employmentStatus = user?.employee_details?.employee?.job_type || "-";
  const rawDateHired = user?.employee_details?.employee?.date_hired;
  const dateHired = rawDateHired
    ? new Date(rawDateHired).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  // Initials generator
  const initials = useMemo(() => {
    if (!displayName) return "JD";
    const parts = displayName.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [displayName]);

  // Handle Refresh Button
  const handleRefresh = () => {
    setIsRefreshing(true);
    const finish = () => setTimeout(() => setIsRefreshing(false), 600);

    if (reauthenticate) {
      reauthenticate(() => {
        if (getAnnouncement) {
          getAnnouncement(() => finish());
        } else {
          finish();
        }
      });
    } else if (getAnnouncement) {
      getAnnouncement(() => finish());
    } else {
      finish();
    }
  };

  // Handle Sign Out
  const handleSignOut = () => {
    if (signOut) {
      signOut((status) => {
        if (status >= 200 && status < 300) {
          navigate("/login");
        }
      });
    } else {
      navigate("/login");
    }
  };

  // Primary System (UMIS) Details & Roles
  const primarySystemObj = useMemo(() => {
    if (systems && systems.length > 0) {
      const found = systems.find((s) => (s.code || "").toUpperCase() === "UMIS");
      if (found) return found;
    }
    return SYSTEM_CONFIGS.UMIS;
  }, [systems]);

  const primaryRoles = useMemo(() => {
    if (primarySystemObj?.roles && primarySystemObj.roles.length > 0) {
      return primarySystemObj.roles.map((r) => r.name);
    }
    return ["Super Admin", "Unit Head"];
  }, [primarySystemObj]);

  const primaryLaunchUrl = useMemo(() => {
    return (
      primarySystemObj?.url ||
      (retrieveAdminAccess ? retrieveAdminAccess("UMIS") : null) ||
      "https://portal.zcmc.online"
    );
  }, [primarySystemObj, retrieveAdminAccess]);

  // Scalable Connected Systems Roster (Handles 10+ hospital systems)
  const allConnectedSystems = useMemo(() => {
    const userNonUmis = (systems || []).filter((s) => (s.code || "").toUpperCase() !== "UMIS");

    const userMapped = userNonUmis.map((sys) => {
      const resolved = resolveSystemConfig(sys);
      const ssoUrl =
        (sys.code && retrieveAdminAccess ? retrieveAdminAccess(sys.code) : null) ||
        sys.url ||
        resolved.defaultUrl;
      const userRole = sys.roles && sys.roles.length > 0 ? sys.roles[0].name : null;
      return {
        ...resolved,
        url: ssoUrl,
        userRole,
        isUserAssigned: true,
      };
    });

    // Standard hospital subsystems roster for comprehensive multi-system handling (10+ systems)
    const standardCodes = [
      "PRM",
      "ERP",
      "REF",
      "TELE",
      // "EC1",
      // "SIS",
      // "PO",
      // "HRIS",
      // "DTR",
      // "LIS",
      // "RIS",
      // "PHARM",
      // "BILL",
      // "HEM",
    ];

    const existingCodes = new Set(userMapped.map((s) => (s.code || "").toUpperCase()));
    const supplemental = [];

    standardCodes.forEach((code) => {
      if (!existingCodes.has(code) && SYSTEM_CONFIGS[code]) {
        const item = SYSTEM_CONFIGS[code];
        const ssoUrl =
          (retrieveAdminAccess ? retrieveAdminAccess(code) : null) || item.defaultUrl;
        supplemental.push({
          ...item,
          url: ssoUrl,
          userRole: null,
          isUserAssigned: false,
        });
      }
    });

    return [...userMapped, ...supplemental];
  }, [systems, retrieveAdminAccess]);

  // Filtered and Searched Systems
  const filteredSystems = useMemo(() => {
    let list = allConnectedSystems;

    if (sysCategory !== "All") {
      list = list.filter(
        (item) => (item.category || "").toLowerCase() === sysCategory.toLowerCase()
      );
    }

    if (sysSearchQuery.trim() !== "") {
      const q = sysSearchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          (item.title || "").toLowerCase().includes(q) ||
          (item.shortTitle || "").toLowerCase().includes(q) ||
          (item.code || "").toLowerCase().includes(q) ||
          (item.description || "").toLowerCase().includes(q) ||
          (item.category || "").toLowerCase().includes(q) ||
          (item.userRole || "").toLowerCase().includes(q)
      );
    }

    return list;
  }, [allConnectedSystems, sysCategory, sysSearchQuery]);

  // System counts per category for the filter tabs
  const categoryCounts = useMemo(() => {
    const counts = { All: allConnectedSystems.length };
    allConnectedSystems.forEach((item) => {
      const cat = item.category || "Other";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [allConnectedSystems]);

  // Visible systems based on expand toggle or active search
  const visibleSystems = useMemo(() => {
    if (sysSearchQuery.trim() !== "" || sysCategory !== "All") {
      return filteredSystems;
    }
    if (isSystemsExpanded) {
      return filteredSystems;
    }
    return filteredSystems.slice(0, 8);
  }, [filteredSystems, sysSearchQuery, sysCategory, isSystemsExpanded]);


  // Helper to format announcement date
  const formatAnnouncementDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(typeof dateStr === "string" ? dateStr.replace(/-/g, "/") : dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Helper to resolve category label
  const getAnnouncementCategory = (item) => {
    if (item.category) return item.category;
    const type = (item.content_type || "").toLowerCase();
    if (type.includes("advisory")) return "Advisory";
    if (type.includes("memo")) return "Memorandum";
    if (type.includes("circular")) return "Circular";
    if (type.includes("general")) return "General";
    return "Advisory";
  };

  // Helper to resolve badge CSS class
  const getAnnouncementBadgeClass = (category, urgency) => {
    if (urgency === "urgent") return "badge-urgent";
    const cat = (category || "").toLowerCase();
    if (cat.includes("memo")) return "badge-memorandum";
    if (cat.includes("circular")) return "badge-circular";
    if (cat.includes("advisory")) return "badge-advisory";
    if (cat.includes("general")) return "badge-general";
    return "badge-advisory";
  };

  // Processed announcements from getAnnouncement() or fallback sample
  const processedAnnouncements = useMemo(() => {
    const sourceList =
      announcements && announcements.length > 0 ? announcements : [];

    return sourceList.map((item) => {
      const rawDate = item.issued_on || item.publish_at || item.created_at || item.date;
      let timestamp = 0;
      if (rawDate) {
        const d = new Date(typeof rawDate === "string" ? rawDate.replace(/-/g, "/") : rawDate);
        timestamp = isNaN(d.getTime()) ? 0 : d.getTime();
      }

      const cleanDescription = item.content
        ? item.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
        : item.description || "";

      const category = getAnnouncementCategory(item);
      const badgeClass = getAnnouncementBadgeClass(category, item.urgency);

      return {
        id: item.id,
        title: item.title,
        description: cleanDescription,
        category,
        badgeClass,
        urgency: item.urgency,
        date: formatAnnouncementDate(rawDate),
        timestamp,
        attachments: item.attachments || [],
        areas: item.areas || [],
      };
    });
  }, [announcements]);

  // Dynamic filter categories based on actual items
  const availableCategories = useMemo(() => {
    const cats = new Set(["All"]);
    processedAnnouncements.forEach((a) => {
      if (a.category) cats.add(a.category);
    });
    return Array.from(cats);
  }, [processedAnnouncements]);

  // Filter and Sort Announcements
  const filteredAnnouncements = useMemo(() => {
    let list = [...processedAnnouncements];
    if (selectedCategory !== "All") {
      list = list.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    return list.sort((a, b) => {
      return sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
    });
  }, [processedAnnouncements, selectedCategory, sortOrder]);

  // User Manuals Data
  const userManuals = [
    {
      id: 1,
      title: "Filing a Purchase Request Guide",
      date: "May 15, 2025",
      link: "/files/user-manuals/purchase-request.pdf",
    },
    {
      id: 2,
      title: "Filing a Purchase Request (Stock Position) Guide",
      date: "May 15, 2025",
      link: "/files/user-manuals/stock-position.pdf",
    },
  ];

  return (
    <div className={`ulp-container ${theme === "dark" ? "ulp-dark-theme" : ""}`}>
      {/* Header / Navbar */}
      <header className="ulp-header">
        <div className="ulp-header-inner">
          <Link to="/" className="ulp-header-brand">
            <img src={logo} alt="ZCMC Official Logo" className="ulp-brand-logo" />
            <div className="ulp-brand-info">
              <span className="ulp-brand-title">ZCMC Portal</span>
              <span className="ulp-brand-subtitle">Zamboanga City Medical Center</span>
            </div>
          </Link>

          <div className="ulp-header-actions">
            <nav className="ulp-nav-links" aria-label="Portal links">
              <a
                href="https://zcmc.doh.gov.ph"
                target="_blank"
                rel="noreferrer"
                className="ulp-external-link"
              >
                Transparency Seal
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
              <a
                href="https://zcmc.doh.gov.ph"
                target="_blank"
                rel="noreferrer"
                className="ulp-external-link"
              >
                Privacy Notice
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </nav>

            {/* Theme Toggle Button */}
            <button
              type="button"
              className="ulp-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <div className="ulp-theme-toggle-knob">
                {theme === "dark" ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            </button>

            {/* User Profile Pill & Dropdown */}
            <div className="ulp-user-menu-wrapper">
              <button
                type="button"
                className="ulp-user-badge"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                <div className="ulp-user-avatar-initials">{initials}</div>
                <div className="ulp-user-meta">
                  <span className="ulp-user-meta-name">{displayName}</span>
                  <span className="ulp-user-meta-dept">{department}</span>
                </div>
                <svg
                  className={`ulp-chevron-icon ${isDropdownOpen ? "ulp-chevron-open" : ""}`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="ulp-user-dropdown">
                  <div className="ulp-dropdown-header">
                    <div className="ulp-dropdown-name">{displayName}</div>
                    <div className="ulp-dropdown-role">{position}</div>
                  </div>
                  <button
                    type="button"
                    className="ulp-dropdown-item"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      const umisUrl = retrieveAdminAccess?.("UMIS") || "https://portal.zcmc.online";
                      window.open(umisUrl, "_blank");
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Manage Account
                  </button>
                  <button
                    type="button"
                    className="ulp-dropdown-item ulp-logout-item"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleSignOut();
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="ulp-main">
        {/* Welcome & Greeting Hero */}
        <section className="ulp-hero-section">
          <div className="ulp-hero-left">
            <span className="ulp-hero-greeting">Welcome back,</span>
            <h1 className="ulp-hero-name">{displayName}!</h1>
            <p className="ulp-hero-subtitle">
              Your ZCMC employee portal and system access hub.
            </p>
          </div>

          <div className="ulp-hero-actions">
            <button
              type="button"
              className={`ulp-icon-btn ${isRefreshing ? "spinning" : ""}`}
              onClick={handleRefresh}
              aria-label="Refresh systems and status"
              title="Refresh systems"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>

            <a
              href={retrieveAdminAccess?.("UMIS") || "https://portal.zcmc.online"}
              target="_blank"
              rel="noreferrer"
              className="ulp-primary-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open User Management
            </a>
          </div>
        </section>

        {/* Employee Overview Card */}
        <section className="ulp-profile-card">
          <div className="ulp-profile-identity">
            <div className="ulp-profile-avatar">{initials}</div>
            <div className="ulp-profile-info">
              <div className="ulp-profile-header-row">
                <span className="ulp-profile-name">{full_name}</span>
                <span className="ulp-status-pill">{employmentStatus}</span>
              </div>

              <div className="ulp-profile-subfields">
                <div>
                  <div className="ulp-field-label">DATE HIRED</div>
                  <div className="ulp-field-val">{dateHired}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="ulp-profile-grid">
            <div className="ulp-profile-grid-item">
              <span className="ulp-field-label">EMPLOYEE ID</span>
              <span className="ulp-field-val">{employeeId}</span>
            </div>
            <div className="ulp-profile-grid-item">
              <span className="ulp-field-label">POSITION</span>
              <span className="ulp-field-val">{position}</span>
            </div>
            <div className="ulp-profile-grid-item">
              <span className="ulp-field-label">DEPARTMENT</span>
              <span className="ulp-field-val">{department}</span>
            </div>
            <div className="ulp-profile-grid-item">
              <span className="ulp-field-label">EMPLOYMENT STATUS</span>
              <span className="ulp-field-val">{employmentStatus}</span>
            </div>
          </div>
        </section>

        {/* Primary System Highlight Card (Flagship Showcase) */}
        <section className="ulp-primary-sys-card">
          <div className="ulp-primary-sys-accent-bar" />

          {/* Top Meta Row */}
          <div className="ulp-primary-meta-row">
            <div className="ulp-primary-tag-badge">
             PRIMARY SYSTEM
            </div>
            <div className="ulp-primary-meta-right">
              <div className="ulp-primary-status-pill">
                <span className="ulp-status-dot-pulse"></span>
                <span>Active Session</span>
              </div>
              {primaryRoles.slice(0, 2).map((role, idx) => (
                <span key={idx} className="ulp-primary-role-pill">
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Main Info Row & Action Button */}
          <div className="ulp-primary-main-row">
            <div className="ulp-primary-main-info">
              <div className="ulp-primary-iconbox">
                <AdminPanelSettings sx={{ fontSize: 32 }} />
              </div>
              <div className="ulp-primary-text-group">
                <h2 className="ulp-primary-sys-heading">
                  {primarySystemObj.title || "User Management Information System"}
                  <span className="ulp-primary-code-pill">UMIS</span>
                </h2>
                <p className="ulp-primary-sys-summary">
                  {primarySystemObj.description ||
                    "Centralized employee credentials, role permissions, daily time records, and access gateway for all hospital units."}
                </p>
              </div>
            </div>

            <a
              href={primaryLaunchUrl}
              target="_blank"
              rel="noreferrer"
              className="ulp-primary-launch-btn"
            >
              <span>Launch UMIS</span>
              <OpenInNew sx={{ fontSize: 18 }} />
            </a>
          </div>

          {/* Quick Shortcuts */}
          <div className="ulp-primary-shortcuts-row">
            <span className="ulp-shortcut-label">Quick Shortcuts:</span>
            <a
             href={`${primaryLaunchUrl}/dtremployee`}
              target="_blank"
              rel="noreferrer"
              className="ulp-shortcut-chip"
            >
              <AccessTime sx={{ fontSize: 14, color: "#15803d" }} />
              <span>Daily Time Record (DTR)</span>
            </a>
            <a
              href={`${primaryLaunchUrl}/leave-applications`}
              target="_blank"
              rel="noreferrer"
              className="ulp-shortcut-chip"
            >
              <BadgeIcon sx={{ fontSize: 14, color: "#2563eb" }} />
              <span>Leave Applications</span>
            </a>
            <a
              href={`${primaryLaunchUrl}/attendance-notification`}
              target="_blank"
              rel="noreferrer"
              className="ulp-shortcut-chip"
            >
              <AdminPanelSettings sx={{ fontSize: 14, color: "#7c3aed" }} />
              <span>Attendance Monitoring</span>
            </a>
          </div>
        </section>

        {/* Scalable Connected Systems Hub (10+ Systems) */}
        <section className="ulp-systems-section">
          <div className="ulp-systems-header-bar">
            <div className="ulp-systems-title-wrap">
              <span className="ulp-green-dot"></span>
              <h3 className="ulp-section-title">Connected Systems</h3>
              <span className="ulp-systems-count-badge">
                {filteredSystems.length} {filteredSystems.length === 1 ? "System" : "Systems"}
              </span>
            </div>

            <div className="ulp-systems-controls">
              {/* Search Box */}
              <div className="ulp-sys-search-box">
                <span className="ulp-sys-search-icon">
                  <Search sx={{ fontSize: 18 }} />
                </span>
                <input
                  type="text"
                  className="ulp-sys-search-input"
                  placeholder="Search systems by name, code..."
                  value={sysSearchQuery}
                  onChange={(e) => setSysSearchQuery(e.target.value)}
                />
                {sysSearchQuery && (
                  <button
                    type="button"
                    className="ulp-sys-search-clear"
                    onClick={() => setSysSearchQuery("")}
                    title="Clear search"
                  >
                    <Close sx={{ fontSize: 16 }} />
                  </button>
                )}
              </div>

              {/* View Mode Switcher (Grid vs Compact) */}
              <div className="ulp-sys-view-toggle">
                <button
                  type="button"
                  className={`ulp-sys-view-btn ${sysViewMode === "grid" ? "active" : ""}`}
                  onClick={() => setSysViewMode("grid")}
                  title="Grid View"
                >
                  <GridView sx={{ fontSize: 18 }} />
                </button>
                <button
                  type="button"
                  className={`ulp-sys-view-btn ${sysViewMode === "compact" ? "active" : ""}`}
                  onClick={() => setSysViewMode("compact")}
                  title="Compact List View"
                >
                  <ViewList sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="ulp-sys-category-bar">
            {SYSTEM_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`ulp-sys-cat-tab ${sysCategory === cat.id ? "active" : ""}`}
                  onClick={() => setSysCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="ulp-sys-cat-tab-count">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Systems Display: Empty State or Grid or Compact List */}
          {filteredSystems.length === 0 ? (
            <div className="ulp-systems-empty">
              <p>No connected systems found matching &ldquo;{sysSearchQuery}&rdquo;</p>
              <button
                type="button"
                className="ulp-systems-empty-btn"
                onClick={() => {
                  setSysSearchQuery("");
                  setSysCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : sysViewMode === "grid" ? (
            <div className="ulp-systems-grid">
              {visibleSystems.map((item, idx) => (
                <a
                  key={item.code || idx}
                  href={item.url}
                  target={item?.url?.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="ulp-sys-card"
                >
                  <div className="ulp-sys-card-top">
                    <div className="ulp-sys-card-top-left">
                      <div className={`ulp-sys-icon ${item.colorClass}`}>
                        {item.icon}
                      </div>
                      {/* <span className="ulp-sys-code-badge">{item.code}</span> */}
                    </div>
                    <span className="ulp-sys-card-arrow">
                      <OpenInNew sx={{ fontSize: 16 }} />
                    </span>
                  </div>
                  <div className="ulp-sys-card-body">
                    <h4 className="ulp-sys-card-title">{item.title}</h4>
                    <p className="ulp-sys-card-desc">{item.description}</p>
                  </div>
                  <div className="ulp-sys-card-footer">
                    <span className="ulp-sys-card-category">{item.category}</span>
                    {item.userRole && (
                      <span className="ulp-sys-card-role">{item.userRole}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* Compact List View */
            <div className="ulp-systems-compact-grid">
              {visibleSystems.map((item, idx) => (
                <a
                  key={item.code || idx}
                  href={item.url}
                  target={item?.url?.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="ulp-sys-compact-row"
                >
                  <div className="ulp-sys-compact-left">
                    <div className={`ulp-sys-compact-icon ${item.colorClass}`}>
                      {item.icon}
                    </div>
                    <div className="ulp-sys-compact-info">
                      <div className="ulp-sys-compact-title-line">
                        <span className="ulp-sys-code-badge">{item.code}</span>
                        <span className="ulp-sys-compact-title">{item.title}</span>
                      </div>
                      <span className="ulp-sys-compact-desc">{item.description}</span>
                    </div>
                  </div>
                  <div className="ulp-sys-compact-action">
                    <span>Open</span>
                    <OpenInNew sx={{ fontSize: 14 }} />
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Show More / Show Less Button when list > 8 and no search/category filter */}
          {filteredSystems.length > 8 &&
            !sysSearchQuery &&
            sysCategory === "All" && (
              <div className="ulp-show-more-wrap">
                <button
                  type="button"
                  className="ulp-show-more-btn"
                  onClick={() => setIsSystemsExpanded(!isSystemsExpanded)}
                >
                  {isSystemsExpanded ? (
                    <>
                      <span>Show Less</span>
                      <ExpandLess sx={{ fontSize: 18 }} />
                    </>
                  ) : (
                    <>
                      <span>
                        Show All {filteredSystems.length} Systems (
                        {filteredSystems.length - 8} more)
                      </span>
                      <ExpandMore sx={{ fontSize: 18 }} />
                    </>
                  )}
                </button>
              </div>
            )}
        </section>

        {/* Two-Column Section: Announcements & User Manuals */}
        <section className="ulp-two-col-layout">
          {/* Announcements Card */}
          <div className="ulp-panel">
            <div className="ulp-panel-header">
              <div className="ulp-section-header" style={{ marginBottom: 0 }}>
                <span className="ulp-green-dot"></span>
                <h3 className="ulp-section-title">Announcements</h3>
              </div>

              <button
                type="button"
                className="ulp-sort-btn"
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
                {sortOrder === "newest" ? "Newest first" : "Oldest first"}
              </button>
            </div>

            {/* Filter Pills */}
            <div className="ulp-filter-tabs">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`ulp-filter-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Announcements List */}
            <div className="ulp-announcements-list">
              {filteredAnnouncements.length === 0 ? (
                <div className="ulp-empty-announcements">
                  <p>No announcements found for this category.</p>
                </div>
              ) : (
                filteredAnnouncements.map((item) => (
                  <div key={item.id} className="ulp-announcement-item">
                    <div className="ulp-announcement-meta-row">
                      <span className={`ulp-announcement-badge ${item.badgeClass}`}>
                        {item.urgency === "urgent" ? `URGENT • ${item.category}` : item.category}
                      </span>
                      <div className="ulp-announcement-date">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <div className="ulp-announcement-content">
                      <h4 className="ulp-announcement-title">{item.title}</h4>
                      <p className="ulp-announcement-desc">{item.description}</p>
                      {item.attachments && item.attachments.length > 0 && item.attachments[0].file_path && (
                        <a
                          href={item.attachments[0].file_path}
                          target="_blank"
                          rel="noreferrer"
                          className="ulp-announcement-attachment-link"
                          title={item.attachments[0].file_name || "Attachment"}
                        >
                          <AttachFile sx={{ fontSize: 14 }} />
                          <span>{item.attachments[0].file_name || "View Attachment"}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* User Manuals Card */}
          <div className="ulp-panel">
            <div className="ulp-panel-header">
              <div className="ulp-section-header" style={{ marginBottom: 0 }}>
                <span className="ulp-green-dot"></span>
                <h3 className="ulp-section-title">User Manuals</h3>
              </div>
            </div>

            <div className="ulp-manuals-list">
              {userManuals.map((manual) => (
                <a
                  key={manual.id}
                  href={manual.link}
                  target="_blank"
                  rel="noreferrer"
                  className="ulp-manual-item"
                >
                  <div className="ulp-manual-left">
                    <div className="ulp-manual-iconbox">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <div className="ulp-manual-info">
                      <span className="ulp-manual-title">{manual.title}</span>
                      <span className="ulp-manual-date">{manual.date}</span>
                    </div>
                  </div>
                  <svg
                    className="ulp-manual-arrow"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Governance System Banner */}
        <section
          className="ulp-pgs-banner"
          onClick={() => {
            window.open("https://zcmc.doh.gov.ph", "_blank");
          }}
          title="Performance Governance System"
        >
          <h2 className="ulp-pgs-title">Performance Governance System</h2>
        </section>
      </main>
    </div>
  );
};

export default UserLandingPage;
