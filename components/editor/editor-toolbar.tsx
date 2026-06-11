"use client"

import { RotateCcw, Undo2, Download, ZoomIn, ZoomOut, Upload } from "lucide-react"

export function EditorToolbar({
  zoom,
  onZoom,
  onReset,
  onUndo,
  canUndo,
  onExport,
  onUploadClick,
}: {
  zoom: number
  onZoom: (z: number) => void
  onReset: () => void
  onUndo: () => void
  canUndo: boolean
  onExport: () => void
  onUploadClick: () => void
}) {
  return (
    <footer className="relative flex h-14 shrink-0 items-center justify-between gap-4 border-t border-[#C8BEA8] bg-[#EDE8DE] px-4">
      {/* Left: Reset and Undo */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          className="stamp-editor flex h-9 items-center gap-1.5 rounded-lg border border-[#C8BEA8] bg-transparent px-3 text-xs font-semibold text-[#22251B] transition-colors hover:bg-[#F9F5EE] cursor-pointer"
          title="Đặt lại ảnh về ban đầu và reset các thanh trượt"
          aria-label="Đặt lại gốc"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          Đặt Lại Gốc
        </button>
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="stamp-editor flex h-9 items-center gap-1.5 rounded-lg border border-[#C8BEA8] bg-transparent px-3 text-xs font-semibold text-[#22251B] transition-colors hover:bg-[#F9F5EE] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          title="Hoàn tác bước chỉnh sửa gần nhất"
          aria-label="Hoàn tác"
        >
          <Undo2 className="size-3.5" aria-hidden="true" />
          ← Hoàn Tác
        </button>
      </div>
  
      {/* Middle: Upload from device */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          onClick={onUploadClick}
          className="stamp-editor flex h-9 items-center gap-1.5 rounded-lg border border-[#B33E2B] bg-[#F9F5EE] px-4 text-xs font-semibold text-[#B33E2B] transition-all hover:bg-[#B33E2B]/10 cursor-pointer shadow-sm hover:shadow active:scale-95"
          title="Tải ảnh từ máy tính của bạn lên để chỉnh sửa"
          aria-label="Tải ảnh từ máy"
        >
          <Upload className="size-3.5" aria-hidden="true" />
          Tải ảnh từ máy
        </button>
      </div>

      {/* Right: Zoom controls + Export button */}
      <div className="flex items-center gap-3">
        {/* Zoom Controls */}
        <div className="flex items-center rounded-lg border border-[#C8BEA8] bg-[#F9F5EE] p-1">
          <button
            type="button"
            onClick={() => onZoom(Math.max(50, zoom - 10))}
            className="stamp-editor flex size-7 items-center justify-center rounded text-[#22251B] transition-colors hover:bg-[#EDE8DE] cursor-pointer"
            aria-label="Thu nhỏ"
          >
            <ZoomOut className="size-3.5" aria-hidden="true" />
          </button>
          <span className="w-10 text-center font-mono text-xs font-bold text-[#22251B]">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={() => onZoom(Math.min(200, zoom + 10))}
            className="stamp-editor flex size-7 items-center justify-center rounded text-[#22251B] transition-colors hover:bg-[#EDE8DE] cursor-pointer"
            aria-label="Phóng to"
          >
            <ZoomIn className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Export PNG button */}
        <button
          type="button"
          onClick={onExport}
          className="stamp-editor flex h-9 items-center gap-1.5 rounded-lg bg-[#22251B] px-4 text-xs font-bold text-white transition-colors hover:bg-black/90 cursor-pointer"
          title="Tải ảnh đã chỉnh sửa từ Canvas về máy"
          aria-label="Xuất PNG"
        >
          <Download className="size-3.5" aria-hidden="true" />
          Xuất PNG ↓
        </button>
      </div>
    </footer>
  )
}
