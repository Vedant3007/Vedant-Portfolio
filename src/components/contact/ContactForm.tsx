"use client";

import { useActionState, useState } from "react";
import type { FormEvent } from "react";
import { sendMessage, type ContactState } from "@/app/contact/actions";
import { cn } from "@/lib/cn";
import {
  LIMITS,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact-validation";

const initialState: ContactState = { status: "idle", message: "" };
const EMPTY_VALUES: ContactValues = { name: "", email: "", message: "" };
const FIELDS = ["name", "email", "message"] as const;

const fieldClasses =
  "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [messageLength, setMessageLength] = useState(0);

  const [state, formAction, isPending] = useActionState(
    async (previous: ContactState, formData: FormData) => {
      const result = await sendMessage(previous, formData);
      setErrors(result.errors ?? {});
      if (result.status === "success") setMessageLength(0);
      return result;
    },
    initialState,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const found = validateContact({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    });

    if (Object.keys(found).length > 0) {
      event.preventDefault();
      setErrors(found);
      const first = FIELDS.find((field) => found[field]);
      if (first) {
        (event.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      }
    }
  }

  function checkField(field: keyof ContactValues, value: string) {
    const error = value.trim()
      ? validateContact({ ...EMPTY_VALUES, [field]: value })[field]
      : undefined;
    setErrors((previous) => ({ ...previous, [field]: error }));
  }

  function clearError(field: keyof ContactValues) {
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="hp_trap">Leave this field empty</label>
        <input id="hp_trap" name="hp_trap" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={LIMITS.nameMax}
          defaultValue={state.values?.name}
          onChange={() => clearError("name")}
          onBlur={(event) => checkField("name", event.currentTarget.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(fieldClasses, errors.name ? "border-red-500" : "border-border")}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={LIMITS.emailMax}
          defaultValue={state.values?.email}
          onChange={() => clearError("email")}
          onBlur={(event) => checkField("email", event.currentTarget.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(fieldClasses, errors.email ? "border-red-500" : "border-border")}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={LIMITS.messageMax}
          defaultValue={state.values?.message}
          onChange={(event) => {
            setMessageLength(event.currentTarget.value.length);
            clearError("message");
          }}
          onBlur={(event) => checkField("message", event.currentTarget.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(fieldClasses, "resize-y", errors.message ? "border-red-500" : "border-border")}
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <div>
            {errors.message && (
              <p id="message-error" className="text-sm text-red-500">
                {errors.message}
              </p>
            )}
          </div>
          <p className="shrink-0 font-mono text-xs text-muted">
            {messageLength}/{LIMITS.messageMax}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send message"}
      </button>

      <div role="status" aria-live="polite">
        {state.status === "success" && (
          <p className="text-sm text-accent">{state.message}</p>
        )}
        {state.status === "error" && !state.errors && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </div>
    </form>
  );
}