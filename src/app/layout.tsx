import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
          <div className="relative group">
            <span className="text-muted hover:text-primary transition-colors cursor-pointer">
              Sectoren
            </span>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
              <div className="bg-white border border-border rounded-lg shadow-lg py-2 min-w-48">
                <Link href="/financiele-dienstverlening" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Financiële dienstverlening
                </Link>
                <Link href="/industrie" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Industrie
                </Link>
                <Link href="/logistiek" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Logistiek
                </Link>
                <Link href="/onderwijs" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Onderwijs
                </Link>
                <Link href="/overheid" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Overheid
                </Link>
                <Link href="/uitzendbranche" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Uitzendbranche
                </Link>
                <Link href="/verzekeringen" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Verzekeringen
                </Link>
                <Link href="/zorg" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Zorg
                </Link>
              </div>
            </div>
          </div>
          <Link href="/hoog-risico" className="text-muted hover:text-primary transition-colors no-underline hover:no-underline">
            Hoog-risico AI
          </Link>
          <Link href="/tijdlijn" className="text-muted hover:text-primary transition-colors no-underline hover:no-underline">
            Tijdlijn
          </Link>
          <Link href="/quick-scan" className="text-accent font-medium hover:text-primary transition-colors no-underline hover:no-underline">
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
          Normelo werkt aan een certificeringsprogramma voor de uitzendbranche — AI-geletterdheid en compliance voor recruiters, intercedenten en hiring managers. Meer informatie volgt.
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
      </body>
    </html>
  );
}
