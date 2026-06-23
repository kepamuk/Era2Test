import { Link } from "@/shared/routing";
import { useAuth } from "@/features/auth";

interface AuthCTALinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/** Link that redirects to /auth for guests, or to `to` for authed users */
export function AuthCTALink({ to, children, className, style, onClick }: AuthCTALinkProps) {
  const { isAuthed } = useAuth();
  return (
    <Link to={isAuthed ? to : "/auth"} className={className} style={style} onClick={onClick}>
      {children}
    </Link>
  );
}
