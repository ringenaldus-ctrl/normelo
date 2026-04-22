import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import NavLink from "./components/NavLink";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Normelo — Gratis EU AI Act training voor uitzendbureaus",
    template: "%s | Normelo",
  },
  description:
    "Leer gratis wat de EU AI Act voor jouw uitzendbureau betekent. Gebruik daarna het Normelo AI-register om je compliance te regelen.",
  metadataBase: new URL("https://normelo.com"),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Normelo",
  },
};

function Header() {
  return (
    <header className="border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary no-underline hover:no-underline">
          <Image src="/logo-shield.svg" alt="" width={28} height={28} className="flex-shrink-0" />
          Normelo
        </Link>
        <nav className="flex gap-6 text-sm items-center">
          <NavLink href="/quick-scan">Quick Scan</NavLink>
          <NavLink href="/ai-register">AI-register</NavLink>
          <NavLink href="/aanvragen">Gratis training</NavLink>
          <NavLink href="/uitzendbranche">Uitzendbranche</NavLink>
          <NavLink href="/hoog-risico">Hoog-risico AI</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-dark mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-10 text-sm">
        <p className="mb-6 text-gray-300 italic">
          Normelo helpt uitzendbureaus met de EU AI Act — Quick Scan, gratis training en het AI-register om compliance concreet te regelen. <a href="/quick-scan" className="text-accent hover:underline">Doe de Quick Scan →</a>
        </p>
        <p className="mb-4 text-gray-400">Vragen of opmerkingen? <a href="mailto:info@normelo.com" className="text-accent hover:underline">info@normelo.com</a></p>
        <p className="mb-4 text-xs text-gray-500 leading-relaxed max-w-3xl">
          Disclaimer: Normelo is geen aangemelde instantie (notified body) onder de EU AI Act.
          Informatie op deze website is geen juridisch advies.
        </p>
        <p className="mb-2 text-xs text-gray-500">
          <Link href="/privacy" className="hover:text-gray-300 hover:underline">Privacyverklaring</Link>
        </p>
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Normelo</p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
