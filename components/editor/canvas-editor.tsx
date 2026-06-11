"use client"

import { useState, useRef } from "react"
import { EditorTopbar } from "@/components/editor/editor-topbar"
import { MotifSidebar } from "@/components/editor/motif-sidebar"
import { CanvasStage } from "@/components/editor/canvas-stage"
import { PropertiesPanel } from "@/components/editor/properties-panel"
import { EditorToolbar } from "@/components/editor/editor-toolbar"
import { useAppStore } from "@/lib/store"

export type Mode = "motif" | "ai"

export type FilterSettings = {
  brightness: number     // 50 - 150 (default 100)
  contrast: number       // 50 - 150 (default 100)
  saturate: number       // 0 - 200 (default 100)
  warmth: number         // -50 - 50 (default 0)
  grain: number          // 0 - 100 (default 0)
  pearl: number          // 0 - 100 (default 20)
  woodcut: number        // 0 - 100 (default 35)
  misregistration: number // 0 - 15 (default 0)
  sharpness: number      // 0 - 100 (default 0)
  shadow: number         // 0 - 50 (default 0)
  vignette: number       // 0 - 100 (default 0)
  redShift: number       // -50 - 50 (default 0)
  yellowShift: number    // -50 - 50 (default 0)
  greenShift: number     // -50 - 50 (default 0)
}

export const DEFAULT_FILTERS: FilterSettings = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  warmth: 0,
  grain: 0,
  pearl: 20,
  woodcut: 35,
  misregistration: 0,
  sharpness: 0,
  shadow: 0,
  vignette: 0,
  redShift: 0,
  yellowShift: 0,
  greenShift: 0,
}

export const PRESETS = {
  "co-dien": {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    warmth: 0,
    grain: 0,
    pearl: 20,
    woodcut: 35,
    misregistration: 0,
    sharpness: 0,
    shadow: 0,
    vignette: 0,
    redShift: 0,
    yellowShift: 0,
    greenShift: 0,
  },
  "tranh-go": {
    brightness: 93,
    contrast: 125,
    saturate: 70,
    grain: 30,
    warmth: 5,
    pearl: 15,
    woodcut: 60,
    misregistration: 2,
    sharpness: 10,
    shadow: 5,
    vignette: 15,
    redShift: -5,
    yellowShift: 5,
    greenShift: -5,
  },
  "diep-nga": {
    brightness: 110,
    contrast: 92,
    saturate: 88,
    grain: 8,
    warmth: 18,
    pearl: 50,
    woodcut: 20,
    misregistration: 1,
    sharpness: 0,
    shadow: 2,
    vignette: 10,
    redShift: 10,
    yellowShift: 8,
    greenShift: 0,
  },
  "dem-lang": {
    brightness: 78,
    contrast: 115,
    saturate: 82,
    grain: 12,
    warmth: -10,
    pearl: 10,
    woodcut: 40,
    misregistration: 3,
    sharpness: 15,
    shadow: 12,
    vignette: 40,
    redShift: -10,
    yellowShift: -5,
    greenShift: 5,
  },
  "phai-co": {
    brightness: 104,
    contrast: 88,
    saturate: 50,
    grain: 22,
    warmth: 12,
    pearl: 30,
    woodcut: 45,
    misregistration: 2,
    sharpness: 5,
    shadow: 3,
    vignette: 25,
    redShift: 5,
    yellowShift: 10,
    greenShift: -10,
  },
  "muc-tuoi": {
    brightness: 97,
    contrast: 140,
    saturate: 78,
    grain: 6,
    warmth: 0,
    pearl: 5,
    woodcut: 15,
    misregistration: 0,
    sharpness: 40,
    shadow: 8,
    vignette: 5,
    redShift: -15,
    yellowShift: -15,
    greenShift: -15,
  },
} as const

export function CanvasEditor() {
  const setActiveView = useAppStore((s) => s.setActiveView)

  const [mode, setMode] = useState<Mode>("motif")
  const [filters, setFilters] = useState<FilterSettings>(DEFAULT_FILTERS)
  const [activePreset, setActivePreset] = useState<string | null>("co-dien")
  const [zoom, setZoom] = useState(100)

  // Undo / redo state managed via CanvasStage hooks/refs
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  // Refs for communications
  const undoRef = useRef<(() => void) | null>(null)
  const redoRef = useRef<(() => void) | null>(null)
  const resetRef = useRef<(() => void) | null>(null)
  const exportRef = useRef<(() => void) | null>(null)
  const commitPresetHistoryRef = useRef<((f: FilterSettings) => void) | null>(null)
  const commitSliderHistoryRef = useRef<(() => void) | null>(null)
  const triggerUploadRef = useRef<(() => void) | null>(null)

  const handleApplyPreset = (presetKey: string) => {
    setActivePreset(presetKey)
    const newFilters = PRESETS[presetKey as keyof typeof PRESETS]
    setFilters(newFilters)
    commitPresetHistoryRef.current?.(newFilters)
  }

  const handleSliderChange = (key: keyof FilterSettings, value: number) => {
    setActivePreset(null)
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSliderPointerUp = () => {
    commitSliderHistoryRef.current?.()
  }

  const handleReset = () => {
    setActivePreset("co-dien")
    setFilters(DEFAULT_FILTERS)
    resetRef.current?.()
  }

  const handleUndo = () => {
    undoRef.current?.()
  }

  const handleRedo = () => {
    redoRef.current?.()
  }

  const handleExport = () => {
    exportRef.current?.()
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#F9F5EE] text-[#3D3A35]">
      <EditorTopbar
        mode={mode}
        onModeChange={setMode}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        onGoHome={() => setActiveView("landing")}
      />
      <div className="flex min-h-0 flex-1">
        <MotifSidebar
          mode={mode}
          activePreset={activePreset}
          onApplyPreset={handleApplyPreset}
        />
        <CanvasStage
          filters={filters}
          setFilters={setFilters}
          setActivePreset={setActivePreset}
          zoom={zoom}
          onHistoryChange={(undoable, redoable) => {
            setCanUndo(undoable)
            setCanRedo(redoable)
          }}
          undoRef={undoRef}
          redoRef={redoRef}
          resetRef={resetRef}
          exportRef={exportRef}
          commitPresetHistoryRef={commitPresetHistoryRef}
          commitSliderHistoryRef={commitSliderHistoryRef}
          triggerUploadRef={triggerUploadRef}
        />
        <PropertiesPanel
          filters={filters}
          onFilterChange={handleSliderChange}
          onSliderPointerUp={handleSliderPointerUp}
        />
      </div>
      <EditorToolbar
        zoom={zoom}
        onZoom={setZoom}
        onReset={handleReset}
        onUndo={handleUndo}
        canUndo={canUndo}
        onExport={handleExport}
        onUploadClick={() => triggerUploadRef.current?.()}
      />
    </div>
  )
}
