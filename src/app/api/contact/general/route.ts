import { parseGeneralContactPayload, verifyTurnstile } from "@/lib/contact";
import { sendMail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = parseGeneralContactPayload(await request.json());

  if (!payload) {
    return NextResponse.json(
      { error: "Payload inválido" },
      { status: 400 },
    );
  }

  if (!(await verifyTurnstile(payload.token))) {
    return NextResponse.json(
      { error: "Falló la verificación Turnstile" },
      { status: 400 },
    );
  }

  try {
    await sendMail({
      to: "hola@am25.work",
      subject: `${payload.subject} from ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\nLanguage: ${payload.language}\nSubject: ${payload.subject}\n\n${payload.message}`,
    });
  } catch {
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
