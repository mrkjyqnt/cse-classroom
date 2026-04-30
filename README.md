# CSE Classroom

> An interactive Civil Service Exam reviewer for the Philippine Professional and Sub-Professional levels — featuring flashcard lessons, topic quizzes with instant feedback, a timed 80-item practice exam, unlock progression, and a printable Certificate of Achievement.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 Overview

**CSE Classroom** is a full-stack web application designed to help Filipinos prepare for the Civil Service Examination (CSE) administered by the Civil Service Commission of the Philippines. The platform covers both Professional and Sub-Professional examination levels across five major subject areas.

All lessons and questions are sourced directly from the official CSE reviewer document. This is an **unofficial** study aid and is not affiliated with or endorsed by the Civil Service Commission of the Philippines.

---

## ✨ Features

- 🃏 **Interactive Flashcard Lessons** — Tap-to-flip flashcards, worked examples, data tables, and tip callouts per lesson
- 🔒 **Unlock Progression** — Complete each topic's quiz to unlock the next, encouraging structured learning
- ✅ **Topic Quizzes** — Instant feedback with answer explanations after every question
- 📝 **80-Item Practice Exam** — Full-length timed exam (90 minutes) with a question navigator and flag system
- 📊 **Performance Breakdown** — Per-subject scoring after the exam
- 🎓 **Certificate of Achievement** — Printable and shareable certificate for users who pass with 70%+
- 📘 **Share on Facebook** — Share your certificate directly to Facebook or copy the link
- 💾 **Session Persistence** — Progress saved via localStorage and browser cookies — resume anytime
- 📱 **Mobile-First Design** — Fully responsive, works on phone, tablet, and desktop

---

## 📚 Exam Coverage

| Subject | Lessons | Quiz Questions | Exam Items |
|---|---|---|---|
| 🔢 Mathematics | 4 | 22 | 16 |
| 📖 English | 5 | 20 | 16 |
| 🇵🇭 Filipino | 4 | 17 | 14 |
| ⚖️ Philippine Constitution | 3 | 20 | 18 |
| 🧠 Inductive Reasoning | 2 | 20 | 16 |
| **Total** | **18** | **99** | **80** |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) version 18 or higher
- npm (comes with Node.js)

Check your version:
```bash
node -v
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/cse-classroom.git

# 2. Navigate into the project folder
cd cse-classroom

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended — Free)

The easiest way to deploy CSE Classroom is with [Vercel](https://vercel.com), the platform built by the creators of Next.js.

**Option A — Via Vercel Dashboard (no CLI needed):**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"**
4. Select your `cse-classroom` repository
5. Click **"Deploy"** — Vercel auto-detects Next.js
6. Your app is live at `https://cse-classroom.vercel.app` (or similar)

**Option B — Via Vercel CLI:**

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

> ⚠️ GitHub Pages only supports static sites. Because CSE Classroom uses Next.js server-side features, GitHub Pages is **not recommended**. Use Vercel instead for full functionality.

---

## 🔄 Updating Your Deployment

Every time you push to GitHub, Vercel automatically redeploys:

```bash
git add .
git commit -m "your update message"
git push
```

---

## 🗂️ Project Structure

```
cse-classroom/
├── app/
│   ├── page.tsx              # Home page with topic list and unlock system
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── lesson/[topicId]/     # Interactive lesson pages
│   ├── quiz/[topicId]/       # Topic quiz pages
│   ├── exam/                 # Full-length practice exam
│   └── certificate/          # Certificate of Achievement
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   └── ui/                   # Reusable UI components (Button, Badge, Progress)
├── lib/
│   ├── data.ts               # All lessons, questions, and answers
│   ├── session.ts            # Cookie + localStorage session management
│   └── styles.ts             # Design tokens and shared style constants
└── public/                   # Static assets
```

---

## 🧠 How It Works

1. **Read the lessons** — Each topic has interactive lessons with flashcards, worked examples, and tip callouts
2. **Take the quiz** — After finishing a topic's lessons, take the quiz to check your understanding
3. **Unlock the next topic** — Passing the quiz unlocks the next subject area
4. **Sit the final exam** — An 80-item, 90-minute timed practice exam covering all subjects
5. **Earn your certificate** — Score 70% or higher to receive a Certificate of Achievement you can print or share

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [TypeScript 5](https://www.typescriptlang.org) | Type safety |
| Pure CSS + Inline Styles | Styling (no Tailwind dependency) |
| localStorage + Cookies | Session persistence |
| Native Browser APIs | Flashcard animations, timer, sharing |

---

## ⚙️ Environment

No environment variables are required. The app runs entirely client-side with no external API calls or database connections.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## ⚠️ Disclaimer

CSE Classroom is an **unofficial** study aid created for educational purposes only. It is not affiliated with, endorsed by, or an official product of the Civil Service Commission of the Philippines. All exam content is based on the publicly available CSC reviewer document. Actual examination content may differ.

---

## 🙏 Acknowledgements

- Civil Service Commission of the Philippines — for the original reviewer material
- [Next.js](https://nextjs.org) — for the framework
- [Vercel](https://vercel.com) — for hosting

---

<p align="center">Made with ❤️ for Filipino civil service aspirants</p>
