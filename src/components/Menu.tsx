"use client";

// import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";
import { ReactNode, useState } from "react";

export function Menu({
  children,
  className = "",
  iconWidth,
  iconHeight,
}: {
  children: ReactNode;
  className?: string;
  iconWidth: number;
  iconHeight: number;
}) {
  const [isOpen, toggleVisibility] = useState(false);

  return (
    <div className={`${className} relative`}>
      <ExportedImage
        src={"/menu.svg"}
        width={iconWidth}
        height={iconHeight}
        unoptimized
        placeholder="empty"
        alt="Menu"
        onClick={() => toggleVisibility((currentState) => !currentState)}
        className="cursor-pointer"
      />
      {isOpen && (
        <div
          className={`animate-fade-down animate-duration-[60ms] bg-background-primary absolute right-0 flex flex-col gap-2 rounded-md border border-gray-700 p-3`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
