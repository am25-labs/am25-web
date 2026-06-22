import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/contact";
import type { AuditFormPayload } from "@/types/domain";

export async function POST(request: NextRequest) {
  try {
    const data: AuditFormPayload = await request.json();

    if (typeof data.token !== "string" || !(await verifyTurnstile(data.token))) {
      return NextResponse.json(
        { error: "Turnstile verification failed" },
        { status: 400 },
      );
    }

    const { token: _token, ...auditData } = data;

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const auditKey = process.env.N8N_WEBHOOK_KEY;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Webhook URL not configured" },
        { status: 500 },
      );
    }

    if (!auditKey) {
      return NextResponse.json(
        { error: "Audit key not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-am25-audit-key": auditKey,
      },
      body: JSON.stringify(auditData),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to generate audit",
          details: result,
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Audit API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
