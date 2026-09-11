import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.2)",
          fontWeight: 800,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="3" />
          <line x1="2" y1="7" x2="22" y2="7" />
          <path d="M7 12h10M13 9l4 3-4 3" strokeWidth="2" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
