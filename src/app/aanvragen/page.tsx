import type { Metadata } from "next";
import RegistratieForm from "../components/RegistratieForm";

export const metadata: Metadata = {
  title: "Gratis aanmelden — Normelo",
  description:
    "Meld je organisatie gratis aan met bedrijfsnaam, aantal medewerkers en een contactpersoon. Daarna open je het Normelo-platform.",
};

export default function Aanvragen() {
  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold leading-tight mb-2 text-center">Start gratis</h1>
      <p className="text-muted mb-8 text-center">
        Normelo is gratis. Je meldt je organisatie aan met bedrijfsnaam, aantal medewerkers
        en een contactpersoon. Daarna ontvang je een link naar het platform.
      </p>
      <RegistratieForm />
    </div>
  );
}
