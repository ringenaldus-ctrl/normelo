import Link from "next/link";
import { aanmelden } from "@/content/aanbod";

type Props = {
  className?: string;
  label?: string;
  /** Zet op false als de toelichting al elders op dezelfde plek staat. */
  toelichting?: boolean;
  noteClassName?: string;
};

export default function AanmeldenCta({
  className,
  label,
  toelichting = true,
  noteClassName = "text-xs text-muted mt-2 max-w-md",
}: Props) {
  return (
    <div>
      <Link href={aanmelden.href} className={className}>
        {label ?? aanmelden.label}
      </Link>
      {toelichting ? <p className={noteClassName}>{aanmelden.toelichting}</p> : null}
    </div>
  );
}
