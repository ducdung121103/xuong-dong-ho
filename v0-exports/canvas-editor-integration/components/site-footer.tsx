import { Stamp } from "lucide-react"

const columns = [
  {
    title: "Xưởng",
    links: ["Mộc bản", "Bồi điệp", "Phối sắc", "Xuất bản"],
  },
  {
    title: "Khám phá",
    links: ["Bộ sưu tập", "Nghệ nhân", "Lịch sử nghề", "Triển lãm"],
  },
  {
    title: "Cộng đồng",
    links: ["Diễn đàn", "Hướng dẫn", "Sự kiện", "Liên hệ"],
  },
]

export function SiteFooter() {
  return (
    <footer className="paper-grain">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Stamp className="size-5" aria-hidden="true" />
              </span>
              <span className="font-serif text-lg font-700 text-foreground">
                Xưởng Đông Hồ
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Giữ gìn tinh hoa tranh dân gian Việt Nam trên không gian số.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-600 text-foreground">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Xưởng Đông Hồ. Lấy cảm hứng từ làng
            tranh Đông Hồ, Bắc Ninh.
          </p>
          <p className="text-xs text-muted-foreground">
            Khắc bằng tâm · In bằng điệp
          </p>
        </div>
      </div>
    </footer>
  )
}
