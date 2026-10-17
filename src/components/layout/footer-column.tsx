import Link from "next/link";
import { type ReactNode } from "react";

import { type NavLink } from "@/constants/navigation";

const LINK_CLASS = "transition-opacity duration-300 ease-power3-out hover:opacity-60";

type FooterColumnProps = {
  title: string;
  links: readonly NavLink[];
  children?: ReactNode;
};

/** Titled list of footer links; external links open in a new tab. */
export function FooterColumn({ title, links, children }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-display font-medium">{title}</h3>
      <ul className="flex flex-col gap-4">
        {links.map((link) => {
          const external = /^(https?:|mailto:)/.test(link.href);
          return (
            <li key={link.href}>
              {external ? (
                <a
                  href={link.href}
                  className={LINK_CLASS}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className={LINK_CLASS}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
        {children}
      </ul>
    </div>
  );
}
