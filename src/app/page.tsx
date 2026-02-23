import { redirect } from "next/navigation"

export default function Home() {
  // Para este MVP o Login foi bypassado para focar no fluxo ERP.
  redirect("/dashboard")
}
