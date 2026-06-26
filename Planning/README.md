# CTE — Cinematic Thinking Engine

> **AI builds generic. We make it cinematic.**

A three-stage AI pipeline that forces structured thinking before generation — so every idea becomes a story with depth, arc, and visual direction.

🔗 **Live:** [https://planning-agent-two.vercel.app](https://planning-agent-two.vercel.app)

---

## The Problem

Most AI tools let you skip straight to generation. You type a vague idea, get generic output, and wonder why it feels flat. The problem isn't the AI — it's that you never gave it a real story to work with.

CTE fixes that by enforcing a director's workflow before anything is generated.

---

## The Pipeline

```
RAW IDEA → [ THINK ] → [ PLAN ] → [ DIRECT ] → Export
```

### 01 · THINK — Cinematic Analysis
Breaks your idea down through four analytical lenses:
- **Audience** — who they are, what they believe, why they care
- **Emotion** — core feeling, narrative tension, catharsis
- **Narrative DNA** — archetype, structure, themes
- **Visual DNA** — mood words, reference films, signature image

### 02 · PLAN — Story Architecture
Builds a full three-act structure before any visuals are considered:
- Logline
- Act breakdown with scenes
- Emotional arc (beat-by-beat)
- Turning points

### 03 · DIRECT — Visual Direction
Translates the story into production-ready visual specs:
- Color palette with hex codes and mood labels
- Shot list (type, lens, movement, lighting)
- Cinematography notes
- AI image prompts ready to paste into Midjourney, DALL·E, or Flux

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| AI Provider | NVIDIA NIM — `meta/llama-3.1-70b-instruct` |
| Streaming | Server-Sent Events (SSE) via OpenAI-compatible SDK |
| State | Zustand |
| Styling | Tailwind CSS with custom cinematic theme |
| Deployment | Vercel (free tier) |

---

## Features

- **Enforced pipeline** — each stage unlocks only after the previous completes
- **Real-time streaming** — watch each stage develop token by token
- **Tone-aware** — tag your idea as noir, epic, intimate, surreal and the pipeline adapts
- **Exportable** — copy output as Markdown or JSON
- **Cinematic landing page** — designed in the style of premium template libraries
- **Zero generic output** — prompted as a seasoned creative director, not a chat assistant

---

## Live Demo

Visit **[https://planning-agent-two.vercel.app](https://planning-agent-two.vercel.app)** and try an idea like:

> *"A retired astronaut returns to his hometown and discovers the night sky has changed — stars are going out one by one"*

Hit **Enter the Studio**, add tone tags (melancholic, epic), and click **Roll Camera**.

---

## Project Structure

```
Planning/
├── app/
│   ├── page.tsx              # Cinematic landing page
│   ├── studio/page.tsx       # Pipeline app
│   └── api/
│       ├── think/route.ts    # Stage 1 — streaming endpoint
│       ├── plan/route.ts     # Stage 2 — streaming endpoint
│       └── direct/route.ts   # Stage 3 — streaming endpoint
├── components/
│   ├── stages/               # ThinkStage, PlanStage, DirectStage
│   ├── layout/               # Header, ProgressRail
│   └── ui/                   # LensCard, ShotCard, ColorPalette, etc.
├── lib/
│   ├── claude/               # NIM client + prompts
│   ├── store/                # Zustand session store
│   └── utils/                # Streaming JSON parser, export utils
└── types/
    └── pipeline.ts           # Shared TypeScript types
```

---

## Local Setup

```bash
git clone https://github.com/saiteja-optimus/Planning-Agent.git
cd Planning-Agent/Planning
npm install
```

Create `.env.local`:
```
NVIDIA_API_KEY=your_nvidia_nim_api_key
```

```bash
npm run dev
# → http://localhost:3000
```

---

## Project by

**Sai Teja Talluri**

Built with [Claude Code](https://claude.ai/code) · Powered by [NVIDIA NIM](https://build.nvidia.com)
