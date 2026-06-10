"use client"

import { useRef, useState, useEffect, type PointerEvent as ReactPointerEvent } from "react"
import type { PlacedMotif, Layer } from "@/components/editor/canvas-editor"

/**
 * Canvas Stage — Giấy Điệp digital paper
 *
 * Initializes a Fabric.js canvas instance on mount for future advanced
 * manipulation (SVG motifs, AI images, text rendering, export).
 * The emoji-based motif overlay is preserved for backward compatibility.
 */
export function CanvasStage({
  motifs,
  selectedId,
  onSelect,
  onMove,
  onMoveEnd,
  onDropMotif,
  zoom,
  offsetX,
  offsetY,
  woodcut,
  pearl,
}: {
  motifs: PlacedMotif[]
  layers: Layer[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onMove: (id: string, x: number, y: number) => void
  onMoveEnd: () => void
  onDropMotif: (glyph: string, label: string, x: number, y: number) => void
  zoom: number
  offsetX: number
  offsetY: number
  woodcut: number
  pearl: number
}) {
  const paperRef = useRef<HTMLDivElement>(null)
  const canvasElRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<any>(null)
  const dragId = useRef<string | null>(null)
  const [dropActive, setDropActive] = useState(false)

  /**
   * Fabric.js Canvas Initialization
   * Creates the canvas instance once on mount and cleans up on unmount.
   * The canvas is overlaid on the paper sheet for advanced features.
   */
  useEffect(() => {
    let mounted = true

    async function initFabric() {
      if (!canvasElRef.current || fabricRef.current) return

      try {
        const fabricModule = await import("fabric")
        if (!mounted) return

        const canvas = new fabricModule.Canvas(canvasElRef.current, {
          width: 420,
          height: 540,
          backgroundColor: "transparent",
          selection: true,
          preserveObjectStacking: true,
        })

        fabricRef.current = canvas
      } catch {
        // Fabric.js not available — gracefully degrade to emoji overlay
      }
    }

    initFabric()

    return () => {
      mounted = false
      if (fabricRef.current) {
        fabricRef.current.dispose()
        fabricRef.current = null
      }
    }
  }, [])

  function pointToPercent(clientX: number, clientY: number) {
    const rect = paperRef.current?.getBoundingClientRect()
    if (!rect) return { x: 50, y: 50 }
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    return {
      x: Math.max(4, Math.min(96, x)),
      y: Math.max(4, Math.min(96, y)),
    }
  }

  function handlePointerDown(e: ReactPointerEvent, id: string) {
    e.stopPropagation()
    dragId.current = id
    onSelect(id)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: ReactPointerEvent) {
    if (!dragId.current) return
    const { x, y } = pointToPercent(e.clientX, e.clientY)
    onMove(dragId.current, x, y)
  }

  function handlePointerUp() {
    if (dragId.current) {
      dragId.current = null
      onMoveEnd()
    }
  }

  return (
    <div
      className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden bg-[#121110] p-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 40%, rgba(176,124,48,0.06), transparent 70%)",
      }}
      onClick={() => onSelect(null)}
      onDragOver={(e) => {
        e.preventDefault()
        setDropActive(true)
      }}
      onDragLeave={() => setDropActive(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDropActive(false)
        const raw = e.dataTransfer.getData("application/x-motif")
        if (raw) {
          const { glyph, label } = JSON.parse(raw)
          const { x, y } = pointToPercent(e.clientX, e.clientY)
          onDropMotif(glyph, label, x, y)
        }
      }}
    >
      {/* Zoom wrapper */}
      <div
        className="relative transition-transform duration-150"
        style={{ transform: `scale(${zoom / 100})` }}
      >
        {/* Registration peg top */}
        <Peg className="left-1/2 top-0 -translate-x-1/2 -translate-y-[140%]" />

        {/* Paper sheet — Giấy Điệp */}
        <div
          ref={paperRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="deckle relative h-[540px] w-[420px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
          style={{
            backgroundColor: "#F4E7D3",
            transform: `translate(${offsetX}px, ${offsetY}px)`,
          }}
        >
          {/* Fabric.js canvas overlay */}
          <canvas
            ref={canvasElRef}
            className="absolute inset-0 z-10"
            style={{ pointerEvents: "none" }}
          />

          {/* Woodgrain texture overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: woodcut / 100,
              backgroundImage:
                "repeating-linear-gradient(92deg, rgba(88,50,32,0.18) 0px, rgba(88,50,32,0.18) 1px, transparent 1px, transparent 5px)",
            }}
            aria-hidden="true"
          />
          {/* Pearlescent điệp sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: pearl / 100,
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.5), transparent 45%, rgba(176,124,48,0.25))",
            }}
            aria-hidden="true"
          />

          {/* Registration guide cross */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[rgba(88,50,32,0.12)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[rgba(88,50,32,0.12)]" />
            <div className="absolute inset-4 border border-dashed border-[rgba(88,50,32,0.18)]" />
          </div>

          {/* Empty placeholder */}
          {motifs.length === 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-8">
              <p className="text-center font-serif text-base italic text-[rgba(88,50,32,0.5)]">
                {dropActive ? "Thả để đặt bản khắc" : "Kéo thả bản khắc vào đây"}
              </p>
            </div>
          )}

          {/* Placed motifs */}
          {motifs.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => handlePointerDown(e, m.id)}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none select-none items-center justify-center rounded-md p-1 text-5xl leading-none transition-shadow active:cursor-grabbing ${
                selectedId === m.id
                  ? "ring-2 ring-[#B07C30] ring-offset-2 ring-offset-[#F4E7D3]"
                  : ""
              }`}
              style={{
                left: `${m.x}%`,
                top: `${m.y}%`,
                color: m.color,
                filter: `drop-shadow(1px 1px 0 rgba(18,17,16,0.25))`,
              }}
              aria-label={m.label}
            >
              <span style={{ mixBlendMode: "multiply" }}>{m.glyph}</span>
            </button>
          ))}
        </div>

        {/* Registration peg bottom */}
        <Peg className="bottom-0 left-1/2 -translate-x-1/2 translate-y-[140%]" />
      </div>

      {/* Drop highlight border */}
      {dropActive && (
        <div className="pointer-events-none absolute inset-4 rounded-xl border-2 border-dashed border-[#B07C30]" />
      )}
    </div>
  )
}

function Peg({ className }: { className: string }) {
  return (
    <div
      className={`absolute flex flex-col items-center ${className}`}
      aria-hidden="true"
    >
      <span className="size-3 rounded-full border-2 border-[#B07C30] bg-[#1E1C1A]" />
      <span className="font-mono text-[9px] uppercase tracking-wider text-[#A99672]">
        cối đăng ký
      </span>
    </div>
  )
}
