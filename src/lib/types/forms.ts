export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  language: string;
  message: string;
  token: string;
}

export interface ActionResult {
  success: boolean;
  error?: string;
  message?: string;
}
