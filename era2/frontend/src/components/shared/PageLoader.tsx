import { Skeleton } from "@/shared/ui/skeleton";

export function PageLoader() {
  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,64px))]">
      <div className="flex justify-center py-3">
        <Skeleton className="h-9 w-[280px] rounded-full" />
      </div>
      <div className="flex-1 px-4 lg:px-8 py-6 space-y-4 max-w-[780px] mx-auto w-full">
        <Skeleton className="h-10 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-1/3 mx-auto" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-[14px]" />
          ))}
        </div>
      </div>
      <div className="shrink-0 px-4 lg:px-8 pb-5 pt-2">
        <div className="max-w-[780px] mx-auto space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-32 w-full rounded-[22px]" />
        </div>
      </div>
    </div>
  );
}
