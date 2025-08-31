import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";

export const fontInter = Inter({
  subsets: ["latin"],
});

export const fontLibreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${fontInter.className} bg-background-primary h-full w-full overflow-x-hidden text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
