import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Uurvrij — AI Tools Assessment | 45 minuten Zoom",
  description:
    "In een persoonlijke Zoom-call van 45 minuten ontdekken we waar jouw bedrijf uren verliest — en welke kant-en-klare AI-tools die teruggeven. Garantie: minstens 5 uur per week, of geld terug.",
  openGraph: {
    title: "Uurvrij — AI Tools Assessment",
    description:
      "45 minuten Zoom. Persoonlijk assessment. Concrete tools die je uren teruggeven.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${syne.variable} ${figtree.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
