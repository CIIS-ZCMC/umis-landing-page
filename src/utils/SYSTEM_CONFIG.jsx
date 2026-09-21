import React from "react";
import {
  AdminPanelSettings,
  AltRoute,
  Assessment,
  Badge,
  Biotech,
  Business,
  AccessTime,
  Engineering,
  Inventory2,
  LocalHospital,
  MedicalServices,
  Medication,
  Payments,
  ReceiptLong,
  VideoCall,
  Apps,
} from "@mui/icons-material";

/**
 * Centralized System Configurations & Metadata Registry
 * Easily track, choose, and maintain subsystem identities by system code.
 */
export const SYSTEM_CONFIGS = {
  UMIS: {
    code: "UMIS",
    title: "User Management Information System",
    shortTitle: "UMIS Central Gateway",
    description: "Centralized employee credentials, role permissions, daily time records, and access gateway",
    category: "Administrative",
    colorClass: "ulp-icon-emerald",
    icon: <AdminPanelSettings sx={{ fontSize: 24 }} />,
    isPrimary: true,
    defaultUrl: "https://portal.zcmc.online",
  },
  PRM: {
    code: "PRM",
    title: "Purchase Request Tracking",
    shortTitle: "PR Tracking",
    description: "Supply procurement status, tracking, and approval workflows",
    category: "Logistics",
    colorClass: "ulp-icon-blue",
    icon: <ReceiptLong sx={{ fontSize: 22 }} />,
    defaultUrl: "https://prmonitoring.zcmc.online",
  },
  ERP: {
    code: "ERP",
    title: "Enterprise Resource Planning",
    shortTitle: "ERP Operations",
    description: "Integrated hospital operations, finance, and annual resource planning",
    category: "Administrative",
    colorClass: "ulp-icon-purple",
    icon: <Business sx={{ fontSize: 22 }} />,
    defaultUrl: "https://erp.zcmc.online",
  },
  REF: {
    code: "REF",
    title: "Referral System",
    shortTitle: "Patient Referral",
    description: "Inter-facility patient transfers, clinical endorsements, and referral tracking",
    category: "Clinical",
    colorClass: "ulp-icon-emerald",
    icon: <AltRoute sx={{ fontSize: 22 }} />,
    defaultUrl: "https://referral.zcmc.online",
  },
  TELE: {
    code: "TELE",
    title: "Telemedicine",
    shortTitle: "Telehealth Care",
    description: "Remote consultations and virtual patient telehealth care",
    category: "Clinical",
    colorClass: "ulp-icon-blue",
    icon: <VideoCall sx={{ fontSize: 22 }} />,
    defaultUrl: "https://telemedicine.zcmc.online",
  },
  EC1: {
    code: "EC1",
    title: "Employees Clinic",
    shortTitle: "Employees Clinic",
    description: "Healthcare services, medical consultations, and clinic encounters",
    category: "Clinical",
    colorClass: "ulp-icon-orange",
    icon: <LocalHospital sx={{ fontSize: 22 }} />,
    defaultUrl: "https://employees-clinic.zcmc.online",
  },
  SIS: {
    code: "SIS",
    title: "Supplies Inventory System",
    shortTitle: "Supplies Inventory",
    description: "Medical supplies, assets, stock movements, and inventory tracking",
    category: "Logistics",
    colorClass: "ulp-icon-amber",
    icon: <Inventory2 sx={{ fontSize: 22 }} />,
    defaultUrl: "https://inventory.zcmc.online",
  },
  PO: {
    code: "PO",
    title: "MMS PO Monitoring",
    shortTitle: "PO Monitoring",
    description: "Materials management and purchase order tracking dashboard",
    category: "Logistics",
    colorClass: "ulp-icon-purple",
    icon: <Assessment sx={{ fontSize: 22 }} />,
    defaultUrl: "https://po-dashboard.zcmc.online",
  },
  HRIS: {
    code: "HRIS",
    title: "Human Resource Information System",
    shortTitle: "HRIS Portal",
    description: "Staff plantillas, employee profiles, service records, and appointments",
    category: "Administrative",
    colorClass: "ulp-icon-blue",
    icon: <Badge sx={{ fontSize: 22 }} />,
    defaultUrl: "https://hris.zcmc.online",
  },
  DTR: {
    code: "DTR",
    title: "Daily Time Record & Biometrics",
    shortTitle: "DTR Management",
    description: "Biometric logs, time shifts, overtime, and leave applications",
    category: "Administrative",
    colorClass: "ulp-icon-emerald",
    icon: <AccessTime sx={{ fontSize: 22 }} />,
    defaultUrl: "https://dtr.zcmc.online",
  },
  LIS: {
    code: "LIS",
    title: "Laboratory Information System",
    shortTitle: "Laboratory (LIS)",
    description: "Diagnostic test orders, specimen tracking, and pathology results",
    category: "Clinical",
    colorClass: "ulp-icon-cyan",
    icon: <Biotech sx={{ fontSize: 22 }} />,
    defaultUrl: "https://lis.zcmc.online",
  },
  RIS: {
    code: "RIS",
    title: "Radiology & Imaging System (PACS)",
    shortTitle: "Radiology (RIS)",
    description: "X-ray, CT scan, MRI imaging orders, and radiological reports",
    category: "Clinical",
    colorClass: "ulp-icon-blue",
    icon: <MedicalServices sx={{ fontSize: 22 }} />,
    defaultUrl: "https://ris.zcmc.online",
  },
  PHARM: {
    code: "PHARM",
    title: "Pharmacy Management System",
    shortTitle: "Pharmacy Care",
    description: "Prescription dispensing, drug formularies, and ward medication logs",
    category: "Clinical",
    colorClass: "ulp-icon-emerald",
    icon: <Medication sx={{ fontSize: 22 }} />,
    defaultUrl: "https://pharmacy.zcmc.online",
  },
  BILL: {
    code: "BILL",
    title: "Hospital Billing & Claims",
    shortTitle: "Billing & e-Claims",
    description: "Patient billing, statement of accounts, and PhilHealth e-Claims",
    category: "Administrative",
    colorClass: "ulp-icon-amber",
    icon: <Payments sx={{ fontSize: 22 }} />,
    defaultUrl: "https://billing.zcmc.online",
  },
  HEM: {
    code: "HEM",
    title: "Engineering & Maintenance",
    shortTitle: "HEM Maintenance",
    description: "Hospital facility repair work orders, equipment PM, and biomedical engineering",
    category: "Logistics",
    colorClass: "ulp-icon-orange",
    icon: <Engineering sx={{ fontSize: 22 }} />,
    defaultUrl: "https://hem.zcmc.online",
  },
};

