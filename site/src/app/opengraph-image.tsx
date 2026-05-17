import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Parafia św. Stanisława BM — Kraków-Tonie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a2744 0%, #0f172a 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#d4a843",
            }}
          >
            Archidiecezja Krakowska
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Parafia św. Stanisława
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#d4a843",
              textAlign: "center",
            }}
          >
            Biskupa Męczennika
          </div>
          <div
            style={{
              width: 80,
              height: 4,
              background: "#d4a843",
              borderRadius: 2,
              marginTop: 8,
            }}
          />
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              marginTop: 8,
            }}
          >
            Kraków-Tonie
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
