import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/source-serif-4";
import "./globals.css";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} - ${siteConfig.title}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: { title: `${siteConfig.name} - ${siteConfig.title}`, description: siteConfig.description, type: "website", siteName: siteConfig.name },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>; }
