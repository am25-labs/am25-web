export type ContactFormMode = "general" | "services";

export interface ContactBasePayload {
  name: string;
  email: string;
  language: string;
  message: string;
  token: string;
}

export interface GeneralContactPayload extends ContactBasePayload {
  subject: string;
}

export interface ServicesContactPayload extends ContactBasePayload {
  service: string;
}

export interface TurnstileVerificationResponse {
  success: boolean;
}
