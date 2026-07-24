import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import MobileMenu from "@/components/MobileMenu";

export function SiteNav() {
  return (
    <nav className="nav shell" aria-label="Primary navigation">
      <Link href="/" className="mark">VK<span>/</span>AI</Link>
      <div className="nav-links"><Link href="/work">Projects</Link><Link href="/about">Profile</Link></div>
      <div className="nav-actions">
        <a href={`mailto:${siteConfig.contactEmail}`}>Contact <ArrowUpRightIcon aria-hidden size={15} weight="bold" /></a>
      </div>
      <MobileMenu />
    </nav>
  );
}

export function SiteFooter() {
  return <footer className="shell"><span>© {new Date().getFullYear()} {siteConfig.name.toUpperCase()}</span><span>AI and data systems</span>{siteConfig.socialUrl && <a href={siteConfig.socialUrl} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRightIcon aria-hidden size={14} weight="bold" /></a>}</footer>;
}
