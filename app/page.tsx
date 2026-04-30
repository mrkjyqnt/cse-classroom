"use client";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { topics } from "@/lib/data";
import { getSession, isTopicUnlocked, type UserProgress } from "@/lib/session";
import { C, serif, sans, eyebrow, pageWrap } from "@/lib/styles";
import Navbar from "@/components/Navbar";

/* ── Locked toast — uses useSearchParams so needs Suspense ── */
function LockedToast() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get("locked") === "1") {
      setShow(true);
      const t = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(t);
    }
  }, [searchParams]);

  if (!show) return null;
  return (
    <div style={{
      position: "fixed", top: 68, left: "50%", transform: "translateX(-50%)",
      zIndex: 9000, background: C.ink, color: "#fff",
      padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600,
      boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
      display: "flex", alignItems: "center", gap: 8,
      animation: "fadeInDown 0.2s ease",
      whiteSpace: "nowrap",
    }}>
      🔒 That topic is locked — complete the previous quiz first.
    </div>
  );
}

/* ── Visit Counter ── */
function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/csc-classroom/visits/up")
      .then(r => r.json())
      .then(d => setCount(d?.count ?? null))
      .catch(() => setCount(null));
  }, []);

  return (
    <div style={{ ...pageWrap, padding: "16px 20px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: C.ink }}>CSC CLASSROOM</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>
          {count === null ? "Loading…" : <><strong style={{ color: C.ink2 }}>👥 {count.toLocaleString("en-PH")}</strong> visits</>}
        </span>
      </div>
      <p style={{ fontSize: 11, color: C.ink3 }}>Unofficial reviewer · Not affiliated with the Civil Service Commission</p>
    </div>
  );
}

/* ── Main Home Page ── */
export default function Home() {
  const [session, setSession] = useState<UserProgress | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setSession(getSession()); 
    setMounted(true);
  }, []);

  const totalLessons = topics.reduce((s, t) => s + t.lessons.length, 0);
  const lessonsRead  = session ? Object.values(session.lessonsRead).reduce((s, a) => s + a.length, 0) : 0;
  const quizzesDone  = session ? Object.keys(session.quizResults).length : 0;
  const pct          = Math.round((lessonsRead / totalLessons) * 100);
  const examPassed   = session?.examResult && session.examResult.pct >= 70;

  return (
    <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}>
      <Navbar />

      <Suspense fallback={null}>
        <LockedToast />
      </Suspense>

      {/* HERO */}
      <section style={{ ...pageWrap, paddingTop: 64, paddingBottom: 52 }}>
        <p style={{ ...eyebrow, marginBottom: 18 }}>Republic of the Philippines · Civil Service Commission</p>
        <h1 style={{ fontFamily: serif, fontSize: "clamp(2.25rem, 6vw, 3.75rem)", fontWeight: 400, lineHeight: 1.08, color: C.ink, marginBottom: 22 }}>
          Automate your review.<br /><em>Ace the CSC Exam.</em>
        </h1>
        <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7, maxWidth: 500, marginBottom: 32 }}>
          Interactive lessons, instant-feedback quizzes, and a full-length timed practice exam — everything you need to pass the Philippine Civil Service Examination.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/lesson/${topics[0].id}`} style={{ textDecoration: "none" }}>
            <button style={{ height: 44, padding: "0 24px", background: C.ink, color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
              Get started
            </button>
          </Link>
          <Link href="/exam" style={{ textDecoration: "none" }}>
            <button style={{ height: 44, padding: "0 24px", background: "transparent", color: C.ink, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
              Take practice exam
            </button>
          </Link>
        </div>
      </section>

      {/* SUBJECT STRIP */}
      <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.surface, overflowX: "auto" }}>
        <div style={{ ...pageWrap, display: "flex", alignItems: "center", gap: 28, height: 44, whiteSpace: "nowrap" }}>
          <span style={{ ...eyebrow, flexShrink: 0 }}>Covers</span>
          {topics.map(t => (
            <span key={t.id} style={{ fontSize: 13, color: C.ink2, flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
              <span>{t.icon}</span>{t.title}
            </span>
          ))}
        </div>
      </div>

      {/* DISCLAIMER */}
      <div style={{ ...pageWrap, paddingTop: 20 }}>
        <div style={{ background: C.warnBg, border: `1px solid ${C.warnBr}`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.warn, lineHeight: 1.6 }}>
          <strong>Disclaimer:</strong> Unofficial study aid. Not affiliated with the Civil Service Commission of the Philippines. For educational purposes only.
        </div>
      </div>

      {/* PROGRESS */}
      {mounted && session && (lessonsRead > 0 || quizzesDone > 0) && (
        <div style={{ ...pageWrap, paddingTop: 16 }}>
          <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Your progress</p>
                <p style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{lessonsRead}/{totalLessons} lessons · {quizzesDone}/{topics.length} quizzes</p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{pct}%</span>
            </div>
            <div style={{ height: 5, background: C.borderLt, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 999, transition: "width 0.5s" }} />
            </div>
            {examPassed && (
              <p style={{ fontSize: 12, color: C.success, marginTop: 10 }}>
                ✓ Exam passed with <strong>{session.examResult?.pct}%</strong> —{" "}
                <Link href="/certificate" style={{ color: C.success, fontWeight: 600 }}>View certificate</Link>
              </p>
            )}
          </div>
        </div>
      )}

      {/* TOPICS */}
      <div style={{ ...pageWrap, paddingTop: 32, paddingBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, color: C.ink }}>Study Topics</h2>
          <span style={{ fontSize: 12, color: C.ink3 }}>Complete in order to unlock</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {topics.map((topic, i) => {
            const qr      = session?.quizResults[topic.id];
            const read    = session?.lessonsRead[topic.id]?.length || 0;
            const done    = !!qr;
            const isFirst = i === 0;
            const unlocked = mounted ? isTopicUnlocked(topic.id) : isFirst;
            const readPct = Math.round((read / topic.lessons.length) * 100);

            return (
              <div key={topic.id}>
                <Link
                  href={unlocked ? `/lesson/${topic.id}` : "#"}
                  style={{ textDecoration: "none", display: "block" }}
                  onClick={e => { if (!unlocked) e.preventDefault(); }}>
                  <div style={{
                    background: C.white,
                    border: `1px solid ${done ? C.successBr : unlocked ? C.borderLt : C.border}`,
                    borderRadius: 12,
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transition: "all 0.18s",
                    opacity: unlocked ? 1 : 0.55,
                    cursor: unlocked ? "pointer" : "not-allowed",
                    borderLeft: `3px solid ${done ? C.success : unlocked ? C.accent : C.border}`,
                  }}
                    onMouseEnter={e => { if (unlocked) (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>

                    <div style={{ 
                      width: 40, height: 40, borderRadius: "50%", 
                      background: done ? C.successBg : unlocked ? C.accentSoft : C.surface, 
                      display: "flex", alignItems: "center", justifyContent: "center", 
                      fontSize: 18, flexShrink: 0 
                    }}>
                      {!mounted && !isFirst ? "🔒" : (done ? "✓" : unlocked ? topic.icon : "🔒")}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{topic.title}</p>
                        {mounted && done && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: C.success, background: C.successBg, border: `1px solid ${C.successBr}`, padding: "1px 7px", borderRadius: 999 }}>
                            ✓ {qr!.pct}%
                          </span>
                        )}
                        {mounted && !unlocked && (
                          <span style={{ fontSize: 11, color: C.ink3 }}>Complete {topics[i - 1]?.title} quiz first</span>
                        )}
                      </div>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.45 }}>{topic.description}</p>
                      {mounted && read > 0 && !done && (
                        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1, height: 3, background: C.borderLt, borderRadius: 999, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${readPct}%`, background: C.accent, borderRadius: 999 }} />
                          </div>
                          <span style={{ fontSize: 11, color: C.ink3, flexShrink: 0 }}>{read}/{topic.lessons.length} lessons</span>
                        </div>
                      )}
                    </div>

                    <div style={{ flexShrink: 0, textAlign: "right" }}>
                      <p style={{ fontSize: 11, color: C.ink3 }}>{topic.lessons.length} lessons</p>
                      <p style={{ fontSize: 11, color: C.ink3 }}>{topic.questions.length} questions</p>
                    </div>
                    {unlocked && <span style={{ color: C.ink3, fontSize: 13 }}>›</span>}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* EXAM CTA */}
        <div style={{ background: C.ink, borderRadius: 16, padding: "36px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, marginBottom: 40 }}>
          <div>
            <p style={{ ...eyebrow, color: C.ink3, marginBottom: 10 }}>Final Assessment</p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: "white", lineHeight: 1.2, marginBottom: 8 }}>Practice Examination</h2>
            <p style={{ fontSize: 13, color: C.ink3, lineHeight: 1.6 }}>80 questions · 90-minute timer · All subjects · Pass with 70% to earn your certificate.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            {mounted && examPassed && <Link href="/certificate" style={{ textDecoration: "none" }}><button style={{ height: 44, padding: "0 20px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>Certificate</button></Link>}
            <Link href="/exam" style={{ textDecoration: "none" }}>
              <button style={{ height: 44, padding: "0 24px", background: C.accent, color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                {mounted && examPassed ? "Retake exam" : "Start exam →"}
              </button>
            </Link>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24, marginBottom: 32 }}>
          {[
            { n: "01", t: "Read the lessons", d: "Interactive lessons with flashcards, examples and tips — built from the official CSC reviewer." },
            { n: "02", t: "Take topic quizzes", d: "Test yourself after each topic. Instant feedback with explanations on every answer." },
            { n: "03", t: "Unlock & progress", d: "Complete each topic's quiz to unlock the next. Stay accountable." },
            { n: "04", t: "Sit the final exam", d: "80 items, 90 minutes. Score 70%+ to earn your Certificate of Achievement." },
          ].map(s => (
            <div key={s.n} style={{ borderTop: `2px solid ${C.border}`, paddingTop: 14 }}>
              <p style={{ ...eyebrow, marginBottom: 6 }}>{s.n}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 6 }}>{s.t}</p>
              <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ borderTop: `1px solid ${C.border}` }}>
        <VisitCounter />
      </footer>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}