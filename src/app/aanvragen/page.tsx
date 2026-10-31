import { permanentRedirect } from "next/navigation";
import { aanmelden } from "@/content/aanbod";

export default function Aanvragen() {
  permanentRedirect(aanmelden.href);
}
