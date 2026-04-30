"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { topics, generateExam, type ShuffledQuestion } from "@/lib/data";
import { saveExamResult } from "@/lib/session";
import Navbar from "@/components/Navbar";
import { C, serif, sans, eyebrow } from "@/lib/styles";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TOTAL = 90 * 60;
const topicOf = (id: number) => topics.find(t => t.questions.some(q => q.id === id));
const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

export default function ExamPage() {
  const [phase, setPhase]       = useState<"intro" | "exam" | "done">("intro");
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [examSeed, setExamSeed]  = useState(0);
  const [answers, setAnswers]   = useState<(number | null)[]>([]);
  const [cur, setCur]           = useState(0);
  const [flagged, setFlagged]   = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(TOTAL);
  const [result, setResult]     = useState<{ score: number; pct: number; byTopic: Record<string, { c: number; t: number }> } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (phase === "exam") {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current!); doSubmit(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  const startExam = () => {
    const seed = Date.now();
    const qs = generateExam(seed);
    setExamSeed(seed);
    setQuestions(qs);
    setAnswers(Array(qs.length).fill(null));
    setCur(0);
    setFlagged(new Set());
    setTimeLeft(TOTAL);
    setPhase("exam");
  };

  const doSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let score = 0;
    const byTopic: Record<string, { c: number; t: number }> = {};
    questions.forEach((q, i) => {
      const tid = topicOf(q.originalId)?.id || "other";
      if (!byTopic[tid]) byTopic[tid] = { c: 0, t: 0 };
      byTopic[tid].t++;
      if (answers[i] === q.answer) { score++; byTopic[tid].c++; }
    });
    const pct = Math.round((score / questions.length) * 100);
    setResult({ score, pct, byTopic });
    saveExamResult(score, questions.length);
    setPhase("done");
  };

  const progress    = answers.filter(a => a !== null).length;
  const timerBg     = timeLeft < 600 ? C.dangerBg : timeLeft < 1800 ? C.warnBg : C.surface;
  const timerColor  = timeLeft < 600 ? C.danger   : timeLeft < 1800 ? C.warn   : C.ink;

  // ── INTRO ──────────────────────────────────────────────────────────
  if (phase === "intro") return (
    <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}><Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px" }}>
        <p style={{ ...eyebrow, marginBottom: 14 }}>Final Assessment</p>
        <h1 style={{ fontFamily: serif, fontSize: "clamp(1.75rem,4vw,2.25rem)", fontWeight: 400, color: C.ink, marginBottom: 10, lineHeight: 1.2 }}>
          Practice Examination
        </h1>
        <p style={{ fontSize: 14, color: C.ink2, marginBottom: 28, lineHeight: 1.7 }}>
          A full-length, timed practice exam covering all subject areas of the Civil Service Examination.
          Questions are <strong>randomly selected and shuffled</strong> from a pool of 555+ items — every attempt is unique.
        </p>

        <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          <div style={{ padding: "13px 20px", borderBottom: `1px solid ${C.borderLt}` }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Exam coverage</p>
          </div>
          {[
            { id: "math",         icon: "🔢", label: "Mathematics",           pool: 70,  draw: 20 },
            { id: "english",      icon: "📖", label: "English",               pool: 250, draw: 20 },
            { id: "filipino",     icon: "🇵🇭", label: "Filipino",              pool: 98,  draw: 14 },
            { id: "constitution", icon: "⚖️", label: "Philippine Constitution",pool: 20,  draw: 16 },
            { id: "reasoning",    icon: "🧠", label: "Inductive Reasoning",    pool: 48,  draw: 10 },
          ].map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: `1px solid ${C.bg}` }}>
              <span style={{ fontSize: 13, color: C.ink2 }}>{t.icon} {t.label}</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.ink3 }}>pool: {t.pool}</span>
                <Badge variant="outline">{t.draw} drawn</Badge>
              </div>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, background: C.surface }}>
            {[["80", "Total items"], ["90 min", "Time limit"], ["70%", "Passing"]].map(([v, l], i) => (
              <div key={l} style={{ padding: "14px 12px", textAlign: "center", borderLeft: i > 0 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontFamily: serif, fontSize: "1.375rem", fontWeight: 400, color: C.ink }}>{v}</div>
                <div style={{ fontSize: 10, color: C.ink3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Randomization callout */}
        <div style={{ background: C.accentSoft, border: `1px solid ${C.accentBr}`, borderRadius: 8, padding: "11px 14px", marginBottom: 16, fontSize: 13, color: C.accent, lineHeight: 1.6 }}>
          🔀 <strong>Each attempt is unique.</strong> Questions are randomly drawn from the full question bank and answer choices are shuffled — so retaking the exam is always a fresh challenge.
        </div>

        <div style={{ background: C.warnBg, border: `1px solid ${C.warnBr}`, borderRadius: 8, padding: "11px 14px", marginBottom: 24, fontSize: 13, color: C.warn, lineHeight: 1.6 }}>
          ⏱ <strong>Before you start:</strong> The timer begins immediately. You may flag questions and return to them. Your result is saved automatically when you submit.
        </div>

        <button onClick={startExam}
          style={{ height: 44, padding: "0 28px", background: C.accent, color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
          Begin examination →
        </button>
      </div>
    </div>
  );

  // ── DONE ───────────────────────────────────────────────────────────
  if (phase === "done" && result) {
    const passed = result.pct >= 70;
    return (
      <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}><Navbar />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 16, overflow: "hidden", marginBottom: 14 }}>
            <div style={{ background: passed ? C.ink : C.danger, padding: "36px 24px", textAlign: "center" }}>
              <p style={{ ...eyebrow, color: passed ? C.ink3 : "rgba(255,255,255,0.5)", marginBottom: 14 }}>Examination Complete</p>
              <div style={{ fontFamily: serif, fontSize: "5rem", fontWeight: 400, color: "white", lineHeight: 1 }}>{result.pct}%</div>
              <p style={{ fontSize: 13, color: passed ? C.ink3 : "rgba(255,255,255,0.65)", marginTop: 8 }}>
                {result.score} of {questions.length} correct
              </p>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ background: passed ? C.successBg : C.dangerBg, border: `1px solid ${passed ? C.successBr : C.dangerBr}`, borderRadius: 8, padding: "12px 16px", marginBottom: 22 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: passed ? C.success : C.danger }}>
                  {passed
                    ? "✓ Congratulations! You qualify for a Certificate of Achievement."
                    : `✗ You need 70% (${Math.ceil(questions.length * 0.7)} items) to pass. Review weak areas and retake.`}
                </p>
              </div>

              <p style={{ ...eyebrow, marginBottom: 12 }}>Performance by subject</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {topics.map(t => {
                  const bp = result.byTopic[t.id] || { c: 0, t: 0 };
                  const p  = bp.t > 0 ? Math.round((bp.c / bp.t) * 100) : 0;
                  return (
                    <div key={t.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 13, color: C.ink2 }}>{t.icon} {t.title}</span>
                        <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 600, color: p >= 70 ? C.success : C.danger }}>
                          {bp.c}/{bp.t} ({p}%)
                        </span>
                      </div>
                      <Progress value={p} color={p >= 70 ? C.success : C.danger} />
                    </div>
                  );
                })}
              </div>

              {/* Exam seed for reference */}
              <div style={{ background: C.surface, borderRadius: 6, padding: "8px 12px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: C.ink3 }}>Exam ID (seed)</span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: C.ink2 }}>{examSeed}</span>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link href="/" style={{ textDecoration: "none" }}>
                  <button style={{ height: 34, padding: "0 14px", borderRadius: 6, border: `1px solid ${C.border}`, background: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: sans, color: C.ink }}>← Home</button>
                </Link>
                <button onClick={startExam}
                  style={{ height: 34, padding: "0 14px", borderRadius: 6, border: `1px solid ${C.border}`, background: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: sans, color: C.ink }}>
                  🔀 New attempt
                </button>
                {passed && (
                  <Link href="/certificate" style={{ textDecoration: "none", marginLeft: "auto" }}>
                    <button style={{ height: 34, padding: "0 14px", borderRadius: 6, border: "none", background: C.accent, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                      Get certificate →
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── EXAM ───────────────────────────────────────────────────────────
  if (phase !== "exam" || questions.length === 0) return null;
  const q   = questions[cur];
  const tag = topicOf(q.originalId);
  const isF = flagged.has(cur);

  return (
    <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}><Navbar />
      {/* Sticky bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.borderLt}`, position: "sticky", top: 56, zIndex: 40, padding: "10px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, fontFamily: "monospace", color: C.ink3 }}>{cur + 1}/{questions.length}</span>
            <span style={{ fontSize: 12, color: C.ink3 }}>{progress} answered</span>
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: timerColor, background: timerBg, padding: "4px 12px", borderRadius: 6, border: `1px solid ${timeLeft < 600 ? C.dangerBr : timeLeft < 1800 ? C.warnBr : C.border}` }}>
            ⏱ {fmt(timeLeft)}
          </span>
        </div>
        <div style={{ maxWidth: 960, margin: "6px auto 0" }}>
          <Progress value={(progress / questions.length) * 100} color={C.accent} />
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 160px", gap: 16 }} className="exam-grid">
        {/* Question */}
        <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", borderBottom: `1px solid ${C.borderLt}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            {tag && <Badge variant="outline">{tag.icon} {tag.title}</Badge>}
            <button onClick={() => setFlagged(f => { const n = new Set(f); isF ? n.delete(cur) : n.add(cur); return n; })}
              style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${isF ? C.warnBr : C.border}`, background: isF ? C.warnBg : C.white, fontSize: 12, fontWeight: 600, cursor: "pointer", color: isF ? C.warn : C.ink3, fontFamily: sans }}>
              {isF ? "🚩 Flagged" : "🏳 Flag"}
            </button>
          </div>

          <div style={{ padding: "20px" }}>
            <p style={{ fontFamily: serif, fontSize: "1.0625rem", lineHeight: 1.7, color: C.ink, marginBottom: 18 }}>{q.question}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.choices.map((ch, i) => {
                const isSel = answers[cur] === i;
                return (
                  <button key={i} onClick={() => { const a = [...answers]; a[cur] = i; setAnswers(a); }}
                    style={{ width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${isSel ? C.ink : C.borderLt}`, background: isSel ? C.surface : C.white, cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, transition: "all 0.1s", fontFamily: sans }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${isSel ? C.ink : C.border}`, background: isSel ? C.ink : "transparent", color: isSel ? "white" : C.ink3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1, transition: "all 0.1s" }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ fontSize: 13, color: C.ink, lineHeight: 1.55 }}>{ch}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.borderLt}`, display: "flex", justifyContent: "space-between" }}>
            <button disabled={cur === 0} onClick={() => setCur(c => c - 1)}
              style={{ height: 34, padding: "0 14px", borderRadius: 6, border: `1px solid ${C.border}`, background: "white", color: C.ink, fontSize: 13, fontWeight: 500, cursor: cur === 0 ? "not-allowed" : "pointer", opacity: cur === 0 ? 0.4 : 1, fontFamily: sans }}>
              ← Prev
            </button>
            {cur < questions.length - 1
              ? <button onClick={() => setCur(c => c + 1)} style={{ height: 34, padding: "0 14px", borderRadius: 6, border: "none", background: C.ink, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>Next →</button>
              : <button onClick={doSubmit} style={{ height: 34, padding: "0 14px", borderRadius: 6, border: "none", background: C.accent, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>Submit exam</button>}
          </div>
        </div>

        {/* Navigator */}
        <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 12, padding: 14, position: "sticky", top: 116, alignSelf: "start" }} className="exam-nav">
          <p style={{ ...eyebrow, marginBottom: 10 }}>Navigator</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3, marginBottom: 12 }}>
            {questions.map((_, i) => {
              const isCur = i === cur, isAns = answers[i] !== null, isFlg = flagged.has(i);
              return (
                <button key={i} onClick={() => setCur(i)}
                  style={{ aspectRatio: "1", borderRadius: 4, border: `1px solid ${isCur ? C.ink : isFlg ? C.warnBr : isAns ? C.successBr : C.borderLt}`, background: isCur ? C.ink : isFlg ? C.warnBg : isAns ? C.successBg : C.white, fontSize: 9, fontWeight: 700, cursor: "pointer", color: isCur ? "white" : isFlg ? C.warn : isAns ? C.success : C.ink3, fontFamily: "monospace", transition: "all 0.08s" }}>
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
            {[[C.successBg, C.successBr, C.success, "Answered"], [C.warnBg, C.warnBr, C.warn, "Flagged"], [C.white, C.borderLt, C.ink3, "Skipped"]].map(([bg, br, c, l]) => (
              <div key={String(l)} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.ink3 }}>
                <span style={{ width: 11, height: 11, borderRadius: 3, background: String(bg), border: `1px solid ${String(br)}`, display: "inline-block", flexShrink: 0 }} />
                {l}
              </div>
            ))}
          </div>
          <button onClick={doSubmit} style={{ width: "100%", padding: 9, background: C.accent, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>Submit</button>
        </div>
      </div>

      {/* Mobile submit */}
      <div style={{ display: "none", padding: "12px 20px" }} className="exam-mobile-submit">
        <button onClick={doSubmit} style={{ width: "100%", padding: 13, background: C.accent, color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
          Submit exam
        </button>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .exam-grid { grid-template-columns: 1fr !important; }
          .exam-nav { display: none !important; }
          .exam-mobile-submit { display: block !important; }
        }
      `}</style>
    </div>
  );
}
