import type { Metadata } from "next";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import WorkLibrary from "@/components/WorkLibrary";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Work", description: "Evidence-led AI, data, analytics, and cloud projects." };

export default function Work() { return <main><SiteNav /><section className="shell page-head"><p className="eyebrow">PROJECT LIBRARY</p><h1>Evidence-led systems, built end to end.</h1><Link className="back-link" href="/"><ArrowLeftIcon aria-hidden size={16} weight="bold" /> Studio</Link></section><WorkLibrary projects={projects} /><SiteFooter /></main>; }
