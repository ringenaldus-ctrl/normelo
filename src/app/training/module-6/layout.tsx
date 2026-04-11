import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Module 6 — Toets je kennis (preview)",
  description:
    "Drie voorbeeldvragen uit de AI-geletterdheid toets. Test je basiskennis over de EU AI Act en de uitzendbranche. De volledige toets met certificering is onderdeel van het Normelo traject.",
};

export default function Module6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
