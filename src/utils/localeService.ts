export type LocaleSettings = {
  locale: string; // format: <language>-<country> e.g. en-US, es-ES
  languageCode: string; // format: <language> e.g. en, es
};

export abstract class LocaleService {
  static languagePreferenceStorage = "langPreference";

  static determineLanguagePreference(params: {
    supportedLocales: string[];
    fallbackLocale: string;
  }): {
    all: string[];
    locale: string; // format: <language>, <language>-<country> e.g. en, en-US
    code: string; // <language> e.g. en
    match: "exact" | "partial" | "fallback";
  } {
    const { supportedLocales: supportedLanguages, fallbackLocale } = params;
    const browserLanguages = navigator.languages ?? [navigator.language];

    for (const locale of browserLanguages) {
      const code = locale.split("-")[0].toLowerCase();

      // Buscar coincidencia exacta primero
      if (supportedLanguages.includes(locale.toLowerCase())) {
        return { all: [...browserLanguages], locale, code, match: "exact" };
      }

      // Buscar por código de idioma
      if (supportedLanguages.includes(code)) {
        return {
          all: [...browserLanguages],
          locale: code,
          code,
          match: "partial",
        };
      }
    }

    return {
      locale: fallbackLocale,
      all: [fallbackLocale],
      code: fallbackLocale,
      match: "fallback",
    };
  }

  static getLanguageSettings(): LocaleSettings | null {
    try {
      const parsedConfig: unknown = JSON.parse(
        localStorage.getItem(LocaleService.languagePreferenceStorage) ?? "null",
      );

      if (
        parsedConfig &&
        typeof parsedConfig === "object" &&
        "locale" in parsedConfig &&
        typeof parsedConfig.locale === "string" &&
        "code" in parsedConfig &&
        typeof parsedConfig.code === "string"
      ) {
        return {
          locale: parsedConfig.locale,
          languageCode: parsedConfig.code,
        };
      }

      window.localStorage.removeItem(LocaleService.languagePreferenceStorage);
      return null;
    } catch {
      window.localStorage.removeItem(LocaleService.languagePreferenceStorage);
      return null;
    }
  }

  static saveLocaleSettings(settings: LocaleSettings) {
    window.localStorage.removeItem(LocaleService.languagePreferenceStorage);

    window.localStorage.setItem(
      LocaleService.languagePreferenceStorage,
      JSON.stringify(settings),
    );
  }

  static extractLanguageCodeFromLocale(locale: string): string {
    return locale.split("-")[0].toLowerCase();
  }

  static findLocaleMatch(params: {
    locale: string;
    supportedLocales: string[];
  }): {
    match: "exact" | "partial" | "none";
    matcher: string;
  } {
    const localeCode = LocaleService.extractLanguageCodeFromLocale(
      params.locale,
    );

    for (const supportedLang of params.supportedLocales) {
      if (supportedLang === params.locale) {
        return {
          match: "exact",
          matcher: supportedLang,
        };
      }

      if (supportedLang === localeCode) {
        return {
          match: "partial",
          matcher: supportedLang,
        };
      }

      if (
        LocaleService.extractLanguageCodeFromLocale(supportedLang) ===
        localeCode
      ) {
        return {
          match: "partial",
          matcher: supportedLang,
        };
      }
    }

    return {
      match: "none",
      matcher: "",
    };
  }

  static getRedirectLocale(params: {
    supportedLocales: string[];
    defaultLocale: string;
  }): string {
    const { supportedLocales, defaultLocale } = params;

    const languageSettings = LocaleService.getLanguageSettings();

    if (!languageSettings) {
      const languagePreference = LocaleService.determineLanguagePreference({
        fallbackLocale: defaultLocale,
        supportedLocales: supportedLocales,
      });

      LocaleService.saveLocaleSettings({
        languageCode: languagePreference.code,
        locale: languagePreference.locale,
      });

      return languagePreference.locale;
    }

    const { locale } = languageSettings;

    const isValidLocale = LocaleService.findLocaleMatch({
      locale,
      supportedLocales: supportedLocales,
    });

    if (isValidLocale.match === "exact") {
      return isValidLocale.matcher;
    }

    if (isValidLocale.match === "partial") {
      return isValidLocale.matcher;
    }

    return defaultLocale;
  }
}
