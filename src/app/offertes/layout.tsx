import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offertes — WhatsApp",
  robots: { index: false, follow: false },
};

export default function OffertesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
