export type EducationLevel =
  | "curious-kid"
  | "teen"
  | "high-school"
  | "undergrad"
  | "expert";

export type LearningStyle = "diagrams" | "writing" | "both";

export interface Profile {
  name: string;
  level: EducationLevel;
  style: LearningStyle;
  interests: string[];
}

export interface LearningCard {
  id: string;
  topic: string;
  emoji: string;
  level: EducationLevel;
  style: LearningStyle;
  summary: string;
  createdAt: string; // ISO-ish label for the prototype
  mastered: boolean;
}

export interface TriviaQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const LEVELS: { id: EducationLevel; label: string; blurb: string }[] = [
  { id: "curious-kid", label: "A curious kid", blurb: "Simple words, fun analogies" },
  { id: "teen", label: "A teenager", blurb: "Relatable, no jargon" },
  { id: "high-school", label: "A high-schooler", blurb: "Clear, with some depth" },
  { id: "undergrad", label: "A college student", blurb: "Rigorous but accessible" },
  { id: "expert", label: "An expert", blurb: "Dense, technical, fast" },
];

export const STYLES: { id: LearningStyle; label: string; icon: string }[] = [
  { id: "diagrams", label: "Diagrams", icon: "▦" },
  { id: "writing", label: "Writing", icon: "✍" },
  { id: "both", label: "Both", icon: "✦" },
];

export const INTERESTS = [
  "Space", "History", "Money & investing", "AI & tech", "Biology",
  "Psychology", "Art & design", "Music", "Cooking", "Philosophy",
  "Climate", "Sports science", "Languages", "Math",
];
