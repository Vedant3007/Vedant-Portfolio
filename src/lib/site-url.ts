const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// On Vercel this resolves automatically to the project's production URL.
// Set NEXT_PUBLIC_SITE_URL later if you add a custom domain.
export const siteUrl: string = (
  explicitUrl ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
).replace(/\/$/, "");