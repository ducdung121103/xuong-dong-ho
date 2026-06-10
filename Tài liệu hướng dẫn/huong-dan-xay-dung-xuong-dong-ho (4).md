# 🎨 Hướng Dẫn Toàn Bộ: Xây Dựng "Xưởng Đông Hồ"
### Dành cho người mới bắt đầu — 100% công cụ miễn phí

---

> **Thời gian dự kiến:** 7–10 ngày (2–3 tiếng/ngày)
> **Trình độ cần thiết:** Không cần biết lập trình
> **Chi phí:** 0 đồng

---

## MỤC LỤC

- [GIAI ĐOẠN 0 — Chuẩn bị (Ngày 1)](#giai-đoạn-0)
- [GIAI ĐOẠN 1 — Lên ý tưởng với Google AI Studio (Ngày 2)](#giai-đoạn-1)
- [GIAI ĐOẠN 2 — Thiết kế UI với v0.dev (Ngày 3–4)](#giai-đoạn-2)
- [GIAI ĐOẠN 3 — Tạo animation với Kling (Ngày 5)](#giai-đoạn-3)
- [GIAI ĐOẠN 4 — Build hoàn chỉnh với Antigravity (Ngày 6–9)](#giai-đoạn-4)
- [GIAI ĐOẠN 5 — Deploy & xuất bản (Ngày 10)](#giai-đoạn-5)
- [PHỤ LỤC — Kho tài liệu tham khảo](#phụ-lục)

---

## GIAI ĐOẠN 0 — Chuẩn Bị {#giai-đoạn-0}
### Ngày 1 — Đăng ký tài khoản và thu thập tài liệu

---

### Bước 0.1 — Đăng ký 5 tài khoản miễn phí

Mở trình duyệt Chrome, đăng ký lần lượt — tất cả đều dùng email Google là nhanh nhất:

| # | Công cụ | Link đăng ký | Dùng để làm gì |
|---|---|---|---|
| 1 | **Google AI Studio** | aistudio.google.com | Lên ý tưởng, phân tích ảnh |
| 2 | **v0.dev** | v0.dev | Tạo giao diện từ mô tả |
| 3 | **Kling AI** | klingai.com | Tạo video animation |
| 4 | **Google Antigravity** | antigravity.dev | Viết code + deploy website |
| 5 | **GitHub** | github.com | Lưu code, không bị mất |

> ⚡ **Mẹo**: Tất cả đều có nút "Sign in with Google" — chỉ cần click là xong, không cần điền form.

---

### Bước 0.2 — Thu thập tài liệu tham khảo (Quan trọng nhất!)

AI hoạt động tốt hơn rất nhiều khi có ảnh tham khảo. Dành 1–2 tiếng để thu thập.

#### 📌 Nguồn 1: Pinterest — Ảnh phong cách Đông Hồ

1. Vào **pinterest.com** (không cần đăng ký)
2. Tìm kiếm lần lượt các từ khóa sau, tải ảnh đẹp nhất về máy:

```
Tìm kiếm trên Pinterest:
- "tranh dong ho vietnam folk art"
- "dong ho painting woodblock print"  
- "vietnamese folk art motif"
- "tranh Đông Hồ lợn gà"
- "Vietnamese new year folk painting"
```

3. Tạo thư mục `xuong-dong-ho/references/` trên máy tính
4. Lưu ít nhất **15 ảnh** về thư mục này

#### 📌 Nguồn 2: Google Images — Ảnh chất lượng cao

Vào **images.google.com**, tìm kiếm và chọn "Tools > Size > Large":

```
Tìm kiếm trên Google Images:
- "tranh dân gian Đông Hồ site:baotanglichsu.vn"
- "dong ho folk painting high resolution"
- "Vietnamese woodblock print motif vector"
- "làng tranh Đông Hồ Bắc Ninh"
```

#### 📌 Nguồn 3: Website bảo tàng & tổ chức (tải miễn phí)

Đây là nguồn ảnh chất lượng nhất, có bản quyền rõ ràng để học tập:

```
Các website cần ghé thăm:

1. baotanghistory.vn — Bảo tàng Lịch sử Quốc gia VN
   → Tìm: "tranh Đông Hồ" trong bộ sưu tập

2. vietnammuseum.com.vn — Bảo tàng Mỹ thuật VN  
   → Có nhiều ảnh tranh dân gian

3. commons.wikimedia.org
   → Tìm: "Category:Đông Hồ paintings"
   → Tất cả ảnh ở đây đều miễn phí dùng

4. metmuseum.org/art/collection
   → Tìm: "Vietnamese folk art"
   → Museum cho phép dùng ảnh tự do
```

#### 📌 Nguồn 4: SVG motif dân gian miễn phí

```
Tải SVG motif tại:

1. freepik.com — tìm "vietnamese folk art vector" (filter: free)
2. vecteezy.com — tìm "dong ho vietnam" (filter: free license)
3. svgrepo.com — tìm "folk art" (tất cả đều free)
4. flaticon.com — tìm "lotus vietnam" "dragon vietnam"
```

#### 📌 Nguồn 5: Ảnh màu sắc Đông Hồ truyền thống

Tải ảnh bảng màu tại: **colorpalettes.net**
Tìm: "Vietnamese traditional colors" → lưu ảnh bảng màu về

---

### Bước 0.3 — Tổ chức thư mục tài liệu

Tạo cấu trúc thư mục này trên máy tính:

```
📁 xuong-dong-ho/
├── 📁 references/
│   ├── 📁 tranh-dong-ho/        ← ảnh tranh thật
│   ├── 📁 ui-inspiration/       ← web app đẹp cần học hỏi
│   ├── 📁 motif-svg/            ← file SVG đã tải về
│   └── 📁 color-palette/        ← ảnh bảng màu
├── 📁 ai-outputs/               ← kết quả từ AI Studio
├── 📁 v0-exports/               ← code từ v0.dev
└── 📁 animations/               ← video từ Kling
```

#### Tìm thêm ảnh UI web app đẹp để học hỏi:

```
Vào dribbble.com và tìm:
- "folk art digital app"
- "cultural heritage web design"
- "canvas editor UI dark"
- "creative tool web app"

→ Lưu 5-10 ảnh vào thư mục ui-inspiration/
```

---

## GIAI ĐOẠN 1 — Lên Ý Tưởng với Google AI Studio {#giai-đoạn-1}
### Ngày 2 — Dùng AI phân tích ảnh và tạo concept

---

### Bước 1.1 — Cách dùng Google AI Studio

1. Vào **aistudio.google.com**
2. Click **"Create new prompt"** (nút xanh góc trái)
3. Chọn model **"Gemini 2.5 Flash"** (góc trên phải, free và nhanh nhất)
4. Bật **"Streaming"** nếu có

---

### Bước 1.2 — Phân tích ảnh tham khảo

Click biểu tượng **📎 (đính kèm file)**, upload 3–5 ảnh tranh Đông Hồ tốt nhất, rồi dán prompt này:

```
PROMPT 1.A — PHÂN TÍCH PHONG CÁCH:

Tôi đang xây dựng web app tên "Xưởng Đông Hồ" — nơi người dùng 
tạo tranh dân gian số hoá theo phong cách Đông Hồ của Việt Nam.

Hãy phân tích kỹ các hình ảnh tranh Đông Hồ tôi upload và cho tôi biết:

1. MÀUTHẮC: Liệt kê chính xác 8-10 màu chủ đạo với mã hex
2. ĐƯỜNG NÉT: Mô tả phong cách đường viền, nét khắc
3. BỐ CỤC: Cách sắp xếp các motif trong tranh
4. MOTIF PHỔ BIẾN: Liệt kê 20 motif thường xuất hiện nhất
5. CẢM XÚC: Tranh tạo ra cảm giác gì? Ấm áp? Vui tươi?

Sau đó, đề xuất:
- 3 concept Hero Section cho web app này
- Palette màu hex chính xác cho giao diện (6 màu)
- Font chữ Google Fonts phù hợp nhất
```

Sau khi nhận kết quả, tiếp tục với:

```
PROMPT 1.B — CONCEPT UI:

Dựa trên phân tích trên, hãy mô tả chi tiết concept giao diện 
cho "Xưởng Đông Hồ" theo format sau:

---CONCEPT UI---
Tên concept: [tên gợi cảm]
Màu nền chính: #...
Màu text: #...
Màu accent: #...
Màu button: #...
Font hiển thị: [tên Google Font]
Font nội dung: [tên Google Font]

Bố cục Hero Section:
[Mô tả chi tiết]

Bố cục thanh công cụ bên trái (Tool Sidebar):
[Mô tả chi tiết]

Bố cục Canvas chính giữa:
[Mô tả chi tiết]

Hiệu ứng đặc trưng:
[Mô tả 2-3 animation đặc trưng]
```

---

### Bước 1.3 — Tạo mô tả kỹ thuật cho v0

Sau khi có concept, dùng prompt này để chuẩn bị cho bước tiếp theo:

```
PROMPT 1.C — CHUẨN BỊ CHO V0.DEV:

Bây giờ hãy viết một prompt thật chi tiết bằng tiếng Anh 
để tôi dán vào v0.dev nhằm tạo giao diện "Xưởng Đông Hồ".

Prompt cần:
1. Mô tả toàn bộ layout (sidebar + canvas + toolbar)
2. Bao gồm màu hex chính xác
3. Nêu rõ font chữ
4. Mô tả các component: 
   - Navigation bar
   - Left sidebar (Motif Browser)
   - Main Canvas area
   - Right panel (Properties)
   - Bottom toolbar
5. Phong cách: dark theme, Vietnamese folk art inspired
6. Dài khoảng 300-400 từ tiếng Anh

Viết prompt sẵn sàng để copy-paste vào v0.dev.
```

**→ Lưu toàn bộ kết quả vào file `ai-outputs/concept.txt`**

---

### Bước 1.4 — Tạo prompt AI cho tính năng sinh ảnh

```
PROMPT 1.D — PROMPT AI SINH ẢNH ĐÔNG HỒ:

Tôi cần tạo hệ thống prompt để sinh ảnh phong cách Đông Hồ 
bằng AI (dùng Pollinations.ai miễn phí).

Hãy viết:

1. SYSTEM PROMPT TIẾNG ANH (để gắn vào mọi request):
   Phải chứa: style tokens, color restrictions, technique description
   Phải loại trừ: photorealism, 3D, modern art
   
2. NEGATIVE PROMPT TIẾNG ANH:
   Tất cả những gì cần tránh

3. TEMPLATE PROMPT cho 5 chủ đề phổ biến:
   - Con lợn (pig, prosperity)
   - Gà trống (rooster, new year)
   - Cá chép (carp, luck)
   - Đám cưới (wedding, joy)  
   - Cảnh làng quê (countryside, peaceful)

4. HƯỚNG DẪN DỊCH PROMPT:
   Khi người dùng gõ tiếng Việt, AI cần dịch thế nào?
   Viết 3 ví dụ: input Việt → output English prompt
```

---

## GIAI ĐOẠN 2 — Thiết Kế UI với v0.dev {#giai-đoạn-2}
### Ngày 3–4 — Tạo giao diện hoàn chỉnh

---

### Bước 2.1 — Cách dùng v0.dev

1. Vào **v0.dev** → đăng nhập
2. Click **"New Chat"**
3. Ở ô nhập liệu phía dưới, có nút 📎 để upload ảnh

> **Mẹo tiết kiệm credit**: v0 free cho ~200 messages/tháng. Mỗi lần chỉ hỏi một việc cụ thể, không hỏi chung chung.

---

### Bước 2.2 — Tạo màn hình Landing Page

Upload ảnh từ thư mục `ui-inspiration/` (2-3 ảnh đẹp nhất), rồi dán:

```
PROMPT 2.A — LANDING PAGE:

Create a stunning landing page for "Xưởng Đông Hồ" 
(Vietnamese Digital Folk Art Studio) web app.

Design Direction:
- Dark background: #1A1208 (charcoal black like woodblock ink)
- Primary accent: #C0392B (vermillion red from Đông Hồ paintings)  
- Secondary accent: #D4A017 (golden yellow from turmeric dye)
- Text color: #F5F0E0 (warm white like điệp paper)
- Font display: "Playfair Display" (elegant, traditional feel)
- Font body: "Inter" (clean, readable)

Sections needed:
1. HERO: Full viewport height. Large Vietnamese folk art inspired 
   woodblock texture as overlay. Centered headline "Xưởng Đông Hồ" 
   in Playfair Display 80px. Subtitle in Vietnamese. Two CTA buttons.
   
2. HOW IT WORKS: 3 steps with icons.
   Step 1: "Chọn Motif" (Choose from motif library)
   Step 2: "Sáng Tạo" (Create on canvas)
   Step 3: "Chia Sẻ" (Download & share)
   
3. PREVIEW GALLERY: 6 sample artworks in a masonry grid
   Use placeholder colored boxes styled like folk art frames.
   
4. CTA SECTION: "Bắt Đầu Sáng Tác" large button

Technical requirements:
- Next.js with Tailwind CSS
- shadcn/ui components  
- Smooth scroll animations
- Responsive (mobile-friendly)
- Vietnamese text support (Unicode)

Make it feel like stepping into a real Vietnamese woodblock 
printing workshop - warm, artisan, culturally rich.
```

---

### Bước 2.3 — Tạo màn hình Editor chính

Sau khi Landing Page xong, tạo chat mới, dán:

```
PROMPT 2.B — CANVAS EDITOR LAYOUT:

Create the main canvas editor interface for "Xưởng Đông Hồ" 
Vietnamese folk art creation tool.

Color System (same as landing page):
- Background dark: #1A1208
- Surface: #2A2015  
- Accent red: #C0392B
- Accent gold: #D4A017
- Border: rgba(212, 160, 23, 0.2)
- Text: #F5F0E0

Layout (full-screen app, no scroll):
┌─────────────────────────────────────────────────────┐
│ TOPBAR: Logo + Mode Switch (A/B) + Undo/Redo + Export│
├──────────┬──────────────────────────────┬────────────┤
│ LEFT     │                              │ RIGHT      │
│ SIDEBAR  │     MAIN CANVAS (center)     │ PROPERTIES │
│ 260px    │     800x600 white area       │ 280px      │
│          │     with grid overlay        │            │
│ Motif    │     Drop zone indicator      │ Object     │
│ Library  │                              │ settings   │
│          │                              │            │
│ Search   │                              │ Color      │
│ bar top  │                              │ picker     │
│          │                              │            │
│ Grid of  │                              │ Layer      │
│ motif    │                              │ panel      │
│ thumbnails│                             │            │
│          │                              │ Transform  │
│          │                              │ controls   │
├──────────┴──────────────────────────────┴────────────┤
│ BOTTOM TOOLBAR: Text | Shapes | Frame | Align | Zoom │
└─────────────────────────────────────────────────────┘

Left Sidebar Details:
- Top: Search input "Tìm motif..."
- Tab row: [Linh vật] [Cây cỏ] [Hoa văn] [Chữ] [Khung]
- Grid 2 columns of placeholder motif cards
- Each card: 80x80px, dark border, hover shows red glow
- At bottom: "+ Upload motif" button

Right Properties Panel:
- Section "Màu sắc": Color swatches grid (16 Đông Hồ colors)
  Show actual Đông Hồ palette: #C0392B #D4A017 #2C3E6B 
  #4A7C59 #F5F0E0 #8B5E3C #E8927C #1A1208
- Section "Kích thước": Width/Height inputs  
- Section "Layer": Stack of layer items with drag handles
- Section "Câu chúc": Dropdown of 5 blessing texts in Vietnamese

Canvas Area:
- White/cream rectangle centered
- Subtle grid lines (very faint, #eee)
- "Kéo motif vào đây" placeholder text when empty
- Scrollable if canvas larger than viewport

Technical: Next.js, Tailwind, shadcn/ui, TypeScript
Make it look like a professional creative tool but 
with Vietnamese folk art aesthetic throughout.
```

---

### Bước 2.4 — Tạo component Motif Card

```
PROMPT 2.C — MOTIF CARD COMPONENT:

Create a reusable MotifCard component for the Xưởng Đông Hồ sidebar.

Props:
- name: string (Vietnamese name, e.g. "Lợn Đàn")  
- category: string (e.g. "Linh vật")
- previewSrc: string (SVG image URL)
- tags: string[] (e.g. ["phú quý", "Tết"])
- onClick: () => void

Design:
- Size: 80x80px card
- Background: #2A2015
- Border: 1px solid rgba(212, 160, 23, 0.15)
- Border-radius: 8px
- On hover: 
  * Border color → #C0392B (vermillion)
  * Scale 1.05
  * Show tooltip with name
  * Small "add to canvas" + icon appears
- Image fills 70% of card
- Name below in 10px text, truncated if long

Include 8 demo instances showing different folk art motifs 
(use emoji as placeholder: 🐖 🐓 🐟 🌸 🏮 ⚡ 🌊 🎋)

Animation: use Framer Motion for hover effects.
Make the hover feel like "selecting a woodblock stamp".
```

---

### Bước 2.5 — Tạo component AI Mode Panel

```
PROMPT 2.D — AI IMAGE GENERATION PANEL:

Create the "Chế độ B — AI Tạo Ảnh" panel for Xưởng Đông Hồ.
This replaces the left sidebar when user switches to AI mode.

Panel width: 320px, full height

Sections:

1. MODE HEADER:
   Icon + "AI Tạo Ảnh" title  
   Small badge: "Miễn phí · Powered by Pollinations"

2. PROMPT INPUT:
   Large textarea (4 rows): 
   Placeholder: "Mô tả ý tưởng của bạn... 
   Ví dụ: con lợn trong rừng tre, phong cách Tết"
   Below: 6 quick-tag buttons (pill shaped):
   [🐖 Lợn đàn] [🐓 Gà trống] [🐟 Cá chép]
   [🌸 Hoa sen] [💒 Đám cưới] [🎋 Mùa xuân]

3. STYLE CONTROLS:
   Label: "Mức độ Đông Hồ"
   Slider 0–100%, default 85%
   Below slider: "Truyền thống ←→ Hiện đại"
   
   Label: "Bố cục" (dropdown):
   [Đối xứng] [Tự do] [Viền tròn] [Toàn cảnh]

4. GENERATE BUTTON:
   Full width, red #C0392B
   Text: "✨ Tạo Tranh"
   Loading state: show spinner + "Đang vẽ..."

5. RESULT AREA:
   When image generated: show 512x512 image preview
   Below: [Dùng ảnh này] [Tạo lại] [Tạo biến thể]
   Image has red border when selected

6. HISTORY ROW:
   Last 4 generated images as 48x48 thumbnails
   Click to restore

Colors match main app: dark #1A1208, red #C0392B, gold #D4A017
Include loading skeleton animation.
Fully functional with useState hooks.
```

---

### Bước 2.6 — Tối ưu và export code

Sau khi có các component, dán prompt này:

```
PROMPT 2.E — TỐI ƯU VÀ EXPORT:

Tôi có các component sau cho Xưởng Đông Hồ:
1. Landing page  
2. Canvas editor layout
3. MotifCard component
4. AI panel component

Hãy:
1. Tạo file index.tsx kết hợp tất cả thành một app hoàn chỉnh
2. Thêm React Router để chuyển giữa Landing và Editor
3. Thêm basic state management:
   - activeMode: 'motif' | 'ai'  
   - selectedMotifs: array
   - canvasObjects: array
4. Đảm bảo responsive trên màn hình 1280px+
5. Export thành cấu trúc file chuẩn Next.js App Router

Viết ra full code để tôi copy paste vào Antigravity.
```

**→ Copy toàn bộ code → lưu vào thư mục `v0-exports/`**

---

## GIAI ĐOẠN 3 — Tạo Animation với Kling {#giai-đoạn-3}
### Ngày 5 — Tạo video concept cho hover effects

---

### Bước 3.1 — Cách dùng Kling AI (free tier)

1. Vào **klingai.com** → Đăng nhập
2. Chọn **"AI Video"** → **"Text to Video"**
3. Free tier: 66 credits/ngày (~5-6 video ngắn)

> **Lưu ý**: Kling tạo ra VIDEO (.mp4), không phải code. Mục tiêu là dùng video để:
> - Xem trước animation trông như thế nào
> - Mô tả lại cho Antigravity để code

---

### Bước 3.2 — Tạo video hover animation cho Motif Card

```
PROMPT 3.A — MOTIF CARD HOVER:

A dark wooden card with a Vietnamese folk art rooster (gà trống) 
print on it, sitting on a dark surface. 
The card slowly lifts up with a subtle glow of golden light 
around its edges, scale slightly larger, 
then settles back down. 
Like picking up an ancient woodblock stamp.
Duration: 2 seconds, loop.
Style: cinematic, warm candlelight, 8mm film grain.
```

```
PROMPT 3.B — CANVAS DROP ANIMATION:

A golden stamp with Vietnamese folk art pattern 
(lotus flower, Đông Hồ style) being pressed onto 
traditional Vietnamese paper (giấy điệp with pearl shimmer).
The stamp makes contact and the ink spreads naturally.
Overhead view, slow motion.
Duration: 2 seconds.
Colors: deep red ink on cream paper with golden shimmer.
```

```
PROMPT 3.C — AI GENERATION ANIMATION:

Abstract visualization: small particles of red, gold and indigo 
floating and swirling together on a dark background,
gradually forming the silhouette of a Vietnamese folk art 
fish (cá chép) shape.
Like watching a woodblock print materialize from nothing.
Duration: 3 seconds.
Style: ethereal, mystical, Vietnamese aesthetic.
```

```
PROMPT 3.D — LANDING PAGE HERO:

A traditional Vietnamese woodblock printing workshop at dusk.
Warm candlelight. A craftsman's hands press an inked woodblock
onto paper with pearl shimmer (giấy điệp).
The paper reveals a folk art image of chickens.
Camera slowly zooms into the emerging artwork.
Cinematic, golden hour light, cultural and warm.
Duration: 5 seconds.
```

---

### Bước 3.3 — Lưu và đặt tên video

Tải video về, lưu vào thư mục `animations/`:
- `hover-motif-card.mp4`
- `canvas-drop-stamp.mp4`
- `ai-generation-effect.mp4`
- `hero-background.mp4`

---

### Bước 3.4 — Chuyển video thành mô tả animation

Xem lại video và mô tả bằng ngôn ngữ tự nhiên để dùng ở bước sau:

```
Ghi chú animation (để dùng với Antigravity):

1. Hover Motif Card:
   - Scale: 1.0 → 1.05 (trong 200ms, easing: ease-out)
   - Box shadow: none → "0 8px 24px rgba(192, 57, 43, 0.4)"
   - Border color: gold/20% → #C0392B
   - Y translate: 0 → -4px

2. Drop to Canvas:
   - Object xuất hiện với: opacity 0→1, scale 0.8→1.0
   - Duration: 300ms, spring easing
   - Sau đó: subtle bounce, scale 1.0→1.02→1.0

3. AI Loading:
   - Radial gradient xoay tròn
   - Color: red → gold → blue → red
   - Duration: 1.5s infinite
   - Text "Đang vẽ..." với fade pulse

4. Hero background:
   - Video autoplay, muted, loop
   - Overlay: rgba(26, 18, 8, 0.6) để text đọc được
```

---

## GIAI ĐOẠN 4 — Build Hoàn Chỉnh với Antigravity {#giai-đoạn-4}
### Ngày 6–9 — Phát triển toàn bộ ứng dụng

---

### Bước 4.1 — Cài đặt và setup Antigravity

1. Vào **antigravity.dev** → Download app về máy
2. Cài đặt (như cài Chrome bình thường)
3. Đăng nhập bằng tài khoản Google
4. Click **"New Project"** → chọn **"Next.js"**
5. Đặt tên: `xuong-dong-ho`

---

### Bước 4.2 — Khởi động dự án

Sau khi project mở ra, click vào ô chat của Agent, dán:

```
PROMPT 4.A — SETUP DỰ ÁN:

Tôi đang xây dựng "Xưởng Đông Hồ" — web app tạo tranh dân gian 
số hoá phong cách Đông Hồ Việt Nam.

Hãy setup dự án Next.js với:

1. Cài dependencies:
   - fabric (canvas editor): npm install fabric
   - framer-motion (animations): npm install framer-motion  
   - lucide-react (icons): đã có sẵn với shadcn
   - @tanstack/react-query (data fetching): npm install @tanstack/react-query
   - zustand (state): npm install zustand
   - html2canvas (export PNG): npm install html2canvas
   - jspdf (export PDF): npm install jspdf

2. Tạo cấu trúc thư mục:
   /app
     /page.tsx (landing page)
     /editor/page.tsx (editor)
     /api/generate/route.ts (AI proxy)
   /components
     /editor/
     /landing/
     /ui/ (shadcn)
   /lib
     /colors.ts
     /prompts.ts
     /motifs.ts
   /public
     /motifs/ (SVG files)
     /fonts/

3. Thêm Google Fonts vào layout.tsx:
   - Playfair Display (display: swap)
   - Inter
   
4. Setup Tailwind với màu custom:
   dong-ho-red: '#C0392B'
   dong-ho-gold: '#D4A017'
   dong-ho-dark: '#1A1208'
   dong-ho-surface: '#2A2015'
   dong-ho-paper: '#F5F0E0'
   dong-ho-indigo: '#2C3E6B'

Chạy lệnh và xác nhận setup thành công.
```

---

### Bước 4.3 — Import code từ v0

Tiếp tục trong Antigravity chat:

```
PROMPT 4.B — IMPORT CODE TỪ V0:

Tôi có code React/Next.js từ v0.dev. Hãy giúp tôi tích hợp vào dự án:

[DÁN TOÀN BỘ CODE TỪ V0 VÀO ĐÂY]

Khi tích hợp:
1. Kiểm tra và sửa import paths cho đúng cấu trúc dự án
2. Thay thế placeholder colors bằng CSS variables
3. Đảm bảo shadcn/ui components được import đúng
4. Sửa lỗi TypeScript nếu có
5. Test chạy được ở localhost:3000

Sau khi xong, chạy "npm run dev" và dùng Browser Subagent 
để kiểm tra trang có hiển thị đúng không.
```

---

### Bước 4.4 — Build Canvas Editor với Fabric.js

```
PROMPT 4.C — CANVAS EDITOR:

Trong file /components/editor/Canvas.tsx, tạo canvas editor 
hoàn chỉnh dùng Fabric.js:

1. KHỞI TẠO CANVAS:
   - Kích thước mặc định: 800x600px
   - Nền trắng kem #F5F0E0
   - Grid lines nhẹ màu #e0d8c0 (spacing 40px)
   - Export ref để component cha có thể gọi

2. THÊM MOTIF:
   Function addMotif(svgUrl: string):
   - Tải SVG từ URL
   - Thêm vào canvas ở vị trí giữa  
   - Auto-scale về 150x150px
   - Set active (selected)
   - Lưu vào history (undo stack)

3. THÊM ẢNH AI:
   Function addAIImage(imageUrl: string):
   - Tải ảnh từ URL
   - Thêm vào canvas
   - Resize 300x300px
   - Có thể di chuyển, resize, xoay

4. THÊM TEXT:
   Function addText(text: string, style: TextStyle):
   - Font: Playfair Display
   - Màu: chọn từ palette Đông Hồ
   - Có thể double-click để edit

5. UNDO/REDO:
   - Lưu state vào array mỗi khi thay đổi
   - Max 50 bước
   - Keyboard: Ctrl+Z / Ctrl+Y

6. EXPORT:
   Function exportPNG(): 
   - Canvas.toDataURL('image/png')
   - Download file có tên 'xuong-dong-ho-[timestamp].png'
   
   Function exportJPEG():
   - Quality 0.95
   - Download

7. EVENTS:
   - onSelectionChange: callback khi user chọn object
   - onObjectModified: callback khi object thay đổi
   - onCanvasChange: trigger re-render properties panel

Include TypeScript types đầy đủ.
Sau khi code xong, test bằng Browser Subagent.
```

---

### Bước 4.5 — Build hệ thống motif SVG

```
PROMPT 4.D — MOTIF LIBRARY SYSTEM:

Tạo hệ thống thư viện motif trong /lib/motifs.ts:

1. ĐỊNH NGHĨA TYPE:
   interface Motif {
     id: string
     name: string           // tên tiếng Việt
     nameEn: string         // tên tiếng Anh
     category: MotifCategory
     svgUrl: string         // path đến file SVG
     tags: string[]
     colors: string[]       // màu chủ đạo (hex)
     description: string
   }
   
   type MotifCategory = 
     'linh-vat' | 'thuc-vat' | 'hoa-van' | 'chu-viet' | 'khung-vien'

2. DEMO DATA — 20 motif mẫu:
   Tạo 20 motif objects đầy đủ với data thật:
   
   Nhóm "linh-vat" (8 motif):
   - Lợn đàn (đàn lợn mẹ với lợn con)
   - Gà trống (gà trống oai phong)
   - Cá chép (cá chép vượt vũ môn)
   - Trâu cày (trâu và người nông dân)
   - Cóc mặc áo
   - Đám cưới chuột
   - Hổ (tiger folk art)
   - Rồng dân gian
   
   Nhóm "thuc-vat" (6 motif):
   - Hoa sen
   - Cây tre
   - Hoa đào
   - Hoa cúc
   - Quả phật thủ
   - Bông lúa
   
   Nhóm "hoa-van" (3 motif):
   - Vân mây
   - Hoa văn sóng nước
   - Hoa văn thổ cẩm
   
   Nhóm "chu-viet" (3 motif):
   - Chữ Phúc
   - Chữ Lộc
   - Chữ Thọ

3. PLACEHOLDER SVG:
   Vì chưa có file SVG thật, tạo placeholder SVGs bằng code:
   
   Function generatePlaceholderSVG(motif: Motif): string
   - Tạo SVG đơn giản với màu sắc Đông Hồ
   - Hiển thị tên motif ở giữa
   - Border kiểu mộc bản
   - Màu theo category:
     linh-vat: đỏ son #C0392B
     thuc-vat: xanh lá #4A7C59
     hoa-van: xanh chàm #2C3E6B
     chu-viet: vàng #D4A017
     khung-vien: nâu #8B5E3C

4. SEARCH FUNCTION:
   Function searchMotifs(query: string, category?: MotifCategory): Motif[]
   - Tìm theo tên, tags, description
   - Không phân biệt dấu tiếng Việt

5. CATEGORIES với tên hiển thị và icon (emoji):
   { id: 'linh-vat', label: 'Linh vật', icon: '🐖' }
   { id: 'thuc-vat', label: 'Cây cỏ', icon: '🌸' }
   (v.v.)
```

---

### Bước 4.6 — Tích hợp AI sinh ảnh MIỄN PHÍ

```
PROMPT 4.E — TÍCH HỢP AI SINH ẢNH (POLLINATIONS.AI - MIỄN PHÍ):

Tạo /app/api/generate/route.ts và /lib/ai-generator.ts:

LƯU Ý QUAN TRỌNG: Dùng Pollinations.ai hoàn toàn miễn phí,
không cần API key, không cần đăng ký.

API URL format:
https://image.pollinations.ai/prompt/{encoded_prompt}
Parameters: 
- model=flux (tốt nhất hiện tại)
- width=512
- height=512
- seed={random number}
- nologo=true

1. FILE /lib/ai-generator.ts:

   // Hệ thống prompt Đông Hồ chuẩn
   const DONG_HO_STYLE_SUFFIX = `
   in the style of Vietnamese Dong Ho folk woodblock print,
   flat graphic design, bold black outlines, 
   limited color palette (vermillion red, golden yellow, 
   indigo blue, forest green, white, black),
   printed on traditional dieu paper with pearl luster,
   folk art motifs, symmetrical composition,
   traditional Vietnamese aesthetics, high contrast,
   no photorealism, no 3D rendering, no shadows
   `
   
   const NEGATIVE_STYLE = `
   NOT photorealistic, NOT 3D, NOT modern art, 
   NOT Western style, NOT gradient, NOT shadow,
   NOT photograph, NOT anime, NOT cartoon network style
   `
   
   // Translate tiếng Việt sang English prompt
   async function translateToEnglish(vietnameseText: string): Promise<string>
   // Dùng Gemini API free tier của Google AI Studio để dịch
   // Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
   // Key: NEXT_PUBLIC_GEMINI_API_KEY (free, tạo tại aistudio.google.com/apikey)
   
   // Generate ảnh
   async function generateDongHoImage(
     userPrompt: string,
     styleStrength: number = 0.85,
     seed?: number
   ): Promise<string> // trả về image URL
   
   // Tạo 4 variations
   async function generateVariations(prompt: string): Promise<string[]>

2. FILE /app/api/generate/route.ts:
   - POST endpoint nhận { prompt_vi, strength, seed }
   - Translate prompt → build full prompt → call Pollinations
   - Return { imageUrl, seed }
   - Rate limit: max 10 requests/minute/IP (tránh abuse)

3. FRONTEND — cập nhật AI Panel component:
   - Khi user click "Tạo Tranh":
     a. Show loading animation (3 giây)
     b. Gọi /api/generate
     c. Hiện ảnh kết quả
     d. Nút "Thêm vào canvas" gọi canvas.addAIImage(url)

4. GEMINI API KEY setup:
   Tạo file .env.local với:
   GEMINI_API_KEY=your_key_here
   
   Hướng dẫn lấy key miễn phí:
   1. Vào aistudio.google.com
   2. Click "Get API Key" 
   3. "Create API Key in new project"
   4. Copy key vào .env.local
   
   Free tier: 1500 requests/ngày cho Gemini 1.5 Flash

Test: sau khi code xong, dùng Browser Subagent để test 
toàn bộ luồng: nhập "con lợn vui tết" → tạo ảnh → 
thêm vào canvas → export PNG.
```

---

### Bước 4.7 — Tích hợp animation từ Kling

```
PROMPT 4.F — TÍCH HỢP ANIMATIONS:

Thêm animations vào Xưởng Đông Hồ dùng Framer Motion:

1. MOTIF CARD HOVER (theo mô tả từ video Kling):
   Cập nhật MotifCard component:
   
   <motion.div
     whileHover={{ 
       scale: 1.05, 
       y: -4,
       boxShadow: "0 8px 24px rgba(192, 57, 43, 0.4)"
     }}
     whileTap={{ scale: 0.98 }}
     transition={{ type: "spring", stiffness: 400, damping: 17 }}
   >

2. DROP TO CANVAS ANIMATION:
   Khi motif được thêm vào canvas, tạo visual feedback:
   - Flash circle xuất hiện ở vị trí drop
   - Scale từ 0 → 1 → 0 trong 600ms
   - Màu: rgba(192, 57, 43, 0.6)
   
3. AI LOADING ANIMATION:
   Trong AI Panel khi đang generate:
   - Circular gradient spinner màu đỏ-vàng
   - Text "Đang vẽ..." với typewriter effect
   - Subtle particle animation (3-4 dots bay qua)

4. PAGE TRANSITIONS:
   Khi chuyển từ Landing → Editor:
   - Fade out landing page (opacity 1→0, 400ms)
   - Canvas editor slide in từ dưới (y: 40→0, opacity 0→1)
   - Duration tổng: 600ms

5. HERO VIDEO BACKGROUND:
   Trong landing page, thêm video background:
   
   <video 
     autoPlay 
     muted 
     loop 
     playsInline
     className="absolute inset-0 w-full h-full object-cover"
   >
     <source src="/animations/hero-background.mp4" type="video/mp4"/>
   </video>
   
   Copy file hero-background.mp4 từ Kling vào /public/animations/
   Thêm overlay div: bg-dong-ho-dark/60

6. SCROLL ANIMATIONS (Landing page):
   Dùng Framer Motion viewport để animate khi scroll:
   - "How it works" section: từng step fade in từ dưới lên
   - Gallery: items scale in với stagger 100ms
   - CTA button: pulse animation mỗi 3 giây

Sau khi implement, chạy Browser Subagent kiểm tra tất cả 
animations có mượt không, có bị giật không.
```

---

### Bước 4.8 — Hoàn thiện tính năng Export và Share

```
PROMPT 4.G — EXPORT VÀ SHARE:

Thêm tính năng export và chia sẻ vào Xưởng Đông Hồ:

1. EXPORT PNG (client-side, không cần server):
   Function exportCanvas(format: 'png' | 'jpeg'):
   - Dùng fabric.canvas.toDataURL()
   - Tạo link <a> và click tự động
   - Filename: "xuong-dong-ho-[YYYY-MM-DD].png"
   
2. EXPORT PDF:
   Dùng jsPDF:
   - A4 landscape
   - Đặt ảnh canvas vào giữa
   - Thêm watermark nhỏ góc phải dưới: "Tạo tại Xưởng Đông Hồ"
   - Footer: URL website
   
3. SHARE BUTTON:
   Dùng Web Share API (native browser):
   
   async function shareArtwork():
     if (navigator.share):
       const blob = await fetch(canvas.toDataURL()).then(r => r.blob())
       const file = new File([blob], 'dong-ho-artwork.png', {type: 'image/png'})
       navigator.share({
         title: 'Tác phẩm Đông Hồ của tôi',
         text: 'Tạo tại Xưởng Đông Hồ — Mộc bản trong tay bạn',
         files: [file]
       })
     else:
       // Fallback: copy image to clipboard
       navigator.clipboard.write([new ClipboardItem({...})])
       showToast("Đã copy ảnh vào clipboard!")
       
4. TOOLBAR BUTTONS:
   Thêm vào top toolbar:
   - [💾 Lưu] → download PNG
   - [📄 PDF] → download PDF  
   - [📤 Chia sẻ] → Web Share API
   - [🔗 Copy link] → copy URL (khi có hosting)
   
5. TOAST NOTIFICATIONS:
   Dùng shadcn/ui Toaster:
   - "✅ Đã tải về!" sau khi export
   - "📋 Đã copy!" sau khi copy
   - "❌ Lỗi: ..." nếu có lỗi

Test từng button với Browser Subagent.
```

---

### Bước 4.9 — Bảng màu và hệ thống design token

```
PROMPT 4.H — COLOR SYSTEM:

Tạo file /lib/colors.ts với hệ thống màu Đông Hồ hoàn chỉnh:

export const DONG_HO_PALETTE = {
  // 16 màu chính xác theo lịch sử
  black:    { hex: '#1A1208', name: 'Đen than tro', nameEn: 'Charcoal' },
  red:      { hex: '#C0392B', name: 'Đỏ son', nameEn: 'Vermillion' },
  gold:     { hex: '#D4A017', name: 'Vàng nghệ', nameEn: 'Golden Turmeric' },
  indigo:   { hex: '#2C3E6B', name: 'Xanh chàm', nameEn: 'Indigo Plant' },
  green:    { hex: '#4A7C59', name: 'Xanh gỉ đồng', nameEn: 'Copper Patina' },
  white:    { hex: '#F5F0E0', name: 'Trắng điệp', nameEn: 'Pearl Diep' },
  brown:    { hex: '#8B5E3C', name: 'Nâu đất sét', nameEn: 'Clay Brown' },
  salmon:   { hex: '#E8927C', name: 'Hồng đào', nameEn: 'Peach Blossom' },
  darkRed:  { hex: '#7B1E0E', name: 'Đỏ thẫm', nameEn: 'Deep Crimson' },
  mustard:  { hex: '#B8860B', name: 'Vàng nâu', nameEn: 'Dark Mustard' },
  teal:     { hex: '#2E7D6E', name: 'Xanh lá đậm', nameEn: 'Deep Teal' },
  cream:    { hex: '#EDE8D5', name: 'Kem nhạt', nameEn: 'Light Cream' },
  rust:     { hex: '#9B4523', name: 'Đỏ gạch', nameEn: 'Brick Red' },
  olive:    { hex: '#6B7A3F', name: 'Xanh rêu', nameEn: 'Moss Green' },
  tan:      { hex: '#C8A87A', name: 'Vàng cát', nameEn: 'Sand Gold' },
  darkBlue: { hex: '#1A2850', name: 'Xanh đêm', nameEn: 'Midnight Blue' },
}

// Trong ColorPicker component của Properties panel:
// Hiển thị 16 màu dưới dạng circles 32x32px
// Hover: show tooltip với tên tiếng Việt
// Click: apply màu cho selected object trên canvas

// Cũng export mảng flat để dùng trong CSS:
export const PALETTE_HEX = Object.values(DONG_HO_PALETTE).map(c => c.hex)
```

---

## GIAI ĐOẠN 5 — Deploy & Xuất Bản {#giai-đoạn-5}
### Ngày 10 — Đưa website lên internet miễn phí

---

### Bước 5.1 — Push code lên GitHub

Trong Antigravity chat:

```
PROMPT 5.A — PUSH LÊN GITHUB:

Hãy giúp tôi:
1. Khởi tạo Git repository cho project
2. Tạo file .gitignore phù hợp (loại trừ node_modules, .env.local)
3. Tạo file README.md đẹp cho Xưởng Đông Hồ với:
   - Mô tả ngắn về dự án
   - Demo screenshots (placeholder)
   - Hướng dẫn cài đặt
   - Tech stack
4. Commit toàn bộ code với message "Initial release: Xưởng Đông Hồ v1.0"
5. Hướng dẫn tôi push lên GitHub repository mới

Tạo repository name: xuong-dong-ho
Description: Web app tạo tranh dân gian số hoá phong cách Đông Hồ
```

---

### Bước 5.2 — Deploy lên Vercel (MIỄN PHÍ)

```
PROMPT 5.B — DEPLOY VERCEL:

Hướng dẫn tôi deploy Xưởng Đông Hồ lên Vercel miễn phí:

1. Kiểm tra next.config.js có cấu hình đúng không
2. Kiểm tra tất cả environment variables cần thiết:
   - GEMINI_API_KEY
3. Tạo file vercel.json nếu cần
4. Hướng dẫn step-by-step:
   a. Vào vercel.com → Login with GitHub
   b. Import repository xuong-dong-ho
   c. Set environment variables
   d. Click Deploy
5. Sau deploy, test:
   - Landing page load được không
   - Editor mở được không  
   - Tạo ảnh AI được không
   - Export PNG được không
   
Dùng Browser Subagent để test production URL sau khi deploy.
```

---

### Bước 5.3 — Kiểm tra lần cuối

```
PROMPT 5.C — CHECKLIST CUỐI:

Dùng Browser Subagent để kiểm tra toàn bộ Xưởng Đông Hồ 
trên production URL. Test theo checklist:

LANDING PAGE:
□ Hero section hiển thị đúng
□ Video background chạy (nếu có)
□ 3 bước "How it works" hiển thị
□ Nút "Bắt Đầu Sáng Tác" dẫn đến Editor

EDITOR — CHẾ ĐỘ A (Motif):
□ Sidebar hiển thị danh sách motif
□ Search motif hoạt động
□ Drag motif vào canvas được
□ Chọn motif → resize, di chuyển được
□ Đổi màu motif được
□ Undo/Redo hoạt động

EDITOR — CHẾ ĐỘ B (AI):
□ Switch sang chế độ AI được
□ Nhập prompt tiếng Việt
□ Click "Tạo Tranh" → loading animation
□ Ảnh AI xuất hiện
□ Thêm ảnh AI vào canvas được

EXPORT:
□ Nút "Lưu PNG" tải file về
□ File PNG mở ra đúng
□ Nút "Chia sẻ" hoạt động (mobile)

RESPONSIVE:
□ Trên màn hình 1280px trông đẹp
□ Trên tablet (1024px) dùng được

Báo cáo kết quả và sửa những lỗi tìm thấy.
```

---

## PHỤ LỤC — Kho Tài Liệu Tham Khảo {#phụ-lục}

---

### A. Links tải motif SVG miễn phí

```
1. SVGREPO — tất cả miễn phí, không cần đăng ký:
   svgrepo.com/vectors/folk-art/
   svgrepo.com/vectors/lotus/
   svgrepo.com/vectors/dragon-chinese/
   
2. VECTEEZY — filter "free license":
   vecteezy.com/free-vector/dong-ho
   vecteezy.com/free-vector/vietnamese-folk
   vecteezy.com/free-vector/woodblock-print
   
3. FREEPIK — cần đăng ký miễn phí:
   freepik.com/search?query=vietnamese+folk+art&type=vector&license=free
   
4. NOUN PROJECT — free với attribution:
   thenounproject.com/search/?q=vietnamese+folk
   thenounproject.com/search/?q=lotus+flower+flat
   
5. WIKIMEDIA COMMONS — hoàn toàn free:
   commons.wikimedia.org/wiki/Category:Đông_Hồ_paintings
   (tải ảnh rồi trace thành SVG bằng Inkscape free)
```

---

### B. Công cụ chuyển ảnh JPG sang SVG (miễn phí)

```
Khi tải được ảnh tranh Đông Hồ, dùng các tool này 
để chuyển thành file SVG:

1. VECTORIZER.AI — free tier 2 ảnh/tháng:
   vectorizer.ai
   → Upload JPG → Download SVG

2. VECTORMAGIC — free preview:
   vectormagic.com
   → Xem preview miễn phí, chỉ tốn tiền khi download
   
3. ADOBE EXPRESS (free):
   adobe.com/express
   → Tools > Convert to SVG

4. INKSCAPE (free desktop app):
   inkscape.org → Download
   → File > Import ảnh → Path > Trace Bitmap
   → Điều chỉnh threshold → OK → Export as SVG

5. ONLINE AI TRACE — hoàn toàn free:
   autotracer.org
   svgtrace.com
```

---

### C. Prompt tham khảo thêm cho Google AI Studio

```
PROMPT PHỤ LỤC 1 — PHÂN TÍCH UI ĐẸP:

[Upload 3 ảnh web app đẹp từ Dribbble]

Tôi đang làm "Xưởng Đông Hồ" — canvas editor phong cách dân gian.
Phân tích 3 giao diện này và cho tôi biết:
1. Cách họ tổ chức sidebar và canvas
2. Cách họ dùng màu tối (dark theme)
3. Cách họ làm hover effects trông chuyên nghiệp
4. 5 chi tiết nhỏ tôi nên copy cho dự án của mình
```

```
PROMPT PHỤ LỤC 2 — TẠO CÂU CHÚC:

Tạo cho tôi 30 câu chúc dân gian Việt Nam phù hợp với 
tranh Đông Hồ, phân loại theo dịp:

- Tết Nguyên Đán (10 câu)
- Cưới hỏi (5 câu)
- Sinh nhật / thọ (5 câu)
- Khai trương / kinh doanh (5 câu)
- Chúc chung (5 câu)

Format: tiếng Việt có dấu, ngắn gọn 5-10 chữ, 
dễ hiểu, phù hợp in trên tranh.
Ví dụ: "Phúc Lộc Thọ", "Năm mới an khang thịnh vượng"
```

```
PROMPT PHỤ LỤC 3 — VIẾT CONTENT WEBSITE:

Viết nội dung tiếng Việt cho website Xưởng Đông Hồ:

1. Tagline (dưới 10 chữ, dễ nhớ)
2. Mô tả ngắn cho meta description (155 ký tự)
3. Hero headline (5-8 chữ, cảm xúc)
4. Hero subheadline (15-20 chữ)
5. Nút CTA (4-6 chữ)
6. Mô tả 3 tính năng chính (mỗi cái: tiêu đề 4 chữ + 15 chữ mô tả)
7. Tagline footer: 1 câu về sứ mệnh bảo tồn văn hóa

Giọng văn: ấm áp, tự hào, không khô cứng, gần gũi người Việt.
```

---

### D. Danh sách lỗi thường gặp và cách sửa

```
LỖI 1: "Cannot read properties of undefined (reading 'toDataURL')"
→ Canvas Fabric.js chưa init xong
→ Thêm: if (!canvasRef.current) return; trước khi dùng

LỖI 2: CORS error khi gọi Pollinations.ai
→ Phải gọi từ server-side (API route), không gọi từ frontend
→ Đảm bảo dùng /app/api/generate/route.ts

LỖI 3: Video không autoplay
→ Thêm thuộc tính: muted playsInline autoPlay
→ Một số browser chặn autoplay nếu không có muted

LỖI 4: Font Playfair Display không load
→ Kiểm tra import trong layout.tsx
→ Thêm vào Tailwind config: fontFamily: { display: ['Playfair Display'] }

LỖI 5: Màu không đúng
→ Kiểm tra tailwind.config.ts có thêm màu custom chưa
→ Rebuild: npm run build

LỖI 6: SVG không hiển thị trong canvas Fabric.js
→ Dùng fabric.loadSVGFromURL() không phải fromURL()
→ Thêm crossOrigin: 'anonymous' nếu SVG từ external URL
```

---

### E. Tài nguyên học thêm (tất cả miễn phí)

```
VIDEO YOUTUBE:
- "Fabric.js Tutorial for Beginners" — search trên YouTube
- "Next.js 14 Crash Course" — Traversy Media
- "Framer Motion Tutorial" — Fireship
- "Tailwind CSS Dark Mode" — Kevin Powell

DOCUMENTATION:
- fabricjs.com/docs — Canvas API
- framer.com/motion — Animation API
- ui.shadcn.com — UI Components
- v0.dev/docs — v0 tips

CỘNG ĐỒNG ĐỂ HỎI KHI BỊ KẸT:
- reddit.com/r/nextjs
- discord.gg/shadcn (server shadcn/ui)
- stackoverflow.com — tag: fabricjs, nextjs
```

---

*Tài liệu này được tạo cho dự án "Xưởng Đông Hồ" — Mộc bản trong tay bạn*
*Cập nhật: tháng 6/2026 | Phiên bản 1.0*
