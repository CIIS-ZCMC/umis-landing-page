import { useState, useEffect, useRef } from "react";
import useUniversalSearchHook, { SEARCH_CATEGORIES } from "../../hooks/UniversalSearchHook";
import {
  Dialog,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./universal-search.css";

const SAMPLE_CODES = ["2609298544", "2609296667", "2609291964"];

const formatDate = (dateStr) => {
  if (!dateStr) return "--";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return "₱" + num.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getOfficeName = (code) => {
  if (!code) return "";
  const upper = String(code).trim().toUpperCase();
  switch (upper) {
    case "PROC":
      return "Procurement Office";
    case "BUDGET":
      return "Budget Office";
    case "ACC":
    case "ACCOUNTING":
      return "Accounting Office";
    case "MMS":
      return "Materials Management Section";
    case "OMCC":
      return "Office of Medical Center Chief";
    default:
      return code;
  }
};

const getEmployeeName = (name, area) => {
  const cleanName = name ? name.trim() : "Requester";
  const areaName = area ? getOfficeName(area) : "";
  return areaName ? `${cleanName} (${areaName})` : cleanName;
};

const formatActionBadge = (rawAction, rawStatus) => {
  let raw = rawAction || rawStatus || "Pending";
  const match = raw.match(/'([^']+)'/);
  if (match && match[1]) {
    raw = match[1];
  }
  const lower = raw.toLowerCase();

  if (lower.includes("cancel")) return "Cancelled";
  if (lower.includes("return")) return "Returned";
  if (lower.includes("release")) return "Released";
  if (lower.includes("complet")) return "Completed";
  if (lower.includes("hold")) return "On Hold";
  if (lower.includes("approv")) return "Approved";
  if (lower.includes("user submit") || lower.includes("created")) return "Created";
  if (lower.includes("submit")) return "Submitted";
  if (lower.includes("receive") || lower.includes("claim")) {
    if (lower.includes("terminal") || lower.includes("claim")) return "Claimed";
    return "Received";
  }
  if (lower.includes("process")) return "Processing";

  return raw;
};

const getStatusBadgeClass = (badge) => {
  if (!badge) return "status-secondary";
  const lower = badge.toLowerCase();
  if (lower.includes("cancel")) return "status-danger";
  if (lower.includes("return")) return "status-warning";
  if (lower.includes("release") || lower.includes("complet") || lower.includes("approv")) return "status-success";
  if (lower.includes("hold") || lower.includes("pending") || lower.includes("submit")) return "status-neutral";
  if (lower.includes("receive") || lower.includes("process") || lower.includes("creat")) return "status-primary";
  return "status-secondary";
};

const parseRemarks = (comment) => {
  if (!comment) return null;
  try {
    const parsed = typeof comment === "string" ? JSON.parse(comment) : comment;
    if (typeof parsed === "object" && parsed !== null) {
      return {
        comment: parsed.comment || "",
        reasons: Array.isArray(parsed.reasons) ? parsed.reasons : [],
      };
    }
    return { comment: String(parsed), reasons: [] };
  } catch {
    return { comment: String(comment), reasons: [] };
  }
};

const getNextOfficeName = (nextOffice, requesterData) => {
  const ifReturned =
    nextOffice?.next_office === requesterData?.employee_area_code &&
    nextOffice?.new_status === "Returned";

  if (ifReturned) {
    return getEmployeeName(
      requesterData?.employee_name,
      requesterData?.employee_area_code
    );
  }
  if (nextOffice?.previous_office && nextOffice?.previous_office === nextOffice?.next_office) {
    return `${getOfficeName(nextOffice.next_office)} (${requesterData?.employee_name || "Requester"})`;
  }
  if (nextOffice?.next_office) {
    return getOfficeName(nextOffice.next_office);
  }
  return "Next Office";
};

const getStatusClass = (statusStr) => {
  if (!statusStr) return "universal-status-processing";
  const s = statusStr.toLowerCase();
  if (
    s.includes("complet") ||
    s.includes("approv") ||
    s.includes("release") ||
    s.includes("received") ||
    s.includes("claimed")
  ) {
    return "universal-status-success";
  }
  if (s.includes("cancel")) return "universal-status-danger";
  if (s.includes("return") || s.includes("hold") || s.includes("pending")) {
    return "universal-status-warning";
  }
  return "universal-status-processing";
};

const UniversalSearchModal = () => {
  const {
    isOpen,
    closeModal,
    activeCategory,
    setActiveCategory,
    query,
    setQuery,
    results,
    isLoading,
    error,
    executeSearch,
    clear,
  } = useUniversalSearchHook();

  const [copied, setCopied] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState(null);
  const inputRef = useRef(null);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  const handleCopyCode = (code) => {
    if (!code) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeSearch();
    }
  };

  const handleChipClick = (code) => {
    setQuery(code);
    executeSearch(code);
  };

  const currentCategoryObj =
    SEARCH_CATEGORIES.find((c) => c.id === activeCategory) || SEARCH_CATEGORIES[0];

  // PR Data derivation
  const prData = results?.type === "pr" ? results.data : null;
  const timeline = prData?.timeline || [];
  const latestMilestone = timeline.length > 0 ? timeline[timeline.length - 1] : null;
  const nextOffice = latestMilestone;
  const isCancelled = latestMilestone?.new_status === "Cancelled";
  const isReturned = latestMilestone?.new_status === "Returned";
  const isCompleted =
    latestMilestone?.next_office === null &&
    (latestMilestone?.new_status === "Completed" || latestMilestone?.new_status === "Approved") &&
    !isCancelled;

  const stepFiled = timeline.length >= 1;
  const stepProcessing = timeline.length > 1;
  const stepFinal = isCompleted || isCancelled || isReturned;

  const currentStatusDisplay =
    latestMilestone?.new_status ||
    (isCancelled
      ? "Cancelled"
      : isCompleted
      ? "Completed"
      : timeline.length > 0
      ? "In Progress"
      : "Pending");

  const items = prData?.items || [];
  const totalItemsAmount = items.reduce(
    (acc, curr) => acc + (Number(curr.total_cost) || 0),
    0
  );

  return (
    <>
      <Dialog
      open={isOpen}
      onClose={closeModal}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "universal-modal-paper",
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(10, 62, 48, 0.45)",
          },
        },
      }}
    >
      {/* Category Tabs Header */}
      <div className="universal-modal-header">
        <div className="universal-modal-tabs">
          {SEARCH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`universal-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.shortLabel}</span>
              {cat.isLive ? (
                <span className="universal-tab-live-badge">Live</span>
              ) : (
                <span className="universal-tab-soon-badge">Soon</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Omnisearch Input Box */}
      <div className="universal-modal-search-box">
        <SearchIcon className="universal-modal-search-icon" />
        <input
          ref={inputRef}
          type="text"
          className="universal-modal-input"
          placeholder={currentCategoryObj.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="universal-modal-clear-btn"
            onClick={clear}
            title="Clear search"
          >
            <ClearIcon fontSize="small" />
          </button>
        )}
        <button
          type="button"
          className="universal-modal-close-chip"
          onClick={closeModal}
          title="Press Esc to close"
        >
          <span>ESC</span>
          <CloseIcon style={{ fontSize: 13 }} />
        </button>
      </div>

      {/* Modal Content Body */}
      <div className="universal-modal-body">
        {/* Loading State */}
        {isLoading && (
          <div className="universal-loading-state">
            <CircularProgress size={36} style={{ color: "#0f5721" }} />
            <span className="universal-loading-text">
              Retrieving live transaction records from UMIS...
            </span>
          </div>
        )}

        {/* Error / Not Found Alert */}
        {error && !isLoading && (
          <div className="universal-error-box">
            <ErrorOutlineIcon />
            <span>{error}</span>
          </div>
        )}

        {/* Initial / Empty State */}
        {!prData && !isLoading && !error && (
          <div className="universal-empty-state">
            <InfoOutlinedIcon className="universal-empty-icon" />
            <h4 className="universal-empty-title">
              {currentCategoryObj.label}
            </h4>
            <p className="universal-empty-desc">
              {currentCategoryObj.description}
            </p>

            {activeCategory === "pr" && (
              <div className="universal-empty-chips-box">
                <span>Quick sample reference codes:</span>
                {SAMPLE_CODES.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className="universal-sample-chip"
                    onClick={() => handleChipClick(code)}
                  >
                    #{code}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Result View: Purchase Request (PR) */}
        {prData && !isLoading && (
          <div className="universal-result-wrapper">
            {/* Result Header */}
            <div className="universal-result-header">
              <div className="universal-result-title-group">
                <span className="universal-result-type-tag">
                  {prData.transaction_type_name || "Purchase Request"}
                </span>
                <div className="universal-result-code-row">
                  <h3 className="universal-result-code">
                    #{prData.transaction_code}
                  </h3>
                  <button
                    type="button"
                    className="universal-copy-btn"
                    onClick={() => handleCopyCode(prData.transaction_code)}
                    title="Copy transaction code"
                  >
                    {copied ? (
                      <>
                        <CheckIcon style={{ fontSize: 12 }} /> Copied
                      </>
                    ) : (
                      <>
                        <ContentCopyIcon style={{ fontSize: 12 }} /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div
                className={`universal-status-pill ${getStatusClass(currentStatusDisplay)}`}
              >
                {isCompleted ? (
                  <CheckCircleIcon fontSize="small" />
                ) : isCancelled ? (
                  <CancelIcon fontSize="small" />
                ) : (
                  <HourglassEmptyIcon fontSize="small" />
                )}
                {currentStatusDisplay}
              </div>
            </div>

            {/* Meta Details Grid */}
            <div className="universal-result-meta-grid">
              <div className="universal-meta-item">
                <span className="universal-meta-label">Reference Number</span>
                <span className="universal-meta-value">
                  {prData.purchase_request_number ||
                    prData.purchase_order_number ||
                    prData.pettycash_purchase_request_number ||
                    "--"}
                </span>
              </div>

              <div className="universal-meta-item">
                <span className="universal-meta-label">Requesting Employee</span>
                <span className="universal-meta-value">
                  {prData.employee_name || "--"}
                </span>
              </div>

              <div className="universal-meta-item">
                <span className="universal-meta-label">Office / Area</span>
                <span className="universal-meta-value">
                  {prData.employee_area || prData.employee_area_code || "--"}
                </span>
              </div>

              <div className="universal-meta-item">
                <span className="universal-meta-label">Date Filed</span>
                <span className="universal-meta-value">
                  {timeline.length > 0
                    ? formatDate(timeline[0].created_at || timeline[0].date_in)
                    : "--"}
                </span>
              </div>
            </div>

            {/* 3-Stage Progress Stepper */}
            <div className="universal-stepper-box">
              <div className="universal-stepper-track">
                <div
                  className="universal-stepper-fill"
                  style={{
                    width: stepFinal ? "calc(100% - 60px)" : stepProcessing ? "50%" : "0%",
                    backgroundColor: isCancelled ? "#ef4444" : "#0f5721",
                  }}
                />

                <div className={`universal-step-item ${stepFiled ? "completed" : ""}`}>
                  <div className="universal-step-disc">1</div>
                  <span className="universal-step-name">Filed</span>
                </div>

                <div
                  className={`universal-step-item ${
                    stepProcessing ? (stepFinal ? "completed" : "active") : ""
                  }`}
                >
                  <div className="universal-step-disc">2</div>
                  <span className="universal-step-name">Processing</span>
                </div>

                <div
                  className={`universal-step-item ${
                    stepFinal ? (isCancelled ? "danger" : "completed") : ""
                  }`}
                >
                  <div className="universal-step-disc">
                    {isCancelled ? "✕" : "3"}
                  </div>
                  <span className="universal-step-name">
                    {isCancelled ? "Cancelled" : isReturned ? "Returned" : "Completed"}
                  </span>
                </div>
              </div>
            </div>

            {/* Office Stations & Workflow Milestones (Full PR Stepper) */}
            <div className="universal-timeline-box">
              <div className="universal-timeline-header-row">
                <h5 className="universal-box-title">
                  <PlaceOutlinedIcon style={{ color: "#0f5721", fontSize: 18 }} />
                  Transaction Workflow & Milestone Timeline
                </h5>
                <span className="universal-timeline-step-count">
                  {timeline.length} {timeline.length === 1 ? "Station Logged" : "Stations Logged"}
                  {nextOffice?.next_office ? " • 1 Pending" : ""}
                </span>
              </div>

              <div className="universal-timeline-feed">
                {timeline.map((entry, idx) => {
                  const isRequesterStep = idx === 0;
                  const stepName = isRequesterStep
                    ? getEmployeeName(entry.employee_name || prData.employee_name, entry.employee_area_code || prData.employee_area_code)
                    : entry.step_area_name || getOfficeName(entry.previous_office || entry.employee_area_code) || entry.employee_name || "Station Office";

                  const displayBadge = formatActionBadge(entry.action, entry.new_status);
                  const badgeClass = getStatusBadgeClass(displayBadge);
                  const remarksData = parseRemarks(entry.comments);
                  const hasRemarks = Boolean(remarksData && (remarksData.comment || (Array.isArray(remarksData.reasons) && remarksData.reasons.length > 0)));

                  return (
                    <div key={entry.id || idx} className="universal-milestone-entry completed">
                      {/* Step Indicator Pin with Checkmark */}
                      <div className="universal-milestone-pin completed">
                        <CheckIcon style={{ fontSize: 12, color: "#ffffff" }} />
                      </div>

                      <div className="universal-milestone-card">
                        <div className="universal-milestone-top">
                          <h6 className="universal-station-label">{stepName}</h6>
                          <span className={`universal-station-pill ${badgeClass}`}>
                            {displayBadge}
                          </span>
                        </div>

                        {/* Step Details in authentic StepTextDisplay format */}
                        <div className="universal-step-details-list">
                          {entry.step_name && (
                            <div className="universal-step-detail-row">
                              <span className="universal-step-detail-label">Workflow Step:</span>
                              <span className="universal-step-detail-value">{entry.step_name}</span>
                            </div>
                          )}

                          {entry.step_area_name && (
                            <div className="universal-step-detail-row">
                              <span className="universal-step-detail-label">Assigned Office/Area:</span>
                              <span className="universal-step-detail-value">{entry.step_area_name}</span>
                            </div>
                          )}

                          {entry.new_status === "Returned" ? (
                            <div className="universal-step-detail-row">
                              <span className="universal-step-detail-label">Date returned:</span>
                              <span className="universal-step-detail-value">{formatDate(entry.date_out)}</span>
                            </div>
                          ) : entry.new_status === "Cancelled" ? (
                            <div className="universal-step-detail-row">
                              <span className="universal-step-detail-label">Date cancelled:</span>
                              <span className="universal-step-detail-value">{formatDate(entry.updated_at || entry.date_out)}</span>
                            </div>
                          ) : (
                            <>
                              {(entry.created_at || (isRequesterStep && entry.date_in)) && (
                                <div className="universal-step-detail-row">
                                  <span className="universal-step-detail-label">Date created:</span>
                                  <span className="universal-step-detail-value">
                                    {formatDate(entry.created_at || entry.date_in)}
                                  </span>
                                </div>
                              )}

                              {entry.date_in && !["On Hold", "Submitted", "Completed"].includes(entry.new_status) && !isRequesterStep && (
                                <div className="universal-step-detail-row">
                                  <span className="universal-step-detail-label">Date received:</span>
                                  <span className="universal-step-detail-value">{formatDate(entry.date_in)}</span>
                                </div>
                              )}

                              {entry.date_in && entry.new_status === "Completed" && (
                                <div className="universal-step-detail-row">
                                  <span className="universal-step-detail-label">Date approved:</span>
                                  <span className="universal-step-detail-value">{formatDate(entry.date_in)}</span>
                                </div>
                              )}

                              {entry.new_status === "Submitted" && entry.date_released && (
                                <div className="universal-step-detail-row">
                                  <span className="universal-step-detail-label">Date submitted:</span>
                                  <span className="universal-step-detail-value">{formatDate(entry.date_in)}</span>
                                </div>
                              )}

                              {entry.date_in && entry.new_status === "On Hold" && (
                                <div className="universal-step-detail-row">
                                  <span className="universal-step-detail-label">Date updated:</span>
                                  <span className="universal-step-detail-value">{formatDate(entry.date_in)}</span>
                                </div>
                              )}

                              {entry.date_released && (
                                <div className="universal-step-detail-row">
                                  <span className="universal-step-detail-label">Released for claiming:</span>
                                  <span className="universal-step-detail-value">{formatDate(entry.date_released)}</span>
                                </div>
                              )}

                              {entry.date_out && (
                                <div className="universal-step-detail-row">
                                  <span className="universal-step-detail-label">
                                    {entry.date_released ? "Date claimed:" : "Date released:"}
                                  </span>
                                  <span className="universal-step-detail-value">{formatDate(entry.date_out)}</span>
                                </div>
                              )}

                              {entry.turnaround_time && entry.turnaround_time !== "0 minutes" && (
                                <div className="universal-step-detail-row">
                                  <span className="universal-step-detail-label">Turnaround time:</span>
                                  <span className="universal-step-detail-value highlight-tat">{entry.turnaround_time}</span>
                                </div>
                              )}

                              {entry.processing_time && (
                                <div className="universal-step-detail-row">
                                  <span className="universal-step-detail-label">Processing time:</span>
                                  <span className="universal-step-detail-value highlight-proc">{entry.processing_time}</span>
                                </div>
                              )}
                            </>
                          )}

                          {entry.action && (
                            <div className="universal-milestone-note">
                              {entry.action}
                            </div>
                          )}

                          {hasRemarks && (
                            <button
                              type="button"
                              className="universal-remarks-btn"
                              onClick={() => setSelectedRemarks(remarksData)}
                            >
                              <ChatBubbleOutlineIcon style={{ fontSize: 14 }} />
                              <span>See remarks</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Pending Destination Station Step (From PR StepperComponent.jsx) */}
                {nextOffice?.next_office ? (
                  <div className="universal-milestone-entry pending">
                    <div className="universal-milestone-pin pending">
                      <RadioButtonUncheckedIcon style={{ fontSize: 16, color: "#0284c7" }} />
                    </div>
                    <div className="universal-milestone-card pending">
                      <div className="universal-milestone-top">
                        <h6 className="universal-station-label">
                          {getNextOfficeName(nextOffice, timeline[0])}
                        </h6>
                        <span className="universal-station-pill status-neutral">
                          Pending
                        </span>
                      </div>
                      <p className="universal-pending-subtext">
                        Document is currently en route to or awaiting action at{" "}
                        <strong>{getNextOfficeName(nextOffice, timeline[0])}</strong>.
                      </p>
                    </div>
                  </div>
                ) : isCancelled ? (
                  <div className="universal-milestone-entry cancelled">
                    <div className="universal-milestone-pin cancelled">
                      <CancelIcon style={{ fontSize: 16, color: "#ef4444" }} />
                    </div>
                    <div className="universal-milestone-card cancelled">
                      <div className="universal-milestone-top">
                        <h6 className="universal-station-label">Transaction has been cancelled</h6>
                        <span className="universal-station-pill status-danger">Cancelled</span>
                      </div>
                    </div>
                  </div>
                ) : isCompleted ? (
                  <div className="universal-milestone-entry completed-end">
                    <div className="universal-milestone-pin completed">
                      <CheckIcon style={{ fontSize: 12, color: "#ffffff" }} />
                    </div>
                    <div className="universal-milestone-card completed-end">
                      <div className="universal-milestone-top">
                        <h6 className="universal-station-label">
                          Transaction ended{prData.transaction_type_id !== 3 ? (prData.transaction_type_id === 1 ? " (Awaiting delivery)" : " (For bidding)") : ""}
                        </h6>
                        <span className="universal-station-pill status-success">Completed</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Requisition Items Accordion */}
            {items.length > 0 && (
              <div style={{ padding: "0 24px 20px 24px" }}>
                <Accordion
                  defaultExpanded={false}
                  sx={{
                    border: "1px solid #e1ece5",
                    borderRadius: "10px !important",
                    boxShadow: "none",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 700,
                        color: "#0a3e30",
                        fontSize: "14px",
                      }}
                    >
                      <Inventory2OutlinedIcon style={{ color: "#0f5721", fontSize: 18 }} />
                      Requisition Items ({items.length}{" "}
                      {items.length === 1 ? "item" : "items"})
                    </div>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <div style={{ overflowX: "auto" }}>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          fontSize: "13px",
                        }}
                      >
                        <thead>
                          <tr style={{ background: "#f3f7f4", color: "#0a3e30" }}>
                            <th style={{ padding: "8px 12px", textAlign: "left" }}>#</th>
                            <th style={{ padding: "8px 12px", textAlign: "left" }}>Description</th>
                            <th style={{ padding: "8px 12px", textAlign: "left" }}>Qty</th>
                            <th style={{ padding: "8px 12px", textAlign: "left" }}>Unit</th>
                            <th style={{ padding: "8px 12px", textAlign: "right" }}>Unit Cost</th>
                            <th style={{ padding: "8px 12px", textAlign: "right" }}>Total Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, index) => (
                            <tr
                              key={item.id || index}
                              style={{ borderBottom: "1px solid #eef3f0" }}
                            >
                              <td style={{ padding: "8px 12px" }}>{index + 1}</td>
                              <td style={{ padding: "8px 12px", fontWeight: 600 }}>
                                {item.description}
                              </td>
                              <td style={{ padding: "8px 12px" }}>{item.quantity}</td>
                              <td style={{ padding: "8px 12px" }}>{item.unit || "--"}</td>
                              <td style={{ padding: "8px 12px", textAlign: "right" }}>
                                {formatCurrency(item.unit_cost)}
                              </td>
                              <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600 }}>
                                {formatCurrency(item.total_cost)}
                              </td>
                            </tr>
                          ))}
                          <tr style={{ background: "#f7faf8", fontWeight: 700 }}>
                            <td colSpan={5} style={{ padding: "10px 12px", textAlign: "right" }}>
                              Total Estimated Cost:
                            </td>
                            <td
                              style={{
                                padding: "10px 12px",
                                textAlign: "right",
                                color: "#0f5721",
                                fontSize: "14px",
                              }}
                            >
                              {formatCurrency(totalItemsAmount)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Footer with Shortcuts */}
      <div className="universal-modal-footer">
        <div className="universal-modal-footer-hint">
          <span>Tip: Press</span>
          <kbd className="universal-shortcut-kbd">Enter</kbd>
          <span>to search,</span>
          <kbd className="universal-shortcut-kbd">ESC</kbd>
          <span>to dismiss</span>
        </div>
        <div>
          <span>ZCMC Connected Systems Tracker</span>
        </div>
      </div>
    </Dialog>

    {/* Transaction Remarks Dialog */}
    <Dialog
      open={Boolean(selectedRemarks)}
      onClose={() => setSelectedRemarks(null)}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: "16px",
          padding: "6px",
        },
      }}
    >
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#0a3e30" }}>
            Transaction Remarks
          </h4>
          <button
            type="button"
            onClick={() => setSelectedRemarks(null)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              color: "#6b7280",
            }}
          >
            <CloseIcon style={{ fontSize: 18 }} />
          </button>
        </div>
        <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#6b7280" }}>
          The following information was recorded when the date of the transaction was updated.
        </p>

        {selectedRemarks?.reasons && selectedRemarks.reasons.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
              Tagged reasons:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {selectedRemarks.reasons.map((item, key) => (
                <span
                  key={key}
                  style={{
                    background: "#fffbeb",
                    border: "1px solid #fde68a",
                    color: "#b45309",
                    padding: "3px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {typeof item === "object" ? item?.reason || JSON.stringify(item) : item}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedRemarks?.comment && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
              Remarks:
            </div>
            <div
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "13px",
                color: "#1f2937",
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
              }}
            >
              {selectedRemarks.comment}
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <button
            type="button"
            onClick={() => setSelectedRemarks(null)}
            style={{
              background: "#0f5721",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 18px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  </>
);
};

export default UniversalSearchModal;
