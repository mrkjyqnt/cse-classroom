"use client";
import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { topics } from "@/lib/data";
import { saveQuizResult, isTopicUnlocked } from "@/lib/session";
import Navbar from "@/components/Navbar";
import { C, serif, sans, eyebrow, pageWrap } from "@/lib/styles";
import AiTutor from "@/components/AiTutor";

export default function QuizPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = use(params);
  const router = useRouter();
  const topic = topics.find(t => t.id === topicId);
  const [cur, setCur]           = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [results, setResults]   = useState<boolean[]>([]);
  const [start]                 = useState(Date.now());
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    if (!topic) return;
    const ok = isTopicUnlocked(topicId);
    setUnlocked(ok);
    if (!ok) router.replace("/?locked=1");
  }, [topicId, topic]);

  if (!topic) return (
    <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}><Navbar />
      <div style={{ ...pageWrap, paddingTop: 48, textAlign: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <button style={{ height: 38, padding: "0 16px", background: C.surface, color: C.ink, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>← Home</button>
        </Link>
      </div>
    </div>
  );

  if (unlocked === null || unlocked === false) return (
    <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}><Navbar />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
        <p style={{ fontSize: 15, fontWeight: 600, color: C.ink, marginBottom: 6 }}>Quiz Locked</p>
        <p style={{ fontSize: 13, color: C.ink3, marginBottom: 20 }}>Complete the previous topic's quiz to unlock this one.</p>
        <Link href="/" style={{ textDecoration: "none" }}>
          <button style={{ height: 38, padding: "0 18px", background: C.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: sans }}>← Back to Home</button>
        </Link>
      </div>
    </div>
  );

  const qs = topic.questions;
  const q  = qs[cur];

  const pick = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const ok = i === q.answer;
    if (ok) setScore(s => s + 1);
    setResults(r => [...r, ok]);
  };

  const next = () => {
    if (cur + 1 >= qs.length) {
      // Use results array (not stale score state) for accurate final tally
      const finalResults = [...results, selected === q.answer];
      const finalScore   = finalResults.filter(Boolean).length;
      setDone(true);
      saveQuizResult(topicId, finalScore, qs.length);
    } else {
      setCur(c => c + 1); setSelected(null); setAnswered(false);
    }
  };

  // Results
  if (done) {
    const pct    = Math.round((score / qs.length) * 100);
    const passed = pct >= 70;
    const elapsed = Math.round((Date.now() - start) / 1000);
    return (
      <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}><Navbar />
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 16px" }}>
          <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 16, overflow: "hidden" }}>
            {/* Score hero */}
            <div style={{ background: passed ? C.ink : C.danger, padding: "36px 24px", textAlign: "center" }}>
              <p style={{ ...eyebrow, color: "rgba(255,255,255,0.45)", marginBottom: 14 }}>
                Quiz Complete · {topic.icon} {topic.title}
              </p>
              <div style={{ fontFamily: serif, fontSize: "4.5rem", fontWeight: 400, color: "#fff", lineHeight: 1 }}>{pct}%</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 8 }}>
                {score}/{qs.length} correct · {Math.floor(elapsed/60)}m {elapsed%60}s
              </p>
              {passed && (
                <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, background: C.accent, padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: "#fff" }}>
                  ✓ Passed
                </div>
              )}
            </div>
            <div style={{ padding: "22px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                  { l: "Correct", v: results.filter(Boolean).length, bg: C.successBg, c: C.success },
                  { l: "Wrong",   v: results.filter(r => !r).length, bg: C.dangerBg,  c: C.danger  },
                  { l: "Score",   v: `${pct}%`,                      bg: C.accentSoft, c: C.accent  },
                ].map(x => (
                  <div key={x.l} style={{ background: x.bg, borderRadius: 10, padding: "14px 8px", textAlign: "center" }}>
                    <div style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 400, color: x.c }}>{x.v}</div>
                    <div style={{ fontSize: 10, color: x.c, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{x.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: passed ? C.successBg : C.dangerBg, border: `1px solid ${passed ? C.successBr : C.dangerBr}`, borderRadius: 8, padding: "11px 14px", marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: passed ? C.success : C.danger }}>
                  {passed ? "✓ Passed! You can move on to the next topic." : "You need 70% to pass. Review the lessons and try again."}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link href={`/lesson/${topicId}`} style={{ textDecoration: "none" }}>
                  <button style={{ height: 34, padding: "0 14px", background: C.surface, color: C.ink, border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>← Lessons</button>
                </Link>
                <button onClick={() => { setCur(0); setSelected(null); setAnswered(false); setScore(0); setDone(false); setResults([]); }}
                  style={{ height: 34, padding: "0 14px", background: C.surface, color: C.ink, border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>Retry</button>
                <Link href="/exam" style={{ textDecoration: "none", marginLeft: "auto" }}>
                  <button style={{ height: 34, padding: "0 14px", background: C.accent, color: "#fff", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: sans }}>Final exam →</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz question
  return (
    <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}><Navbar />

      {/* Breadcrumb */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.borderLt}`, padding: "8px 16px" }}>
        <div style={{ maxWidth: 660, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.ink3 }}>
          <Link href="/" style={{ color: C.ink2, textDecoration: "none" }}>Home</Link><span>›</span>
          <Link href={`/lesson/${topicId}`} style={{ color: C.ink2, textDecoration: "none" }}>{topic.title}</Link><span>›</span>
          <span style={{ color: C.ink, fontWeight: 500 }}>Quiz</span>
        </div>
      </div>

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "16px" }}>
        {/* Meta bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: C.ink3 }}>{topic.icon} {topic.title}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.ink3, fontFamily: "monospace" }}>{cur+1}/{qs.length} · {score} pts</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: C.borderLt, borderRadius: 999, marginBottom: 16, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(cur / qs.length) * 100}%`, background: C.accent, borderRadius: 999, transition: "width 0.3s" }} />
        </div>

        <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "20px 20px" }}>
            <p style={{ ...eyebrow, marginBottom: 10 }}>Question {cur+1}</p>
            <p style={{ fontFamily: serif, fontSize: "1.05rem", lineHeight: 1.68, color: C.ink, marginBottom: 20 }}>{q.question}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {q.choices.map((ch, i) => {
                const isSel = i === selected;
                const isAns = i === q.answer;
                let bg = C.white, border = C.borderLt, color = C.ink, letterBg = C.surface, letterColor = C.ink3;
                if (answered) {
                  if (isAns)      { bg = C.successBg; border = C.successBr; color = C.success; letterBg = C.success; letterColor = "#fff"; }
                  else if (isSel) { bg = C.dangerBg;  border = C.dangerBr;  color = C.danger;  letterBg = C.danger;  letterColor = "#fff"; }
                  else            { bg = C.surface; color = C.ink3; letterBg = C.borderLt; letterColor = C.ink3; }
                } else if (isSel) { bg = C.accentSoft; border = C.accent; letterBg = C.accent; letterColor = "#fff"; color = C.ink; }
                return (
                  <button key={i} onClick={() => pick(i)} disabled={answered}
                    style={{ width: "100%", textAlign: "left", padding: "12px 14px", borderRadius: 9, border: `1.5px solid ${border}`, background: bg, cursor: answered ? "default" : "pointer", display: "flex", alignItems: "flex-start", gap: 12, transition: "all 0.12s", fontFamily: sans }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: letterBg, color: letterColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1, transition: "all 0.12s" }}>
                      {String.fromCharCode(65+i)}
                    </span>
                    <span style={{ fontSize: 13, color, lineHeight: 1.55 }}>{ch}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {answered && (
            <div style={{ borderTop: `1px solid ${C.borderLt}`, background: selected===q.answer ? C.successBg : C.dangerBg, padding: "13px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: selected===q.answer ? C.success : C.danger }}>
                {selected===q.answer ? "✓ Correct!" : `✗ Answer: ${String.fromCharCode(65+q.answer)}. ${q.choices[q.answer]}`}
              </p>
              {q.explanation && (
                <p style={{ fontSize: 12, color: C.ink2, lineHeight: 1.55, width: "100%", borderTop: `1px solid ${selected===q.answer ? C.successBr : C.dangerBr}`, paddingTop: 8, marginTop: 4 }}>
                  💡 {q.explanation}
                </p>
              )}
              <button onClick={next} style={{
                height: 34, padding: "0 16px",
                background: cur+1 < qs.length ? C.ink : C.accent,
                color: "#fff", border: "none", borderRadius: 7,
                fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: sans, marginLeft: "auto",
              }}>
                {cur+1 < qs.length ? "Next →" : "See results →"}
              </button>
            </div>
          )}
        </div>
      </div>

      <AiTutor topicId={topicId} lessonTitle={topic.title + " Quiz"} lessonContent="" isQuizMode={true} />
    </div>
  );
}
