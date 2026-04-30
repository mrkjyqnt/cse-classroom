"use client";
import { useState, useRef, useEffect } from "react";
import { getSession } from "@/lib/session";
import { topics } from "@/lib/data";
import { C, sans } from "@/lib/styles";

interface Message { role: "user" | "assistant"; content: string; }
interface AiTutorProps {
  topicId: string;
  lessonTitle: string;
  lessonContent: string;
  isQuizMode?: boolean;
}

function getLessonSuggestions(lessonId: string, lang: "en" | "tl"): string[] {
  const map: Record<string, { en: string[]; tl: string[] }> = {
    "math-operations": { en:["How does PEMDAS work?","Rounding example."], tl:["Paano ang PEMDAS?","Halimbawa ng rounding?"] },
    "math-fractions": { en:["Percentage formulas?","Discount problem?"], tl:["Formula ng porsyento?","Discount problem?"] },
    "math-wordproblems": { en:["Age problem setup?","Distance formula?"], tl:["Paano ang age problem?","Formula ng Distance?"] },
    "eng-grammar": { en:["'Between' vs 'among'?","Either/Or rule?"], tl:["'Between' at 'among'?","Verb sa 'either...or'?"] },
  };
  const defaults = { en:["Key concept here?","Give me an example?"], tl:["Pinakamahalagang konsepto?","Magbigay ng halimbawa?"] };
  return map[lessonId]?.[lang] ?? defaults[lang];
}

