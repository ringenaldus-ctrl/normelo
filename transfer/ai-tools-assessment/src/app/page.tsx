const bookingHref =
  "mailto:ringenaldus@gmail.com?subject=AI%20Tools%20Assessment%20%E2%80%94%20Zoom-call&body=Hoi%20Gerard%2C%0A%0AIk%20wil%20graag%20een%2045-minuten%20Zoom-assessment%20plannen.%0A%0ABedrijf%3A%0ATeamgrootte%3A%0ABeschikbaarheid%3A%0A";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a
            href="#top"
            className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight text-ink no-underline"
          >
            Uurvrij
          </a>
          <a
            href={bookingHref}
            className="text-sm font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
          >
            Plan Zoom-call
          </a>
        </div>
      </header>

      {/* Hero — one composition: brand, headline, sentence, CTA, atmosphere */}
      <section
        id="top"
        className="relative isolate flex min-h-[100svh] items-end overflow-hidden px-6 pb-16 pt-28 md:items-center md:pb-24 md:pt-24"
      >
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute -right-[20%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,245,96,0.55)_0%,rgba(15,107,76,0.18)_42%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#eef3ef_0%,#dce8df_48%,#c5d9cc_100%)]"
        />
        <div
          aria-hidden
          className="hero-grid pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(18,37,28,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(18,37,28,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p className="animate-rise font-[family-name:var(--font-syne)] text-5xl font-extrabold tracking-tight text-ink md:text-7xl lg:text-8xl">
            Uurvrij
          </p>
          <h1 className="animate-rise-delay-1 mt-6 max-w-3xl font-[family-name:var(--font-syne)] text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-5xl">
            45 minuten Zoom. Daarna weet je welke AI-tools jóuw uren teruggeven.
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Een persoonlijk assessment met jou — geen webinar, geen generieke
            tool-lijst.
          </p>
          <div className="animate-rise-delay-3 mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href={bookingHref}
              className="inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
            >
              Plan je 45‑minuten Zoom-call
            </a>
            <p className="text-sm text-ink-soft sm:ml-2">
              €999 · garantie ≥5 uur/week of geld terug
            </p>
          </div>
        </div>
      </section>

      {/* Wat de call inhoudt */}
      <section className="border-t border-line px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Wat die Zoom-call inhoudt
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              We zitten 45 minuten samen. Ik stel gerichte vragen over jouw dag,
              je team en waar werk blijft liggen. Ik schrijf tijdens het gesprek
              nog geen tools voor — eerst begrijpen, dan voorschrijven.
            </p>
          </div>

          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              {
                n: "01",
                t: "Jouw week, niet mijn pitch",
                d: "We lopen door een typische werkdag: e-mail, planning, opvolging, rapportages — alles wat energie vreet.",
              },
              {
                n: "02",
                t: "Knelpunten scherp krijgen",
                d: "Waar stapelt werk zich op? Wat zou je met een toverstaf wissen? We maken tijdverlies concreet in uren.",
              },
              {
                n: "03",
                t: "Opname voor het rapport",
                d: "Met jouw toestemming nemen we op. Zo mis ik niets en kan ik na de call gericht researchen.",
              },
            ].map((item) => (
              <li key={item.n} className="border-t border-line pt-6">
                <p className="font-[family-name:var(--font-syne)] text-sm font-bold text-accent">
                  {item.n}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-syne)] text-xl font-bold text-ink">
                  {item.t}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{item.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Uitkomst */}
      <section className="bg-ink px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-4xl">
              Wat je oplevert
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              Na de call werk ik een helder assessment-rapport uit. In een
              tweede, kortere call lopen we het samen door — zodat je precies
              weet waar je maandag mee start.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {[
              {
                t: "3–7 kant-en-klare tools",
                d: "Geen custom software. Bestaande AI- of SaaS-tools die passen bij jouw bedrijfsgrootte en processen.",
              },
              {
                t: "Minstens 5 uur per week terug",
                d: "Dat is de belofte. Lukt dat niet met eerlijke kansen? Dan krijg je je investering volledig terug.",
              },
              {
                t: "4-dagen startplan",
                d: "Elke dag één kleine actie (max. ±10 minuten). Zo blijf je niet hangen in ‘interessant, maar later’.",
              },
              {
                t: "ROI in euro’s",
                d: "Uren × jouw uurtarief − toolkosten. Zo zie je meteen of het assessment zich terugverdient.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="border-t border-white/15 pt-6 transition-transform duration-500 hover:-translate-y-0.5"
              >
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold">
                  {item.t}
                </h3>
                <p className="mt-3 leading-relaxed text-white/70">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Van Zoom naar duidelijk plan
          </h2>
          <ol className="mt-12 space-y-0">
            {[
              {
                t: "Zoom discovery — 45 min",
                d: "Persoonlijk gesprek. Jij praat, ik luister en vraag door.",
              },
              {
                t: "Analyse & research",
                d: "Ik vertaal knelpunten naar passende tools en check of ze écht bij jullie passen.",
              },
              {
                t: "Jouw rapport",
                d: "Executive summary, prioriteiten, toolkeuzes, startplan en financiële impact.",
              },
              {
                t: "Review-call — ±30 min",
                d: "We lopen het rapport door. Jij besluit: zelf starten, of later hulp bij implementatie.",
              },
            ].map((step, i) => (
              <li
                key={step.t}
                className="grid gap-2 border-t border-line py-7 md:grid-cols-[4rem_1fr_1.4fr] md:items-baseline md:gap-8"
              >
                <span className="font-[family-name:var(--font-syne)] text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-ink">
                  {step.t}
                </h3>
                <p className="text-ink-soft">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Voor wie + garantie */}
      <section className="border-t border-line bg-bg-deep px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-ink">
              Voor wie dit is
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Ondernemers en teams van grofweg 2–20 mensen die voelen dat ze
              achterlopen op AI — maar geen tijd hebben om veertig tools te
              testen. Je wilt geen theorie. Je wilt weten: wát zet ik aan, en
              wat levert het op?
            </p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-ink">
              De garantie
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Als we geen kans van minstens 5 uur per week terugvinden, krijg je
              100% van je geld terug. Worst case verlies je 45 minuten. Best
              case: structureel meer lucht in je week.
            </p>
            <p className="mt-6 font-[family-name:var(--font-syne)] text-2xl font-bold text-ink">
              €999{" "}
              <span className="text-base font-semibold text-ink-soft">
                all-in voor discovery, rapport en review
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="relative mx-auto max-w-6xl overflow-hidden px-8 py-14 md:px-14 md:py-20">
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(135deg,#0f6b4c_0%,#12251c_100%)]"
          />
          <div
            aria-hidden
            className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-spark/30 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white md:text-5xl">
              Klaar om die 45 minuten in te plannen?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              Stuur een mail — dan prikken we een Zoom-moment. Geen drukke
              funnel, gewoon een gesprek over jouw processen.
            </p>
            <a
              href={bookingHref}
              className="mt-8 inline-flex items-center justify-center bg-spark px-7 py-4 text-base font-semibold text-ink no-underline transition-transform hover:-translate-y-0.5"
            >
              Mail om Zoom-call te plannen
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <p className="font-[family-name:var(--font-syne)] font-bold text-ink">
            Uurvrij
          </p>
          <p>AI Tools Assessment · persoonlijk via Zoom</p>
          <a
            href="mailto:ringenaldus@gmail.com"
            className="text-accent no-underline hover:text-accent-hover"
          >
            ringenaldus@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
