"use client";

import { useMemo, useState } from "react";
import {
  EducationLevel,
  INTERESTS,
  LearningCard,
  LearningStyle,
  LEVELS,
  Profile,
  STYLES,
} from "@/lib/types";
import {
  makeCard,
  mockExplain,
  SEED_LIBRARY,
  suggestions,
  TRIVIA,
} from "@/lib/mock";

type Screen =
  | "welcome"
  | "level"
  | "style"
  | "interests"
  | "home"
  | "explain"
  | "trivia";

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [profile, setProfile] = useState<Profile>({
    name: "",
    level: "high-school",
    style: "both",
    interests: [],
  });
  const [library, setLibrary] = useState<LearningCard[]>(SEED_LIBRARY);
  const [active, setActive] = useState<LearningCard | null>(null);
  const [points, setPoints] = useState(120);

  function startLearning(topic: string) {
    const { summary } = mockExplain(topic, profile.level, profile.style);
    const card = makeCard(topic, profile.level, profile.style, summary);
    setActive(card);
    setScreen("explain");
  }

  function saveActive() {
    if (!active) return;
    if (!library.find((c) => c.topic === active.topic)) {
      setLibrary((l) => [active, ...l]);
      setPoints((p) => p + 15);
    }
    setScreen("home");
  }

  const screenEl = (() => {
    switch (screen) {
      case "welcome":
        return <Welcome profile={profile} setProfile={setProfile} next={() => setScreen("level")} />;
      case "level":
        return (
          <Level
            value={profile.level}
            onPick={(level) => setProfile((p) => ({ ...p, level }))}
            next={() => setScreen("style")}
          />
        );
      case "style":
        return (
          <Style
            value={profile.style}
            onPick={(style) => setProfile((p) => ({ ...p, style }))}
            next={() => setScreen("interests")}
          />
        );
      case "interests":
        return (
          <Interests
            value={profile.interests}
            toggle={(i) =>
              setProfile((p) => ({
                ...p,
                interests: p.interests.includes(i)
                  ? p.interests.filter((x) => x !== i)
                  : [...p.interests, i],
              }))
            }
            next={() => setScreen("home")}
          />
        );
      case "home":
        return (
          <Home
            profile={profile}
            library={library}
            points={points}
            onTopic={startLearning}
            openCard={(c) => {
              setActive(c);
              setScreen("explain");
            }}
            goTrivia={() => setScreen("trivia")}
          />
        );
      case "explain":
        return active ? (
          <Explain card={active} onSave={saveActive} onBack={() => setScreen("home")} />
        ) : null;
      case "trivia":
        return (
          <Trivia
            onDone={(earned) => {
              setPoints((p) => p + earned);
              setScreen("home");
            }}
            onBack={() => setScreen("home")}
          />
        );
    }
  })();

  return <main className="animate-in">{screenEl}</main>;
}

/* ---------- Onboarding ---------- */

function Logo() {
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-lg shadow-glow">🎓</span>
      <span className="text-lg font-bold tracking-tight">
        Trivia<span className="text-brand">Mate</span>
      </span>
    </div>
  );
}

function Welcome({
  profile,
  setProfile,
  next,
}: {
  profile: Profile;
  setProfile: (p: Profile) => void;
  next: () => void;
}) {
  return (
    <section className="flex min-h-[80dvh] flex-col justify-center">
      <Logo />
      <h1 className="mt-6 text-3xl font-extrabold leading-tight">
        Learn anything. <span className="text-brand">Then prove it.</span>
      </h1>
      <p className="mt-3 text-muted">
        Your AI study mate. Get any topic explained at your level and style — then lock it in with
        trivia, and turn learning into a game with friends.
      </p>
      <input
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        placeholder="What should we call you?"
        className="mt-8 w-full rounded-2xl border border-line bg-surface px-4 py-4 text-ink outline-none placeholder:text-muted focus:border-brand"
      />
      <button onClick={next} className="btn-primary mt-4 w-full py-4">
        Get started →
      </button>
      <p className="mt-3 text-center text-xs text-muted">Prototype · no account needed yet</p>
    </section>
  );
}

function StepHeader({ step, title, sub }: { step: string; title: string; sub: string }) {
  return (
    <div className="mb-6">
      <Logo />
      <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-brand">{step}</p>
      <h2 className="mt-1 text-2xl font-bold">{title}</h2>
      <p className="mt-1 text-muted">{sub}</p>
    </div>
  );
}

function Level({
  value,
  onPick,
  next,
}: {
  value: EducationLevel;
  onPick: (l: EducationLevel) => void;
  next: () => void;
}) {
  return (
    <section className="flex min-h-[80dvh] flex-col">
      <StepHeader step="Step 1 of 3" title="Explain it to me like I am…" sub="We'll pitch every lesson to this level." />
      <div className="flex flex-col gap-3">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => onPick(l.id)}
            className={`card flex items-center justify-between px-4 py-4 text-left transition ${
              value === l.id ? "border-brand shadow-glow" : "hover:border-brand/60"
            }`}
          >
            <span>
              <span className="font-semibold">{l.label}</span>
              <span className="block text-sm text-muted">{l.blurb}</span>
            </span>
            <span className={`h-5 w-5 rounded-full border ${value === l.id ? "border-brand bg-brand" : "border-line"}`} />
          </button>
        ))}
      </div>
      <button onClick={next} className="btn-primary mt-auto w-full py-4">
        Continue
      </button>
    </section>
  );
}

