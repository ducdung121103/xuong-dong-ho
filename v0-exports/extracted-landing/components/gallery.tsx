const prints = [
  {
    src: "/woodblock/rooster.png",
    title: "Gà Đại Cát",
    note: "Biểu tượng thịnh vượng, may mắn đầu năm",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/woodblock/four-maidens.png",
    title: "Tố Nữ",
    note: "Bốn nàng cầm sáo, đàn, quạt và múa",
    span: "",
  },
  {
    src: "/woodblock/carp-children.png",
    title: "Em bé cưỡi cá chép",
    note: "Ước vọng vượt vũ môn, đỗ đạt",
    span: "",
  },
  {
    src: "/woodblock/journey-west.png",
    title: "Tây Du Ký",
    note: "Thầy trò Đường Tăng trên đường thỉnh kinh",
    span: "sm:col-span-2",
  },
  {
    src: "/woodblock/scholar-flute.png",
    title: "Thổi sáo dạo chơi",
    note: "Cảnh nho sĩ ngân nga bên người đẹp",
    span: "",
  },
  {
    src: "/woodblock/elephant-goddess.png",
    title: "Bà chúa cưỡi voi",
    note: "Tích cổ về nữ thần uy nghi",
    span: "",
  },
  {
    src: "/woodblock/lantern-children.png",
    title: "Rước đèn Trung Thu",
    note: "Trẻ thơ với đèn ông sao và đầu lân",
    span: "sm:col-span-2",
  },
]

export function Gallery() {
  return (
    <section id="bo-suu-tap" className="paper-grain">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="text-xs font-600 uppercase tracking-wider text-secondary">
              Bộ sưu tập mộc bản
            </span>
            <h2 className="mt-3 font-serif text-3xl font-700 tracking-tight text-balance text-foreground sm:text-4xl">
              Kho tàng tranh dân gian
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            Từ con gà Đại Cát đến Tố Nữ — mỗi bản khắc là một lát cắt văn hóa
            Việt, sẵn sàng cho bạn tái diễn giải.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[220px]">
          {prints.map((p) => (
            <article
              key={p.title}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card ${p.span}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src || "/placeholder.svg"}
                alt={`Tranh dân gian Đông Hồ: ${p.title}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-1 p-4 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="font-serif text-base font-700 text-foreground woodcut-text">
                  {p.title}
                </h3>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {p.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
