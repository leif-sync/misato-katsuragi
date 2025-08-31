import englishDictionary from "@/locales/en.json";
import spanishDictionary from "@/locales/es.json";

export const ValidLocales = ["en", "es"] as const;
export const DefaultLocale = "en";
export type ValidLocales = (typeof ValidLocales)[number];

export const LocaleToLanguageName: Record<ValidLocales, string> = {
  en: "English",
  es: "Español",
};

export type Dictionary = typeof englishDictionary;

export const multilingualDictionary: Record<ValidLocales, Dictionary> = {
  en: englishDictionary,
  es: spanishDictionary,
} as const;

export function getDictionary(params: { locale: ValidLocales }): Dictionary {
  return multilingualDictionary[params.locale];
}

export function checkLocaleValidity(locale: string): locale is ValidLocales {
  return ValidLocales.includes(locale as ValidLocales);
}
