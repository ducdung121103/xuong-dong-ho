"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MOTIF_COLLECTION, CATEGORIES } from "@/lib/motif-data"
import { ChevronRight, Filter } from "lucide-react"

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("tat-ca")

  const filteredMotifs = activeCategory === "tat-ca"
    ? MOTIF_COLLECTION
    : MOTIF_COLLECTION.filter((m) => m.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#F9F5EE] text-[#3D3A35]">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C49A5C]/30 bg-[#C49A5C]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#C49A5C]">
            BỘ SƯU TẬP MỘC BẢN
          </span>
          <h1 className="font-serif text-4xl font-black tracking-tight text-[#22251B] sm:text-5xl woodcut-text">
            Kho tàng tranh dân gian
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[#3D3A35]">
            Mỗi bản khắc là một lát cắt văn hóa Việt, được số hóa và sẵn sàng cho sự sáng tạo của bạn. Hãy lọc các linh vật cát tường, tích cổ hay hoạt động dân dã bên dưới.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-12 flex flex-col gap-4 border-y border-[#C8BEA8] py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[#3D3A35]">
            <Filter className="size-4" />
            <span className="font-mono text-xs uppercase tracking-wider">Phân loại họa tiết</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`stamp-editor rounded-full px-4.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#AD3B2C] text-white shadow-[0_2px_10px_rgba(173,59,44,0.3)]"
                      : "border border-[#C8BEA8] text-[#3D3A35] hover:bg-[#EDE8DE] hover:text-[#22251B]"
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="mt-12 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
          {filteredMotifs.map((motif) => (
            <article
              key={motif.id}
              className="break-inside-avoid rounded-xl border border-[#C8BEA8] bg-[#E4DDD0] p-4 transition-all duration-300 hover:border-[#AD3B2C] hover:shadow-[0_10px_30px_rgba(173,59,44,0.1)] group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-lg bg-[#F9F5EE] paper-grain p-1 aspect-[4/3] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={motif.imageSrc}
                  alt={motif.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-103"
                />
              </div>

              {/* Info */}
              <div className="mt-4 flex flex-col gap-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold text-[#22251B] woodcut-text">
                    {motif.name}
                  </h2>
                  <span className="rounded bg-[#C49A5C]/10 border border-[#C49A5C]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#C49A5C]">
                    {CATEGORIES.find((c) => c.id === motif.category)?.label || motif.category}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#3D3A35] flex-1">
                  {motif.description}
                </p>

                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {motif.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-[#F9F5EE] px-2 py-0.5 text-[9px] text-[#3D3A35] border border-[#C8BEA8]/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredMotifs.length === 0 && (
          <div className="mt-20 flex flex-col items-center justify-center gap-4 text-center">
            <span className="text-4xl">🌾</span>
            <p className="font-serif text-lg italic text-[#3D3A35]">
              Không tìm thấy mộc bản nào trong danh mục này.
            </p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
