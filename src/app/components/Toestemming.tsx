import Link from "next/link";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Zinsdeel na "verwerkt om", bijvoorbeeld "mij het resultaat toe te sturen". */
  doel: string;
};

export default function Toestemming({ checked, onChange, doel }: Props) {
  return (
    <label className="flex items-start gap-2 text-xs text-muted leading-relaxed cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="mt-0.5 shrink-0"
      />
      <span>
        Ik ga ermee akkoord dat Gerard Ringenaldus / Normelo mijn gegevens verwerkt om {doel}.{" "}
        <Link href="/privacy" className="text-accent underline">
          Privacyverklaring
        </Link>
      </span>
    </label>
  );
}
