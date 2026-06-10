# 🎨 Bảng Màu Tranh Dân Gian Đông Hồ

Hệ thống 16 màu truyền thống được phân tích từ tranh Đông Hồ gốc, phục vụ thiết kế UI/UX cho dự án **Xưởng Đông Hồ**.

---

## 📂 File trong thư mục

| File | Mô tả |
|---|---|
| `dong-ho-color-system.json` | Định nghĩa 16 màu (hex, rgb, hsl, nguồn gốc, cách dùng) |
| `dong-ho-colors.css` | CSS Variables sẵn sàng copy vào dự án |
| `README.md` | File này |

---

## 🎯 16 Màu Truyền Thống

| STT | Tên màu | Hex | Nguồn gốc | CSS Variable |
|---|---|---|---|---|
| 1 | Đen than tro | `#1A1208` | Mực tàu từ than tre đốt | `--dong-ho-dark` |
| 2 | Đỏ son | `#C0392B` | Đá son (chu sa) nghiền mịn | `--dong-ho-red` |
| 3 | Vàng nghệ | `#D4A017` | Củ nghệ tươi giã lấy nước | `--dong-ho-gold` |
| 4 | Xanh chàm | `#2C3E6B` | Cây chàm ngâm ủ lên men | `--dong-ho-indigo` |
| 5 | Xanh gỉ đồng | `#4A7C59` | Gỉ đồng, lá trầu, vỏ trấu | `--dong-ho-green` |
| 6 | Trắng điệp | `#F5F0E0` | Giấy dó phủ bột vỏ sò điệp | `--dong-ho-paper` |
| 7 | Nâu đất sét | `#8B5E3C` | Đất sét nung, vỏ cây | `--dong-ho-brown` |
| 8 | Hồng đào | `#E8927C` | Hoa đào, cánh sen đỏ | `--dong-ho-salmon` |
| 9 | Đỏ thẫm | `#7B1E0E` | Son đậm đặc, cánh sen đậm | `--dong-ho-darkRed` |
| 10 | Vàng nâu | `#B8860B` | Nghệ già, đất vàng sẫm | `--dong-ho-mustard` |
| 11 | Xanh lá đậm | `#2E7D6E` | Lá cây rừng, rêu đá | `--dong-ho-teal` |
| 12 | Kem nhạt | `#EDE8D5` | Giấy điệp pha loãng | `--dong-ho-cream` |
| 13 | Đỏ gạch | `#9B4523` | Đất nung gạch làng quê | `--dong-ho-rust` |
| 14 | Xanh rêu | `#6B7A3F` | Rêu tường cổ Bắc Bộ | `--dong-ho-olive` |
| 15 | Vàng cát | `#C8A87A` | Cát vàng sông Hồng | `--dong-ho-tan` |
| 16 | Xanh đêm | `#1A2850` | Màu áo the truyền thống | `--dong-ho-darkBlue` |

---

## 🖌️ Bảng Màu Chức Năng

```
Brand Colors:
  Primary:   #C0392B (Đỏ son)     → Button chính, accent
  Secondary: #D4A017 (Vàng nghệ)  → Accent phụ, badge
  Background:#1A1208 (Đen than)   → Nền dark mode
  Surface:   #2A2015              → Bề mặt card, panel
  Text:      #F5F0E0 (Trắng điệp) → Chữ chính
  
Semantic:
  Success:   #4A7C59              → Thành công
  Error:     #C0392B              → Lỗi
  Warning:   #D4A017              → Cảnh báo
  Info:      #2C3E6B              → Thông tin
  Canvas:    #F5F0E0              → Nền vùng vẽ
```

---

## 📐 Cách Dùng

### 1. Import CSS vào dự án

```html
<!-- Copy nội dung dong-ho-colors.css vào file CSS chính -->
<link rel="stylesheet" href="dong-ho-colors.css" />
```

### 2. Dùng trong CSS

```css
.my-button {
  background-color: var(--dong-ho-red);
  color: var(--dong-ho-paper);
}

.my-card:hover {
  border-color: var(--hover-border);
  box-shadow: var(--hover-glow);
}
```

### 3. Dùng trong Tailwind (cần cấu hình)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'dong-ho-red': '#C0392B',
        'dong-ho-gold': '#D4A017',
        'dong-ho-dark': '#1A1208',
        // ...
      }
    }
  }
}
```

### 4. Dùng trong JavaScript/TypeScript

```ts
import colorSystem from './dong-ho-color-system.json';

const primaryColor = colorSystem.colors.find(c => c.id === 'vermillion-red')?.hex;
```

---

## 🔍 Nguyên Tắc Phối Màu Tranh Đông Hồ

1. **Tương phản cao**: Nét đen than (`#1A1208`) trên nền trắng điệp (`#F5F0E0`)
2. **Màu ấm chủ đạo**: Đỏ son + Vàng nghệ + Nâu đất chiếm 60%
3. **Màu lạnh điểm xuyết**: Xanh chàm + Xanh gỉ đồng chiếm 25%
4. **Không dùng gradient**: Tranh Đông Hồ là mảng màu phẳng (flat color)
5. **Viền đen dày**: Tất cả họa tiết đều có viền đen đậm nét khắc gỗ

---

## 📚 Nguồn Tham Khảo

- Bảo tàng Lịch sử Quốc gia Việt Nam: baotanglichsu.vn
- Bảo tàng Mỹ thuật Việt Nam: vietnammuseum.com.vn
- Wikimedia Commons: Category:Đông Hồ paintings
- Nghiên cứu: "Màu sắc trong tranh dân gian Đông Hồ" — Viện Văn hóa Nghệ thuật Quốc gia

---

*Xưởng Đông Hồ — Mộc bản trong tay bạn*