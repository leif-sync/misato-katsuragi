"use client";

import { LocaleService } from "@/utils/localeService";
import Link from "next/link";
import Image from "next-image-export-optimizer";
import { useState } from "react";

export function LocaleSwitcher({
  supportedLanguages,
}: {
  supportedLanguages: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRedirect = (locale: string) => {
    const languageCode = LocaleService.extractLanguageCodeFromLocale(locale);
    LocaleService.saveLocaleSettings({
      locale,
      languageCode,
    });
  };

  return (
    <div className="relative">
      <Image
        src={"/translate.svg"}
        width={30}
        height={30}
        alt="Translate"
        unoptimized
        placeholder="empty"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer duration-200 hover:scale-110"
      />

      {isOpen && (
        <nav className="bg-background-primary absolute left-0 flex flex-col gap-2 rounded-md border border-gray-700 p-2">
          {supportedLanguages.map((lang) => (
            <Link
              key={lang}
              href={`/${lang}`}
              onClick={() => handleRedirect(lang)}
              className="hover:text-purple-600"
            >
              {lang}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
