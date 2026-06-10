"use client"

import { useWorkshop } from "@/components/workshop-context"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Process } from "@/components/process"
import { Gallery } from "@/components/gallery"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { CanvasEditor } from "@/components/editor/canvas-editor"

export function AppShell() {
  const { view } = useWorkshop()

  if (view === "editor") {
    return <CanvasEditor />
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Process />
        <Gallery />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