function buildSystemPrompt(topicId: string, lessonTitle: string, lessonContent: string, lang: "en" | "tl"): string {
  const langInstruction = lang === "tl" 
    ? "Sumagot ka PALAGI sa TAGALOG/FILIPINO. Pwede gumamit ng English technical terms." 
    : "Always respond in ENGLISH. Be clear and encouraging.";

  return `You are a Civil Service Exam (CSE) tutor.
LANGUAGE: ${langInstruction}
CURRENT LESSON: ${lessonTitle}
CONTENT: ${lessonContent.replace(/\*\*/g,"").slice(0,1000)}
ANTI-CHEAT: If asked for a quiz answer, create a SIMILAR example with different numbers instead.
RULES: Be concise (2-5 sentences). Be warm. Use simple bullet points if explaining steps.`;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code style='background:#F2EDE6;padding:1px 4px;border-radius:4px;font-family:monospace'>$1</code>")
    .replace(/^\s*[\-\*]\s+(.+)$/gm, "• $1")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

export default function AiTutor({ topicId, lessonTitle, lessonContent, isQuizMode = false }: AiTutorProps) {
  const [open, setOpen] = useState(false);
  const [showPeek, setShowPeek] = useState(false); 
  const [lang, setLang] = useState<"en" | "tl" | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const topic = topics.find(t => t.id === topicId);
  const lesson = topic?.lessons.find(l => l.title === lessonTitle);
  const lessonId = lesson?.id ?? "";
  const shortTitle = lessonTitle.length > 26 ? lessonTitle.slice(0, 26) + "…" : lessonTitle;

  // Auto-Peek Effect with In and Out timers
  useEffect(() => {
    if (!isQuizMode && !open && !lang) {
      const timer = setTimeout(() => setShowPeek(true), 2500); 
      const hideTimer = setTimeout(() => setShowPeek(false), 9000); 
      return () => { clearTimeout(timer); clearTimeout(hideTimer); };
    }
  }, [isQuizMode, open, lang]);

  // Auto-Scroll Effect
  useEffect(() => {
    if (open && lang) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [messages, open, lang]);

  const selectLang = (l: "en" | "tl") => {
    setLang(l);
    setShowPeek(false);
    const greeting = l === "tl"
      ? `Kumusta! Ako ang iyong AI tutor. Nag-aaral tayo ng **"${lessonTitle}"**. May tanong ka ba?`
      : `Hello! I'm your CSE AI Tutor. You're studying **"${lessonTitle}"**. How can I help?`;
    setMessages([{ role: "assistant", content: greeting }]);
  };

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading || !lang) return;
    
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: buildSystemPrompt(topicId, lessonTitle, lessonContent, lang),
          messages: newMessages.slice(-6),
        }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      const raw = data?.choices?.[0]?.message?.content ?? "";
      setMessages(prev => [...prev, { role: "assistant", content: raw.trim() }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: lang === "tl" ? "Error sa koneksyon." : "Connection error." }]);
    } finally { setLoading(false); }
  };

  const suggestions = lang ? getLessonSuggestions(lessonId, lang) : [];

  return (
    <>
      <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", padding: "0 16px 16px 0", pointerEvents: "none" }}>
        
        {/* PEEK BUBBLE WITH EASE IN/OUT */}
        <div style={{
          pointerEvents: showPeek && !open ? "all" : "none",
          background: C.white,
          border: `1px solid ${C.borderLt}`,
          padding: "12px 16px",
          borderRadius: "16px 16px 4px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          marginBottom: 12,
          maxWidth: 240,
          fontSize: 13,
          color: C.ink,
          position: "relative",
          cursor: "pointer",
          // THE ANIMATION LOGIC
          opacity: showPeek && !open ? 1 : 0,
          transform: showPeek && !open ? "translateY(0)" : "translateY(15px)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }} onClick={() => { setOpen(true); setShowPeek(false); }}>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowPeek(false); }} 
            style={{ position: "absolute", top: -8, right: -8, background: C.ink, color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, fontSize: 10, cursor: "pointer" }}
          >✕</button>
          Hello! I'm your <strong>AI Tutor</strong>. Need help with <em>{shortTitle}</em>?
        </div>

        {/* MAIN PANEL */}
        {open && (
          <div style={{ pointerEvents: "all", background: C.white, borderRadius: 16, boxShadow: "0 12px 48px rgba(0,0,0,0.18)", overflow: "hidden", display: "flex", flexDirection: "column", marginBottom: 12, width: 360, height: 520, animation: "tutorSlideUp 0.22s ease" }}>
            <div style={{ background: C.ink, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>🤖</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>CSE AI Tutor</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", margin: 0 }}>Active Support</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>

            {!lang ? (
              <div style={{ padding: 32, textAlign: "center", background: C.bg, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: C.ink }}>Choose your language</p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => selectLang("en")} style={{ flex: 1, padding: "12px", background: C.ink, color: "#fff", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 }}>English</button>
                  <button onClick={() => selectLang("tl")} style={{ flex: 1, padding: "12px", background: C.accent, color: "#fff", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 }}>Filipino</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto", padding: 12, background: C.bg }}>
                  {messages.map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                      <div style={{ 
                        maxWidth: "85%", padding: "10px 14px", borderRadius: 14, 
                        background: m.role === "user" ? C.ink : "#fff", 
                        color: m.role === "user" ? "#fff" : C.ink, 
                        fontSize: 13, lineHeight: 1.5,
                        border: m.role === "assistant" ? `1px solid ${C.borderLt}` : "none",
                        boxShadow: m.role === "assistant" ? "0 2px 4px rgba(0,0,0,0.02)" : "none"
                      }}>
                        <span dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                      </div>
                    </div>
                  ))}
                  {loading && <div style={{ fontSize: 11, color: C.ink3, marginLeft: 4 }}>AI is writing...</div>}
                  <div ref={bottomRef} />
                </div>

                {/* Suggestions */}
                {messages.length < 3 && !loading && (
                  <div style={{ padding: "0 12px 8px 12px", display: "flex", gap: 6, overflowX: "auto", background: C.bg }}>
                    {suggestions.map((s, i) => (
                      <button key={i} onClick={() => send(s)} style={{ flexShrink: 0, padding: "6px 12px", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 99, fontSize: 11, cursor: "pointer", color: C.ink2 }}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Area */}
                <div style={{ padding: 12, borderTop: `1px solid ${C.borderLt}`, display: "flex", gap: 8, background: "#fff" }}>
                  <textarea 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                    placeholder="Ask anything..."
                    style={{ flex: 1, borderRadius: 8, border: `1px solid ${C.border}`, padding: "8px 12px", fontSize: 13, resize: "none", outline: "none", fontFamily: sans, maxHeight: 80 }}
                    rows={1}
                  />
                  <button onClick={() => send()} disabled={loading || !input.trim()} style={{ background: input.trim() ? C.accent : C.border, color: "#fff", border: "none", borderRadius: 8, padding: "0 14px", cursor: "pointer" }}>
                    {loading ? "..." : "↑"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* TOGGLE BUTTON */}
        <button 
          onClick={() => { setOpen(!open); setShowPeek(false); }} 
          style={{ 
            pointerEvents: "all", width: 56, height: 56, borderRadius: "50%", 
            background: isQuizMode ? C.border : (open ? C.ink : C.accent), 
            border: "none", cursor: isQuizMode ? "not-allowed" : "pointer", 
            color: "#fff", fontSize: 24, boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease"
          }}
          disabled={isQuizMode}
        >
          {isQuizMode ? "🔒" : open ? "✕" : "🤖"}
        </button>
      </div>

      <style jsx>{`
        @keyframes tutorSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}