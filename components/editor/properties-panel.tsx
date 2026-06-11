"use client"

import type { FilterSettings } from "@/components/editor/canvas-editor"

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  onPointerUp,
  unit = "",
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  onPointerUp: () => void
  unit?: string
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-[#3D3A35]">{label}</span>
        <span className="font-mono text-xs text-[#22251B]">
          {value > 0 &&
          ["Nhiệt Độ Màu", "Đỏ Son", "Vàng Hòe", "Xanh Lục"].includes(label)
            ? `+${value}`
            : value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerUp={onPointerUp}
        onTouchEnd={onPointerUp}
        className="editor-range w-full cursor-ew-resize"
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
    <section className="border-b border-[#C8BEA8] p-4">
      <h3 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-[#B33E2B]">
        {title}
      </h3>
      {children}
    </section>
  )
}

export function PropertiesPanel({
  filters,
  onFilterChange,
  onSliderPointerUp,
}: {
  filters: FilterSettings
  onFilterChange: (key: keyof FilterSettings, value: number) => void
  onSliderPointerUp: () => void
}) {
  return (
    <aside className="flex w-[300px] shrink-0 flex-col overflow-y-auto border-l border-[#C8BEA8] bg-[#EDE8DE]">
      {/* Group 1: Ánh Sáng */}
      <Section title="▼ ÁNH SÁNG">
        <div className="flex flex-col gap-4">
          <Slider
            label="Độ Sáng"
            value={filters.brightness}
            min={50}
            max={150}
            onChange={(v) => onFilterChange("brightness", v)}
            onPointerUp={onSliderPointerUp}
            unit="%"
          />
          <Slider
            label="Độ Tương Phản"
            value={filters.contrast}
            min={50}
            max={150}
            onChange={(v) => onFilterChange("contrast", v)}
            onPointerUp={onSliderPointerUp}
            unit="%"
          />
          <Slider
            label="Độ Bão Hòa"
            value={filters.saturate}
            min={0}
            max={200}
            onChange={(v) => onFilterChange("saturate", v)}
            onPointerUp={onSliderPointerUp}
            unit="%"
          />
          <Slider
            label="Nhiệt Độ Màu"
            value={filters.warmth}
            min={-50}
            max={50}
            onChange={(v) => onFilterChange("warmth", v)}
            onPointerUp={onSliderPointerUp}
          />
        </div>
      </Section>

      {/* Group 2: Chất Liệu Giấy Dó */}
      <Section title="▼ CHẤT LIỆU GIẤY DÓ">
        <div className="flex flex-col gap-4">
          <Slider
            label="Hạt Giấy Dó"
            value={filters.grain}
            min={0}
            max={100}
            onChange={(v) => onFilterChange("grain", v)}
            onPointerUp={onSliderPointerUp}
            unit="%"
          />
          <Slider
            label="Ánh Điệp (óng)"
            value={filters.pearl}
            min={0}
            max={100}
            onChange={(v) => onFilterChange("pearl", v)}
            onPointerUp={onSliderPointerUp}
            unit="%"
          />
          <Slider
            label="Thớ Gỗ Mộc Bản"
            value={filters.woodcut}
            min={0}
            max={100}
            onChange={(v) => onFilterChange("woodcut", v)}
            onPointerUp={onSliderPointerUp}
            unit="%"
          />
          <Slider
            label="Lệch Màu In"
            value={filters.misregistration}
            min={0}
            max={15}
            onChange={(v) => onFilterChange("misregistration", v)}
            onPointerUp={onSliderPointerUp}
            unit="px"
          />
        </div>
      </Section>

      {/* Group 3: Nét & Bóng */}
      <Section title="▼ NÉT & BÓNG">
        <div className="flex flex-col gap-4">
          <Slider
            label="Nét Viền Sắc"
            value={filters.sharpness}
            min={0}
            max={100}
            onChange={(v) => onFilterChange("sharpness", v)}
            onPointerUp={onSliderPointerUp}
            unit="%"
          />
          <Slider
            label="Đổ Bóng Ngoài"
            value={filters.shadow}
            min={0}
            max={50}
            onChange={(v) => onFilterChange("shadow", v)}
            onPointerUp={onSliderPointerUp}
            unit="px"
          />
          <Slider
            label="Mờ Góc (Vignette)"
            value={filters.vignette}
            min={0}
            max={100}
            onChange={(v) => onFilterChange("vignette", v)}
            onPointerUp={onSliderPointerUp}
            unit="%"
          />
        </div>
      </Section>

      {/* Group 4: Tông Màu Đông Hồ */}
      <Section title="▼ TÔNG MÀU ĐÔNG HỒ">
        <div className="flex flex-col gap-4">
          <Slider
            label="Đỏ Son"
            value={filters.redShift}
            min={-50}
            max={50}
            onChange={(v) => onFilterChange("redShift", v)}
            onPointerUp={onSliderPointerUp}
          />
          <Slider
            label="Vàng Hòe"
            value={filters.yellowShift}
            min={-50}
            max={50}
            onChange={(v) => onFilterChange("yellowShift", v)}
            onPointerUp={onSliderPointerUp}
          />
          <Slider
            label="Xanh Lục"
            value={filters.greenShift}
            min={-50}
            max={50}
            onChange={(v) => onFilterChange("greenShift", v)}
            onPointerUp={onSliderPointerUp}
          />
        </div>
      </Section>
    </aside>
  )
}
