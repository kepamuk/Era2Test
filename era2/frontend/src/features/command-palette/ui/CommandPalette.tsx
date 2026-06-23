import { useNavigate } from "@/shared/routing";
// no extra icons needed
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { StatusBadge } from "@/shared/ui/era/StatusBadge";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";
import { useCommandPalette } from "@/features/command-palette";
import { searchableModels, modelTypeToRoute, type SearchableModelType } from "@/config/searchableModels";

const TYPE_LABEL: Record<SearchableModelType, string> = {
  text: "Текст",
  image: "Изображения",
  video: "Видео",
  audio: "Аудио",
};

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const navigate = useNavigate();

  const handleSelect = (id: string, type: SearchableModelType) => {
    setOpen(false);
    navigate({ to: modelTypeToRoute[type], search: { model: id } as never });
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Найти модель или сервис..." />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>Ничего не найдено.</CommandEmpty>
        <CommandGroup heading="Модели">
          {searchableModels.map((m) => (
            <CommandItem
              key={m.id}
              value={`${m.name} ${m.provider} ${m.type}`}
              onSelect={() => handleSelect(m.id, m.type)}
              className="h-14 px-3 gap-3 cursor-pointer data-[selected=true]:bg-secondary"
            >
              <ModelGlyph name={m.name} size={32} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground truncate">{m.name}</span>
                  {m.isNew && <StatusBadge variant="new" />}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {m.provider} · {TYPE_LABEL[m.type]}
                </div>
              </div>
              <span className="font-mono tabular-nums text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5 shrink-0">
                {m.credits} cr
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <div className="border-t border-border px-3 py-2 flex items-center gap-3 text-[11px] text-muted-foreground font-mono">
        <span>↑↓ навигация</span>
        <span>↵ выбрать</span>
        <span>esc закрыть</span>
      </div>
    </CommandDialog>
  );
}
