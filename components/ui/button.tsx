"use client";
import { C, btn, sans } from "@/lib/styles";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";

type Variant = "primary"|"secondary"|"accent"|"ghost";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: "sm"|"md"|"lg"; }

const variants: Record<Variant, React.CSSProperties> = {
  primary:   { background: C.ink,     color: "white" },
  secondary: { background: C.surface, color: C.ink, border: `1px solid ${C.border}` },
  accent:    { background: C.accent,  color: "white" },
  ghost:     { background: "transparent", color: C.ink2 },
};
const sizes = {
  sm: { height: 30, padding: "0 12px", fontSize: 12, borderRadius: 6 },
  md: { height: 38, padding: "0 16px", fontSize: 13, borderRadius: 8 },
  lg: { height: 44, padding: "0 22px", fontSize: 14, borderRadius: 8 },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant="primary", size="md", style, disabled, ...props }, ref) => {
  const [hovered, setHovered] = useState(false);
  const hoverBg: Partial<Record<Variant, string>> = { primary:"#2d2d2a", accent:C.accentH, secondary:"#e0dbd2" };
  return (
    <button ref={ref} disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...btn.base, ...sizes[size], ...variants[variant],
        ...(hovered && !disabled && hoverBg[variant] ? { background: hoverBg[variant] } : {}),
        opacity: disabled ? 0.45 : 1, cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }} {...props} />
  );
});
Button.displayName = "Button";
