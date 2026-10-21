"use client";

import { type FormEvent, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChoicePill } from "@/components/ui/choice-pill";
import { TextAreaField } from "@/components/ui/text-area-field";
import { TextField } from "@/components/ui/text-field";
import { whatsappLink } from "@/utils/whatsapp";

const SUBJECTS = [
  { value: "duvida", label: "Tirar uma dúvida" },
  { value: "agendar", label: "Agendar conversa gratuita" },
  { value: "pedido", label: "Acompanhar pedido" },
] as const;

type Subject = (typeof SUBJECTS)[number]["value"];
type Errors = Partial<Record<"name" | "phone" | "message" | "consent", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (String(data.get("name") ?? "").trim().length < 2) errors.name = "Informe seu nome.";
  if (String(data.get("phone") ?? "").replace(/\D/g, "").length < 10) {
    errors.phone = "Informe um WhatsApp com DDD.";
  }
  if (String(data.get("message") ?? "").trim().length < 5) {
    errors.message = "Conte em poucas palavras como podemos ajudar.";
  }
  if (!data.get("consent")) errors.consent = "Precisamos da sua autorização para responder.";
  return errors;
}

/** Contact request that continues on WhatsApp. */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const consentId = useId();
  const [subject, setSubject] = useState<Subject>("duvida");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(),
      );
      return;
    }
    const subjectLabel = SUBJECTS.find((option) => option.value === subject)?.label ?? "";
    const message = [
      `Olá! Meu nome é ${String(data.get("name")).trim()}.`,
      `Assunto: ${subjectLabel}.`,
      String(data.get("message")).trim(),
      `Contato: ${String(data.get("phone")).trim()}`,
    ].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-5">
        <p className="font-display text-heading-lg">Mensagem pronta no WhatsApp.</p>
        <p className="text-black/70">Envie por lá e nossa equipe responde em horário comercial.</p>
        <Button variant="ink" size="shop" onClick={() => setSent(false)}>
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-col gap-5 text-body">
      <fieldset>
        <legend className="text-body-sm font-medium">Como podemos ajudar?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {SUBJECTS.map((option) => (
            <ChoicePill
              key={option.value}
              name="subject"
              value={option.value}
              checked={subject === option.value}
              onChange={() => setSubject(option.value)}
            >
              {option.label}
            </ChoicePill>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nome" name="name" autoComplete="name" required error={errors.name} />
        <TextField
          label="WhatsApp"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          required
          error={errors.phone}
        />
      </div>
      <TextAreaField label="Mensagem" name="message" required error={errors.message} />
      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-body-sm">
          <Checkbox
            name="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? consentId : undefined}
            className="mt-0.5"
          />
          Autorizo a Naturallis a responder pelo WhatsApp.
        </label>
        {errors.consent ? (
          <p id={consentId} className="text-body-sm text-promo">
            {errors.consent}
          </p>
        ) : null}
      </div>
      <div>
        <Button type="submit" variant="lime" size="shop">
          Enviar pelo WhatsApp
        </Button>
      </div>
    </form>
  );
}
