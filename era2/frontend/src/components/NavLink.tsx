import { Link } from "@/shared/routing";
import { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

type NavLinkCompatProps = Omit<React.ComponentProps<typeof Link>, "activeProps"> & {
  activeClassName?: string;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, to, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        to={to}
        className={className}
        activeProps={{ className: cn(className, activeClassName) }}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
