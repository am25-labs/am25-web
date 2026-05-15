import { sendMail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, language, subject, message, token } =
    await request.json();

  if (!token) {
    return NextResponse.json(
      { error: "Turnstile token faltante" },
      { status: 400 },
    );
  }

  const turnstileResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY ?? "",
        response: token,
      }),
    },
  );

  const turnstileData = await turnstileResponse.json();
  if (!turnstileData.success) {
    return NextResponse.json(
      { error: "Falló la verificación Turnstile" },
      { status: 400 },
    );
  }

  try {
    await sendMail({
      to: "hola@am25.work",
      subject: `${subject} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nLanguage: ${language}\nSubject: ${subject}\n\n${message}`,
    });
  } catch {
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
