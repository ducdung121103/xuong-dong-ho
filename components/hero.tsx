"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowRight, Stamp } from "lucide-react"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Hero() {
  const setActiveView = useAppStore((s) => s.setActiveView)

  return (
    <section className="relative overflow-hidden paper-grain">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-8 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
            <Stamp className="size-3.5" aria-hidden="true" />
            Xưởng khắc ấn số · Làng Đông Hồ
          </span>

          <h1 className="font-serif text-4xl font-black leading-[1.05] tracking-tight text-balance text-[#22251B] woodcut-text sm:text-5xl lg:text-6xl">
            Khắc một bản in,
            <br />
            <span className="text-[#B33E2B]">in một câu chuyện.</span>
          </h1>

          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Tái hiện nghệ thuật tranh dân gian Đông Hồ trên không gian số. Mỗi
            lớp màu là một bản khắc riêng — chọn mộc bản, canh từng lớp son,
            điệp và xuất bản tác phẩm mang dấu ấn của bạn.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={() => setActiveView("ai-generator")}
              className="stamp-press group bg-primary text-primary-foreground hover:bg-primary"
            >
              Tạo bản khắc ấn cho riêng bạn
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Link
              href="/bo-suu-tap"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-secondary/40 bg-transparent text-foreground hover:bg-secondary/10 hover:text-foreground cursor-pointer"
              )}
            >
              Xem bộ sưu tập
            </Link>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              { v: "120+", l: "Mộc bản gốc" },
              { v: "4 lớp", l: "In đa sắc" },
              { v: "350 năm", l: "Di sản nghề" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-serif text-2xl font-bold text-secondary">
                  {s.v}
                </dt>
                <dd className="text-xs text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto flex aspect-[4/5] w-full max-w-md items-center justify-center p-4">
          {/* Framed classic Đông Hồ painting decoration */}
          <div className="relative overflow-hidden rounded-2xl border-4 border-[#C8BEA8] bg-[#F4E7D3] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.22)] hover:scale-[1.01] w-full h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dong-ho/buffalo-boy.png"
              alt="Mục đồng thổi sáo - Tranh dân gian Đông Hồ"
              className="h-full w-full object-cover rounded-lg border border-[#C8BEA8]"
            />
            {/* Traditional red stamp */}
            <div className="absolute bottom-6 right-6 flex size-8 items-center justify-center rounded border border-[#B33E2B]/30 bg-[#F4E7D3]/95 font-serif text-[9px] font-bold text-[#B33E2B] opacity-90 select-none shadow-sm leading-tight text-center">
              Đông
              <br />
              Hồ
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
