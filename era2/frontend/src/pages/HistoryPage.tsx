import { useEffect, useMemo, useState } from "react";
import { Inbox } from "lucide-react";
import { HistoryFilters, type HistoryFilter } from "@/components/history/HistoryFilters";
import { HistoryCard } from "@/components/history/HistoryCard";
import { HistoryDetailDialog } from "@/components/history/HistoryDetailDialog";
import { getHistoryItems, type HistoryItem } from "@/entities/history";

function pluralizeGenerations(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "генерация";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "генерации";
  return "генераций";
}

const HistoryPage = () => {
  useEffect(() => {
    document.title = "ERA2 — История";
  }, []);

  const [filter, setFilter] = useState<HistoryFilter>("all");
  const [selected, setSelected] = useState<HistoryItem | null>(null);
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    let isActive = true;

    getHistoryItems().then((historyItems) => {
      if (isActive) setItems(historyItems);
    });

    return () => {
      isActive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "favorites") return items.filter((i) => i.favorite);
    return items.filter((i) => i.type === filter);
  }, [items, filter]);

  const counts = useMemo<Partial<Record<HistoryFilter, number>>>(
    () => ({
      all: items.length,
      text: items.filter((i) => i.type === "text").length,
      image: items.filter((i) => i.type === "image").length,
      video: items.filter((i) => i.type === "video").length,
      audio: items.filter((i) => i.type === "audio").length,
      favorites: items.filter((i) => i.favorite).length,
    }),
    [items],
  );

  const toggleFavorite = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i)));
  };

  return (
    <div className="min-h-[calc(100vh-var(--header-height,64px))]">
      <div className="max-w-[1200px] mx-auto px-4 pt-6 pb-4">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">История</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {filtered.length} {pluralizeGenerations(filtered.length)}
        </p>
      </div>

      <HistoryFilters value={filter} onChange={setFilter} counts={counts} />

      <div className="max-w-[1200px] mx-auto px-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24">
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
            <h2 className="text-xl font-semibold text-foreground mb-1.5">Здесь пока пусто</h2>
            <p className="text-sm text-muted-foreground">
              {filter === "favorites"
                ? "Вы ещё не отметили ничего избранным"
                : "Попробуйте сменить фильтр"}
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 mt-4 pb-12">
            {filtered.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                onClick={() => setSelected(item)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      <HistoryDetailDialog
        item={selected}
        open={selected !== null}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </div>
  );
};

export default HistoryPage;
