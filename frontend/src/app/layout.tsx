import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Root } from "@/components/Root/Root";
import { I18nProvider } from "@/core/i18n/provider";
import { Abhaya_Libre } from "next/font/google";
import { WagmiProvider } from "wagmi";
import { Londrina_Solid } from "next/font/google";

import "./_assets/globals.css";
import "normalize.css";
import { Providers } from "./providers";

const AbhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  display: "auto",
  variable: "--font-abhaya",
  weight: "700",
});

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  variable: "--font-londrina",
});

export const metadata: Metadata = {
  title: "Your Application Title Goes Here",
  description: "Your application description goes here",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${AbhayaLibre.variable} ${londrina.variable}`}>
        <I18nProvider>
          <Providers>
            <Root>{children}</Root>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
