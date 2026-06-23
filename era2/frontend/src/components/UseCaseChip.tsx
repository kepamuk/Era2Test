import type { UseCase } from "@/config/useCases";

interface Props {
  useCase: UseCase;
  onClick: (prompt: string) => void;
}

export function UseCaseChip({ useCase, onClick }: Props) {
  const { Icon, label, prompt } = useCase;
  return (
    <button
      type="button"
      onClick={() => onClick(prompt)}
      className="inline-flex items-center gap-2 h-9 px-4 bg-secondary border border-border rounded-full text-sm text-foreground hover:bg-card hover:border-primary/30 transition-all cursor-pointer group"
    >
      <Icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
      <span>{label}</span>
    </button>
  );
}
