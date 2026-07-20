"use client";

import type { ArchitectureStep, ProjectMetric } from "@/content/project-presentation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function MetricCards({ metrics }: { metrics: ProjectMetric[] }) {
  return <div className="metric-cards">{metrics.map((metric) => <article className="metric-card" key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><h3>{metric.label}</h3><p>{metric.context}</p></article>)}</div>;
}

export function ArchitectureStory({ intro, steps }: { intro: string; steps: ArchitectureStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveIndex(Number((visible.target as HTMLElement).dataset.stageIndex));
    }, { rootMargin: "-30% 0px -42% 0px", threshold: [0, .2, .5, .8] });
    stageRefs.current.forEach((stage) => stage && observer.observe(stage));
    return () => observer.disconnect();
  }, []);

  return <section className="architecture-story" aria-labelledby="architecture-title"><div className="architecture-heading"><p className="eyebrow">THE EVIDENCE PATH</p><h2 id="architecture-title">A system is only useful when its reasoning can be followed.</h2><p>{intro}</p></div><div className="architecture-story-grid"><div className="architecture-stage-media" aria-hidden="true">{steps.map((step, index) => <figure className={`architecture-stage-image ${index === activeIndex ? "is-active" : ""}`} key={step.image}><Image alt="" src={step.image} width={1600} height={1000} sizes="(max-width: 900px) 100vw, 52vw" priority={index === 0} /></figure>)}</div><ol className="architecture-story-steps">{steps.map((step, index) => <li data-stage-index={index} ref={(element) => { stageRefs.current[index] = element; }} key={step.label}><div className="architecture-mobile-image"><Image alt={step.alt} src={step.image} width={1600} height={1000} sizes="100vw" /></div><span className="architecture-index">{String(index + 1).padStart(2, "0")}</span><h3>{step.label}</h3><p>{step.detail}</p></li>)}</ol></div></section>;
}
