import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} - ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#f5f3ed", color: "#182721", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px" }}>
      <div style={{ display: "flex", fontSize: 30, letterSpacing: -2 }}>A<span style={{ color: "#e85933" }}>·</span>D</div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", fontSize: 72, letterSpacing: -5 }}>{siteConfig.title}</div><div style={{ display: "flex", marginTop: 24, color: "#617068", fontSize: 32 }}>Useful AI. Rigorous data. Better decisions.</div></div>
      <div style={{ display: "flex", color: "#e85933", fontSize: 20, letterSpacing: 2 }}>PORTFOLIO / 2026</div>
    </div>, size
  );
}
