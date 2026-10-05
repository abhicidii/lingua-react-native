import type { Lesson } from "@/types/learning";

// Sample beginner lessons: Spanish (3), French (2), Japanese (2).
// To add a lesson: add an object here and point `unitId` to a unit in units.ts.
export const lessons: Lesson[] = [
  // ───────────── Spanish · Unit 1: Greetings ─────────────
  {
    id: "es-greetings-hello",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Say hello",
    description: "Learn the most common Spanish greetings.",
    type: "video",
    order: 1,
    estimatedMinutes: 5,
    xpReward: 10,
    goals: [
      "Greet someone in Spanish",
      "Say goodbye politely",
      "Use please and thank you",
    ],
    vocabulary: [
      { id: "es-hola", term: "hola", translation: "hello" },
      { id: "es-adios", term: "adiós", translation: "goodbye" },
      { id: "es-gracias", term: "gracias", translation: "thank you" },
      { id: "es-por-favor", term: "por favor", translation: "please" },
    ],
    phrases: [
      {
        id: "es-buenos-dias",
        text: "Buenos días",
        translation: "Good morning",
      },
      {
        id: "es-buenas-noches",
        text: "Buenas noches",
        translation: "Good night",
      },
    ],
    activities: [
      {
        id: "es-greetings-hello-1",
        type: "multiple-choice",
        prompt: 'What does "hola" mean?',
        options: ["hello", "goodbye", "please"],
        answer: "hello",
      },
      {
        id: "es-greetings-hello-2",
        type: "match-pairs",
        prompt: "Match the words",
        pairs: [
          { term: "adiós", translation: "goodbye" },
          { term: "gracias", translation: "thank you" },
          { term: "por favor", translation: "please" },
        ],
      },
      {
        id: "es-greetings-hello-3",
        type: "speak",
        prompt: "Say good morning",
        targetText: "Buenos días",
      },
    ],
    aiTeacher: {
      teacherName: "Sofía",
      systemPrompt:
        "You are Sofía, a warm and patient Spanish teacher for complete beginners. Speak mostly in simple Spanish and use short English hints only when the learner is stuck. Practice these words: hola, adiós, gracias, por favor, buenos días, buenas noches. Keep each reply under two sentences. Ask the learner to repeat one word or phrase at a time. If they make a mistake, repeat the correct form slowly and encourage them.",
      openingMessage: "¡Hola! Me llamo Sofía. Say hola to me!",
      successCriteria: [
        "Learner says hola and adiós correctly",
        "Learner says gracias and por favor in a sentence",
      ],
    },
  },
  {
    id: "es-greetings-introduce",
    unitId: "es-unit-1",
    languageCode: "es",
    title: "Introduce yourself",
    description: "Say your name and ask someone theirs.",
    type: "audio",
    order: 2,
    estimatedMinutes: 6,
    xpReward: 15,
    goals: [
      "Say your name in Spanish",
      "Ask someone their name",
      "Say nice to meet you",
    ],
    vocabulary: [
      { id: "es-me-llamo", term: "me llamo", translation: "my name is" },
      { id: "es-como", term: "cómo", translation: "how" },
      {
        id: "es-mucho-gusto",
        term: "mucho gusto",
        translation: "nice to meet you",
      },
    ],
    phrases: [
      {
        id: "es-como-te-llamas",
        text: "¿Cómo te llamas?",
        translation: "What is your name?",
      },
      {
        id: "es-me-llamo-alex",
        text: "Me llamo Alex.",
        translation: "My name is Alex.",
      },
    ],
    activities: [
      {
        id: "es-greetings-introduce-1",
        type: "translate",
        prompt: 'Translate: "My name is Alex."',
        answer: "Me llamo Alex",
      },
      {
        id: "es-greetings-introduce-2",
        type: "multiple-choice",
        prompt: 'What does "¿Cómo te llamas?" mean?',
        options: ["What is your name?", "How are you?", "Where are you from?"],
        answer: "What is your name?",
      },
      {
        id: "es-greetings-introduce-3",
        type: "speak",
        prompt: "Say: nice to meet you",
        targetText: "Mucho gusto",
      },
    ],
    aiTeacher: {
      teacherName: "Sofía",
      systemPrompt:
        "You are Sofía, a friendly Spanish teacher in a voice conversation with an A1 beginner. Goal: the learner introduces themselves. Use only these phrases: ¿Cómo te llamas?, Me llamo ..., Mucho gusto. Ask '¿Cómo te llamas?' and wait for the learner to answer with 'Me llamo ...'. Keep replies short. Correct mistakes gently by saying the right sentence once, then move on.",
      openingMessage: "¡Hola! ¿Cómo te llamas?",
      successCriteria: [
        "Learner answers with 'Me llamo ...'",
        "Learner says 'Mucho gusto'",
      ],
    },
  },

  // ───────────── Spanish · Unit 2: At the café ─────────────
  {
    id: "es-cafe-order",
    unitId: "es-unit-2",
    languageCode: "es",
    title: "Order a coffee",
    description: "Order a drink and ask for the bill.",
    type: "chat",
    order: 1,
    estimatedMinutes: 6,
    xpReward: 15,
    goals: [
      "Order a drink politely",
      "Ask how much something costs",
      "Ask for the bill",
    ],
    vocabulary: [
      { id: "es-cafe", term: "el café", translation: "coffee" },
      { id: "es-agua", term: "el agua", translation: "water" },
      { id: "es-quiero", term: "quiero", translation: "I want" },
      { id: "es-cuenta", term: "la cuenta", translation: "the bill" },
    ],
    phrases: [
      {
        id: "es-quiero-un-cafe",
        text: "Quiero un café, por favor.",
        translation: "I want a coffee, please.",
      },
      {
        id: "es-cuanto-cuesta",
        text: "¿Cuánto cuesta?",
        translation: "How much is it?",
      },
      {
        id: "es-la-cuenta",
        text: "La cuenta, por favor.",
        translation: "The bill, please.",
      },
    ],
    activities: [
      {
        id: "es-cafe-order-1",
        type: "match-pairs",
        prompt: "Match the words",
        pairs: [
          { term: "el café", translation: "coffee" },
          { term: "el agua", translation: "water" },
          { term: "la cuenta", translation: "the bill" },
        ],
      },
      {
        id: "es-cafe-order-2",
        type: "translate",
        prompt: 'Translate: "The bill, please."',
        answer: "La cuenta, por favor",
      },
      {
        id: "es-cafe-order-3",
        type: "speak",
        prompt: "Order a coffee",
        targetText: "Quiero un café, por favor",
      },
    ],
    aiTeacher: {
      teacherName: "Sofía",
      systemPrompt:
        "You are Sofía, a waiter at a small café in Madrid, and also a Spanish teacher for an A1 beginner. Role-play ordering: greet the customer, ask what they want, then bring the bill. Use simple Spanish and one short English hint if the learner is stuck. Target phrases: Quiero un café, por favor. ¿Cuánto cuesta? La cuenta, por favor. Stay in character, keep replies under two sentences, and praise correct sentences.",
      openingMessage: "¡Buenos días! ¿Qué quieres tomar?",
      successCriteria: [
        "Learner orders a drink with 'Quiero ..., por favor'",
        "Learner asks for the bill with 'La cuenta, por favor'",
      ],
    },
  },

  // ───────────── French · Unit 1: First steps ─────────────
  {
    id: "fr-first-steps-hello",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "Say hello",
    description: "Learn the most common French greetings.",
    type: "video",
    order: 1,
    estimatedMinutes: 5,
    xpReward: 10,
    goals: [
      "Greet someone in French",
      "Say goodbye politely",
      "Use please and thank you",
    ],
    vocabulary: [
      { id: "fr-bonjour", term: "bonjour", translation: "hello" },
      { id: "fr-au-revoir", term: "au revoir", translation: "goodbye" },
      { id: "fr-merci", term: "merci", translation: "thank you" },
      {
        id: "fr-sil-vous-plait",
        term: "s'il vous plaît",
        translation: "please",
      },
    ],
    phrases: [
      {
        id: "fr-je-mappelle-alex",
        text: "Je m'appelle Alex.",
        translation: "My name is Alex.",
      },
      {
        id: "fr-enchante",
        text: "Enchanté !",
        translation: "Nice to meet you!",
      },
    ],
    activities: [
      {
        id: "fr-first-steps-hello-1",
        type: "multiple-choice",
        prompt: 'What does "merci" mean?',
        options: ["thank you", "hello", "goodbye"],
        answer: "thank you",
      },
      {
        id: "fr-first-steps-hello-2",
        type: "match-pairs",
        prompt: "Match the words",
        pairs: [
          { term: "bonjour", translation: "hello" },
          { term: "au revoir", translation: "goodbye" },
          { term: "s'il vous plaît", translation: "please" },
        ],
      },
      {
        id: "fr-first-steps-hello-3",
        type: "speak",
        prompt: "Say: my name is Alex",
        targetText: "Je m'appelle Alex",
      },
    ],
    aiTeacher: {
      teacherName: "Camille",
      systemPrompt:
        "You are Camille, a cheerful French teacher for complete beginners. Speak slowly in simple French with short English hints when needed. Practice: bonjour, au revoir, merci, s'il vous plaît, Je m'appelle ..., Enchanté. Keep each reply under two sentences and ask the learner to repeat one phrase at a time. Correct mistakes gently by repeating the right pronunciation once.",
      openingMessage: "Bonjour ! Je m'appelle Camille. Et toi ?",
      successCriteria: [
        "Learner says bonjour and merci correctly",
        "Learner introduces themselves with 'Je m'appelle ...'",
      ],
    },
  },
  {
    id: "fr-first-steps-cafe",
    unitId: "fr-unit-1",
    languageCode: "fr",
    title: "At the café",
    description: "Order a drink and ask for the bill.",
    type: "audio",
    order: 2,
    estimatedMinutes: 6,
    xpReward: 15,
    goals: ["Order a drink politely", "Ask for the bill"],
    vocabulary: [
      { id: "fr-cafe", term: "un café", translation: "a coffee" },
      { id: "fr-eau", term: "de l'eau", translation: "water" },
      { id: "fr-pain", term: "le pain", translation: "bread" },
      { id: "fr-addition", term: "l'addition", translation: "the bill" },
    ],
    phrases: [
      {
        id: "fr-je-voudrais",
        text: "Je voudrais un café, s'il vous plaît.",
        translation: "I would like a coffee, please.",
      },
      {
        id: "fr-laddition",
        text: "L'addition, s'il vous plaît.",
        translation: "The bill, please.",
      },
    ],
    activities: [
      {
        id: "fr-first-steps-cafe-1",
        type: "multiple-choice",
        prompt: 'What does "l\'addition" mean?',
        options: ["the bill", "the menu", "the table"],
        answer: "the bill",
      },
      {
        id: "fr-first-steps-cafe-2",
        type: "translate",
        prompt: 'Translate: "I would like a coffee, please."',
        answer: "Je voudrais un café, s'il vous plaît",
      },
      {
        id: "fr-first-steps-cafe-3",
        type: "speak",
        prompt: "Ask for the bill",
        targetText: "L'addition, s'il vous plaît",
      },
    ],
    aiTeacher: {
      teacherName: "Camille",
      systemPrompt:
        "You are Camille, a waitress at a Paris café and a French teacher for an A1 beginner. Role-play: greet the customer, ask what they would like, then bring the bill. Use simple French with one short English hint if the learner is stuck. Target phrases: Je voudrais un café, s'il vous plaît. L'addition, s'il vous plaît. Stay in character, keep replies under two sentences, and praise correct sentences.",
      openingMessage: "Bonjour ! Qu'est-ce que vous désirez ?",
      successCriteria: [
        "Learner orders with 'Je voudrais ..., s'il vous plaît'",
        "Learner asks for the bill with 'L'addition, s'il vous plaît'",
      ],
    },
  },

  // ───────────── Japanese · Unit 1: First steps ─────────────
  {
    id: "ja-first-steps-hello",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Say hello",
    description: "Learn the most common Japanese greetings.",
    type: "video",
    order: 1,
    estimatedMinutes: 5,
    xpReward: 10,
    goals: [
      "Greet someone in Japanese",
      "Say thank you and goodbye",
      "Introduce yourself",
    ],
    vocabulary: [
      {
        id: "ja-konnichiwa",
        term: "こんにちは",
        translation: "hello",
        pronunciation: "konnichiwa",
      },
      {
        id: "ja-arigatou",
        term: "ありがとう",
        translation: "thank you",
        pronunciation: "arigatou",
      },
      {
        id: "ja-sayounara",
        term: "さようなら",
        translation: "goodbye",
        pronunciation: "sayounara",
      },
      { id: "ja-hai", term: "はい", translation: "yes", pronunciation: "hai" },
      { id: "ja-iie", term: "いいえ", translation: "no", pronunciation: "iie" },
    ],
    phrases: [
      {
        id: "ja-hajimemashite",
        text: "はじめまして",
        translation: "Nice to meet you",
        pronunciation: "hajimemashite",
      },
      {
        id: "ja-watashi-wa-alex",
        text: "わたしは アレックスです。",
        translation: "I am Alex.",
        pronunciation: "watashi wa arekkusu desu",
      },
    ],
    activities: [
      {
        id: "ja-first-steps-hello-1",
        type: "multiple-choice",
        prompt: 'What does "ありがとう" mean?',
        options: ["thank you", "hello", "goodbye"],
        answer: "thank you",
      },
      {
        id: "ja-first-steps-hello-2",
        type: "match-pairs",
        prompt: "Match the words",
        pairs: [
          { term: "こんにちは", translation: "hello" },
          { term: "はい", translation: "yes" },
          { term: "いいえ", translation: "no" },
        ],
      },
      {
        id: "ja-first-steps-hello-3",
        type: "speak",
        prompt: "Say: nice to meet you",
        targetText: "はじめまして",
      },
    ],
    aiTeacher: {
      teacherName: "Yuki",
      systemPrompt:
        "You are Yuki, a kind Japanese teacher for complete beginners. Speak slowly in simple Japanese and always give the romaji and a short English hint. Practice: こんにちは, ありがとう, さようなら, はじめまして. Keep each reply under two sentences. Ask the learner to repeat one word at a time and correct pronunciation gently.",
      openingMessage: "こんにちは！ (konnichiwa) Can you say hello back?",
      successCriteria: [
        "Learner says こんにちは and ありがとう clearly",
        "Learner says はじめまして when introduced",
      ],
    },
  },
  {
    id: "ja-first-steps-order",
    unitId: "ja-unit-1",
    languageCode: "ja",
    title: "Order a drink",
    description: "Ask for water or tea and ask the price.",
    type: "chat",
    order: 2,
    estimatedMinutes: 6,
    xpReward: 15,
    goals: ["Ask for a drink politely", "Ask how much something costs"],
    vocabulary: [
      {
        id: "ja-mizu",
        term: "みず",
        translation: "water",
        pronunciation: "mizu",
      },
      {
        id: "ja-ocha",
        term: "おちゃ",
        translation: "tea",
        pronunciation: "ocha",
      },
      {
        id: "ja-kudasai",
        term: "ください",
        translation: "please give me",
        pronunciation: "kudasai",
      },
    ],
    phrases: [
      {
        id: "ja-ocha-o-kudasai",
        text: "おちゃを ください。",
        translation: "Tea, please.",
        pronunciation: "ocha o kudasai",
      },
      {
        id: "ja-ikura-desu-ka",
        text: "いくらですか。",
        translation: "How much is it?",
        pronunciation: "ikura desu ka",
      },
    ],
    activities: [
      {
        id: "ja-first-steps-order-1",
        type: "match-pairs",
        prompt: "Match the words",
        pairs: [
          { term: "みず", translation: "water" },
          { term: "おちゃ", translation: "tea" },
          { term: "ください", translation: "please give me" },
        ],
      },
      {
        id: "ja-first-steps-order-2",
        type: "multiple-choice",
        prompt: 'What does "いくらですか" mean?',
        options: ["How much is it?", "Where is it?", "What is it?"],
        answer: "How much is it?",
      },
      {
        id: "ja-first-steps-order-3",
        type: "speak",
        prompt: "Ask for tea",
        targetText: "おちゃを ください",
      },
    ],
    aiTeacher: {
      teacherName: "Yuki",
      systemPrompt:
        "You are Yuki, a staff member at a small Japanese tea shop and a Japanese teacher for an A1 beginner. Role-play: welcome the customer, ask what they want, then tell them a price. Use simple Japanese, always add romaji and a short English hint. Target phrases: おちゃを ください, いくらですか. Stay in character, keep replies under two sentences, and praise correct sentences.",
      openingMessage:
        "いらっしゃいませ！ (irasshaimase) Welcome! What would you like?",
      successCriteria: [
        "Learner asks for a drink with 'を ください'",
        "Learner asks the price with 'いくらですか'",
      ],
    },
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}
