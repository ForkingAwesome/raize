import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Root } from "@/components/Root/Root";
import { I18nProvider } from "@/core/i18n/provider";
import { Abhaya_Libre } from "next/font/google";
import { WagmiProvider } from "wagmi";

import "./_assets/globals.css";
import "normalize.css";

const AbhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  display: "auto",
  variable: "--font-abhaya",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Your Application Title Goes Here",
  description: "Your application description goes here",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${AbhayaLibre.variable}`}>
        <I18nProvider>
          <Root>{children}</Root>
        </I18nProvider>
      </body>
    </html>
  );
}
