import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU AI Act Quick Scan voor uitzendbureaus",
  description:
    "Check in 60 seconden hoe ver jouw uitzendbureau staat met de EU AI Act. Gratis scan over ATS-systemen, CV-screening en matchingtools.",
  openGraph: {
    title: "EU AI Act Quick Scan voor uitzendbureaus",
    description:
      "Check in 60 seconden hoe ver jouw uitzendbureau staat met de EU AI Act.",
  },
};

export default function QuickScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
