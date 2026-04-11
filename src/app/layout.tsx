import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Normelo — EU AI Act uitleg voor organisaties",
    template: "%s | Normelo",
  },
  description:
    "Begrijp de EU AI Act. Duidelijke uitleg over hoog-risico AI-systemen, deadlines en wat dit betekent voor jouw organisatie.",
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
          <Link href="/uitzendbranche" className="text-muted hover:text-primary transition-colors no-underline hover:no-underline">
            Uitzendbranche
          </Link>
          <Link href="/hoog-risico" className="text-muted hover:text-primary transition-colors no-underline hover:no-underline">
            Hoog-risico AI
          </Link>
          <Link href="/tijdlijn" className="text-muted hover:text-primary transition-colors no-underline hover:no-underline">
            Tijdlijn
          </Link>
          <Link href="/training" className="text-muted hover:text-primary transition-colors no-underline hover:no-underline">
            Training
          </Link>
          <Link href="/quick-scan" className="text-muted hover:text-primary transition-colors no-underline hover:no-underline">
            Quick Scan
          </Link>
          <Link href="/faq" className="text-muted hover:text-primary transition-colors no-underline hover:no-underline">
            FAQ
          </Link>
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
          Normelo biedt een <a href="/training" className="text-accent hover:underline">AI-geletterdheid training</a> voor de uitzendbranche — inclusief certificering en compliance-documentatie. <a href="/training" className="text-accent hover:underline">Bekijk het traject →</a>
        </p>
        <p className="mb-4 text-gray-400">Vragen of opmerkingen over deze website? <a href="mailto:info@normelo.com" className="text-accent hover:underline">info@normelo.com</a></p>
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
