# 🖼️ Thư Viện Motif SVG — Tranh Dân Gian Đông Hồ

Bộ sưu tập **24 motif truyền thống** được phân loại theo 5 nhóm, phục vụ cho dự án **Xưởng Đông Hồ**.

---

## 📂 File trong thư mục

| File | Mô tả |
|---|---|
| `motifs-data.json` | Dữ liệu 24 motif (tên, phân loại, tags, màu sắc, mô tả, nguồn gốc) |
| `generate-placeholder.js` | Script Node.js sinh SVG placeholder cho tất cả motif |
| `README.md` | File này |

---

## 🏷️ 5 Nhóm Motif

| # | Nhóm | Màu | Icon | Số lượng |
|---|---|---|---|---|
| 1 | **Linh vật** | `#C0392B` Đỏ son | 🐖 | 8 motif |
| 2 | **Cây cỏ** | `#4A7C59` Xanh gỉ đồng | 🌸 | 6 motif |
| 3 | **Hoa văn** | `#2C3E6B` Xanh chàm | 🌊 | 3 motif |
| 4 | **Chữ Việt** | `#D4A017` Vàng nghệ | ✍️ | 3 motif |
| 5 | **Khung viền** | `#8B5E3C` Nâu đất sét | 🖼️ | 3 motif |

---

## 📋 Danh Sách 24 Motif

### Linh Vật (8)
| ID | Tên | Ý nghĩa |
|---|---|---|
| `lon-dan` | Lợn đàn | Sung túc, phú quý, con đàn cháu đống |
| `ga-trong` | Gà trống | Ngày mới, dũng mãnh, may mắn |
| `ca-chep` | Cá chép | Vượt vũ môn, thành công, kiên trì |
| `trau-cay` | Trâu cày | Nông nghiệp, cần cù, lúa nước |
| `coc-mac-ao` | Cóc mặc áo | Châm biếm, giáo dục, hài hước |
| `dam-cuoi-chuot` | Đám cưới chuột | Châm biếm xã hội, tình yêu, hôn nhân |
| `ho-dan-gian` | Hổ dân gian | Sức mạnh, bảo vệ, trấn giữ |
| `rong-dan-gian` | Rồng dân gian | Quyền quý, mưa thuận gió hòa |

### Cây Cỏ (6)
| ID | Tên | Ý nghĩa |
|---|---|---|
| `hoa-sen` | Hoa sen | Thanh cao, tinh khiết, quốc hoa |
| `cay-tre` | Cây tre | Làng quê, bền bỉ, đoàn kết |
| `hoa-dao` | Hoa đào | Mùa xuân, may mắn, tình yêu |
| `hoa-cuc` | Hoa cúc | Trường thọ, thanh cao, quân tử |
| `qua-phat-thu` | Quả phật thủ | May mắn, tâm linh, thờ cúng |
| `bong-lua` | Bông lúa | Ấm no, mùa màng, nông nghiệp |

### Hoa Văn (3)
| ID | Tên | Ý nghĩa |
|---|---|---|
| `van-may` | Vân mây | Trời, tự do, phong thủy |
| `song-nuoc` | Sóng nước | Sông nước, dòng chảy, quê hương |
| `tho-cam` | Thổ cẩm | Dân tộc, dệt may, truyền thống |

### Chữ Việt (3)
| ID | Tên | Chữ Hán | Ý nghĩa |
|---|---|---|---|
| `chu-phuc` | Chữ Phúc | 福 | Hạnh phúc, may mắn |
| `chu-loc` | Chữ Lộc | 祿 | Tài lộc, thịnh vượng |
| `chu-tho` | Chữ Thọ | 壽 | Trường thọ, sức khỏe |

### Khung Viền (3)
| ID | Tên | Ý nghĩa |
|---|---|---|
| `khung-moc-ban` | Khung mộc bản | Ván in gỗ truyền thống |
| `khung-hoa-van` | Khung hoa văn | Trang trí cổ điển |
| `khung-tron` | Khung tròn | Viên mãn, tròn đầy |

---

## 🚀 Cách Sinh SVG Placeholder

```bash
# Từ thư mục motif-svg
node generate-placeholder.js

# Output: tất cả file SVG được sinh vào
# D:\xuong-dong-ho\public\motifs\<category>\
```

Mỗi SVG được code thủ công dựa trên phong cách tranh Đông Hồ:
- Viền đen đậm (nét khắc gỗ)
- Màu phẳng (flat color, không gradient)
- Họa tiết cách điệu đơn giản

---

## 🔍 Cách Tra Cứu Motif

Dùng `motifs-data.json` để tìm motif:

```js
const motifs = require('./motifs-data.json');

// Tìm theo category
const linhVat = motifs.motifs.filter(m => m.category === 'linh-vat');

// Tìm theo tag
const tetMotifs = motifs.motifs.filter(m => m.tags.includes('Tết'));

// Tìm theo search index (không dấu)
const mayManIds = motifs.searchIndex.keywords['may man'];
const mayManMotifs = motifs.motifs.filter(m => mayManIds.includes(m.id));
```

---

## 📐 Kích Thước SVG

Tất cả SVG placeholder có kích thước **200×200px** (viewBox). Khi dùng trong canvas editor, có thể scale lên bất kỳ kích thước nào.

Trong thực tế, nên thay thế bằng **SVG trace từ ảnh tranh thật** (dùng Inkscape hoặc vectorizer.ai).

---

## 🎯 Lộ Trình Cải Thiện

1. ✅ **Phase 1**: SVG placeholder từ code (hiện tại)
2. ⬜ **Phase 2**: Tải ảnh tranh Đông Hồ thật từ Wikimedia Commons
3. ⬜ **Phase 3**: Trace ảnh → SVG bằng Inkscape / Vectorizer.ai
4. ⬜ **Phase 4**: Chỉnh sửa SVG thủ công cho khớp phong cách
5. ⬜ **Phase 5**: Thêm 20+ motif mới từ các nghệ nhân

---

*Xưởng Đông Hồ — Mộc bản trong tay bạn*