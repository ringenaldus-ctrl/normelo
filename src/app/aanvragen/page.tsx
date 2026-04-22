import type { Metadata } from "next";
import RegistratieForm from "../components/RegistratieForm";

export const metadata: Metadata = {
  title: "Gratis training starten — Normelo",
  description:
    "Registreer je en start direct met de gratis EU AI Act training voor uitzendbureaus.",
};

export default function Aanvragen() {
  return (
    <div className="bg-dark min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-16">
        <h1 className="text-3xl font-bold leading-tight mb-2 text-center text-white">Start de gratis training</h1>
        <p className="text-gray-400 mb-8 text-center">
          Vul je gegevens in en je wordt direct doorgestuurd naar de training.
        </p>
        <RegistratieForm />
      </div>
    </div>
  );
}
