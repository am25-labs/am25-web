export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { name, email, language, service, token } = await request.json();

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

  const strapiRes = await fetch(
    `${import.meta.env.STRAPI_API_URL}/api/contacts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.STRAPI_FORM_TOKEN}`,
      },
      body: JSON.stringify({ data: { name, email, language, service } }),
    },
  );

  if (!strapiRes.ok) {
    return Response.json({ error: "Error al enviar" }, { status: 500 });
  }

  return Response.json({ success: true });
};
