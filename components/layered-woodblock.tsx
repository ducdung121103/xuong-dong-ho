"use client"

import { useRef, useState } from "react"

/**
 * Interactive layered woodblock canvas.
 * Represents the classic Đông Hồ motif "Mục đồng thổi sáo" (buffalo boy with flute).
 * On pointer move the registered color layers separate along the Z-axis, evoking
 * the multi-block printing process where each color is a separate carved block.
 */
const layers = [
  { label: "Nét đen", tz: 0, hue: "drop-shadow(0 0 0 transparent)", blend: "" },
  { label: "Đỏ son", tz: 38, tint: "sepia(1) saturate(6) hue-rotate(-18deg)", offset: { x: -10, y: 6 } },
  { label: "Vàng hòe", tz: 76, tint: "sepia(1) saturate(4) hue-rotate(8deg) brightness(1.15)", offset: { x: 12, y: -8 } },
  { label: "Xanh lá", tz: 114, tint: "sepia(1) saturate(3) hue-rotate(60deg)", offset: { x: -6, y: -14 } },
]

const IMG = "/dong-ho/buffalo-boy.png"

export function LayeredWoodblock() {
  const ref = useRef<HTMLDivElement>(null)
  const [rot, setRot] = useState({ x: 8, y: -14 })
  const [spread, setSpread] = useState(1)

  function handleMove(e: React.PointerEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setRot({ x: -py * 18 + 4, y: px * 26 - 6 })
    setSpread(1.7)
  }

  function handleLeave() {
    setRot({ x: 8, y: -14 })
    setSpread(1)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative mx-auto flex aspect-[4/5] w-full max-w-md items-center justify-center"
      style={{ perspective: "1400px" }}
      aria-label="Bản khắc tranh Đông Hồ Mục đồng thổi sáo phân tách theo lớp màu"
      role="img"
    >
      {/* Glow */}
      <div
        className="absolute inset-8 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="relative h-full w-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        }}
      >
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className="absolute inset-0 overflow-hidden rounded-lg border border-border shadow-2xl"
            style={{
              transform: `translateZ(${layer.tz * spread}px) translate(${
                (layer.offset?.x ?? 0) * spread
              }px, ${(layer.offset?.y ?? 0) * spread}px)`,
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
              filter: layer.tint,
              opacity: i === 0 ? 1 : 0.55,
              mixBlendMode: i === 0 ? "normal" : "multiply",
              backgroundColor: "#EDE8DE",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG || "/placeholder.svg"}
              alt=""
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>

      {/* Layer legend */}
      <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-2">
        {layers.map((l) => (
          <span
            key={l.label}
            className="rounded-full border border-border bg-card/90 px-2.5 py-1 text-[11px] font-500 text-muted-foreground backdrop-blur"
          >
            {l.label}
          </span>
        ))}
      </div>
    </div>
  )
}
