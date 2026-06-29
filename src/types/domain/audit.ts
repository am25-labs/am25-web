import type { AuditFormData } from "./forms";

export type AuditLanguage = "es" | "en";

export type AuditLead = {
  name: string;
  email: string;
  brand: string;
  website: string;
  instagram: string;
  hasInstagram: boolean;
  leadScore: number;
  leadTemperature: "cold" | "warm" | "hot";
  language: AuditLanguage;
};

export type AuditDiagnosis = {
  clarity: number;
  trust: number;
  consistency: number;
  priority: string;
  evidence: string;
  summary: string;
  recommendation: string;
  nextStep: string;
};

export type AuditResponse = {
  ok: true;
  lead: AuditLead;
  diagnosis: AuditDiagnosis;
};

export type AuditLeadRequest = {
  form: AuditFormData;
  audit: AuditResponse;
};
