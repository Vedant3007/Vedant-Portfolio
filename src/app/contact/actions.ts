"use server";

import {
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact-validation";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: ContactErrors;
  values?: ContactValues;
};

const SEND_FAILED_MESSAGE =
  "Sorry, your message could not be sent. Please try again, or email me directly.";

export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("hp_trap") ?? "").trim() !== "") {
    console.warn("Contact form: honeypot field was filled, submission ignored.");
    return { status: "success", message: "Thanks, your message has been sent." };
  }

  const values: ContactValues = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return { status: "error", message: SEND_FAILED_MESSAGE, values };
  }

  const safeName = values.name.replace(/[\r\n]+/g, " ");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: values.email,
        subject: `Portfolio message from ${safeName}`,
        text: `Name: ${safeName}\nEmail: ${values.email}\n\n${values.message}`,
      }),
    });

    if (!response.ok) {
      console.error("Contact form: Resend error", response.status, await response.text());
      return { status: "error", message: SEND_FAILED_MESSAGE, values };
    }
  } catch (error) {
    console.error("Contact form: request failed", error);
    return { status: "error", message: SEND_FAILED_MESSAGE, values };
  }

  return { status: "success", message: "Thanks, your message has been sent." };
}