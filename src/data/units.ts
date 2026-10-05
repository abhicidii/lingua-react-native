import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-unit-1",
    languageCode: "es",
    title: "Greetings",
    description: "Say hello and introduce yourself.",
    level: "A1",
    order: 1,
  },
  {
    id: "es-unit-2",
    languageCode: "es",
    title: "At the café",
    description: "Order a drink and ask for the bill.",
    level: "A1",
    order: 2,
  },
  // French
  {
    id: "fr-unit-1",
    languageCode: "fr",
    title: "First steps",
    description: "Greet people and order at a café.",
    level: "A1",
    order: 1,
  },
  // Japanese
  {
    id: "ja-unit-1",
    languageCode: "ja",
    title: "First steps",
    description: "Greet people and order something simple.",
    level: "A1",
    order: 1,
  },
];

export function getUnitsByLanguage(languageCode: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageCode === languageCode)
    .sort((a, b) => a.order - b.order);
}

export function getUnit(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
