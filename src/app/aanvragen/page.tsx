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
      <h1 className="text-3xl font-bold leading-tight mb-2 text-center">Leer gratis wat de EU AI Act voor jouw bureau betekent</h1>
      <p className="text-muted mb-8 text-center">
        Vul je e-mailadres in en start direct met de eerste module.
      </p>
      <RegistratieForm />
    </div>
  );
}
