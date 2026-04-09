import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-geletterdheid training voor de uitzendbranche",
  description:
    "Artikel 4 van de EU AI Act verplicht AI-geletterdheid voor medewerkers. Normelo ontwikkelt een training specifiek voor recruiters, intercedenten en hiring managers.",
  openGraph: {
    title: "AI-geletterdheid training voor de uitzendbranche",
    description:
      "Artikel 4 van de EU AI Act verplicht AI-geletterdheid. Training voor recruiters en intercedenten in de uitzendbranche.",
  },
};

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
