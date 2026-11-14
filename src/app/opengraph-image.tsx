import { ImageResponse } from "next/og";
import { heroContent } from "@/content/home";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} · ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const availability = `${siteConfig.availability.summary} · ${siteConfig.availability.short}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "#0a0b0e",
          backgroundImage:
            "radial-gradient(circle at 88% 0%, rgba(76,141,255,0.28), rgba(10,11,14,0) 55%)",
          color: "#eceef2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            color: "#4c8dff",
            textTransform: "uppercase",
          }}
        >
          {siteConfig.role}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              maxWidth: 900,
              fontSize: 40,
              lineHeight: 1.25,
              color: "#8a91a0",
            }}
          >
            {heroContent.headline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#8a91a0" }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#22c55e",
              marginRight: 16,
            }}
          />
          {availability}
        </div>
      </div>
    ),
    { ...size },
  );
}