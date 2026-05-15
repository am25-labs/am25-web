"use server";

import type { ContactFormData, ActionResult } from "@/lib/types";

export async function submitContactForm(
  formData: ContactFormData,
): Promise<ActionResult> {
  const { name, email, service, language, message, token } = formData;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!token) {
    return { success: false, error: "Turnstile token faltante" };
  }

  if (!turnstileSecret) {
    return { success: false, error: "Form backend is not configured" };
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: token,
      }),
    },
  );

  const data = await res.json();
  if (!data.success) {
    return { success: false, error: "Falló la verificación Turnstile" };
  }

  void { name, email, service, language, message };

  return {
    success: false,
    error: "Contact delivery is not configured",
  };
}
