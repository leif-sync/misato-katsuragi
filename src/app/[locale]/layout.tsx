import { ValidLocales } from "@/locales/dictionary";

export async function generateStaticParams(): Promise<
  { locale: ValidLocales }[]
> {
  return ValidLocales.map((locale) => ({ locale }));
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
