import { Inbox, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

export function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: "rgba(232,84,32,0.08)",
          color: "hsl(var(--primary))",
          border: "1px solid color-mix(in oklab, hsl(var(--primary)) 25%, transparent)",
        }}
      >
        <Inbox size={24} strokeWidth={1.8} />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-1.5">
        {hasFilters ? "Ничего не найдено" : "Очередь пуста"}
      </h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        {hasFilters
          ? "Попробуйте изменить фильтры или поисковый запрос"
          : "Здесь появятся ваши задачи генерации"}
      </p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-[88px] lg:h-[84px] w-full rounded-2xl" />
      ))}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-red-500/10 border border-red-500/20">
        <Loader2 className="size-6 text-red-400" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-1.5">Не удалось загрузить очередь</h2>
      <p className="text-sm text-muted-foreground mb-5 max-w-sm">
        Проверьте соединение и попробуйте снова
      </p>
      <Button onClick={onRetry} variant="outline">
        Повторить
      </Button>
    </div>
  );
}
