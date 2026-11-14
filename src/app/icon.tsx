import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0a0b0e",
          color: "#4c8dff",
          fontSize: 17,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        VP
      </div>
    ),
    { ...size },
  );
}