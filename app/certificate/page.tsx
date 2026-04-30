"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getSession } from "@/lib/session";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { C, serif, sans, eyebrow } from "@/lib/styles";

const NAME = "mrkjyqnt";

export default function CertificatePage() {
  const [result, setResult] = useState<{score:number;pct:number;date:string}|null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => { const s = getSession(); if (s.examResult) setResult(s.examResult); }, []);

  const url    = typeof window !== "undefined" ? window.location.href : "";
  const txt    = `I passed the CSC Classroom Civil Service Exam with ${result?.pct}%! 🎉`;
  const copy   = () => { navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const fbShare = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(txt)}`, "_blank", "width=600,height=400");

  const noResult = (msg: string, sub: string, cta: React.ReactNode) => (
    <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}><Navbar />
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
        <p style={{ fontSize: "2.5rem", marginBottom: 16 }}>🎓</p>
        <h1 style={{ fontFamily: serif, fontSize: "1.75rem", fontWeight: 400, color: C.ink, marginBottom: 8 }}>{msg}</h1>
        <p style={{ fontSize: 14, color: C.ink3, marginBottom: 24, lineHeight: 1.6 }}>{sub}</p>
        {cta}
      </div>
    </div>
  );

  if (!result) return noResult("No certificate yet", "Complete the final exam with 70% or higher to earn your certificate.",
    <Link href="/exam" style={{ textDecoration: "none" }}><Button variant="accent">Take the exam →</Button></Link>);

  if (result.pct < 70) return noResult("Not quite yet", `Your score was ${result.pct}%. You need 70% to earn a certificate. Review the lessons and try again.`,
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      <Link href="/" style={{ textDecoration: "none" }}><Button variant="secondary">Study more</Button></Link>
      <Link href="/exam" style={{ textDecoration: "none" }}><Button variant="accent">Retake exam →</Button></Link>
    </div>);

  const honor   = result.pct >= 95 ? "With Highest Honors" : result.pct >= 90 ? "With High Honors" : result.pct >= 80 ? "With Honors" : "";
  const dateStr = new Date(result.date).toLocaleDateString("en-PH", { year:"numeric", month:"long", day:"numeric" });
  const examId  = `CSC-${Math.abs(new Date(result.date).getTime()).toString(36).toUpperCase().slice(-8)}`;

  return (
    <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}><Navbar />
      {/* Actions */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "10px 20px" }} className="no-print">
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <Link href="/" style={{ fontSize: 13, color: C.ink2, textDecoration: "none" }}>← Home</Link>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={fbShare} style={{ height: 34, padding: "0 14px", borderRadius: 6, background: "#1877f2", color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>📘 Facebook</button>
            <button onClick={copy}   style={{ height: 34, padding: "0 14px", borderRadius: 6, background: C.white, color: C.ink, border: `1px solid ${C.border}`, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: sans }}>{copied ? "✓ Copied!" : "🔗 Copy link"}</button>
            <button onClick={() => window.print()} style={{ height: 34, padding: "0 14px", borderRadius: 6, background: C.accent, color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>🖨 Print</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 20px" }}>
        {/* Certificate */}
        <div style={{ background: C.white, border: `2px solid ${C.ink}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ background: C.ink, height: 8 }} />
          <div style={{ padding: "48px 40px", textAlign: "center" }}>
            <p style={{ ...eyebrow, marginBottom: 4 }}>Republic of the Philippines</p>
            <p style={{ fontSize: 11, color: C.ink3, letterSpacing: "0.08em", marginBottom: 36 }}>Civil Service Examination Review Program</p>

            <p style={{ fontSize: 15, color: C.ink2, marginBottom: 10 }}>This certifies that</p>
            <div style={{ borderBottom: `2px solid ${C.ink}`, display: "inline-block", paddingBottom: 8, marginBottom: 12, minWidth: 300 }}>
              <h1 style={{ fontFamily: serif, fontSize: "clamp(1.75rem,5vw,2.75rem)", fontWeight: 400, color: C.ink, letterSpacing: "0.02em" }}>{NAME}</h1>
            </div>
            {honor && (
              <div style={{ marginBottom: 20 }}><Badge variant="success" style={{ fontSize: 12, padding: "3px 12px" }}>🏆 {honor}</Badge></div>
            )}
            <p style={{ fontSize: 14, color: C.ink2, marginTop: 16, marginBottom: 6 }}>has successfully completed the</p>
            <p style={{ fontFamily: serif, fontSize: "1.15rem", fontWeight: 400, color: C.ink, marginBottom: 28 }}>
              Comprehensive Civil Service Examination Review
            </p>

            {/* Score block */}
            <div style={{ display: "inline-grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr", border: `1px solid ${C.borderLt}`, borderRadius: 10, overflow: "hidden", marginBottom: 28 }}>
              {[[""+result.pct+"%","Final Score"],[""+result.score+"/80","Correct"],["PASSED","Status"]].map(([v,l], i) => (
                <>
                  {i > 0 && <div key={`d${i}`} style={{ background: C.borderLt }} />}
                  <div key={l} style={{ padding: "16px 24px", textAlign: "center" }}>
                    <div style={{ fontFamily: serif, fontSize: "1.625rem", fontWeight: 400, color: C.ink }}>{v}</div>
                    <div style={{ fontSize: 10, color: C.ink3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 3 }}>{l}</div>
                  </div>
                </>
              ))}
            </div>

            <p style={{ fontSize: 12, color: C.ink3, marginBottom: 32 }}>Mathematics · English · Filipino · Philippine Constitution · Reasoning</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "flex-end", gap: 16 }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 10, color: C.ink3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Date</p>
                <p style={{ fontSize: 13, color: C.ink, fontWeight: 500 }}>{dateStr}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", color: C.ink }}>CSC CLASSROOM</p>
                <p style={{ fontSize: 10, color: C.ink3 }}>Unofficial Reviewer</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 10, color: C.ink3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Verification ID</p>
                <p style={{ fontSize: 11, fontFamily: "monospace", color: C.ink2 }}>{examId}</p>
              </div>
            </div>
          </div>
          <div style={{ background: C.ink, height: 8 }} />
        </div>

        {/* Share */}
        <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 12, padding: "20px 24px", textAlign: "center" }} className="no-print">
          <p style={{ fontFamily: serif, fontSize: "1.1rem", color: C.ink, marginBottom: 4 }}>Share your achievement</p>
          <p style={{ fontSize: 13, color: C.ink3, marginBottom: 16 }}>Let your friends and family know you're CSC-ready!</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={fbShare} style={{ height: 42, padding: "0 24px", borderRadius: 8, background: "#1877f2", color: "white", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>📘 Share on Facebook</button>
            <button onClick={copy}   style={{ height: 42, padding: "0 24px", borderRadius: 8, background: C.ink, color: "white", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>{copied ? "✓ Copied!" : "🔗 Copy link"}</button>
          </div>
        </div>
      </div>
      <style>{`@media print { .no-print{display:none!important} nav{display:none!important} body{background:white} }`}</style>
    </div>
  );
}
