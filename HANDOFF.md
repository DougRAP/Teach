# Teach — Handoff

**What it is:** "Explain it to me like I am ___" — a personal-tutor webapp. Mobile-first, works on desktop.
**Status:** Phase 1 = clickable UI prototype, all mocked. No backend, no AI, no auth yet.

## Stack (decided)
- **Next.js** (App Router, TS, Tailwind) — `src/`
- **AI:** Claude **Sonnet 4.6** (not wired yet — `src/lib/mock.ts::mockExplain` is the placeholder)
- **Auth + data:** Supabase (not added yet)
- **Deploy:** Netlify (not configured yet)

## Run
```
cd "C:\Newco\AI\Teach"
npm run dev        # or run-dev.bat → http://localhost:3040
```
Preview server registered as `teach` (port 3040) in the Landing Page `.claude/launch.json`.

## Flow (all working in prototype)
Welcome (name) → **Step 1** education level → **Step 2** learning style (diagrams/writing/both) →
**Step 3** interests → **Home** (welcome-back, points, stats, topic search, "Teach me something",
"Challenge me", suggestions, card library) → **Explain** (level- + style-adapted, diagram when not
writing-only, follow-up chips, Save +15) → **Trivia** (scored, explanations).

## Key files
- `src/app/page.tsx` — entire flow as a client state machine (screens, state, points)
- `src/lib/types.ts` — Profile, LearningCard, levels, styles, interests
- `src/lib/mock.ts` — seed library, interest→suggestion map, `mockExplain` (swap for Sonnet), trivia
- `src/app/globals.css` + `tailwind.config.ts` — dark theme tokens, `.card`/`.btn`/`.chip`

## Next steps (Phase 2 — backend + AI)
1. **Supabase**: auth (magic link), tables — `profiles`, `cards`, `trivia_attempts`, `points`.
2. **AI**: replace `mockExplain` with a Next route handler calling Sonnet 4.6
   (`@anthropic-ai/sdk`, `claude-sonnet-4-6`); same for "Teach me something" interactive agent + trivia generation. Key via env, server-side only.
3. **Persist** profile + library + points to Supabase (currently React state, resets on reload).
4. **Netlify**: `@netlify/plugin-nextjs`, set `ANTHROPIC_API_KEY` + Supabase env vars.
5. Points/awards: badges, streak persistence.

## Monetization (goal: publish → monetize)
**Important:** a webapp **cannot** use App Store / Play Store IAP — that needs a native app
(Apple/Google take 15–30% and forbid bypassing their billing for digital goods). On web, "IAP" = **Stripe**.

**Recommended path — Web-first, ship now, wrap later:**
- **Path A (now):** PWA (installable "Add to Home Screen") + **Stripe** freemium subscription.
  Keep ~97% vs ~70%, no app review, ships fast. Stripe Checkout + webhook (Netlify function) →
  `subscriptions` table in Supabase → `useEntitlement()` gate around paid features.
- **Path B (later, only after Path A validates payers):** wrap the same codebase with **Capacitor**
  for iOS/Android, route digital purchases through Apple/Google billing via **RevenueCat**.

**Freemium tiering**

| Free | Pro (~$6–8/mo or $40/yr) |
|---|---|
| 3 explanations/day | Unlimited explanations |
| Basic levels | All levels + styles |
| Trivia | Interactive "Teach me" agent (the expensive Sonnet calls) |
| Library capped (~20 cards) | Unlimited library + export |
| 1 coach | Premium coaches |
| — | Streak freezes, badges, deeper diagrams |

The **interactive agent** is the best paywall: highest user value *and* highest AI cost → price aligns with cost.

### Purchasable: Coaches ("buy a coach")
AI coach **personas** — distinct teaching personality/tone/voice (e.g. "The Professor", "Hype Coach",
"Socratic", "Comedian"). Implemented as a system-prompt + style preset over the *same* teaching engine.
- Monetizes well on web (Stripe one-time unlock or part of Pro) **and** maps cleanly to a
  **non-consumable IAP** via RevenueCat if wrapped native later.
- Data: `coaches` (catalog), `user_coaches` (owned). Active coach = a field on `profiles`.

### Game mode (party / shared-device) — growth loop + monetization lever
Phone in the middle of the table, pass-and-play. A table of people playing is built-in marketing.
**Flow:**
1. Setup: create teams/players, pick a **very specific** topic → engine generates that lesson.
2. Quick lesson (shared screen), then a **trivia round = 5 questions** with a **per-question timer**.
3. **Teams take turns**; play as many rounds as they want.
4. **End game** → leaderboard / who won. **Reset** to play again.

Reuses the **same teaching engine**, but invokes the user *as a game* (group context, not solo learner) —
question generation, scoring, and timer wrap the existing explain/trivia logic.
**Monetization:** free = a few rounds or a limited topic set; **Pro/IAP unlocks** full party mode,
extra question packs, and coaches as hosts. Strong viral on-ramp: players sign up after a session.
**State:** game session is ephemeral (teams, scores, round) — can stay client-side first, persist later for stats.

## Notes
- Prototype state is in-memory only — refresh resets to seed data + 120 pts. Intentional for Phase 1.
- next pinned to 15.5.4 (CVE patch). 2 moderate build-time postcss advisories remain (not exploitable).
