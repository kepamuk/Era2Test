import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Chip } from "@/shared/ui/era";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { cn } from "@/shared/lib/utils";
import type { SortOption, StatusFilter, TypeFilter } from "../model/queueReducer";

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "queued", label: "В очереди" },
  { value: "running", label: "Идёт" },
  { value: "done", label: "Готово" },
  { value: "failed", label: "Ошибка" },
];

const TYPE_FILTERS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "Все типы" },
  { value: "text", label: "Текст" },
  { value: "image", label: "Изображение" },
  { value: "video", label: "Видео" },
  { value: "audio", label: "Аудио" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Сначала новые" },
  { value: "oldest", label: "Сначала старые" },
  { value: "status", label: "По статусу" },
  { value: "progress", label: "По прогрессу" },
];

const CHIP_BASE =
  "h-[34px] px-[14px] shrink-0 transition-[background-color,border-color,color] duration-150 ease-out";
const CHIP_ACTIVE =
  "bg-primary border-primary text-white hover:text-white hover:border-primary";
const CHIP_INACTIVE =
  "bg-secondary border-border text-[var(--c-fg-dim)] hover:text-foreground hover:border-border";

const SELECT_TRIGGER_CLASS =
  "h-[34px] w-auto min-w-0 rounded-full border-border bg-secondary pl-[14px] pr-3 text-[13px] font-normal text-[var(--c-fg-dim)] shadow-none gap-1.5 [&>svg]:hidden";

const SEARCH_INPUT_CLASS =
  "h-[34px] pl-9 rounded-full bg-secondary border-border text-[13px] text-[var(--c-fg-dim)] placeholder:text-[var(--c-fg-mute)] shadow-none focus-visible:ring-0 focus-visible:border-primary/40";

interface QueueSortSelectProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

function QueueSortSelect({ sort, onSortChange }: QueueSortSelectProps) {
  return (
    <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
      <SelectTrigger className={SELECT_TRIGGER_CLASS}>
        <SelectValue />
        <span className="text-[11px] text-[var(--c-fg-mute)] leading-none" aria-hidden>
          ▾
        </span>
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={6}
        collisionPadding={16}
        className="z-[200] rounded-lg border-border bg-card shadow-lg min-w-[var(--radix-select-trigger-width)]"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <SelectItem key={value} value={value} className="text-[13px] rounded-lg py-2">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface QueueToolbarProps {
  filter: StatusFilter;
  typeFilter: TypeFilter;
  sort: SortOption;
  search: string;
  onFilterChange: (filter: StatusFilter) => void;
  onTypeFilterChange: (typeFilter: TypeFilter) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
}

export function QueueToolbar({
  filter,
  typeFilter,
  sort,
  search,
  onFilterChange,
  onTypeFilterChange,
  onSortChange,
  onSearchChange,
}: QueueToolbarProps) {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onSearchChange(localSearch);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange, search]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5 -mx-1 px-1 md:mx-0 md:px-0 md:flex-1 md:min-w-0">
          {STATUS_FILTERS.map(({ value, label }) => (
            <Chip
              key={value}
              active={filter === value}
              onClick={() => onFilterChange(value)}
              className={cn(
                CHIP_BASE,
                filter === value ? CHIP_ACTIVE : CHIP_INACTIVE,
              )}
            >
              {label}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 md:shrink-0 lg:ml-auto">
          <QueueSortSelect sort={sort} onSortChange={onSortChange} />

          <div className="relative flex-1 min-w-[140px] lg:w-[200px] lg:flex-none">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-[var(--c-fg-mute)] pointer-events-none" />
            <Input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Поиск по промпту"
              className={SEARCH_INPUT_CLASS}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5 -mx-1 px-1 md:mx-0 md:px-0">
        {TYPE_FILTERS.map(({ value, label }) => (
          <Chip
            key={value}
            active={typeFilter === value}
            onClick={() => onTypeFilterChange(value)}
            className={cn(
              CHIP_BASE,
              typeFilter === value ? CHIP_ACTIVE : CHIP_INACTIVE,
            )}
          >
            {label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
