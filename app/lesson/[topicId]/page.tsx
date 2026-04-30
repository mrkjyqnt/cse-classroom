"use client";
import { useState, useEffect, use, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { topics, type LessonSection } from "@/lib/data";
import { getSession, markLessonRead, isTopicUnlocked } from "@/lib/session";
import Navbar from "@/components/Navbar";
import { C, serif, sans, eyebrow } from "@/lib/styles";
import AiTutor from "@/components/AiTutor";

/* ── Section renderer ─── */
function Section({ s }: { s: LessonSection }) {
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const mdInline = (txt: string) => txt.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  if (s.type === "text") return (
    <div style={{ marginBottom: 22 }}>
      {s.title && (
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 3, height: 16, background: C.accent, borderRadius: 99, display: "inline-block", flexShrink: 0 }} />
          {s.title}
        </h3>
      )}
      <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.78 }} dangerouslySetInnerHTML={{ __html: mdInline(s.content || "") }} />
    </div>
  );

  if (s.type === "tip") return (
    <div style={{ background: C.accentSoft, border: `1px solid ${C.accentBr}`, borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
      <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: mdInline(s.content || "") }} />
    </div>
  );

  if (s.type === "example" && s.items) return (
    <div style={{ marginBottom: 24 }}>
      {s.title && <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 10 }}>📝 {s.title}</p>}
      <div style={{ background: C.surface, border: `1px solid ${C.borderLt}`, borderRadius: 10, overflow: "hidden" }}>
        {s.items.map((item, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(110px,140px) 1fr", borderBottom: i < s.items!.length - 1 ? `1px solid ${C.borderLt}` : "none" }}>
            <div style={{ padding: "10px 12px", background: C.surfaceAlt, fontSize: 12, fontWeight: 600, color: C.ink2, borderRight: `1px solid ${C.borderLt}` }}>{item.label}</div>
            <div style={{ padding: "10px 12px", fontSize: 13, color: C.ink2, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: mdInline(item.value) }} />
          </div>
        ))}
      </div>
    </div>
  );

  if (s.type === "table" && s.rows) return (
    <div style={{ marginBottom: 24, overflowX: "auto", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"] }}>
      {s.title && <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 10 }}>📊 {s.title}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 400 }}>
        <thead>
          <tr>{s.headers?.map(h => <th key={h} style={{ background: C.ink, color: "#fff", padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {s.rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? C.white : C.surface }}>
              {row.map((cell, j) => <td key={j} style={{ padding: "9px 12px", borderBottom: `1px solid ${C.borderLt}`, color: C.ink2 }} dangerouslySetInnerHTML={{ __html: mdInline(cell) }} />)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (s.type === "flashcard" && s.cards) {
    const card = s.cards[activeCard];
    return (
      <div style={{ marginBottom: 24 }}>
        {s.title && <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 10 }}>🃏 {s.title}</p>}
        <div onClick={() => setFlipped(f => !f)} style={{ cursor: "pointer", marginBottom: 10 }}>
          <div style={{ position: "relative", minHeight: 120, perspective: 1000 }}>
            <div style={{ width: "100%", minHeight: 120, position: "relative", transition: "transform 0.45s", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
              <div style={{ backfaceVisibility: "hidden", position: "absolute", inset: 0, background: C.white, border: `2px solid ${C.borderLt}`, borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 120 }}>
                <span style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 400, color: C.ink, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: mdInline(card.front) }} />
                <span style={{ fontSize: 10, color: C.ink3, background: C.surface, padding: "3px 8px", borderRadius: 999, border: `1px solid ${C.border}` }}>tap to reveal</span>
              </div>
              <div style={{ backfaceVisibility: "hidden", position: "absolute", inset: 0, transform: "rotateY(180deg)", background: C.ink, borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 120 }}>
                <span style={{ fontSize: 14, color: "white", lineHeight: 1.65, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: card.back.replace(/\*\*(.+?)\*\*/g, "<strong style='color:#FB9C75'>$1</strong>") }} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => { setActiveCard(a => Math.max(0, a - 1)); setFlipped(false); }} disabled={activeCard === 0}
            style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: C.white, cursor: activeCard === 0 ? "default" : "pointer", opacity: activeCard === 0 ? 0.4 : 1, fontSize: 15, fontFamily: sans }}>‹</button>
          <span style={{ flex: 1, textAlign: "center", fontSize: 12, color: C.ink3 }}>{activeCard + 1} / {s.cards.length}</span>
          <button onClick={() => { setActiveCard(a => Math.min(s.cards!.length - 1, a + 1)); setFlipped(false); }} disabled={activeCard === s.cards.length - 1}
            style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`, background: C.white, cursor: activeCard === s.cards.length - 1 ? "default" : "pointer", opacity: activeCard === s.cards.length - 1 ? 0.4 : 1, fontSize: 15, fontFamily: sans }}>›</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
          {s.cards.map((_, i) => (
            <button key={i} onClick={() => { setActiveCard(i); setFlipped(false); }}
              style={{ height: 24, padding: "0 9px", borderRadius: 5, border: `1px solid ${i === activeCard ? C.accent : C.border}`, background: i === activeCard ? C.accent : C.white, color: i === activeCard ? "#fff" : C.ink3, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: sans }}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

/* ── Main Page ── */
export default function LessonPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = use(params);
  const router = useRouter();

  // ── ALL hooks must be declared here, unconditionally, before any return ──
  const [active, setActive]     = useState(0);
  const [readSet, setReadSet]   = useState<Set<number>>(new Set());
  const [mobileNav, setMobileNav] = useState(false);
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  const topic = topics.find(t => t.id === topicId) ?? null;

  // Check unlock & load progress — runs whenever topicId changes
  useEffect(() => {
    if (!topic) return;
    const ok = isTopicUnlocked(topicId);
    setUnlocked(ok);
    if (!ok) {
      router.replace("/?locked=1");
      return;
    }
    setActive(0);
    setReadSet(new Set(getSession().lessonsRead[topicId] || []));
  }, [topicId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mark lesson as read whenever active changes (and topic is unlocked)
  useEffect(() => {
    if (!topic || !unlocked) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!readSet.has(active)) {
      markLessonRead(topicId, active);
      setReadSet(prev => new Set([...prev, active]));
    }
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const activate = useCallback((i: number) => {
    setActive(i);
    setMobileNav(false);
  }, []);

  // ── Early returns AFTER all hooks ──
  if (!topic) return (
    <div style={{ background: C.bg, minHeight: "100dvh" }}><Navbar />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 20px", textAlign: "center" }}>
        <p style={{ color: C.ink3 }}>Topic not found.</p>
        <Link href="/" style={{ textDecoration: "none" }}>
          <button style={{ marginTop: 12, height: 38, padding: "0 16px", background: C.ink, color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>← Home</button>
        </Link>
      </div>
    </div>
  );

  // Show lock screen while checking or if locked (prevents flash of content)
  if (unlocked === null || unlocked === false) return (
    <div style={{ background: C.bg, minHeight: "100dvh" }}><Navbar />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
        <p style={{ fontSize: 15, fontWeight: 600, color: C.ink, marginBottom: 6 }}>Topic Locked</p>
        <p style={{ fontSize: 13, color: C.ink3, marginBottom: 20 }}>Complete the previous topic's quiz to unlock this one.</p>
        <Link href="/" style={{ textDecoration: "none" }}>
          <button style={{ height: 38, padding: "0 18px", background: C.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: sans }}>← Back to Home</button>
        </Link>
      </div>
    </div>
  );

  const lesson  = topic.lessons[active];
  const allRead = readSet.size >= topic.lessons.length;
  const readPct = Math.round((readSet.size / topic.lessons.length) * 100);
  const lessonContent = lesson.sections.map(s =>
    s.content || s.items?.map(x => x.value).join(" ") || s.cards?.map(x => x.back).join(" ") || ""
  ).join(" ");

  return (
    <div style={{ background: C.bg, minHeight: "100dvh", fontFamily: sans }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.borderLt}`, padding: "8px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.ink3 }}>
          <Link href="/" style={{ color: C.ink2, textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <span style={{ color: C.ink, fontWeight: 500 }}>{topic.icon} {topic.title}</span>
        </div>
      </div>

      {/* Mobile lesson picker */}
      <div className="mobile-picker" style={{ padding: "10px 16px", background: C.white, borderBottom: `1px solid ${C.borderLt}`, display: "none" }}>
        <button onClick={() => setMobileNav(o => !o)}
          style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, background: C.white, fontSize: 13, fontWeight: 500, color: C.ink, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: sans }}>
          <span>{readSet.has(active) ? "✓ " : ""}{lesson.emoji} {lesson.title}</span>
          <span style={{ color: C.ink3, fontSize: 11 }}>{mobileNav ? "▲" : "▼"} {active + 1}/{topic.lessons.length}</span>
        </button>
        {mobileNav && (
          <div style={{ marginTop: 6, border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden", background: C.white }}>
            {topic.lessons.map((l, i) => (
              <button key={i} onClick={() => activate(i)}
                style={{ width: "100%", padding: "11px 14px", border: "none", borderBottom: i < topic.lessons.length - 1 ? `1px solid ${C.borderLt}` : "none", background: active === i ? C.accentSoft : C.white, fontSize: 13, color: active === i ? C.accent : readSet.has(i) ? C.success : C.ink, fontWeight: active === i ? 700 : 400, cursor: "pointer", textAlign: "left", display: "flex", gap: 8, alignItems: "center", fontFamily: sans }}>
                <span style={{ fontSize: 11, color: active === i ? C.accent : C.ink3 }}>{readSet.has(i) ? "✓" : `${i + 1}.`}</span>
                <span>{l.emoji} {l.title}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: C.ink3 }}>{l.duration}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lesson-grid" style={{ maxWidth: 960, margin: "0 auto", padding: "20px", display: "grid", gridTemplateColumns: "210px 1fr", gap: 20 }}>
        {/* Sidebar */}
        <aside className="lesson-sidebar">
          <div style={{ position: "sticky", top: 72 }}>
            <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <p style={{ ...eyebrow }}>Lessons</p>
                <span style={{ fontSize: 11, color: C.ink3 }}>{readSet.size}/{topic.lessons.length}</span>
              </div>
              <div style={{ height: 3, background: C.borderLt, borderRadius: 999, marginBottom: 14, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${readPct}%`, background: C.accent, borderRadius: 999, transition: "width 0.4s" }} />
              </div>
              <nav>
                {topic.lessons.map((l, i) => (
                  <button key={i} onClick={() => activate(i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: sans, background: active === i ? C.accent : "transparent", color: active === i ? "#fff" : readSet.has(i) ? C.success : C.ink2, fontSize: 12, fontWeight: active === i ? 700 : 400, textAlign: "left", marginBottom: 2, transition: "all 0.12s" }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>{readSet.has(i) && active !== i ? "✓" : l.emoji}</span>
                    <span style={{ flex: 1, lineHeight: 1.35 }}>{l.title}</span>
                    <span style={{ fontSize: 10, opacity: 0.5, flexShrink: 0 }}>{l.duration}</span>
                  </button>
                ))}
              </nav>
            </div>
            <Link href={`/quiz/${topicId}`} style={{ textDecoration: "none", display: "block" }}>
              <button style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1.5px solid ${allRead ? C.accent : C.border}`, background: allRead ? C.accent : C.surface, color: allRead ? "white" : C.ink2, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: sans, transition: "all 0.15s" }}>
                {allRead ? "Take quiz →" : `Quiz (${readSet.size}/${topic.lessons.length} read)`}
              </button>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main>
          <div style={{ background: C.white, border: `1px solid ${C.borderLt}`, borderRadius: 14, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.borderLt}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <p style={{ ...eyebrow, marginBottom: 5 }}>Lesson {active + 1} of {topic.lessons.length} · {lesson.duration}</p>
                <h1 style={{ fontFamily: serif, fontSize: "1.35rem", fontWeight: 400, color: C.ink, lineHeight: 1.25 }}>{lesson.emoji} {lesson.title}</h1>
              </div>
              {readSet.has(active) && (
                <span style={{ fontSize: 11, fontWeight: 700, color: C.success, background: C.successBg, border: `1px solid ${C.successBr}`, padding: "3px 9px", borderRadius: 999, flexShrink: 0, whiteSpace: "nowrap" }}>✓ Read</span>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "22px" }}>
              {lesson.sections.map((section, i) => <Section key={i} s={section} />)}
            </div>

            {/* Footer nav */}
            <div style={{ padding: "14px 22px", borderTop: `1px solid ${C.borderLt}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <button disabled={active === 0} onClick={() => activate(active - 1)}
                style={{ height: 34, padding: "0 14px", borderRadius: 7, border: `1px solid ${C.border}`, background: C.white, color: C.ink, fontSize: 13, fontWeight: 500, cursor: active === 0 ? "not-allowed" : "pointer", opacity: active === 0 ? 0.4 : 1, fontFamily: sans }}>
                ← Prev
              </button>
              <span style={{ fontSize: 12, color: C.ink3 }}>{active + 1} / {topic.lessons.length}</span>
              {active < topic.lessons.length - 1
                ? <button onClick={() => activate(active + 1)} style={{ height: 34, padding: "0 16px", borderRadius: 7, border: "none", background: C.accent, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: sans }}>Next →</button>
                : <Link href={`/quiz/${topicId}`} style={{ textDecoration: "none" }}><button style={{ height: 34, padding: "0 16px", borderRadius: 7, border: "none", background: C.accent, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: sans }}>Take quiz →</button></Link>
              }
            </div>
          </div>

          {/* Mobile quiz button */}
          <div className="mobile-quiz-btn" style={{ marginTop: 12, display: "none" }}>
            <Link href={`/quiz/${topicId}`} style={{ textDecoration: "none", display: "block" }}>
              <button style={{ width: "100%", padding: "13px", background: allRead ? C.accent : C.surface, color: allRead ? "white" : C.ink2, border: `1.5px solid ${allRead ? C.accent : C.border}`, borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: sans }}>
                {allRead ? "Take quiz →" : `Quiz (${readSet.size}/${topic.lessons.length} read)`}
              </button>
            </Link>
          </div>
        </main>
      </div>

      <AiTutor topicId={topicId} lessonTitle={lesson.title} lessonContent={lessonContent} />

      <style>{`
        @media (max-width: 700px) {
          .lesson-grid { grid-template-columns: 1fr !important; }
          .lesson-sidebar { display: none !important; }
          .mobile-picker { display: block !important; }
          .mobile-quiz-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}
