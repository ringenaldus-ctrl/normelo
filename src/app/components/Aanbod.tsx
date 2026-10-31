import type { ReactNode } from "react";
import Link from "next/link";
import { aanbod, type BetaaldPlan } from "@/content/aanbod";
import AanmeldenCta from "./AanmeldenCta";

function PlanLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function PlanKaart({ plan }: { plan: BetaaldPlan }) {
  return (
    <div
      className={`p-6 rounded-xl flex flex-col ${
        plan.uitgelicht ? "border-2 border-accent bg-surface" : "border border-border"
      }`}
    >
      <p
        className={`text-sm font-medium mb-1 tracking-wide uppercase ${
          plan.uitgelicht ? "text-accent" : "text-muted"
        }`}
      >
        {plan.naam}
      </p>
      <p className="text-xs text-muted mb-4">{plan.voorWie}</p>
      <div className="mb-4">
        <span className="text-3xl font-bold">{plan.prijsPerMaand}</span>
        {plan.prijsPerMaand ? <span className="text-muted text-sm">/maand</span> : null}
      </div>
      {plan.prijsPerJaar ? <p className="text-xs text-muted mb-6">{plan.prijsPerJaar}</p> : null}
      <ul className="space-y-2 text-sm mb-8 flex-1">
        {plan.kenmerken.map((kenmerk) => (
          <li key={kenmerk} className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>{kenmerk}</span>
          </li>
        ))}
      </ul>
      <PlanLink
        href={plan.href}
        className={`block text-center px-5 py-3 rounded-lg font-semibold no-underline transition-colors ${
          plan.uitgelicht
            ? "bg-accent text-white hover:bg-accent-hover"
            : "border-2 border-accent text-accent hover:bg-accent hover:text-white"
        }`}
      >
        {plan.cta}
      </PlanLink>
    </div>
  );
}

/** Prijzenblok. Leest alleen uit `src/content/aanbod.ts`. */
export default function AanbodSectie() {
  const plannen = aanbod.betaaldePlannen;

  if (!aanbod.gratis && plannen.length > 0) {
    return (
      <section className="py-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">Wat kost het?</h2>
        <div className={`grid gap-6 ${plannen.length > 1 ? "md:grid-cols-3" : ""}`}>
          {plannen.map((plan) => (
            <PlanKaart key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 border-b border-border">
      <h2 className="text-2xl font-bold mb-2">Wat kost het?</h2>
      <div className="p-6 border-2 border-accent rounded-xl bg-surface max-w-xl">
        <p className="text-sm font-medium text-accent mb-1 tracking-wide uppercase">{aanbod.label}</p>
        <p className="text-3xl font-bold mb-3">Gratis</p>
        <p className="text-foreground leading-relaxed mb-5">{aanbod.tekst}</p>
        <AanmeldenCta
          label={aanbod.cta}
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-colors no-underline"
        />
      </div>
    </section>
  );
}