/**
 * Standard category definitions for grouping and filtering connected systems
 */
export const SYSTEM_CATEGORIES = [
  { id: "All", label: "All Systems" },
  { id: "Clinical", label: "Clinical & Medical" },
  { id: "Administrative", label: "Administrative & HR" },
  { id: "Logistics", label: "Logistics & Supplies" },
];

/**
 * Helper to resolve metadata and icon for any given system item
 */
export const resolveSystemConfig = (system) => {
  const code = (system?.code || "").toUpperCase();
  const name = (system?.name || system?.title || "").toLowerCase();

  // 1. Direct match by system code
  if (SYSTEM_CONFIGS[code]) {
    return SYSTEM_CONFIGS[code];
  }

  // 2. Keyword heuristic match
  if (name.includes("purchase") || name.includes("pr ") || name.includes("prm") || name.includes("procurement")) {
    return SYSTEM_CONFIGS.PRM;
  }
  if (name.includes("enterprise") || name.includes("erp") || name.includes("planning")) {
    return SYSTEM_CONFIGS.ERP;
  }
  if (name.includes("referral") || name.includes("endorsement")) {
    return SYSTEM_CONFIGS.REF;
  }
  if (name.includes("telemedicine") || name.includes("virtual") || name.includes("telehealth")) {
    return SYSTEM_CONFIGS.TELE;
  }
  if (name.includes("clinic") || name.includes("consultation")) {
    return SYSTEM_CONFIGS.EC1;
  }
  if (name.includes("inventory") || name.includes("supply") || name.includes("supplies") || name.includes("stock")) {
    return SYSTEM_CONFIGS.SIS;
  }
  if (name.includes("po") || name.includes("order") || name.includes("mms")) {
    return SYSTEM_CONFIGS.PO;
  }
  if (name.includes("lab") || name.includes("pathology")) {
    return SYSTEM_CONFIGS.LIS;
  }
  if (name.includes("radiology") || name.includes("imaging") || name.includes("x-ray") || name.includes("pacs")) {
    return SYSTEM_CONFIGS.RIS;
  }
  if (name.includes("pharmacy") || name.includes("drug") || name.includes("medication")) {
    return SYSTEM_CONFIGS.PHARM;
  }
  if (name.includes("billing") || name.includes("claim") || name.includes("philhealth")) {
    return SYSTEM_CONFIGS.BILL;
  }
  if (name.includes("engineering") || name.includes("maintenance") || name.includes("work order")) {
    return SYSTEM_CONFIGS.HEM;
  }
  if (name.includes("dtr") || name.includes("time") || name.includes("biometric")) {
    return SYSTEM_CONFIGS.DTR;
  }
  if (name.includes("hris") || name.includes("personnel") || name.includes("human resource")) {
    return SYSTEM_CONFIGS.HRIS;
  }

  // 3. Clean fallback
  return {
    code: code || "SYS",
    title: system?.name || system?.title || "Connected Hospital System",
    shortTitle: system?.name || system?.title || "Hospital System",
    description: system?.description || "Access integrated hospital subsystem and specialized unit records",
    category: "Administrative",
    colorClass: "ulp-icon-blue",
    icon: <Apps sx={{ fontSize: 22 }} />,
    defaultUrl: system?.url || "#",
  };
};
