import { translations } from '../../i18n/translations';
import { useTodoStore } from '../../stores/useTodoStore';

export default function LanguageSelector() {
  const language = useTodoStore((state) => state.language);
  const setLanguage = useTodoStore((state) => state.setLanguage);
  const messages = translations[language].language;

  return (
    <label className="language-selector">
      <span>{messages.label}</span>
      <select
        aria-label={messages.label}
        value={language}
        onChange={(event) => setLanguage(event.currentTarget.value as typeof language)}
      >
        <option value="pt-BR">{messages.portuguese}</option>
        <option value="en-US">{messages.english}</option>
      </select>
    </label>
  );
}