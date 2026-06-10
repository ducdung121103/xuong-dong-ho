"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useWorkshop } from "@/components/workshop-context"

export function CtaSection() {
  const { openEditor } = useWorkshop()
  return (
    <section id="cta" className="border-y border-border bg-card">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <span className="text-xs font-600 uppercase tracking-wider text-secondary">
          Vào xưởng hôm nay
        </span>
        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-700 leading-tight tracking-tight text-balance text-foreground woodcut-text sm:text-4xl lg:text-5xl">
          Đặt bản khắc đầu tiên của bạn lên giấy điệp
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Tham gia cùng cộng đồng nghệ nhân số đang giữ gìn và làm mới tranh dân
          gian Đông Hồ. Miễn phí khắc bản in đầu tiên.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={openEditor}
            className="stamp-press group bg-primary text-primary-foreground hover:bg-primary"
          >
            Khắc ấn miễn phí
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-secondary/40 bg-transparent text-foreground hover:bg-secondary/10 hover:text-foreground"
          >
            Tìm hiểu về làng nghề
          </Button>
        </div>
      </div>
    </section>
  )
}
