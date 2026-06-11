"use client"

import { Stamp, Undo2, Redo2, Download, ArrowLeft } from "lucide-react"
import type { Mode } from "@/components/editor/canvas-editor"

export function EditorTopbar({
  mode,
  onModeChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onGoHome,
}: {
  mode: Mode
  onModeChange: (m: Mode) => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  onGoHome: () => void
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-[#C8BEA8] bg-[#EDE8DE] px-4">
      {/* Left: back + logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onGoHome}
          className="stamp-editor flex items-center gap-1.5 rounded-md border border-[#C8BEA8] px-2.5 py-1.5 text-xs font-medium text-[#22251B] transition-colors hover:bg-[#F9F5EE] cursor-pointer"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Quay lại
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="flex size-7 items-center justify-center rounded-md bg-[#AD3B2C] text-[#F6ECD9]">
            <Stamp className="size-4" aria-hidden="true" />
          </span>
          <span className="font-serif text-sm font-bold tracking-tight">
            Xưởng Đông Hồ
          </span>
        </div>
      </div>

      {/* Center: Empty spacer */}
      <div className="flex-1" aria-hidden="true" />

      {/* Right: undo/redo + export */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border border-[#C8BEA8]">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className="stamp-editor flex size-8 items-center justify-center rounded-l-md text-[#22251B] transition-colors hover:bg-[#F9F5EE] disabled:opacity-30 cursor-pointer"
            aria-label="Hoàn tác"
          >
            <Undo2 className="size-4" aria-hidden="true" />
          </button>
          <span className="h-5 w-px bg-[#C8BEA8]" aria-hidden="true" />
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className="stamp-editor flex size-8 items-center justify-center rounded-r-md text-[#22251B] transition-colors hover:bg-[#F9F5EE] disabled:opacity-30 cursor-pointer"
            aria-label="Làm lại"
          >
            <Redo2 className="size-4" aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          className="stamp-editor flex items-center gap-2 rounded-md bg-[#AD3B2C] px-3.5 py-2 text-xs font-bold text-[#F6ECD9] transition-colors hover:bg-[#9d3625]"
        >
          <Download className="size-3.5" aria-hidden="true" />
          Xuất Bản Tranh
        </button>
      </div>
    </header>
  )
}
