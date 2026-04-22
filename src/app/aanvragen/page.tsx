import type { Metadata } from "next";
import RegistratieForm from "../components/RegistratieForm";

export const metadata: Metadata = {
  title: "Gratis training starten — Normelo",
  description:
    "Registreer je en start direct met de gratis EU AI Act training voor uitzendbureaus.",
};

export default function Aanvragen() {
  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold leading-tight mb-2 text-center">Word AI-geletterd. Gratis.</h1>
      <p className="text-muted mb-8 text-center">
        Verplicht sinds februari 2025. Start direct met de eerste module.
      </p>
      <RegistratieForm />
    </div>
  );
}
