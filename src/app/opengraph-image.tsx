import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Computer Engineering portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f4f0",
          color: "#181818",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #181818",
            paddingTop: 18,
            fontSize: 21,
          }}
        >
          <span>{site.name}</span>
          <span style={{ color: "#666666" }}>Computer Engineering · Waterloo</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 1020,
              fontSize: 102,
              fontWeight: 500,
              letterSpacing: -5,
              lineHeight: 0.98,
            }}
          >
            Software, machine learning, and digital hardware.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#4d4d4d", maxWidth: 900 }}>
            Selected projects and four co-op terms across engineering teams in Canada and China.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 64,
            borderTop: "1px solid #bdbcb6",
            paddingTop: 22,
            fontSize: 22,
            color: "#5d5d5d",
          }}
        >
          <span>4 completed co-op terms</span>
          <span>4.0 / 4.0 GPA</span>
          <span>SystemVerilog · Python · PyTorch</span>
        </div>
      </div>
    ),
    size,
  );
}
