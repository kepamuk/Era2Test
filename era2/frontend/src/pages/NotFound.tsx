import { Link } from "@/shared/routing";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-3 text-2xl font-semibold text-foreground">Страница не найдена</p>
        <p className="mb-8 text-muted-foreground">
          Возможно, она была удалена или вы перешли по неверной ссылке
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={16} />
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
