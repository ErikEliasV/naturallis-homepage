"use client";

import { type FormEvent, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChoicePill } from "@/components/ui/choice-pill";
import { TextAreaField } from "@/components/ui/text-area-field";
import { TextField } from "@/components/ui/text-field";
import { whatsappLink } from "@/utils/whatsapp";

type FieldName = "name" | "phone" | "consent";
type Errors = Partial<Record<FieldName, string>>;

const RECIPE_OPTIONS = [
  { value: "receita", label: "Tenho receita" },
  { value: "orientacao", label: "Quero orientação" },
] as const;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (String(data.get("name") ?? "").trim().length < 2) errors.name = "Informe seu nome.";
  if (String(data.get("phone") ?? "").replace(/\D/g, "").length < 10) {
    errors.phone = "Informe um WhatsApp com DDD.";
  }
  if (!data.get("consent"))
    errors.consent = "Precisamos da sua autorização para entrar em contato.";
  return errors;
}

function buildMessage(data: FormData): string {
  const name = String(data.get("name") ?? "").trim();
  const recipe = data.get("recipe") === "receita";
  const details = String(data.get("details") ?? "").trim();
  return [
    `Olá! Meu nome é ${name}.`,
    recipe
      ? "Tenho uma receita e gostaria de um orçamento. Vou enviar a foto aqui na conversa."
      : "Gostaria de orientação para manipular uma fórmula.",
    details ? `Detalhes: ${details}` : "",
    `Contato: ${String(data.get("phone") ?? "").trim()}${data.get("email") ? ` / ${String(data.get("email"))}` : ""}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** "Peça sua fórmula" request. Opens WhatsApp with the request filled in. */
export function FormulaRequestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const groupId = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [recipe, setRecipe] = useState<(typeof RECIPE_OPTIONS)[number]["value"]>("receita");
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
    window.open(whatsappLink(buildMessage(data)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-5">
        <p className="font-serif text-heading-lg">Pedido iniciado no WhatsApp.</p>
        <p className="text-black/70">
          Continue a conversa por lá e envie a foto da receita, se tiver. Nossa equipe responde em
          horário comercial.
        </p>
        <Button variant="ink" size="shop" onClick={() => setSent(false)}>
          Enviar outro pedido
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-5 font-geist text-body"
    >
      <TextField label="Nome" name="name" autoComplete="name" required error={errors.name} />
      <div className="grid gap-5 sm:grid-cols-2">
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
        <TextField label="E-mail" name="email" type="email" autoComplete="email" />
      </div>

      <fieldset>
        <legend className="text-body-sm font-medium">Você já tem receita?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {RECIPE_OPTIONS.map((option) => (
            <ChoicePill
              key={option.value}
              name="recipe"
              value={option.value}
              checked={recipe === option.value}
              onChange={() => setRecipe(option.value)}
              aria-describedby={`${groupId}-hint`}
            >
              {option.label}
            </ChoicePill>
          ))}
        </div>
        <p id={`${groupId}-hint`} className="mt-2 text-body-sm text-black/60">
          A foto da receita é enviada na conversa do WhatsApp.
        </p>
      </fieldset>

      <TextAreaField
        label="Conte o que você precisa"
        name="details"
        placeholder="Ex.: fórmula para sono, dose indicada pelo médico, alergias…"
      />

      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-body-sm">
          <Checkbox
            name="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${groupId}-consent` : undefined}
            className="mt-0.5"
          />
          Autorizo a Naturallis a entrar em contato comigo sobre este pedido.
        </label>
        {errors.consent ? (
          <p id={`${groupId}-consent`} className="text-body-sm text-promo">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div>
        <Button type="submit" variant="lime" size="shop">
          Enviar pedido pelo WhatsApp
        </Button>
      </div>
    </form>
  );
}
