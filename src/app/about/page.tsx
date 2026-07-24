import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { ApproachList, SkillClusters } from "@/components/ProfileModules";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = { title: "Professional profile", description: "Technical depth with product judgment across AI, data, analytics, and cloud systems." };

export default function About() { return <main><SiteNav /><section className="shell profile-page"><header><p className="eyebrow">PROFESSIONAL PROFILE</p><h1>Technical depth with product judgment.</h1><p>I build data and AI systems from source data through deployment, testing, and the interface where people use the result.</p>{siteConfig.contactEmail && <a className="button button-primary" href={`mailto:${siteConfig.contactEmail}`}>Start a conversation <ArrowUpRightIcon aria-hidden size={17} weight="bold" /></a>}</header><section className="profile-section"><div><p className="eyebrow">FOCUSED CAPABILITIES</p><h2>Enough range to build, enough focus to go deep.</h2></div><SkillClusters /></section><section className="profile-section profile-approach"><div><p className="eyebrow">PROJECT APPROACH</p><h2>Evidence before polish.</h2></div><ApproachList /></section></section><SiteFooter /></main>; }
