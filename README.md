# Teach 🎓

**Explain it to me like I am ___.**

A personal-tutor webapp that meets you at your level and your learning style. Pick a topic
(or get one suggested from your interests), get a clear explanation, build a library of
everything you've understood, and test yourself with trivia. Mobile-first, works on desktop.

> **Status:** Phase 1 — clickable UI prototype. The flow is complete but data is mocked
> (no backend, AI, or auth yet). See [HANDOFF.md](./HANDOFF.md) for the full roadmap.

## What works today
- **Onboarding** — education level → learning style (diagrams / writing / both) → interests
- **Home** — welcome-back, points, stats, topic search, "Teach me something", "Challenge me", suggestions, card library
- **Explain** — explanation adapts to your level and style (diagram shown unless writing-only)
- **Trivia** — timed-feel quiz rounds, scored, with explanations

## Tech
- [Next.js](https://nextjs.org) (App Router, TypeScript) + [Tailwind CSS](https://tailwindcss.com)
- Deploys to [Netlify](https://www.netlify.com) (`netlify.toml` + `@netlify/plugin-nextjs`)
- **Planned (Phase 2):** Claude **Sonnet 4.6** teaching engine, **Supabase** auth + data, **Stripe** freemium

## Run locally
```bash
npm install
npm run dev
# http://localhost:3000  (or run-dev.bat → :3040)
```

## Build
```bash
npm run build
```

## Roadmap (high level)
1. Supabase auth + data
2. Live Sonnet 4.6 teaching engine (replaces the `mockExplain` placeholder)
3. Stripe freemium + entitlement gating
4. **Coaches** — purchasable AI teaching personas
5. **Game mode** — party / shared-device pass-and-play trivia

Full detail in [HANDOFF.md](./HANDOFF.md).
