import ExportedImage from "next-image-export-optimizer";
import { fontLibreBaskerville } from "../layout";
import { Article } from "../../components/Article";
import { CristalHeader } from "@/components/CristalHeader";
import { LocaleLink } from "@/components/LocaleLink";
import { Menu } from "@/components/Menu";
import type { Metadata } from "next";
import {
  checkLocaleValidity,
  DefaultLocale,
  type Dictionary,
  getDictionary,
  ValidLocales,
} from "@/locales/dictionary";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Misato Katsuragi | Fernyev",
};

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const isValidLocale = checkLocaleValidity(locale);

  if (!isValidLocale) {
    redirect(DefaultLocale);
  }

  const dictionary = getDictionary({ locale });

  return (
    <div className="flex flex-col gap-4">
      <PageHeader dictionary={dictionary} validLocales={[...ValidLocales]} />

      <div className="flex justify-center">
        <main className="mb-20 flex max-w-7xl flex-col items-center px-4">
          <MainHeader />

          <div className="flex max-w-5xl flex-col gap-20">
            <div className="flex flex-col items-center gap-7 md:flex-row-reverse md:items-start">
              <About dictionary={dictionary} />

              <ExportedImage
                src={"/misato_2.jpg"}
                alt="Misato Katsuragi modeling"
                width={736}
                height={1048}
                className="h-[clamp(25rem,8.4276rem+40.7937vw,41.0625rem)] object-contain"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function PageHeader(params: {
  dictionary: Dictionary;
  validLocales: string[];
}) {
  const { dictionary, validLocales } = params;
  return (
    <CristalHeader>
      <div className="mx-auto flex max-w-7xl justify-between">
        <p className="text-red-primary text-3xl font-bold">Fernyev</p>

        <nav className={"hidden items-center gap-4 md:flex"}>
          <LocaleLink
            className="duration-200 hover:text-purple-600"
            href={"#about"}
          >
            {dictionary.about.title}
          </LocaleLink>

          <LocaleSwitcher supportedLanguages={validLocales} />

          <Link
            className="duration-200 hover:scale-110"
            href={"https://github.com/leif-sync/misato-katsuragi"}
            target="_blank"
          >
            <ExportedImage
              src={"/github-mark-white.svg"}
              width={32}
              height={32}
              unoptimized
              placeholder="empty"
              alt="GitHub Logo"
            />
          </Link>
        </nav>

        <Menu className="md:hidden" iconWidth={32} iconHeight={32}>
          <LocaleLink
            className="duration-200 hover:text-purple-600"
            href={"#about"}
          >
            {dictionary.about.title}
          </LocaleLink>

          <Link
            className="duration-200 hover:scale-110"
            href={"https://github.com/leif-sync/misato-katsuragi"}
            target="_blank"
          >
            <ExportedImage
              src={"/github-mark-white.svg"}
              width={32}
              height={32}
              unoptimized
              placeholder="empty"
              alt="GitHub Logo"
            />
          </Link>
        </Menu>
      </div>
    </CristalHeader>
  );
}

function MainHeader() {
  return (
    <header className="flex min-h-[80vh] w-full flex-col items-center gap-8 py-10 md:flex-row-reverse md:items-center md:justify-between md:gap-0">
      <ExportedImage
        src={"/misato_1.png"}
        priority
        alt="Misato Katsuragi"
        width={637}
        height={1000}
        className="h-[clamp(25rem,8.4276rem+40.7937vw,41.0625rem)] w-auto mask-b-from-70% mask-b-to-100% object-contain"
      />

      <h1
        className={`flex flex-col items-center md:items-start ${fontLibreBaskerville.className} min-h-fit min-w-fit`}
      >
        <span
          className={`text-red-primary text-[clamp(3rem,-2.1587rem+12.6984vw,8rem)] font-extrabold`}
        >
          NERV
        </span>
        <span
          className={`text-purple-primary text-[calc(clamp(3rem,-2.1587rem+12.6984vw,8rem)*0.7)] font-bold`}
        >
          Misato Katsuragi
        </span>
      </h1>
    </header>
  );
}

function About(params: { dictionary: Dictionary }) {
  const { dictionary } = params;
  return (
    <Article id="about">
      <h2>{dictionary.about.title}</h2>
      {dictionary.about.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Article>
  );
}
