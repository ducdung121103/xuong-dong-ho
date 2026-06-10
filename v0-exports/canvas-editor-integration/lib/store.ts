import { create } from 'zustand'

export type ActiveView = 'landing' | 'ai-generator' | 'editor'

export interface CanvasObject {
  id: string
  type: 'motif' | 'ai-image' | 'text'
  glyph?: string
  label: string
  imageUrl?: string
  x: number
  y: number
  color?: string
}

interface AppState {
  /* ── View management ── */
  activeView: ActiveView
  setActiveView: (view: ActiveView) => void

  /* ── Canvas objects ── */
  canvasObjects: CanvasObject[]
  addCanvasObject: (obj: CanvasObject) => void
  removeCanvasObject: (id: string) => void
  clearCanvas: () => void

  /* ── AI generation ── */
  generatedImageUrl: string | null
  setGeneratedImageUrl: (url: string | null) => void
  isGenerating: boolean
  setIsGenerating: (v: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  /* ── View ── */
  activeView: 'landing',
  setActiveView: (view) => set({ activeView: view }),

  /* ── Canvas ── */
  canvasObjects: [],
  addCanvasObject: (obj) =>
    set((state) => ({ canvasObjects: [...state.canvasObjects, obj] })),
  removeCanvasObject: (id) =>
    set((state) => ({
      canvasObjects: state.canvasObjects.filter((o) => o.id !== id),
    })),
  clearCanvas: () => set({ canvasObjects: [] }),

  /* ── AI ── */
  generatedImageUrl: null,
  setGeneratedImageUrl: (url) => set({ generatedImageUrl: url }),
  isGenerating: false,
  setIsGenerating: (v) => set({ isGenerating: v }),
}))
