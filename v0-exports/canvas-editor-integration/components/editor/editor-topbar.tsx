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
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-[rgba(176,124,48,0.15)] bg-[#1E1C1A] px-4">
      {/* Left: back + logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onGoHome}
          className="stamp-editor flex items-center gap-1.5 rounded-md border border-[rgba(176,124,48,0.2)] px-2.5 py-1.5 text-xs font-medium text-[#EADABF] transition-colors hover:bg-[#121110]"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Quay lại
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="flex size-7 items-center justify-center rounded-md bg-[#B33E2B] text-[#F6ECD9]">
            <Stamp className="size-4" aria-hidden="true" />
          </span>
          <span className="font-serif text-sm font-bold tracking-tight">
            Xưởng Đông Hồ
          </span>
        </div>
      </div>

      {/* Center: mode switch */}
      <div className="flex items-center rounded-lg border border-[rgba(176,124,48,0.2)] bg-[#121110] p-1">
        {(
          [
            { key: "motif", label: "A · Mộc bản" },
            { key: "ai", label: "B · AI" },
          ] as const
        ).map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => onModeChange(m.key)}
            className={`stamp-editor rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              mode === m.key
                ? "bg-[#B07C30] text-[#1A1714]"
                : "text-[#A99672] hover:text-[#EADABF]"
            }`}
            aria-pressed={mode === m.key}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Right: undo/redo + export */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border border-[rgba(176,124,48,0.2)]">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className="stamp-editor flex size-8 items-center justify-center rounded-l-md text-[#EADABF] transition-colors hover:bg-[#121110] disabled:opacity-30"
            aria-label="Hoàn tác"
          >
            <Undo2 className="size-4" aria-hidden="true" />
          </button>
          <span className="h-5 w-px bg-[rgba(176,124,48,0.2)]" aria-hidden="true" />
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className="stamp-editor flex size-8 items-center justify-center rounded-r-md text-[#EADABF] transition-colors hover:bg-[#121110] disabled:opacity-30"
            aria-label="Làm lại"
          >
            <Redo2 className="size-4" aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          className="stamp-editor flex items-center gap-2 rounded-md bg-[#B33E2B] px-3.5 py-2 text-xs font-bold text-[#F6ECD9] transition-colors hover:bg-[#9d3625]"
        >
          <Download className="size-3.5" aria-hidden="true" />
          Xuất Bản Tranh
        </button>
      </div>
    </header>
  )
}
