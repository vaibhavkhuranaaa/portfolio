import type { Metadata } from "next";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { notes } from "@/content/projects";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return notes.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = notes.find((entry) => entry.slug === slug); return item ? { title: item.title, description: item.summary } : {}; }
export default async function Note({ params }: Props) { const { slug } = await params; const item = notes.find((entry) => entry.slug === slug); if (!item) notFound(); return <main><SiteNav /><article className="reading shell"><p className="eyebrow">NOTE / {item.status.toUpperCase()}</p><h1>{item.title}</h1><p>{item.summary}</p><hr /><p>Full technical notes will be published from the studio repository. This route keeps evolving thinking separate from shipped production projects.</p><Link className="back-link" href="/"><ArrowLeftIcon aria-hidden size={16} weight="bold" /> Studio</Link></article><SiteFooter /></main>; }
