"use client"

import { Button } from "@/components/ui/button"
import { LayeredWoodblock } from "@/components/layered-woodblock"
import { ArrowRight, Stamp } from "lucide-react"
import { useWorkshop } from "@/components/workshop-context"

export function Hero() {
  const { openEditor } = useWorkshop()
  return (
    <section className="relative overflow-hidden paper-grain">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-8 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1.5 text-xs font-600 uppercase tracking-wider text-secondary">
            <Stamp className="size-3.5" aria-hidden="true" />
            Xưởng khắc ấn số · Làng Đông Hồ
          </span>

          <h1 className="font-serif text-4xl font-900 leading-[1.05] tracking-tight text-balance text-foreground woodcut-text sm:text-5xl lg:text-6xl">
            Khắc một bản in,
            <br />
            <span className="text-primary">in một câu chuyện.</span>
          </h1>

          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Tái hiện nghệ thuật tranh dân gian Đông Hồ trên không gian số. Mỗi
            lớp màu là một bản khắc riêng — chọn mộc bản, canh từng lớp son,
            điệp và xuất bản tác phẩm mang dấu ấn của bạn.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={openEditor}
              className="stamp-press group bg-primary text-primary-foreground hover:bg-primary"
            >
              Bắt đầu khắc ấn
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary/40 bg-transparent text-foreground hover:bg-secondary/10 hover:text-foreground"
            >
              Xem bộ sưu tập
            </Button>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              { v: "120+", l: "Mộc bản gốc" },
              { v: "4 lớp", l: "In đa sắc" },
              { v: "350 năm", l: "Di sản nghề" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-serif text-2xl font-700 text-secondary">
                  {s.v}
                </dt>
                <dd className="text-xs text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <LayeredWoodblock />
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Di chuột để tách các lớp mộc bản · {"\u201C"}Mục đồng thổi sáo{"\u201D"}
          </p>
        </div>
      </div>
    </section>
  )
}