function Style({
  value,
  onPick,
  next,
}: {
  value: LearningStyle;
  onPick: (s: LearningStyle) => void;
  next: () => void;
}) {
  return (
    <section className="flex min-h-[80dvh] flex-col">
      <StepHeader step="Step 2 of 3" title="How do you learn best?" sub="We'll shape lessons around this." />
      <div className="grid grid-cols-3 gap-3">
        {STYLES.map((s) => (
          <button
            key={s.id}
            onClick={() => onPick(s.id)}
            className={`card flex flex-col items-center gap-2 py-6 transition ${
              value === s.id ? "border-brand shadow-glow" : "hover:border-brand/60"
            }`}
          >
            <span className="text-2xl">{s.icon}</span>
            <span className="text-sm font-semibold">{s.label}</span>
          </button>
        ))}
      </div>
      <button onClick={next} className="btn-primary mt-auto w-full py-4">
        Continue
      </button>
    </section>
  );
}

function Interests({
  value,
  toggle,
  next,
}: {
  value: string[];
  toggle: (i: string) => void;
  next: () => void;
}) {
  return (
    <section className="flex min-h-[80dvh] flex-col">
      <StepHeader step="Step 3 of 3" title="What are you into?" sub="We'll suggest topics you'll actually want to learn." />
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`chip ${value.includes(i) ? "chip-active" : ""}`}
          >
            {i}
          </button>
        ))}
      </div>
      <button onClick={next} className="btn-primary mt-auto w-full py-4" disabled={false}>
        {value.length ? `Done · ${value.length} picked` : "Skip for now"}
      </button>
    </section>
  );
}

/* ---------- Home ---------- */

function Home({
  profile,
  library,
  points,
  onTopic,
  openCard,
  goTrivia,
}: {
  profile: Profile;
  library: LearningCard[];
  points: number;
  onTopic: (t: string) => void;
  openCard: (c: LearningCard) => void;
  goTrivia: () => void;
}) {
  const [topic, setTopic] = useState("");
  const suggested = useMemo(() => suggestions(profile.interests), [profile.interests]);
  const mastered = library.filter((c) => c.mastered).length;

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted">Welcome back{profile.name ? `, ${profile.name}` : ""} 👋</p>
          <h2 className="text-2xl font-bold">What should we learn today?</h2>
        </div>
        <div className="card flex flex-col items-center px-3 py-2">
          <span className="text-lg font-bold text-accent">{points}</span>
          <span className="text-[10px] uppercase tracking-widest text-muted">pts</span>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <Stat n={library.length} label="Cards" />
        <Stat n={mastered} label="Mastered" />
        <Stat n={Math.max(1, Math.round(points / 60))} label="Day streak" />
      </div>

      {/* Topic entry */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (topic.trim()) onTopic(topic.trim());
        }}
        className="mt-5"
      >
        <div className="card flex items-center gap-2 px-3 py-2">
          <span className="pl-1 text-muted">🔎</span>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Teach me… anything"
            className="w-full bg-transparent py-2 text-ink outline-none placeholder:text-muted"
          />
          <button type="submit" className="btn-primary px-4 py-2 text-xs">
            Go
          </button>
        </div>
      </form>

      {/* Quick actions */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <ActionCard
          title="Teach me something"
          sub="Surprise me from my interests"
          icon="✨"
          onClick={() => onTopic(suggested[0] ?? "Something fascinating")}
        />
        <ActionCard
          title="Challenge me"
          sub="Quick trivia for points"
          icon="🎯"
          onClick={goTrivia}
        />
      </div>

      {/* Suggestions */}
      <h3 className="mt-7 text-sm font-semibold uppercase tracking-widest text-muted">
        Suggested for you
      </h3>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
        {suggested.map((s) => (
          <button
            key={s}
            onClick={() => onTopic(s)}
            className="card min-w-[150px] shrink-0 px-4 py-4 text-left hover:border-brand/60"
          >
            <span className="text-xl">💡</span>
            <p className="mt-2 text-sm font-medium leading-snug">{s}</p>
          </button>
        ))}
      </div>

      {/* Library */}
      <div className="mt-7 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">Your library</h3>
        <span className="text-xs text-muted">{library.length} cards</span>
      </div>
      <div className="mt-3 grid gap-3">
        {library.map((c) => (
          <button
            key={c.id}
            onClick={() => openCard(c)}
            className="card flex items-start gap-3 px-4 py-4 text-left hover:border-brand/60"
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate font-semibold">{c.topic}</span>
                {c.mastered && (
                  <span className="rounded-full bg-good/15 px-2 py-0.5 text-[10px] font-semibold text-good">
                    ✓ mastered
                  </span>
                )}
              </span>
              <span className="mt-1 block line-clamp-2 text-sm text-muted">{c.summary}</span>
              <span className="mt-2 block text-xs text-muted">{c.createdAt}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="card px-2 py-3">
      <div className="text-xl font-bold">{n}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted">{label}</div>
    </div>
  );
}

function ActionCard({
  title,
  sub,
  icon,
  onClick,
}: {
  title: string;
  sub: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="card flex flex-col gap-1 bg-gradient-to-br from-surface to-surface2 px-4 py-4 text-left hover:border-brand"
    >
      <span className="text-xl">{icon}</span>
      <span className="mt-1 font-semibold leading-tight">{title}</span>
      <span className="text-xs text-muted">{sub}</span>
    </button>
  );
}

/* ---------- Explanation ---------- */

function Explain({
  card,
  onSave,
  onBack,
}: {
  card: LearningCard;
  onSave: () => void;
  onBack: () => void;
}) {
  const { body, showDiagram } = mockExplain(card.topic, card.level, card.style);
  const levelLabel = LEVELS.find((l) => l.id === card.level)?.label ?? "";

  return (
    <section className="flex min-h-[80dvh] flex-col">
      <button onClick={onBack} className="text-sm text-muted hover:text-ink">
        ← Back
      </button>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-3xl">{card.emoji}</span>
        <div>
          <h2 className="text-2xl font-bold leading-tight">{card.topic}</h2>
          <p className="text-xs text-muted">Explained like {levelLabel.toLowerCase()}</p>
        </div>
      </div>

      {showDiagram && (
        <div className="card mt-5 px-4 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand2">Diagram</p>
          <div className="flex items-center justify-between gap-2 text-center text-xs">
            <DiagramNode label="Start" />
            <Arrow />
            <DiagramNode label="The one rule" highlight />
            <Arrow />
            <DiagramNode label="Everything else" />
          </div>
        </div>
      )}

      <article className="prose mt-5 space-y-4 text-[15px] leading-relaxed text-ink/90">
        {body.split("\n\n").map((p, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: renderBold(p) }} />
        ))}
      </article>

      <div className="card mt-5 px-4 py-4">
        <p className="text-sm font-semibold">Want to go deeper?</p>
        <p className="mt-1 text-sm text-muted">
          Ask a follow-up, request an example, or say &quot;quiz me&quot;. (Live agent wires up to Sonnet
          next.)
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="chip">Give me an example</span>
          <span className="chip">Make it simpler</span>
          <span className="chip">Quiz me</span>
        </div>
      </div>

      <div className="mt-auto flex gap-3 pt-6">
        <button onClick={onBack} className="btn-ghost flex-1 py-4">
          Not now
        </button>
        <button onClick={onSave} className="btn-primary flex-1 py-4">
          Save to library · +15
        </button>
      </div>
    </section>
  );
}

