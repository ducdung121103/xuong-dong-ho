"use client"

import { useState, useCallback, useRef } from "react"
import { EditorTopbar } from "@/components/editor/editor-topbar"
import { MotifSidebar } from "@/components/editor/motif-sidebar"
import { CanvasStage } from "@/components/editor/canvas-stage"
import { PropertiesPanel } from "@/components/editor/properties-panel"
import { EditorToolbar } from "@/components/editor/editor-toolbar"

export type Mode = "motif" | "ai"

export type PlacedMotif = {
  id: string
  glyph: string
  label: string
  x: number
  y: number
  color: string
}

export type Layer = {
  id: string
  name: string
  visible: boolean
}

const INITIAL_LAYERS: Layer[] = [
  { id: "diep", name: "Nền Điệp", visible: true },
  { id: "hoang", name: "Màu Hoàng", visible: true },
  { id: "luc", name: "Màu Lục", visible: true },
  { id: "son", name: "Màu Son", visible: true },
  { id: "den", name: "Nét Đen", visible: true },
]

export function CanvasEditor() {
  const [mode, setMode] = useState<Mode>("motif")
  const [motifs, setMotifs] = useState<PlacedMotif[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [layers, setLayers] = useState<Layer[]>(INITIAL_LAYERS)
  const [activeColor, setActiveColor] = useState("#B33E2B")
  const [zoom, setZoom] = useState(100)

  // Calibration
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [woodcut, setWoodcut] = useState(35)
  const [pearl, setPearl] = useState(20)

  // Undo / redo history
  const history = useRef<PlacedMotif[][]>([[]])
  const pointer = useRef(0)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  const commit = useCallback((next: PlacedMotif[]) => {
    history.current = history.current.slice(0, pointer.current + 1)
    history.current.push(next)
    pointer.current = history.current.length - 1
    setMotifs(next)
    setCanUndo(pointer.current > 0)
    setCanRedo(false)
  }, [])

  const undo = useCallback(() => {
    if (pointer.current <= 0) return
    pointer.current -= 1
    setMotifs(history.current[pointer.current])
    setCanUndo(pointer.current > 0)
    setCanRedo(true)
  }, [])

  const redo = useCallback(() => {
    if (pointer.current >= history.current.length - 1) return
    pointer.current += 1
    setMotifs(history.current[pointer.current])
    setCanRedo(pointer.current < history.current.length - 1)
    setCanUndo(true)
  }, [])

  const addMotif = useCallback(
    (glyph: string, label: string, x = 50, y = 50) => {
      const motif: PlacedMotif = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        glyph,
        label,
        x,
        y,
        color: activeColor,
      }
      commit([...motifs, motif])
      setSelectedId(motif.id)
    },
    [motifs, activeColor, commit],
  )

  const moveMotif = useCallback(
    (id: string, x: number, y: number) => {
      setMotifs((prev) =>
        prev.map((m) => (m.id === id ? { ...m, x, y } : m)),
      )
    },
    [],
  )

  const commitMove = useCallback(() => {
    commit(motifs)
  }, [motifs, commit])

  const recolorSelected = useCallback(
    (color: string) => {
      setActiveColor(color)
      if (selectedId) {
        commit(
          motifs.map((m) => (m.id === selectedId ? { ...m, color } : m)),
        )
      }
    },
    [selectedId, motifs, commit],
  )

  const toggleLayer = useCallback((id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)),
    )
  }, [])

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#121110] text-[#EADABF]">
      <EditorTopbar
        mode={mode}
        onModeChange={setMode}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <div className="flex min-h-0 flex-1">
        <MotifSidebar mode={mode} onPick={(g, l) => addMotif(g, l)} />
        <CanvasStage
          motifs={motifs}
          layers={layers}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onMove={moveMotif}
          onMoveEnd={commitMove}
          onDropMotif={addMotif}
          zoom={zoom}
          offsetX={offsetX}
          offsetY={offsetY}
          woodcut={woodcut}
          pearl={pearl}
        />
        <PropertiesPanel
          offsetX={offsetX}
          offsetY={offsetY}
          woodcut={woodcut}
          pearl={pearl}
          onOffsetX={setOffsetX}
          onOffsetY={setOffsetY}
          onWoodcut={setWoodcut}
          onPearl={setPearl}
          activeColor={activeColor}
          onColor={recolorSelected}
          layers={layers}
          onToggleLayer={toggleLayer}
          onAddText={(t) => addMotif("筆", t)}
        />
      </div>
      <EditorToolbar zoom={zoom} onZoom={setZoom} />
    </div>
  )
}
