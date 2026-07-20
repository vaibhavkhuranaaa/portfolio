const placeholderHosts = new Set(["yourdomain.com", "portfolio.example.com", "example.com"]);

function optionalUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`Invalid public URL: ${value}`);
  }
}

const siteUrl = optionalUrl(process.env.SITE_URL) ?? "https://portfolio.example.com";
const contactEmail = process.env.CONTACT_EMAIL ?? "hello@example.com";
const requirePublicConfig = process.env.REQUIRE_PUBLIC_SITE_CONFIG === "true";
const hostname = new URL(siteUrl).hostname;

if (
  requirePublicConfig &&
  (placeholderHosts.has(hostname) || contactEmail.endsWith("@example.com"))
) {
  throw new Error("SITE_URL and CONTACT_EMAIL must be configured with public values for production deployment.");
}

export const siteConfig = {
  name: process.env.SITE_OWNER ?? "Vaibhav Khurana",
  title: "AI + Data Systems",
  description: "Applied AI, data, and cloud systems built with evidence and product judgment.",
  siteUrl,
  contactEmail,
  socialUrl: optionalUrl(process.env.SITE_SOCIAL_URL),
} as const;
