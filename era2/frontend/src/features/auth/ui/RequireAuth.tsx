import { Navigate } from "@/shared/routing";
import { useAuth } from "@/features/auth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}
