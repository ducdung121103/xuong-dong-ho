"use client"

import { Trees, Brush, Layers, Newspaper, ArrowRight } from "lucide-react"
import { useAppStore } from "@/lib/store"

const steps = [
  {
    icon: Trees,
    no: "01",
    title: "Chọn mộc bản",
    desc: "Duyệt thư viện mộc bản gốc được số hóa từ các nghệ nhân làng Đông Hồ.",
  },
  {
    icon: Layers,
    no: "02",
    title: "Tách lớp màu",
    desc: "Mỗi sắc — đỏ son, vàng hòe, xanh lá, nét đen — là một bản khắc riêng.",
  },
  {
    icon: Brush,
    no: "03",
    title: "Bồi điệp & phối sắc",
    desc: "Phủ nền điệp óng ánh từ vỏ sò, rồi pha màu tự nhiên theo pigment cổ.",
  },
  {
    icon: Newspaper,
    no: "04",
    title: "In & xuất bản",
    desc: "Hợp nhất các lớp thành một tác phẩm hoàn chỉnh và chia sẻ bản in.",
  },
]

export function Process() {
  const setActiveView = useAppStore((s) => s.setActiveView)

  return (
    <section id="quy-trinh" className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
            Quy trình khắc ấn
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
            Bốn lớp khắc, một tác phẩm
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Quy trình in tranh Đông Hồ truyền thống được tái hiện thành các bước
            số hóa rõ ràng, giữ trọn tinh thần thủ công.
          </p>
        </div>

        {/* Unified interactive workflow panel */}
        <div className="stamp-press mt-14 overflow-hidden rounded-2xl border border-secondary/30 bg-background shadow-[0_1px_0_rgba(176,124,48,0.15)]">
          {/* Panel header bar */}
          <div className="flex items-center justify-between gap-4 border-b border-border bg-card/60 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-secondary" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-[#265C41]" aria-hidden="true" />
              <span className="ml-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Bảng điều khiển xưởng khắc
              </span>
            </div>
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              4 lớp · sẵn sàng
            </span>
          </div>

          <div className="grid gap-px bg-border md:grid-cols-[1.4fr_1fr]">
            {/* Steps strip */}
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {steps.map((step) => (
                <div
                  key={step.no}
                  className="group flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-card/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary transition-transform group-hover:scale-95">
                      <step.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-serif text-2xl font-bold text-border transition-colors group-hover:text-secondary/40">
                      {step.no}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Central action card */}
            <div className="flex flex-col items-center justify-center gap-5 bg-background p-8 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
                <Layers className="size-3.5" aria-hidden="true" />
                Quy trình đa lớp
              </span>
              <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
                Mở xưởng khắc số và thực hiện toàn bộ bốn lớp in trong một không
                gian làm việc duy nhất.
              </p>
              <button
                type="button"
                onClick={() => setActiveView("ai-generator")}
                className="stamp-press group flex w-full max-w-xs flex-col items-center gap-1.5 rounded-xl bg-primary px-6 py-5 text-primary-foreground shadow-sm transition-colors hover:bg-primary/95"
              >
                <span className="flex items-center gap-2 font-serif text-base font-bold leading-tight text-balance">
                  Kích Hoạt Quy Trình Khắc Ấn Đa Lớp
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-xs font-medium opacity-80">
                  Vào xưởng khắc số ngay
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
