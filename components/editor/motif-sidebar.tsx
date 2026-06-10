"use client"

import { useState } from "react"
import { Search, Upload, Sparkles } from "lucide-react"
import type { Mode } from "@/components/editor/canvas-editor"

type Motif = { glyph: string; label: string; cat: string }

const MOTIFS: Motif[] = [
  { glyph: "🐖", label: "Lợn đàn", cat: "Linh vật" },
  { glyph: "🐓", label: "Gà trống", cat: "Linh vật" },
  { glyph: "🐟", label: "Cá chép", cat: "Linh vật" },
  { glyph: "🐉", label: "Rồng", cat: "Linh vật" },
  { glyph: "🐅", label: "Hổ", cat: "Linh vật" },
  { glyph: "🦚", label: "Chim công", cat: "Linh vật" },
  { glyph: "🌸", label: "Hoa sen", cat: "Cây cỏ" },
  { glyph: "🌿", label: "Cành trúc", cat: "Cây cỏ" },
  { glyph: "🍃", label: "Lá đa", cat: "Cây cỏ" },
  { glyph: "🌾", label: "Lúa vàng", cat: "Cây cỏ" },
  { glyph: "🌊", label: "Sóng nước", cat: "Mây Sóng" },
  { glyph: "☁️", label: "Mây lành", cat: "Mây Sóng" },
  { glyph: "福", label: "Phúc", cat: "Chữ Nôm" },
  { glyph: "祿", label: "Lộc", cat: "Chữ Nôm" },
  { glyph: "壽", label: "Thọ", cat: "Chữ Nôm" },
  { glyph: "🖼️", label: "Khung kép", cat: "Khung" },
  { glyph: "▢", label: "Khung vuông", cat: "Khung" },
]

const CATEGORIES = ["Linh vật", "Cây cỏ", "Mây Sóng", "Chữ Nôm", "Khung"]

export function MotifSidebar({
  mode,
  onPick,
}: {
  mode: Mode
  onPick: (glyph: string, label: string) => void
}) {
  const [query, setQuery] = useState("")
  const [cat, setCat] = useState("Linh vật")

  const filtered = MOTIFS.filter((m) => {
    const matchesCat = m.cat === cat
    const matchesQuery = query
      ? m.label.toLowerCase().includes(query.toLowerCase())
      : true
    return query ? matchesQuery : matchesCat
  })

  return (
    <aside className="flex w-[320px] shrink-0 flex-col border-r border-[rgba(176,124,48,0.15)] bg-[#1E1C1A]">
      {/* Search */}
      <div className="border-b border-[rgba(176,124,48,0.15)] p-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A99672]"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm họa tiết cổ..."
            className="w-full rounded-lg border border-[rgba(176,124,48,0.2)] bg-[#121110] py-2.5 pl-9 pr-3 text-sm text-[#EADABF] placeholder:text-[#A99672] focus:border-[#C49A5C] focus:outline-none"
          />
        </div>
      </div>

      {mode === "ai" ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-[#C49A5C]/15 text-[#C49A5C]">
            <Sparkles className="size-6" aria-hidden="true" />
          </span>
          <p className="font-serif text-sm font-semibold text-[#EADABF]">
            Chế độ AI tạo họa tiết
          </p>
          <p className="text-xs leading-relaxed text-[#A99672]">
            Mô tả họa tiết bạn muốn, AI sẽ phác thảo bản khắc theo phong cách
            Đông Hồ. Chuyển về chế độ A để dùng thư viện mộc bản.
          </p>
        </div>
      ) : (
        <>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-[rgba(176,124,48,0.15)] p-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCat(c)
                  setQuery("")
                }}
                className={`stamp-editor rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  cat === c && !query
                    ? "bg-[#AD3B2C] text-[#F6ECD9]"
                    : "border border-[rgba(176,124,48,0.2)] text-[#A99672] hover:text-[#EADABF]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Motif grid */}
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-2.5">
              {filtered.map((m, i) => (
                <button
                  key={`${m.glyph}-${i}`}
                  type="button"
                  onClick={() => onPick(m.glyph, m.label)}
                  className="motif-card group flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-[rgba(176,124,48,0.15)] bg-[#1E1C1A] transition-all hover:border-[#C49A5C]"
                >
                  <span className="text-3xl leading-none transition-transform group-active:scale-90">
                    {m.glyph}
                  </span>
                  <span className="text-[11px] text-[#A99672] group-hover:text-[#EADABF]">
                    {m.label}
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-2 py-8 text-center text-xs text-[#A99672]">
                  Không tìm thấy họa tiết phù hợp.
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Bottom action */}
      <div className="border-t border-[rgba(176,124,48,0.15)] p-3">
        <button
          type="button"
          className="stamp-editor flex w-full items-center justify-center gap-2 rounded-lg border border-[rgba(176,124,48,0.3)] bg-transparent py-2.5 text-xs font-semibold text-[#EADABF] transition-colors hover:bg-[#121110]"
        >
          <Upload className="size-3.5" aria-hidden="true" />
          Tải lên họa tiết tự do
        </button>
      </div>
    </aside>
  )
}
