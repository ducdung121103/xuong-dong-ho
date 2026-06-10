"use client"

import { useState } from "react"
import { Eye, EyeOff, GripVertical, ChevronDown, Check } from "lucide-react"
import type { Layer } from "@/components/editor/canvas-editor"
import { PALETTE_SWATCHES } from "@/lib/colors"

const SWATCHES = PALETTE_SWATCHES.map((c) => ({ hex: c.hex, name: c.name }))

const TEXT_PRESETS = ["Vinh Hoa", "Phú Quý", "Bình An", "Phúc Lộc", "An Khang"]

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  unit = "",
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  unit?: string
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-[#A99672]">{label}</span>
        <span className="font-mono text-xs text-[#EADABF]">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="editor-range w-full"
      />
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-b border-[rgba(176,124,48,0.15)] p-4">
      <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#C49A5C]">
        {title}
      </h3>
      {children}
    </section>
  )
}

export function PropertiesPanel({
  offsetX,
  offsetY,
  woodcut,
  pearl,
  onOffsetX,
  onOffsetY,
  onWoodcut,
  onPearl,
  activeColor,
  onColor,
  layers,
  onToggleLayer,
  onAddText,
}: {
  offsetX: number
  offsetY: number
  woodcut: number
  pearl: number
  onOffsetX: (v: number) => void
  onOffsetY: (v: number) => void
  onWoodcut: (v: number) => void
  onPearl: (v: number) => void
  activeColor: string
  onColor: (hex: string) => void
  layers: Layer[]
  onToggleLayer: (id: string) => void
  onAddText: (text: string) => void
}) {
  const [textOpen, setTextOpen] = useState(false)
  const [selectedText, setSelectedText] = useState(TEXT_PRESETS[0])

  return (
    <aside className="flex w-[300px] shrink-0 flex-col overflow-y-auto border-l border-[rgba(176,124,48,0.15)] bg-[#1E1C1A]">
      <Section title="Bản khắc & Calibration">
        <div className="flex flex-col gap-4">
          <Slider
            label="Lệch Trục Đăng Ký (X)"
            value={offsetX}
            min={-40}
            max={40}
            onChange={onOffsetX}
            unit="px"
          />
          <Slider
            label="Lệch Trục Đăng Ký (Y)"
            value={offsetY}
            min={-40}
            max={40}
            onChange={onOffsetY}
            unit="px"
          />
          <Slider
            label="Thớ Gỗ Xước"
            value={woodcut}
            min={0}
            max={100}
            onChange={onWoodcut}
            unit="%"
          />
          <Slider
            label="Ánh Điệp"
            value={pearl}
            min={0}
            max={100}
            onChange={onPearl}
            unit="%"
          />
        </div>
      </Section>

      <Section title="Bảng màu Đông Hồ">
        <div className="grid grid-cols-4 gap-2">
          {SWATCHES.map((s) => (
            <button
              key={s.hex}
              type="button"
              title={s.name}
              onClick={() => onColor(s.hex)}
              className={`stamp-editor relative flex aspect-square items-center justify-center rounded-md border transition-transform ${
                activeColor === s.hex
                  ? "border-[#EADABF]"
                  : "border-[rgba(176,124,48,0.25)]"
              }`}
              style={{ backgroundColor: s.hex }}
              aria-label={s.name}
              aria-pressed={activeColor === s.hex}
            >
              {activeColor === s.hex && (
                <Check
                  className="size-4 text-[#EADABF] mix-blend-difference"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-[#A99672]">
          Màu đang chọn áp dụng cho họa tiết kế tiếp hoặc đối tượng đang chọn.
        </p>
      </Section>

      <Section title="Lớp bản in">
        <ul className="flex flex-col gap-1.5">
          {layers.map((l) => (
            <li
              key={l.id}
              className="flex items-center gap-2 rounded-md border border-[rgba(176,124,48,0.15)] bg-[#121110] px-2 py-2"
            >
              <GripVertical
                className="size-4 cursor-grab text-[#A99672]"
                aria-hidden="true"
              />
              <span className="flex-1 text-sm text-[#EADABF]">{l.name}</span>
              <button
                type="button"
                onClick={() => onToggleLayer(l.id)}
                className="stamp-editor flex size-7 items-center justify-center rounded text-[#A99672] transition-colors hover:text-[#EADABF]"
                aria-label={l.visible ? `Ẩn lớp ${l.name}` : `Hiện lớp ${l.name}`}
                aria-pressed={l.visible}
              >
                {l.visible ? (
                  <Eye className="size-4" aria-hidden="true" />
                ) : (
                  <EyeOff className="size-4" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Chữ khắc">
        <div className="relative">
          <button
            type="button"
            onClick={() => setTextOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg border border-[rgba(176,124,48,0.2)] bg-[#121110] px-3 py-2.5 text-sm text-[#EADABF]"
            aria-expanded={textOpen}
          >
            {selectedText}
            <ChevronDown
              className={`size-4 text-[#A99672] transition-transform ${textOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          {textOpen && (
            <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-[rgba(176,124,48,0.2)] bg-[#1E1C1A] shadow-lg">
              {TEXT_PRESETS.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedText(t)
                      setTextOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-[#EADABF] transition-colors hover:bg-[#121110]"
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="button"
          onClick={() => onAddText(selectedText)}
          className="stamp-editor mt-3 w-full rounded-lg bg-[#265C41] py-2.5 text-xs font-bold text-[#EADABF] transition-colors hover:bg-[#2f6e4e]"
        >
          Khắc chữ {selectedText}
        </button>
      </Section>
    </aside>
  )
}
