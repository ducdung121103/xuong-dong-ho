"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Stamp } from "lucide-react"
import { useAppStore } from "@/lib/store"
import Link from "next/link"

const navLinks = [
  { label: "Quy Trình", href: "/#quy-trinh" },
  { label: "Bộ Sưu Tập", href: "/bo-suu-tap" },
  { label: "Bản Khắc", href: "/#cta" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const setActiveView = useAppStore((s) => s.setActiveView)
  const openEditor = () => setActiveView("ai-generator")

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Stamp className="size-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-bold tracking-tight text-foreground">
            Xưởng Đông Hồ
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Điều hướng chính">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-muted hover:text-foreground"
          >
            Đăng Nhập
          </Button>
          <Button onClick={openEditor} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Vào Xưởng
          </Button>
        </div>

        <button
          className="flex size-10 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4" aria-label="Điều hướng di động">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                setOpen(false)
                openEditor()
              }}
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Vào Xưởng
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
