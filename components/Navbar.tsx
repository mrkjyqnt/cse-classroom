"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { C, sans } from "@/lib/styles";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => href === "/" ? path === "/" : path.startsWith(href);

  return (
    <>
      <nav style={{
        background: C.white,
        borderBottom: `1px solid ${C.borderLt}`,
        position: "sticky", top: 0, zIndex: 200,
        height: 56,
        display: "flex", alignItems: "center",
      }}>
        <div style={{
          maxWidth: 960, margin: "0 auto", padding: "0 16px",
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" style={{
            fontFamily: sans, fontWeight: 800, fontSize: 13,
            letterSpacing: "0.1em", color: C.ink, textDecoration: "none",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 26, height: 26, borderRadius: 6,
              background: C.accent, color: "#fff", fontSize: 12, fontWeight: 800,
            }}>C</span>
            CSC CLASSROOM
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {[{ href: "/", label: "Home" }, { href: "/exam", label: "Exam" }].map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: sans, fontSize: 13, fontWeight: 500,
                color: isActive(l.href) ? C.ink : C.ink2,
                textDecoration: "none",
                padding: "6px 12px", borderRadius: 7,
                background: isActive(l.href) ? C.surface : "transparent",
                transition: "all 0.14s",
              }}>{l.label}</Link>
            ))}
            <Link href="/exam" style={{
              fontFamily: sans, fontSize: 13, fontWeight: 700,
              background: C.accent, color: "#fff",
              textDecoration: "none", padding: "7px 18px",
              borderRadius: 8, marginLeft: 8, letterSpacing: "0.01em",
            }}>Get started</Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(o => !o)} className="nav-hamburger" style={{
            display: "none", background: "none", border: "none",
            cursor: "pointer", padding: 8, color: C.ink,
            borderRadius: 7, transition: "background 0.12s",
          }} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {open ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", top: 56, left: 0, right: 0, zIndex: 199,
          background: C.white, borderBottom: `1px solid ${C.borderLt}`,
          padding: "10px 16px 14px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          {[
            { href: "/", label: "Home" },
            { href: "/exam", label: "Exam" },
            { href: "/certificate", label: "Certificate" },
          ].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: "block", fontFamily: sans, fontSize: 15, fontWeight: 500,
              color: isActive(l.href) ? C.accent : C.ink,
              textDecoration: "none",
              padding: "11px 12px", borderRadius: 8,
              background: isActive(l.href) ? C.accentSoft : "transparent",
            }}>{l.label}</Link>
          ))}
          <Link href="/exam" onClick={() => setOpen(false)} style={{
            display: "block", fontFamily: sans, fontSize: 15, fontWeight: 700,
            background: C.accent, color: "#fff",
            textDecoration: "none", padding: "12px 12px",
            borderRadius: 8, marginTop: 8, textAlign: "center",
          }}>Get started →</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
