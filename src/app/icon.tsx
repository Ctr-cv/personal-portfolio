import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon: an amber signal edge on carbon. Reads as a rising edge at 32px, which
 * is about as much as a favicon can carry.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          background: "#08090b",
        }}
      >
        <div style={{ display: "flex", width: "100%", height: "100%", position: "relative" }}>
          {/* Low level */}
          <div
            style={{
              position: "absolute",
              left: 3,
              top: 21,
              width: 11,
              height: 3,
              background: "#ffb347",
            }}
          />
          {/* Rising edge */}
          <div
            style={{
              position: "absolute",
              left: 12,
              top: 8,
              width: 3,
              height: 16,
              background: "#ffb347",
            }}
          />
          {/* High level */}
          <div
            style={{
              position: "absolute",
              left: 12,
              top: 8,
              width: 17,
              height: 3,
              background: "#ffb347",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
