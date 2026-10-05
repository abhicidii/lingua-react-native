import type { Language, LanguageCode } from "@/types/learning";

// Order matches the language selection screen.
// Only languages with `hasContent: true` have lessons for now.
export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    greeting: "Hola",
    flag: "🇪🇸",
    learners: "28.4M",
    speechLocale: "es-ES",
    hasContent: true,
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    greeting: "Bonjour",
    flag: "🇫🇷",
    learners: "19.4M",
    speechLocale: "fr-FR",
    hasContent: true,
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    greeting: "こんにちは",
    flag: "🇯🇵",
    learners: "12.7M",
    speechLocale: "ja-JP",
    hasContent: true,
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    greeting: "안녕하세요",
    flag: "🇰🇷",
    learners: "9.3M",
    speechLocale: "ko-KR",
    hasContent: false,
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    greeting: "Hallo",
    flag: "🇩🇪",
    learners: "8.1M",
    speechLocale: "de-DE",
    hasContent: false,
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    greeting: "你好",
    flag: "🇨🇳",
    learners: "7.4M",
    speechLocale: "zh-CN",
    hasContent: false,
  },
];

export function getLanguage(code: LanguageCode): Language | undefined {
  return languages.find((language) => language.code === code);
}
