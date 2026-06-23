import { createContext, forwardRef, useContext, useEffect, useMemo, useState } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface LocationState {
  href: string;
  pathname: string;
  searchStr: string;
  search: URLSearchParams;
}

type NavigateInput =
  | string
  | {
      to: string;
      search?: Record<string, string | number | boolean | undefined | null>;
      replace?: boolean;
    };

interface RouterContextValue {
  location: LocationState;
  navigate: (input: NavigateInput, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function getLocation(): LocationState {
  const { pathname, search, href } = window.location;
  return {
    href,
    pathname,
    searchStr: search,
    search: new URLSearchParams(search),
  };
}

function createHref(input: NavigateInput): string {
  if (typeof input === "string") return input;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(input.search ?? {})) {
    if (value !== undefined && value !== null) params.set(key, String(value));
  }

  const query = params.toString();
  return query ? input.to + "?" + query : input.to;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationState>(() => getLocation());

  useEffect(() => {
    const sync = () => setLocation(getLocation());
    window.addEventListener("popstate", sync);
    window.addEventListener("era2:navigation", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("era2:navigation", sync);
    };
  }, []);

  const value = useMemo<RouterContextValue>(
    () => ({
      location,
      navigate(input, options) {
        const href = createHref(input);
        const replace = options?.replace ?? (typeof input === "object" && input.replace);
        if (replace) window.history.replaceState(null, "", href);
        else window.history.pushState(null, "", href);
        window.dispatchEvent(new Event("era2:navigation"));
        window.scrollTo({ top: 0 });
      },
    }),
    [location],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

function useRouterContext() {
  const context = useContext(RouterContext);
  if (!context) throw new Error("Router hooks must be used inside RouterProvider");
  return context;
}

export function useLocation() {
  return useRouterContext().location;
}

export function useNavigate() {
  return useRouterContext().navigate;
}

export function useParams(_options?: unknown) {
  const { pathname } = useLocation();
  const toolMatch = pathname.match(/^\/tools\/([^/]+)$/);
  return {
    slug: toolMatch ? decodeURIComponent(toolMatch[1]) : undefined,
  };
}

export function Navigate({ to, replace = true }: { to: string; replace?: boolean }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to, replace });
  }, [navigate, replace, to]);

  return null;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  search?: Record<string, string | number | boolean | undefined | null>;
  activeProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, search, activeProps, onClick, className, ...props },
  ref,
) {
  const { location, navigate } = useRouterContext();
  const href = createHref({ to, search });
  const isActive =
    location.pathname === to || (to !== "/" && location.pathname.startsWith(to + "/"));
  const activeClassName =
    typeof activeProps?.className === "string" ? activeProps.className : undefined;
  const mergedClassName =
    [className, isActive ? activeClassName : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <a
      ref={ref}
      href={href}
      className={mergedClassName}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey ||
          props.target === "_blank" ||
          href.startsWith("http")
        ) {
          return;
        }
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
});
