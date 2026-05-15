"use client";

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
import Link from "next/link";
import { ArrowUpRightIcon, SendIcon } from "lucide-react";
import { submitContactForm } from "@/actions/forms";
import Turnstile from "react-turnstile";
import { useState } from "react";
import { nameRegex, emailRegex } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";

const SERVICE_OPTIONS = ["Graphic Design", "Web/Dev", "Multimedia"];
const LANGUAGE_OPTIONS = ["Spanish", "English"];

interface FormState {
  name: string;
  email: string;
  service: string;
  language: string;
  message: string;
}

interface StatusMessage {
  type: "success" | "error";
  text: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    service: "",
    language: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
      setStatusMessage({
        type: "error",
        text: "Por favor completa el captcha.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const result = await submitContactForm({ ...form, token: captchaToken });

      if (result.success) {
        setStatusMessage({ type: "success", text: "Enviado con éxito." });
        setForm({
          name: "",
          email: "",
          service: "",
          language: "",
          message: "",
        });
        setCaptchaToken("");
        setFormKey((prev) => prev + 1);
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        setStatusMessage({
          type: "error",
          text: result.error || "Error al enviar. Intenta de nuevo.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Error de red. Intenta más tarde.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="bg-background">
      <form key={formKey} onSubmit={handleSubmit}>
        <CardContent>
          <div>
            <FieldSet>
              <FieldLegend className="font-bold uppercase">
                How can I contact you?
              </FieldLegend>
              <FieldDescription>
                To answer your questions, I need to be able to contact:
              </FieldDescription>

              <FieldGroup>
                <Field className="-mb-3">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Field>
                    <Select
                      value={form.language}
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, language: value }))
                      }
                    >
                      <SelectTrigger className="w-full rounded-none">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGE_OPTIONS.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
          </div>

          <div>
            <FieldSet className="mt-8">
              <FieldLegend className="font-bold uppercase">
                Choose a service
              </FieldLegend>
              <FieldDescription>
                The main service that interests you:
              </FieldDescription>

              <FieldGroup>
                <Field className="-mb-3">
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
                <Field>
                  <Textarea
                    name="message"
                    placeholder="Type your message here"
                    value={form.message}
                    onChange={handleChange}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field orientation="horizontal">
                  <Checkbox defaultChecked required />
                  <FieldLabel className="text-xs inline">
                    <span>
                      I have read and agree to the{" "}
                      <Link
                        href="/privacy"
                        target="_blank"
                        className="hover:font-bold"
                      >
                        Privacy Policy
                        <ArrowUpRightIcon
                          size={16}
                          aria-hidden="true"
                          className="inline align-text-top"
                        />
                      </Link>
                    </span>
                  </FieldLabel>
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Turnstile
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onVerify={(token) => setCaptchaToken(token)}
                  size="flexible"
                  theme="light"
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
          </div>
        </CardContent>

        <CardFooter>
          <div>
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
                onClick={() => {
                  setForm({
                    name: "",
                    email: "",
                    service: "",
                    language: "",
                    message: "",
                  });
                  setCaptchaToken("");
                  setStatusMessage(null);
                  setFormKey((prev) => prev + 1);
                }}
              >
                Cancel
              </Button>
            </Field>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
