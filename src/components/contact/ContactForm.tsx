"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SendIcon, ArrowUpRightIcon } from "lucide-react";
import { Turnstile } from "react-turnstile";
import { nameRegex, emailRegex } from "@/lib/validation";

const SERVICE_OPTIONS = ["Graphic Design", "Web/Dev", "Multimedia"];

interface FormState {
  name: string;
  email: string;
  service: string;
}

interface StatusMessage {
  type: "success" | "error";
  text: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", service: "" });
  const [captchaToken, setCaptchaToken] = useState("");
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", service: "" });
    setCaptchaToken("");
    setStatusMessage(null);
    setFormKey((prev) => prev + 1);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validations = [
      { valid: nameRegex.test(form.name), field: "Nombre inválido." },
      { valid: emailRegex.test(form.email), field: "Correo inválido." },
      { valid: form.service !== "", field: "Selecciona un servicio." },
    ];

    for (const v of validations) {
      if (!v.valid) {
        setStatusMessage({ type: "error", text: v.field });
        return;
      }
    }

    if (!captchaToken) {
      setStatusMessage({ type: "error", text: "Por favor completa el captcha." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token: captchaToken }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({ type: "success", text: "Enviado con éxito." });
        resetForm();
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        setStatusMessage({ type: "error", text: data.error || "Error al enviar. Intenta de nuevo." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Error de red. Intenta más tarde." });
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="bg-black">
      <form key={formKey} onSubmit={handleSubmit}>
        <CardContent>
          <FieldSet>
            <FieldLegend className="font-bold uppercase">
              How can I contact you?
            </FieldLegend>
            <FieldDescription>
              To answer your questions, we need to be able to contact:
            </FieldDescription>

            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="rounded-none"
                    required
                    autoComplete="name"
                  />
                </Field>
                <Field>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-none"
                    required
                    autoComplete="email"
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSet className="mt-8">
            <FieldLegend className="font-bold uppercase">
              Choose a service
            </FieldLegend>
            <FieldDescription>
              The main service that interests you:
            </FieldDescription>

            <FieldGroup>
              <Field>
                <Select
                  value={form.service}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, service: value }))
                  }
                >
                  <SelectTrigger className="w-full rounded-none">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox defaultChecked required />
                <FieldLabel className="flex-wrap gap-1.5 text-xs">
                  I have read and agree to the{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    className="inline-flex items-center hover:font-bold"
                  >
                    Privacy Policy<ArrowUpRightIcon size={16} className="text-am-y shrink-0" />
                  </a>
                </FieldLabel>
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Turnstile
                sitekey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY}
                onVerify={(token) => setCaptchaToken(token)}
                size="flexible"
                theme="dark"
                language="en"
              />
            </FieldGroup>

            {statusMessage && (
              <p
                className={
                  statusMessage.type === "success"
                    ? "text-xs text-green-500"
                    : "text-xs text-red-500"
                }
              >
                {statusMessage.text}
              </p>
            )}
          </FieldSet>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal" className="mt-5">
            <Button
              type="submit"
              className="font-bold uppercase rounded-full px-4 cursor-pointer"
              size="lg"
              disabled={isSubmitting}
            >
              <SendIcon /> {isSubmitting ? "Sending..." : "Send"}
            </Button>
            <Button
              variant="secondary"
              className="font-bold uppercase rounded-full px-4 cursor-pointer"
              size="lg"
              type="reset"
              onClick={resetForm}
            >
              Cancel
            </Button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
}
