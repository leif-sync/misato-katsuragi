import { DefaultLocale, ValidLocales } from "@/locales/dictionary";
import Script from "next/script";
import fs from "node:fs";
import path from "node:path";
import * as ts from "typescript";

const compilerOptions: ts.CompilerOptions = {
  module: ts.ModuleKind.ESNext,
  target: ts.ScriptTarget.ESNext,
};

function ScriptRedirect(props: {
  validLocales: string[]; // format: <language>, <language>-<country> e.g. en, en-US
  defaultLocale: string; // format: <language>, <language>-<country> e.g. en, en-US
}) {
  const script = fs
    .readFileSync(path.join(process.cwd(), "src", "utils", "localeService.ts"))
    .toString();

  const result = ts.transpileModule(script, {
    compilerOptions,
  });

  return (
    <Script id="languagePreference" strategy="beforeInteractive" type="module">
      {`
        ${result.outputText}

        const redirectLocale = LocaleService.getRedirectLocale({
          supportedLocales: ${JSON.stringify(props.validLocales)},
          defaultLocale: ${JSON.stringify(props.defaultLocale)},
        });

        const redirectTo = "/" + redirectLocale;
        window.location.href = redirectTo;
      `}
    </Script>
  );
}

export default function Page() {
  return (
    <ScriptRedirect
      validLocales={[...ValidLocales]}
      defaultLocale={DefaultLocale}
    />
  );
}
