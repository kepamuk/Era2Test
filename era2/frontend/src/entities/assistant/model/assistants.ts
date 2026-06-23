export interface Assistant {
  id: string;
  name: string;
  description: string;
  emoji: string; // legacy field (no longer rendered) — kept for backward compat
  bgColor: string;
  isNew?: boolean;
}

// ERA2: эмодзи и rainbow bg-* убраны. Карточки агентов теперь рендерят lucide-иконки
// в единой огненно-rust палитре (см. TextAssistantsSection / TextPage).
export const assistants: Assistant[] = [
  { id: "headlines", name: "Заголовки", description: "Создаёт заголовки к тексту", emoji: "", bgColor: "" },
  { id: "referater", name: "Рефератер", description: "Помогает делать рефераты", emoji: "", bgColor: "" },
  { id: "marketer", name: "Маркетолог", description: "Знает всё про идеи", emoji: "", bgColor: "" },
  { id: "copywriter", name: "Копирайтер", description: "Пишет тексты с учётом SEO", emoji: "", bgColor: "" },
  { id: "music-prompt", name: "MUSIC_Prompt", description: "Помощник по написанию песен SUNO", emoji: "", bgColor: "" },
  { id: "lang-teacher", name: "Language teacher", description: "Преподаватель иностранного языка", emoji: "", bgColor: "" },
  { id: "resume", name: "Резюме", description: "Даёт советы по вашему резюме", emoji: "", bgColor: "" },
  { id: "screenwriter", name: "Сценарист", description: "Придумывает идеи и сценарии", emoji: "", bgColor: "" },
  { id: "sun-tzu", name: "Сунь Цзы", description: "Мудрость древнего стратега", emoji: "", bgColor: "" },
];
