// Types for the hardcoded learning content (languages, units, lessons).

export type LanguageCode = "es" | "fr" | "ja" | "ko" | "de" | "zh";

// CEFR levels: A1 is the beginner level.
export type CefrLevel = "A1" | "A2" | "B1" | "B2";

export type Language = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  // Greeting shown on the home screen, e.g. "Hola".
  greeting: string;
  flag: string;
  learners: string;
  // BCP 47 locale, used later for speech / Vision Agent audio lessons.
  speechLocale: string;
  // false = listed in the language picker, but has no lessons yet.
  hasContent: boolean;
};

export type Unit = {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  level: CefrLevel;
  order: number;
};

export type VocabularyItem = {
  id: string;
  term: string;
  translation: string;
  // Romanization for non-Latin scripts (e.g. Japanese romaji).
  pronunciation?: string;
};

export type Phrase = {
  id: string;
  text: string;
  translation: string;
  pronunciation?: string;
};

export type LessonType = "video" | "audio" | "chat" | "vocabulary";

export type MatchPair = {
  term: string;
  translation: string;
};

// Each activity has a `type`, so TypeScript can narrow by it.
export type Activity =
  | {
      id: string;
      type: "multiple-choice";
      prompt: string;
      options: string[];
      answer: string;
    }
  | {
      id: string;
      type: "translate";
      prompt: string;
      answer: string;
    }
  | {
      id: string;
      type: "match-pairs";
      prompt: string;
      pairs: MatchPair[];
    }
  | {
      id: string;
      type: "speak";
      prompt: string;
      // The text the learner should say out loud.
      targetText: string;
    };

// Instructions for the future audio-based Vision Agent AI teacher.
// These are sent from the backend only, never hardcoded in screens.
export type AITeacherPrompt = {
  teacherName: string;
  systemPrompt: string;
  openingMessage: string;
  successCriteria: string[];
};

export type Lesson = {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  type: LessonType;
  order: number;
  estimatedMinutes: number;
  xpReward: number;
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacher: AITeacherPrompt;
};