function DiagramNode({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <div
      className={`flex-1 rounded-xl border px-2 py-4 font-medium ${
        highlight ? "border-brand bg-brand/15 text-ink" : "border-line bg-surface2 text-muted"
      }`}
    >
      {label}
    </div>
  );
}

function Arrow() {
  return <span className="text-muted">→</span>;
}

function renderBold(s: string) {
  return s.replace(/\*\*(.+?)\*\*/g, '<strong class="text-ink">$1</strong>');
}

/* ---------- Trivia ---------- */

function Trivia({ onDone, onBack }: { onDone: (earned: number) => void; onBack: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [earned, setEarned] = useState(0);
  const q = TRIVIA[i];
  const last = i === TRIVIA.length - 1;

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answerIndex) setEarned((e) => e + 10);
  }

  function nextQ() {
    if (last) {
      onDone(earned);
    } else {
      setI((x) => x + 1);
      setPicked(null);
    }
  }

  return (
    <section className="flex min-h-[80dvh] flex-col">
      <button onClick={onBack} className="text-sm text-muted hover:text-ink">
        ← Back
      </button>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Challenge · {i + 1}/{TRIVIA.length}
        </p>
        <p className="text-sm font-bold text-accent">+{earned} pts</p>
      </div>

      <h2 className="mt-4 text-xl font-bold leading-snug">{q.question}</h2>

      <div className="mt-5 flex flex-col gap-3">
        {q.options.map((opt, idx) => {
          const isAnswer = idx === q.answerIndex;
          const isPicked = idx === picked;
          let cls = "border-line hover:border-brand/60";
          if (picked !== null) {
            if (isAnswer) cls = "border-good bg-good/15";
            else if (isPicked) cls = "border-red-400 bg-red-400/10";
            else cls = "border-line opacity-60";
          }
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              className={`card px-4 py-4 text-left transition ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="card mt-5 px-4 py-4">
          <p className="text-sm font-semibold text-ink">
            {picked === q.answerIndex ? "✅ Correct!" : "❌ Not quite"}
          </p>
          <p className="mt-1 text-sm text-muted">{q.explanation}</p>
        </div>
      )}

      <button
        onClick={nextQ}
        disabled={picked === null}
        className="btn-primary mt-auto w-full py-4 disabled:opacity-40"
      >
        {last ? "Finish · collect points" : "Next question"}
      </button>
    </section>
  );
}
