// Design tokens — Orange / White / Black theme
import React from "react";

export const C = {
  // Backgrounds
  bg:        "#FAFAF8",        // off-white page bg
  surface:   "#F2EDE6",        // warm cream surface
  surfaceAlt:"#EDEBE4",        // slightly deeper warm

  // Borders
  border:    "#E0D8CE",
  borderLt:  "#EDE8E0",

  // Text
  white:     "#FFFFFF",
  ink:       "#111110",        // near-black
  ink2:      "#3D3D38",        // dark gray
  ink3:      "#7C7B72",        // muted gray

  // Brand — Orange
  accent:    "#F05A28",        // main orange
  accentH:   "#D94E20",        // hover orange (darker)
  accentSoft:"#FEF0EB",        // tinted orange bg
  accentBr:  "#F8C5B0",        // orange border

  // States
  success:   "#15803D",
  successBg: "#F0FDF4",
  successBr: "#86EFAC",

  danger:    "#B91C1C",
  dangerBg:  "#FEF2F2",
  dangerBr:  "#FECACA",

  warn:      "#92400E",
  warnBg:    "#FFFBEB",
  warnBr:    "#FDE68A",
};

export const serif = "'Instrument Serif', Georgia, serif";
export const sans  = "'Inter', system-ui, sans-serif";

export const card: React.CSSProperties = {
  background: "#FFFFFF",
  border: `1px solid #EDE8E0`,
  borderRadius: 14,
  overflow: "hidden",
};

export const btn = {
  base: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 6, fontFamily: "'Inter',system-ui,sans-serif", fontWeight: 600,
    fontSize: 13, border: "none", cursor: "pointer", transition: "all 0.15s",
    borderRadius: 8, padding: "0 16px", height: 38, lineHeight: 1,
  } as React.CSSProperties,
  primary:   { background: "#111110", color: "#FFFFFF" } as React.CSSProperties,
  secondary: { background: "#F2EDE6", color: "#111110", border: "1px solid #E0D8CE" } as React.CSSProperties,
  accent:    { background: "#F05A28", color: "#FFFFFF" } as React.CSSProperties,
  ghost:     { background: "transparent", color: "#3D3D38" } as React.CSSProperties,
};

export const eyebrow: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#7C7B72",
};

export const pageWrap: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "0 20px",
};
