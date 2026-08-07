import { LANGUAGE_CODES, type LanguageCode } from '@/lib/i18n/config';
import { translatedText } from '@/lib/i18n/translations';

type LocalizedTextProps = {
  id: string;
  fallback: string;
  values?: Record<string, string | number>;
};

function interpolate(value: string, values?: Record<string, string | number>) {
  if (!values) return value;
  return Object.entries(values).reduce((result, [key, replacement]) => result.replaceAll(`{${key}}`, String(replacement)), value);
}

export function LocalizedText({ id, fallback, values }: LocalizedTextProps) {
  return (
    <>
      {LANGUAGE_CODES.map((language) => (
        <span className="localized-copy" data-i18n-lang={language} key={language} lang={language === 'zh' ? 'zh-CN' : language}>
          {interpolate(translatedText(language as LanguageCode, id, fallback), values)}
        </span>
      ))}
    </>
  );
}
