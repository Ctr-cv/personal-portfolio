import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — digital hardware and AI systems engineering`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time rather than shipped as a static asset, so it stays in
 * sync with the content layer. Deliberately no webfont fetch: pulling fonts over
 * the network during a build is a failure mode with no upside here, so this
 * leans on layout, rule weight and the two accent colours instead.
 */
export default function OpengraphImage() {
  const carbon = "#08090b";
  const bone = "#f1ede5";
  const boneDim = "#9a948b";
  const signal = "#ffb347";
  const oxide = "#5cc9b0";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: carbon,
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* Phosphor bloom, off-centre. Satori doesn't tile background-size, so
            the site's measurement grid is deliberately omitted here rather than
            rendered as a single stray seam. */}
        <div
          style={{
            position: "absolute",
            top: -300,
            left: -220,
            width: 1100,
            height: 820,
            // Explicit 0-alpha stop well inside the box: with the default
            // farthest-corner sizing the gradient is still non-zero at the mid
            // edges, which shows up as a hard vertical seam.
            background: `radial-gradient(ellipse at center, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0.08) 38%, rgba(245,158,11,0) 62%)`,
          }}
        />

        {/* Top rail */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: signal }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 5,
              color: boneDim,
              textTransform: "uppercase",
            }}
          >
            {site.name}
          </div>
          <div style={{ flex: 1, height: 1, background: "rgba(154,148,139,0.25)" }} />
          <div style={{ fontSize: 22, letterSpacing: 4, color: boneDim }}>
            COMPUTER ENGINEERING · WATERLOO
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 1,
              color: bone,
            }}
          >
            Silicon
            <span style={{ color: boneDim, marginLeft: 24 }}>&amp;</span>
            <span style={{ color: signal, marginLeft: 24 }}>software</span>
            <span style={{ color: oxide, marginLeft: -10 }}>.</span>
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              color: "#ded8cd",
              maxWidth: 940,
            }}
          >
            Pipelined RTL that closes timing on real silicon, and AI systems that ship to real users.
          </div>
        </div>

        {/* Bottom spec rail */}
        <div
          style={{
            display: "flex",
            gap: 56,
            paddingTop: 28,
            borderTop: "1px solid rgba(154,148,139,0.25)",
          }}
        >
          {[
            { k: "CO-OP TERMS", v: "4 completed" },
            { k: "GPA", v: "4.0 / 4.0" },
            { k: "HARDWARE", v: "SystemVerilog · FPGA · ASIC" },
            { k: "SOFTWARE", v: "Python · PyTorch · React" },
          ].map((item) => (
            <div key={item.k} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 18, letterSpacing: 3.5, color: "#8e8880" }}>{item.k}</div>
              <div style={{ fontSize: 26, color: bone }}>{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
