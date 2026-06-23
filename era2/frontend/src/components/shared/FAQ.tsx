import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

const defaultItems: FAQItem[] = [
  { q: "Можно ли попробовать инструменты бесплатно?", a: "Да, при регистрации вы получаете бесплатные токены для тестирования всех доступных моделей." },
  { q: "По одной подписке доступно 90+ AI-инструментов?", a: "Верно. Одна подписка открывает доступ ко всем моделям для генерации текста, изображений, видео и аудио." },
  { q: "Что такое токены?", a: "Токены — это внутренняя валюта платформы. Каждая генерация расходует определённое количество токенов в зависимости от модели." },
  { q: "Сгорают ли токены, если подписка закончилась?", a: "Нет, неиспользованные токены сохраняются на вашем балансе и доступны после продления подписки." },
  { q: "Что делать, если токены закончились?", a: "Вы можете перейти на более высокий тариф или приобрести дополнительный пакет токенов." },
  { q: "Языковые модели используют токены?", a: "Да, каждый запрос к языковым моделям расходует токены. Стоимость зависит от конкретной модели." },
  { q: "Выходят ли языковые модели в интернет?", a: "Некоторые модели поддерживают поиск в интернете — это указано в описании каждой модели." },
  { q: "Где посмотреть, как пользоваться инструментами?", a: "В разделе «Обучение» вы найдёте туториалы, мастер-классы и подробную документацию." },
];

const toolPageItems: FAQItem[] = [
  { q: "Что имеется на платформе?", a: "ERA2.ai объединяет 90+ нейросетей для генерации текста, изображений, видео и аудио — всё доступно по одной подписке." },
  { q: "Можно ли пользоваться сервисом бесплатно?", a: "Да, при регистрации вы получаете бесплатные токены для тестирования всех доступных моделей." },
  { q: "Подходит ли сервис для коммерческих задач?", a: "Да, все сгенерированные материалы можно использовать в коммерческих проектах без ограничений." },
  { q: "Как пополнить баланс и оплатить подписку?", a: "Оплата доступна картой, через СБП и криптовалютой. Перейдите в раздел «Тарифы» для выбора плана." },
  { q: "Где хранится история и результаты генераций?", a: "Все ваши генерации сохраняются в разделе «История» и доступны для скачивания в любой момент." },
];

export { toolPageItems };

export function FAQ({ items, title = "Важные вопросы", subtitle }: FAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqItems = items ?? defaultItems;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-10">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {subtitle ?? "Если у вас возникли сложности, обратитесь в службу заботы"}
          </p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button border border-border text-sm font-medium hover:bg-muted transition-colors">
            ✈ Написать в поддержку
          </button>
        </div>

        <div className="divide-y divide-border">
          {faqItems.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left text-sm font-medium hover:text-primary transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 ml-4 text-muted-foreground transition-transform duration-200",
                    openIdx === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIdx === i ? "max-h-40 pb-4" : "max-h-0"
                )}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
