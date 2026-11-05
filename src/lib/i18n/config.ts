export const LANGUAGE_CODES = ['en', 'zh', 'es', 'pt'] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';
export const LANGUAGE_STORAGE_KEY = 'ai-policy-atlas-language';
export const LANGUAGE_CHANGE_EVENT = 'ai-policy-atlas:language-change';

export const LANGUAGES = [
  { code: 'en', htmlLang: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'zh', htmlLang: 'zh-CN', label: '简体中文', shortLabel: '中文' },
  { code: 'es', htmlLang: 'es', label: 'Español', shortLabel: 'ES' },
  { code: 'pt', htmlLang: 'pt', label: 'Português', shortLabel: 'PT' },
] as const satisfies readonly { code: LanguageCode; htmlLang: string; label: string; shortLabel: string }[];

export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === 'string' && LANGUAGE_CODES.includes(value as LanguageCode);
}

export function htmlLangFor(code: LanguageCode) {
  return LANGUAGES.find((language) => language.code === code)?.htmlLang ?? 'en';
}

export function languageBootstrapScript() {
  const valid = JSON.stringify(LANGUAGE_CODES);
  const htmlLanguages = JSON.stringify(Object.fromEntries(LANGUAGES.map((language) => [language.code, language.htmlLang])));
  return `(function(){try{var valid=${valid};var html=${htmlLanguages};var saved=window.localStorage.getItem('${LANGUAGE_STORAGE_KEY}');var language=valid.indexOf(saved)>-1?saved:'${DEFAULT_LANGUAGE}';document.documentElement.dataset.locale=language;document.documentElement.lang=html[language]||'en';}catch(_error){document.documentElement.dataset.locale='${DEFAULT_LANGUAGE}';document.documentElement.lang='en';}})();`;
}
