import { C } from "@/lib/styles";

type Variant = "default"|"success"|"warning"|"danger"|"outline";
const variants: Record<Variant, React.CSSProperties> = {
  default: { background: C.surface,    color: C.ink2,    border: `1px solid ${C.border}` },
  success: { background: C.successBg,  color: C.success, border: `1px solid ${C.successBr}` },
  warning: { background: C.warnBg,     color: C.warn,    border: `1px solid ${C.warnBr}` },
  danger:  { background: C.dangerBg,   color: C.danger,  border: `1px solid ${C.dangerBr}` },
  outline: { background: "transparent",color: C.ink2,    border: `1px solid ${C.border}` },
};

export function Badge({ children, variant = "default", style }: { children: React.ReactNode; variant?: Variant; style?: React.CSSProperties }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, padding:"2px 8px", borderRadius:999, fontSize:11, fontWeight:600, letterSpacing:"0.02em", whiteSpace:"nowrap", ...variants[variant], ...style }}>
      {children}
    </span>
  );
}
