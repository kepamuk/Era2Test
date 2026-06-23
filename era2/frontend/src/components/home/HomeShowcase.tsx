import { Eyebrow } from "@/shared/ui/era";
import { ModelCard } from "@/components/ModelCard";
import { UseCaseChip } from "@/components/UseCaseChip";
import { searchableModels, type SearchableModelType } from "@/config/searchableModels";
import { useCases } from "@/config/useCases";

const eyebrowLabel: Record<SearchableModelType, string> = {
  text: "● ТЕКСТОВЫЕ МОДЕЛИ",
  image: "● МОДЕЛИ ИЗОБРАЖЕНИЙ",
  video: "● ВИДЕО-МОДЕЛИ",
  audio: "● АУДИО-МОДЕЛИ",
};

interface Props {
  type: SearchableModelType;
  onPickPrompt: (prompt: string) => void;
}

export function HomeShowcase({ type, onPickPrompt }: Props) {
  const models = searchableModels.filter((m) => m.type === type);
  const cases = useCases[type] ?? [];

  return (
    <>
      {/* ─── Models carousel ─── */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <Eyebrow>{eyebrowLabel[type]}</Eyebrow>
        <h2 className="text-2xl font-semibold tracking-tight mt-3 mb-6 text-foreground">
          Выберите движок генерации
        </h2>
        <div
          className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 snap-x"
          style={{ scrollbarWidth: "none" }}
        >
          {models.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </section>

      {/* ─── Use cases ─── */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <Eyebrow>● ИДЕИ ДЛЯ СТАРТА</Eyebrow>
        <h2 className="text-2xl font-semibold tracking-tight mt-3 mb-6 text-foreground">
          С чего начать?
        </h2>
        <div className="flex flex-wrap gap-2">
          {cases.map((uc) => (
            <UseCaseChip key={uc.label} useCase={uc} onClick={onPickPrompt} />
          ))}
        </div>
      </section>
    </>
  );
}
