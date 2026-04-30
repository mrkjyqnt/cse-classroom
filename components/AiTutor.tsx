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
    // Add other mappings as needed...
  };
  const defaults = { en:["Key concept here?","Give me an example?"], tl:["Pinakamahalagang konsepto?","Halimbawa?"] };
  return map[lessonId]?.[lang] ?? defaults[lang];
}

function buildSystemPrompt(topicId: string, lessonTitle: string, lessonContent: string, lang: "en" | "tl"): string {
  const session = getSession();
  const topic = topics.find(t => t.id === topicId);
  const langInstruction = lang === "tl" 
    ? "Sumagot ka PALAGI sa TAGALOG/FILIPINO. Pwede gumamit ng English technical terms." 
    : "Always respond in ENGLISH. Be clear and encouraging.";

  return `You are a Civil Service Exam (CSE) tutor.
LANGUAGE: ${langInstruction}
CURRENT LESSON: ${lessonTitle}
CONTENT: ${lessonContent.replace(/\*\*/g,"").slice(0,1000)}
ANTI-CHEAT: If asked for a quiz answer, create a SIMILAR example with different numbers instead.
RULES: Be concise (2-5 sentences). Be warm.`;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code style='background:#F2EDE6;padding:1px 4px;border-radius:4px'>$1</code>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

export default function AiTutor({ topicId, lessonTitle, lessonContent, isQuizMode = false }: AiTutorProps) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "tl" | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(!isQuizMode);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const topic = topics.find(t => t.id === topicId);
  const lesson = topic?.lessons.find(l => l.title === lessonTitle);
  const lessonId = lesson?.id ?? "";
  const shortTitle = lessonTitle.length > 26 ? lessonTitle.slice(0, 26) + "…" : lessonTitle;

  useEffect(() => {
    if (open && lang) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, lang]);

  const selectLang = (l: "en" | "tl") => {
    setLang(l);
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
      <div className="tutor-root" style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", padding: "0 16px 16px 0", pointerEvents: "none" }}>
        {open && (
          <div className="tutor-panel" style={{ pointerEvents: "all", background: C.white, borderRadius: 16, boxShadow: "0 12px 48px rgba(0,0,0,0.18)", overflow: "hidden", display: "flex", flexDirection: "column", marginBottom: 12, width: 360, animation: "tutorSlideUp 0.22s ease" }}>
            {/* Header */}
            <div style={{ background: C.ink, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>🤖</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>CSE AI Tutor</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", margin: 0 }}>{shortTitle}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>✕</button>
            </div>

            {/* Content */}
            {!lang ? (
              <div style={{ padding: 24, textAlign: "center", background: C.bg }}>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Choose your language</p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <button onClick={() => selectLang("en")} style={{ padding: "10px 16px", background: C.ink, color: "#fff", borderRadius: 8, border: "none", cursor: "pointer" }}>English</button>
                  <button onClick={() => selectLang("tl")} style={{ padding: "10px 16px", background: C.accent, color: "#fff", borderRadius: 8, border: "none", cursor: "pointer" }}>Filipino</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto", padding: 12, background: C.bg, maxHeight: 400, minHeight: 300 }}>
                  {messages.map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                      <div style={{ maxWidth: "85%", padding: "8px 12px", borderRadius: 12, background: m.role === "user" ? C.ink : "#fff", color: m.role === "user" ? "#fff" : C.ink, fontSize: 13, border: m.role === "assistant" ? `1px solid ${C.borderLt}` : "none" }}>
                        <span dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
                {/* Input Area */}
                <div style={{ padding: 10, borderTop: `1px solid ${C.borderLt}`, display: "flex", gap: 8, background: "#fff" }}>
                  <textarea 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder="Ask a question..."
                    style={{ flex: 1, borderRadius: 8, border: `1px solid ${C.border}`, padding: 8, fontSize: 13, resize: "none" }}
                    rows={1}
                  />
                  <button onClick={() => send()} disabled={loading} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "0 12px", cursor: "pointer" }}>
                    {loading ? "..." : "↑"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <button 
          onClick={() => setOpen(!open)} 
          style={{ pointerEvents: "all", width: 54, height: 54, borderRadius: "50%", background: isQuizMode ? C.border : C.accent, border: "none", cursor: isQuizMode ? "not-allowed" : "pointer", color: "#fff", fontSize: 22, boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}
          disabled={isQuizMode}
        >
          {isQuizMode ? "🔒" : open ? "✕" : "🤖"}
        </button>
      </div>

      <style>{`
        @keyframes tutorSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}