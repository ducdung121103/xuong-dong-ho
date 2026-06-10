"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type View = "landing" | "editor"

type WorkshopContextValue = {
  view: View
  openEditor: () => void
  goHome: () => void
}

const WorkshopContext = createContext<WorkshopContextValue | null>(null)

export function WorkshopProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>("landing")

  return (
    <WorkshopContext.Provider
      value={{
        view,
        openEditor: () => setView("editor"),
        goHome: () => setView("landing"),
      }}
    >
      {children}
    </WorkshopContext.Provider>
  )
}

export function useWorkshop() {
  const ctx = useContext(WorkshopContext)
  if (!ctx) {
    throw new Error("useWorkshop must be used within a WorkshopProvider")
  }
  return ctx
}
