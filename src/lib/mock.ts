import { EducationLevel, LearningCard, LearningStyle, TriviaQuestion } from "./types";

export const SEED_LIBRARY: LearningCard[] = [
  {
    id: "c1",
    topic: "Why the sky is blue",
    emoji: "🌤️",
    level: "high-school",
    style: "both",
    summary:
      "Sunlight is white light made of many colors. Air scatters short blue wavelengths more than red — so blue reaches your eyes from all directions.",
    createdAt: "Yesterday",
    mastered: true,
  },
  {
    id: "c2",
    topic: "Compound interest",
    emoji: "💸",
    level: "undergrad",
    style: "writing",
    summary:
      "Interest earns interest. Money grows exponentially, not linearly — small rates over long time horizons beat large one-time gains.",
    createdAt: "2 days ago",
    mastered: false,
  },
  {
    id: "c3",
    topic: "How neural networks learn",
    emoji: "🧠",
    level: "undergrad",
    style: "diagrams",
    summary:
      "Weighted connections adjust via backpropagation, nudging each weight to reduce error. Repeat over millions of examples and patterns emerge.",
    createdAt: "Last week",
    mastered: false,
  },
];

const SUGGESTED_BY_INTEREST: Record<string, string[]> = {
  Space: ["What is a black hole?", "Why does the Moon have phases?", "How rockets reach orbit"],
  History: ["Why Rome fell", "What started WWI", "The printing press revolution"],
  "Money & investing": ["What is an index fund?", "How inflation works", "Risk vs. reward"],
  "AI & tech": ["What is a transformer model?", "How does encryption work?", "Why GPUs train AI"],
  Biology: ["How DNA copies itself", "Why we sleep", "How vaccines work"],
  Psychology: ["What is cognitive bias?", "Why habits form", "The science of memory"],
  "Art & design": ["The golden ratio", "Why color theory works", "Typography basics"],
  Music: ["Why chords sound happy or sad", "What is rhythm, really?", "How autotune works"],
  Cooking: ["The Maillard reaction", "Why we rest meat", "How fermentation works"],
  Philosophy: ["The trolley problem", "What is free will?", "Stoicism in 5 minutes"],
  Climate: ["The greenhouse effect", "Why oceans rise", "How carbon cycles"],
  "Sports science": ["What is VO2 max?", "Why muscles grow", "The science of stretching"],
  Languages: ["Why grammar exists", "How kids learn to speak", "What makes a language hard"],
  Math: ["Why is e everywhere?", "What is infinity?", "How probability fools us"],
};

export function suggestions(interests: string[]): string[] {
  const picks: string[] = [];
  for (const i of interests) {
    const list = SUGGESTED_BY_INTEREST[i];
    if (list) picks.push(...list);
  }
  if (picks.length === 0) {
    picks.push("What is a black hole?", "How does encryption work?", "Why we sleep");
  }
  return picks.slice(0, 6);
}

function emojiFor(topic: string): string {
  const t = topic.toLowerCase();
  if (/(space|moon|rocket|orbit|black hole|star|planet)/.test(t)) return "🚀";
  if (/(money|interest|invest|inflation|index|fund|risk)/.test(t)) return "💸";
  if (/(ai|neural|model|transformer|gpu|encrypt|comput)/.test(t)) return "🤖";
  if (/(dna|cell|sleep|vaccine|muscle|biolog|brain|neuro)/.test(t)) return "🧬";
  if (/(history|rome|war|press|ancient)/.test(t)) return "🏛️";
  if (/(music|chord|rhythm|sound)/.test(t)) return "🎵";
  if (/(cook|meat|ferment|maillard|food)/.test(t)) return "🍳";
  if (/(climate|carbon|ocean|greenhouse)/.test(t)) return "🌍";
  if (/(math|infinity|probability|number)/.test(t)) return "🔢";
  return "💡";
}

// Mocked "explanation" — stands in for the Sonnet call we'll wire up later.
export function mockExplain(
  topic: string,
  level: EducationLevel,
  style: LearningStyle
): { summary: string; body: string; showDiagram: boolean } {
  const levelTone: Record<EducationLevel, string> = {
    "curious-kid": "Imagine this like a story:",
    teen: "Okay, real talk —",
    "high-school": "Here's the core idea:",
    undergrad: "At a conceptual level:",
    expert: "Precisely:",
  };
  const tone = levelTone[level];
  const summary = `${tone} ${topic} comes down to one simple mechanism that, once you see it, explains everything else.`;
  const body = [
    `${tone} **${topic}** is easier than it looks once you find the one moving part that does the real work.`,
    `Start with what you already know, then notice the single rule that everything else follows from. The rest is just consequences of that rule playing out at different scales.`,
    `Try explaining it back in one sentence — if you can, you've got it. If you stumble, that's exactly the spot to dig into next.`,
  ].join("\n\n");
  return { summary, body, showDiagram: style !== "writing" };
}

export function makeCard(
  topic: string,
  level: EducationLevel,
  style: LearningStyle,
  summary: string
): LearningCard {
  return {
    id: `c_${topic.length}_${topic.charCodeAt(0)}_${level}`,
    topic,
    emoji: emojiFor(topic),
    level,
    style,
    summary,
    createdAt: "Just now",
    mastered: false,
  };
}

export const TRIVIA: TriviaQuestion[] = [
  {
    id: "t1",
    topic: "Space",
    question: "Why does the Sun appear yellow from Earth?",
    options: [
      "It burns yellow fuel",
      "Our atmosphere scatters blue light away",
      "It is cooler than other stars",
      "Yellow travels fastest through space",
    ],
    answerIndex: 1,
    explanation:
      "The Sun emits near-white light. Earth's atmosphere scatters shorter blue wavelengths, leaving the disc looking yellow-ish.",
  },
  {
    id: "t2",
    topic: "Money",
    question: "Money doubling yearly at a fixed rate is an example of…",
    options: ["Linear growth", "Exponential growth", "Logarithmic decay", "Random walk"],
    answerIndex: 1,
    explanation: "A constant percentage applied repeatedly compounds — the hallmark of exponential growth.",
  },
  {
    id: "t3",
    topic: "Biology",
    question: "What is the main job of mitochondria?",
    options: ["Store DNA", "Produce energy (ATP)", "Fight infection", "Send nerve signals"],
    answerIndex: 1,
    explanation: "Mitochondria convert nutrients into ATP, the cell's usable energy currency.",
  },
];
