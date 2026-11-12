export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 5,
  messageMax: 3000,
  maxLinks: 2,
} as const;

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINK_PATTERN = /https?:\/\/|www\./gi;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax) {
    errors.name = `Please enter your name (${LIMITS.nameMin} to ${LIMITS.nameMax} characters).`;
  } else if (!NAME_PATTERN.test(name)) {
    errors.name =
      "Names can only contain letters, spaces, apostrophes, full stops and hyphens.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > LIMITS.emailMax || !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }

  if (message.length < LIMITS.messageMin) {
    errors.message = `Please write at least ${LIMITS.messageMin} characters so I know what you would like to discuss.`;
  } else if (message.length > LIMITS.messageMax) {
    errors.message = `Please keep your message under ${LIMITS.messageMax} characters.`;
  } else if ((message.match(LINK_PATTERN) ?? []).length > LIMITS.maxLinks) {
    errors.message = `Please include no more than ${LIMITS.maxLinks} links.`;
  } else if (!/\p{L}/u.test(message)) {
    errors.message = "Please write your message in words.";
  }

  return errors;
}