"use client";

import Image from "next/image";
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";

export default function PanZoomArchitecture({ src, alt }: { src: string; alt: string }) {
  const [zoom, setZoom] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const reset = () => { setZoom(1); if (viewport.current) viewport.current.scrollTo({ left: 0, top: 0, behavior: "smooth" }); };
  return <figure className="architecture-diagram">
    <div className="diagram-controls" aria-label="Architecture diagram controls"><button aria-label="Zoom out" type="button" onClick={() => setZoom((value) => Math.max(.75, Number((value - .25).toFixed(2))))}><MagnifyingGlassMinusIcon aria-hidden size={17} /></button><button aria-label="Zoom in" type="button" onClick={() => setZoom((value) => Math.min(2, Number((value + .25).toFixed(2))))}><MagnifyingGlassPlusIcon aria-hidden size={17} /></button><button type="button" onClick={reset}><ArrowCounterClockwiseIcon aria-hidden size={16} /> Reset</button></div>
    <div className="architecture-viewport" ref={viewport} tabIndex={0} aria-label="Interactive architecture diagram. Scroll or drag to pan; use controls to zoom." onPointerDown={(event) => { if (!viewport.current) return; drag.current = { x: event.clientX, y: event.clientY, left: viewport.current.scrollLeft, top: viewport.current.scrollTop }; viewport.current.setPointerCapture(event.pointerId); }} onPointerMove={(event) => { if (!drag.current || !viewport.current) return; viewport.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x); viewport.current.scrollTop = drag.current.top - (event.clientY - drag.current.y); }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
      <div className="architecture-canvas" style={{ width: `${zoom * 100}%` }}><Image src={src} alt={alt} width={1600} height={900} sizes="(max-width: 720px) 960px, 1600px" /></div>
    </div>
    <figcaption>Pan to inspect the system; zoom controls are available when detail is needed.</figcaption>
  </figure>;
}
