"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSyncExternalStore } from "react";

const SignalCanvas = dynamic(() => import("./SignalCanvas"), { ssr: false });

function canRenderScene() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.hardwareConcurrency < 4) return false;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return deviceMemory === undefined || deviceMemory >= 4;
}

export default function HeroSignal() {
  const interactive = useSyncExternalStore(() => () => undefined, canRenderScene, () => false);

  return (
    <div className="hero-signal" aria-label="Abstract data system visualization">
      <Image alt="" src="/assets/generated/adaptive-intelligence-hero.png" width={1586} height={992} priority sizes="(max-width: 900px) 100vw, 60vw" />
      {interactive && <div className="hero-canvas"><SignalCanvas /></div>}
    </div>
  );
}
