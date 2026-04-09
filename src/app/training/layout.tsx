import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-geletterdheid training voor uitzendbureaus — Artikel 4 EU AI Act",
  description:
    "Artikel 4 van de EU AI Act verplicht AI-geletterdheid sinds februari 2025. Normelo biedt een compleet traject voor uitzendbureaus: training, toets, certificering en compliance-documentatie.",
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
