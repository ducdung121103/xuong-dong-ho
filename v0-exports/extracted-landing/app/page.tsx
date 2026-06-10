import { WorkshopProvider } from "@/components/workshop-context"
import { AppShell } from "@/components/app-shell"

export default function Page() {
  return (
    <WorkshopProvider>
      <AppShell />
    </WorkshopProvider>
  )
}
