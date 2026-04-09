import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Module 6 — AI-geletterdheid toets",
  description:
    "Test je kennis over de EU AI Act en de toepassing in de uitzendbranche. 12 vragen over hoog-risico AI, menselijk toezicht, shadow AI en transparantie.",
};

export default function Module6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
