import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-geletterdheid training voor uitzendbureaus — Artikel 4 EU AI Act",
  description:
    "Artikel 4 vraagt sinds februari 2025 om maatregelen voor AI-geletterdheid, zonder een vast niveau per persoon. Normelo is een gratis traject: training, toets, certificaat en documentatie.",
  openGraph: {
    title: "AI-geletterdheid training voor uitzendbureaus",
    description:
      "Compleet compliance-traject: training, toets, certificering en documentatie. Specifiek voor de uitzendbranche.",
  },
};

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
