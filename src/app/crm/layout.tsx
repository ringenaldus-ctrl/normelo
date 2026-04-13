import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM — Normelo",
  robots: { index: false, follow: false },
};

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
