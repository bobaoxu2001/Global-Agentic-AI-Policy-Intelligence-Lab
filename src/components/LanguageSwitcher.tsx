'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_LANGUAGE,
  htmlLangFor,
  isLanguageCode,
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_STORAGE_KEY,
  LANGUAGES,
  type LanguageCode,
} from '@/lib/i18n/config';
import { LocalizedText } from '@/components/LocalizedText';

function currentLanguage(): LanguageCode {
  if (typeof document === 'undefined') return DEFAULT_LANGUAGE;
  const value = document.documentElement.dataset.locale;
  return isLanguageCode(value) ? value : DEFAULT_LANGUAGE;
}

function applyLanguageToDocument(language: LanguageCode) {
  document.documentElement.dataset.locale = language;
  document.documentElement.lang = htmlLangFor(language);
}

export function LanguageSwitcher() {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const sync = () => setLanguageState(currentLanguage());
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      const nextLanguage = isLanguageCode(event.newValue) ? event.newValue : DEFAULT_LANGUAGE;
      applyLanguageToDocument(nextLanguage);
      setLanguageState(nextLanguage);
    };
    sync();
    window.addEventListener(LANGUAGE_CHANGE_EVENT, sync);
    window.addEventListener('storage', syncStorage);
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, sync);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  function setLanguage(languageCode: LanguageCode) {
    applyLanguageToDocument(languageCode);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    } catch {
      // The selector still works for the current page if storage is unavailable.
    }
    setLanguageState(languageCode);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }

  return (
    <div className="language-switcher">
      <label htmlFor="site-language"><LocalizedText id="shell.languageLabel" fallback="Language" /></label>
      <select
        id="site-language"
        aria-label="Language / 语言 / Idioma"
        value={language}
        onChange={(event) => {
          const nextLanguage = event.currentTarget.value;
          if (isLanguageCode(nextLanguage)) setLanguage(nextLanguage);
        }}
      >
        {LANGUAGES.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
      </select>
    </div>
  );
}
