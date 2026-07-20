"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} className="menu-button" onClick={() => setOpen(!open)} type="button">
        {open ? <XIcon aria-hidden size={22} /> : <ListIcon aria-hidden size={22} />}
      </button>
      {open && <div className="mobile-menu-panel" id="mobile-navigation">
        <Link href="/work" onClick={() => setOpen(false)}>Work</Link>
        <Link href="/about" onClick={() => setOpen(false)}>Profile</Link>
      </div>}
    </div>
  );
}
