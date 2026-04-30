// Session management — localStorage with integrity check
// NOTE: This is a client-side app. All progress is stored locally.
// The unlock gates below prevent casual URL bypasses.
// A determined user with DevTools can still manipulate localStorage —
// this is expected for a free study tool with no backend auth.

import { topics } from "./data";

export interface UserProgress {
  lessonsRead: Record<string, number[]>;
  quizResults: Record<string, { score: number; pct: number; date: string }>;
  examResult: { score: number; pct: number; date: string } | null;
  startedAt: string;
  _v: number; // schema version
}

const SESSION_KEY = "csc_session_v2";
const SCHEMA_VERSION = 2;

// ── Integrity helpers ────────────────────────────────────
function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

/** Sanitise a loaded session so injected impossible values are clamped */
function sanitise(raw: UserProgress): UserProgress {
  const clean: UserProgress = defaultSession();
  clean.startedAt = raw.startedAt || clean.startedAt;
  clean._v = SCHEMA_VERSION;

  for (const t of topics) {
    const loaded = raw.lessonsRead?.[t.id];
    if (!Array.isArray(loaded)) continue;
    // Only keep valid lesson indices
    const validIndices = loaded.filter(
      (i): i is number => typeof i === "number" && Number.isInteger(i) && i >= 0 && i < t.lessons.length
    );
    if (validIndices.length > 0) clean.lessonsRead[t.id] = [...new Set(validIndices)];

    const qr = raw.quizResults?.[t.id];
    if (qr && typeof qr.score === "number" && typeof qr.pct === "number") {
      const total = t.questions.length;
      const score = clamp(Math.round(qr.score), 0, total);
      // Recompute pct from score — prevents injecting fake 100%
      clean.quizResults[t.id] = {
        score,
        pct: Math.round((score / total) * 100),
        date: typeof qr.date === "string" ? qr.date : new Date().toISOString(),
      };
    }
  }

  if (raw.examResult && typeof raw.examResult.score === "number") {
    const total = 80; // fixed exam size
    const score = clamp(Math.round(raw.examResult.score), 0, total);
    clean.examResult = {
      score,
      pct: Math.round((score / total) * 100),
      date: typeof raw.examResult.date === "string" ? raw.examResult.date : new Date().toISOString(),
    };
  }

  return clean;
}

export function getSession(): UserProgress {
  if (typeof window === "undefined") return defaultSession();
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return defaultSession();
    const parsed = JSON.parse(raw) as UserProgress;
    return sanitise(parsed);
  } catch {
    return defaultSession();
  }
}

export function saveSession(data: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...data, _v: SCHEMA_VERSION }));
  } catch {}
}

export function markLessonRead(topicId: string, lessonIdx: number): void {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return;
  if (lessonIdx < 0 || lessonIdx >= topic.lessons.length) return; // bounds check

  const s = getSession();
  if (!s.lessonsRead[topicId]) s.lessonsRead[topicId] = [];
  if (!s.lessonsRead[topicId].includes(lessonIdx)) {
    s.lessonsRead[topicId].push(lessonIdx);
  }
  saveSession(s);
}

export function saveQuizResult(topicId: string, score: number, total: number): void {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return;

  // Only allow saving if the topic is unlocked
  if (!isTopicUnlocked(topicId)) return;

  // Clamp score to valid range
  const safeScore = clamp(Math.round(score), 0, total);
  const s = getSession();
  s.quizResults[topicId] = {
    score: safeScore,
    pct: Math.round((safeScore / total) * 100),
    date: new Date().toISOString(),
  };
  saveSession(s);
}

export function saveExamResult(score: number, total: number): void {
  const safeScore = clamp(Math.round(score), 0, total);
  const s = getSession();
  s.examResult = {
    score: safeScore,
    pct: Math.round((safeScore / total) * 100),
    date: new Date().toISOString(),
  };
  saveSession(s);
}

export function resetSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  // Also clear old v1 key if present
  localStorage.removeItem("csc_session");
}

/** Returns true if a topic is accessible based on sequential unlock logic */
export function isTopicUnlocked(topicId: string): boolean {
  const idx = topics.findIndex(t => t.id === topicId);
  if (idx < 0) return false;   // unknown topic
  if (idx === 0) return true;  // first topic always unlocked
  const prevId = topics[idx - 1].id;
  const session = getSession();
  return !!(session.quizResults[prevId]);
}

/** Returns the index of the first locked topic (for redirect) */
export function getFirstLockedIndex(): number {
  const session = getSession();
  for (let i = 1; i < topics.length; i++) {
    const prevId = topics[i - 1].id;
    if (!session.quizResults[prevId]) return i;
  }
  return topics.length; // all unlocked
}

function defaultSession(): UserProgress {
  return {
    lessonsRead: {},
    quizResults: {},
    examResult: null,
    startedAt: new Date().toISOString(),
    _v: SCHEMA_VERSION,
  };
}
