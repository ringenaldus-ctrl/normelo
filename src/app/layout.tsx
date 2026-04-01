import type { Metadata } from "next";
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
        <Link href="/" className="text-xl font-bold tracking-tight text-primary no-underline hover:no-underline">
          Normelo
        </Link>
        <nav className="flex gap-6 text-sm items-center">
          <div className="relative group">
            <span className="text-muted hover:text-primary transition-colors cursor-pointer">
              Sectoren
            </span>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
              <div className="bg-white border border-border rounded-lg shadow-lg py-2 min-w-48">
                <Link href="/uitzendbranche" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Uitzendbranche
                </Link>
                <Link href="/zorg" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Zorg
                </Link>
                <Link href="/financiele-dienstverlening" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Financiële dienstverlening
                </Link>
                <Link href="/verzekeringen" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Verzekeringen
                </Link>
                <Link href="/onderwijs" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Onderwijs
                </Link>
                <Link href="/overheid" className="block px-4 py-2 text-muted hover:text-primary hover:bg-surface transition-colors no-underline">
                  Overheid
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
    <footer className="border-t border-border mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-10 text-sm text-muted">
        <p className="mb-6">
          Normelo werkt aan een certificeringsprogramma voor organisaties die willen aantonen dat zij EU AI Act compliant zijn. Meer informatie volgt.
        </p>
        <p className="mb-4">Vragen of opmerkingen over deze website? <a href="mailto:info@normelo.com" className="text-accent hover:underline">info@normelo.com</a></p>
        <p>&copy; {new Date().getFullYear()} Normelo</p>
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
