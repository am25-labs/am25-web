export const prerender = false;

import type { APIRoute } from "astro";
import { sendMail } from "@/lib/mailer";

export const POST: APIRoute = async ({ request }) => {
  const { name, email, language, service, message, token } = await request.json();

  if (!token) {
    return Response.json(
      { error: "Turnstile token faltante" },
      { status: 400 },
    );
  }

  const turnstileRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: import.meta.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    },
  );

  const turnstileData = await turnstileRes.json();
  if (!turnstileData.success) {
    return Response.json(
      { error: "Falló la verificación Turnstile" },
      { status: 400 },
    );
  }

  try {
    await sendMail({
      to: "projects@am25.work",
      subject: `Service Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nLanguage: ${language}\nService: ${service}\nMessage: ${message}`,
    });
  } catch {
    return Response.json({ error: "Error al enviar" }, { status: 500 });
  }

  return Response.json({ success: true });
};
