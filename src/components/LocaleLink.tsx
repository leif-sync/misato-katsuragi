"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkProps = Parameters<typeof Link>[0]; // esto es un objeto

export function LocaleLink(props: LinkProps) {
  const path = usePathname();
  const currentLocale = path.split("/")[1];
  const href = `/${currentLocale}${props.href}`;
  return (
    <Link {...props} href={href}>
      {props.children}
    </Link>
  );
}
