"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AuditResponse } from "@/types/domain";

interface AuditResultProps {
  result: AuditResponse;
}

export function AuditResult({ result }: AuditResultProps) {
  const { lead, diagnosis } = result;
  const [copied, setCopied] = useState(false);

  const copyAudit = async () => {
    const text = [
      `Brand: ${lead.brand}`,
      `Website: ${lead.website}`,
      ``,
      `Clarity: ${diagnosis.clarity}/5`,
      `Trust: ${diagnosis.trust}/5`,
      `Consistency: ${diagnosis.consistency}/5`,
      ``,
      `Evidence: ${diagnosis.evidence}`,
      ``,
      `Summary: ${diagnosis.summary}`,
      ``,
      `Recommendation: ${diagnosis.recommendation}`,
      ``,
      `Next Step: ${diagnosis.nextStep}`,
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <div className="max-h-[70dvh] overflow-y-auto -pr-2 space-y-6">
      <div>
        <h3 className="mt-4 text-xl font-bold uppercase">{lead.brand}</h3>

        <p className="mt-1 text-sm opacity-70">{lead.website}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <ScoreCard label="Clarity" value={diagnosis.clarity} />
        <ScoreCard label="Trust" value={diagnosis.trust} />
        <ScoreCard label="Consistency" value={diagnosis.consistency} />
      </div>

      <Section title="Evidence" content={diagnosis.evidence} />
      <Section title="Summary" content={diagnosis.summary} />
      <Section title="Recommendation" content={diagnosis.recommendation} />
      <Section title="Next Step" content={diagnosis.nextStep} />

      <div className="border p-4">
        <p className="text-sm font-semibold uppercase">Want a deeper review?</p>
        <p className="mt-2 text-sm opacity-70">
          Turn this quick audit into a clear action plan for your brand.
        </p>

        <Button
          type="button"
          onClick={copyAudit}
          className="mt-4 w-full rounded-full font-bold uppercase"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy Audit"}
        </Button>
      </div>
    </div>
  );
}

interface ScoreCardProps {
  label: string;
  value: number;
}

function ScoreCard({ label, value }: ScoreCardProps) {
  return (
    <div className="border p-3 text-center">
      <p className="text-lg font-bold">{value}/5</p>
      <p className="mt-1 text-[10px] font-bold uppercase opacity-60">{label}</p>
    </div>
  );
}

interface SectionProps {
  title: string;
  content: string;
}

function Section({ title, content }: SectionProps) {
  return (
    <section>
      <h4 className="text-sm font-bold uppercase">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed opacity-80">{content}</p>
    </section>
  );
}
