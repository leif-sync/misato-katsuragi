import { ReactNode } from "react";

interface CristalHeaderProps {
  className?: string;
  children?: ReactNode;
}

export function CristalHeader({
  className = "",
  children,
}: CristalHeaderProps) {
  return (
    <header
      className={`${className} sticky top-0 z-10 p-4 shadow-xl shadow-black/40 backdrop-blur-md`}
    >
      {children}
    </header>
  );
}
