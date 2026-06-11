"use client"

import { Palette } from "lucide-react"

type PresetItem = {
  key: string
  name: string
  desc: string
  style: React.CSSProperties
}

const PRESETS_LIST: PresetItem[] = [
  {
    key: "co-dien",
    name: "Cổ Điển",
    desc: "Bản in gốc, màu sắc cân bằng và chân thực nhất.",
    style: { backgroundColor: "#E4DDD0" },
  },
  {
    key: "tranh-go",
    name: "Tranh Gỗ",
    desc: "Đậm nét khắc, thớ gỗ thô sơ và mộc mạc.",
    style: { background: "linear-gradient(135deg, #8B5A2B 0%, #4A2E16 100%)" },
  },
  {
    key: "diep-nga",
    name: "Điệp Ngà",
    desc: "Phủ óng ánh của vỏ điệp giã nhuyễn, tông màu ngà ấm.",
    style: { background: "linear-gradient(135deg, #FFFDD0 0%, #D8C3A5 100%)" },
  },
  {
    key: "dem-lang",
    name: "Đêm Làng",
    desc: "Độ tương phản bóng tối sâu thẳm làng quê yên bình.",
    style: { background: "linear-gradient(135deg, #1E293B 0%, #0B132B 100%)" },
  },
  {
    key: "phai-co",
    name: "Phai Cổ",
    desc: "Tông màu hoài niệm trầm tư phai nhòa theo thời gian.",
    style: { background: "linear-gradient(135deg, #C4A484 0%, #8E7051 100%)" },
  },
  {
    key: "muc-tuoi",
    name: "Mực Tươi",
    desc: "Mực tàu cô đặc đen bóng, viền nét sắc lạnh.",
    style: { background: "linear-gradient(135deg, #333333 0%, #000000 100%)" },
  },
]

export function MotifSidebar({
  mode,
  activePreset,
  onApplyPreset,
}: {
  mode: string
  activePreset: string | null
  onApplyPreset: (key: string) => void
}) {
  return (
    <aside className="flex w-[320px] shrink-0 flex-col border-r border-[#C8BEA8] bg-[#EDE8DE]">
      {/* Title */}
      <div className="border-b border-[#C8BEA8] p-4 flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-md bg-[#B33E2B] text-white">
          <Palette className="size-4" aria-hidden="true" />
        </span>
        <h2 className="font-serif text-sm font-bold text-[#22251B]">
          PHONG CÁCH TRANH
        </h2>
      </div>

      {/* Preset List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {PRESETS_LIST.map((preset) => {
          const isActive = activePreset === preset.key
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => onApplyPreset(preset.key)}
              className={`w-full text-left flex items-start gap-4 rounded-xl border p-3.5 transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-[#B33E2B] bg-[#F9F5EE] shadow-[0_4px_12px_rgba(179,62,43,0.08)] scale-[1.01]"
                  : "border-[#C8BEA8] bg-[#E4DDD0]/60 hover:bg-[#E4DDD0] hover:border-[#22251B]/50"
              }`}
              aria-pressed={isActive}
            >
              {/* Color Box indicator */}
              <span
                className="size-10 shrink-0 rounded-lg border border-[#C8BEA8]/50 shadow-inner"
                style={preset.style}
                aria-hidden="true"
              />

              {/* Text */}
              <div className="space-y-1">
                <p
                  className={`font-serif text-sm font-bold ${
                    isActive ? "text-[#B33E2B]" : "text-[#22251B]"
                  }`}
                >
                  {preset.name}
                </p>
                <p className="text-[11px] leading-relaxed text-[#3D3A35]">
                  {preset.desc}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer hint */}
      <div className="border-t border-[#C8BEA8] p-4 bg-[#EDE8DE]">
        <p className="text-[11px] leading-relaxed text-center text-[#3D3A35]">
          Nhấp chọn phong cách để đổi bộ lọc nhanh. Bạn có thể tự tinh chỉnh thêm thông số ở bảng bên phải.
        </p>
      </div>
    </aside>
  )
}
