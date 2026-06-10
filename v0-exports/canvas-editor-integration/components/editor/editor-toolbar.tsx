"use client"

import { Type, Square, Frame, AlignCenter, ZoomIn, ZoomOut } from "lucide-react"

export function EditorToolbar({
  zoom,
  onZoom,
}: {
  zoom: number
  onZoom: (z: number) => void
}) {
  return (
    <footer className="flex h-14 shrink-0 items-center justify-between gap-4 border-t border-[rgba(176,124,48,0.15)] bg-[#1E1C1A] px-4">
      {/* Left toolbar group */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          title="Thêm chữ"
          className="stamp-editor flex size-9 items-center justify-center rounded-md text-[#EADABF] transition-colors hover:bg-[#121110]"
          aria-label="Thêm chữ"
        >
          <Type className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          title="Hình dạng"
          className="stamp-editor flex size-9 items-center justify-center rounded-md text-[#EADABF] transition-colors hover:bg-[#121110]"
          aria-label="Hình dạng"
        >
          <Square className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          title="Khung"
          className="stamp-editor flex size-9 items-center justify-center rounded-md text-[#EADABF] transition-colors hover:bg-[#121110]"
          aria-label="Khung"
        >
          <Frame className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          title="Căn chỉnh"
          className="stamp-editor flex size-9 items-center justify-center rounded-md text-[#EADABF] transition-colors hover:bg-[#121110]"
          aria-label="Căn chỉnh"
        >
          <AlignCenter className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* Right zoom controls */}
      <div className="flex items-center gap-2 rounded-lg border border-[rgba(176,124,48,0.2)] bg-[#121110] p-1">
        <button
          type="button"
          onClick={() => onZoom(Math.max(50, zoom - 10))}
          className="stamp-editor flex size-7 items-center justify-center rounded text-[#EADABF] transition-colors hover:bg-[#1E1C1A]"
          aria-label="Thu nhỏ"
        >
          <ZoomOut className="size-3.5" aria-hidden="true" />
        </button>
        <span className="w-10 text-center font-mono text-xs text-[#EADABF]">
          {zoom}%
        </span>
        <button
          type="button"
          onClick={() => onZoom(Math.min(200, zoom + 10))}
          className="stamp-editor flex size-7 items-center justify-center rounded text-[#EADABF] transition-colors hover:bg-[#1E1C1A]"
          aria-label="Phóng to"
        >
          <ZoomIn className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
