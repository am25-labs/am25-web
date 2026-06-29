import { NextResponse } from "next/server";
import type { AuditLeadRequest } from "@/types/domain";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parsePayload(value: unknown): AuditLeadRequest | null {
  if (!isRecord(value) || !isRecord(value.form) || !isRecord(value.audit)) {
    return null;
  }

  const { form, audit } = value;

  if (
    !isNonEmptyString(form.name) ||
    !isNonEmptyString(form.email) ||
    !isNonEmptyString(form.brand) ||
    !isRecord(audit.lead) ||
    !isRecord(audit.diagnosis)
  ) {
    return null;
  }

  return value as AuditLeadRequest;
}

function quality(value: string | undefined) {
  if (value === "hot") return "HIGH";
  if (value === "warm") return "MEDIUM";
  if (value === "cold") return "LOW";
  return "UNKNOWN";
}

async function readJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const payload = parsePayload(body);

    if (!payload) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const url = process.env.KIZUNA_LEADS_URL;
    const key = process.env.KIZUNA_LEADS_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { error: "Lead intake is not configured" },
        { status: 500 },
      );
    }

    const { form, audit } = payload;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-am25-leads-key": key,
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        companyName: form.brand,
        website: form.website,
        source: "am25-website",
        intent: "brand-audit",
        quality: quality(audit.lead.leadTemperature),
        summary: audit.diagnosis.summary,
        auditPayload: {
          form,
          audit,
        },
      }),
    });

    const result = await readJson(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to request full audit",
          details: result,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(result ?? { ok: true });
  } catch (error) {
    console.error("Lead request API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
