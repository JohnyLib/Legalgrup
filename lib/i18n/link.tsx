"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { addLocaleToPath, getLocaleFromPath } from "./utils";

export function LocalizedLink({
  href,
  children,
  prefetch = true,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  prefetch?: boolean;
  [key: string]: any;
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const localizedHref = addLocaleToPath(href, locale);

  return (
    <Link href={localizedHref} prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}

