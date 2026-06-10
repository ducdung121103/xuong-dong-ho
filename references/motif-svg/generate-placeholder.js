/**
 * Xưởng Đông Hồ — Motif SVG Placeholder Generator
 * 
 * Dùng để sinh SVG placeholder khi chưa có file SVG thật.
 * Mỗi SVG placeholder mô phỏng phong cách tranh Đông Hồ:
 * - Viền đen đậm (nét khắc gỗ)
 * - Màu phẳng (flat color, không gradient)
 * - Họa tiết đơn giản cách điệu
 * 
 * Cách dùng:
 *   node generate-placeholder.js
 * 
 * Hoặc import function để dùng trong code:
 *   const { generateSVG } = require('./generate-placeholder');
 */

const fs = require('fs');
const path = require('path');

// Bảng màu Đông Hồ
const COLORS = {
  dark: '#1A1208',
  red: '#C0392B',
  gold: '#D4A017',
  indigo: '#2C3E6B',
  green: '#4A7C59',
  paper: '#F5F0E0',
  brown: '#8B5E3C',
  salmon: '#E8927C',
};

const CATEGORY_COLORS = {
  'linh-vat': COLORS.red,
  'thuc-vat': COLORS.green,
  'hoa-van': COLORS.indigo,
  'chu-viet': COLORS.gold,
  'khung-vien': COLORS.brown,
};

/**
 * Tạo SVG placeholder cho một motif
 * @param {Object} motif - Motif object từ motifs-data.json
 * @returns {string} SVG markup
 */
function generateMotifSVG(motif) {
  const categoryColor = CATEGORY_COLORS[motif.category] || COLORS.red;
  
  switch (motif.id) {
    // ==================== LINH VẬT ====================
    case 'lon-dan':
      return generatePigFamily(categoryColor);
    case 'ga-trong':
      return generateRooster(categoryColor);
    case 'ca-chep':
      return generateCarp(categoryColor);
    case 'trau-cay':
      return generateBuffalo(categoryColor);
    case 'coc-mac-ao':
      return generateDressedToad(categoryColor);
    case 'dam-cuoi-chuot':
      return generateMouseWedding(categoryColor);
    case 'ho-dan-gian':
      return generateTiger(categoryColor);
    case 'rong-dan-gian':
      return generateDragon(categoryColor);
    
    // ==================== THỰC VẬT ====================
    case 'hoa-sen':
      return generateLotus(categoryColor);
    case 'cay-tre':
      return generateBamboo(categoryColor);
    case 'hoa-dao':
      return generatePeachBlossom(categoryColor);
    case 'hoa-cuc':
      return generateChrysanthemum(categoryColor);
    case 'qua-phat-thu':
      return generateBuddhaHand(categoryColor);
    case 'bong-lua':
      return generateRiceGrain(categoryColor);
    
    // ==================== HOA VĂN ====================
    case 'van-may':
      return generateCloudPattern(categoryColor);
    case 'song-nuoc':
      return generateWavePattern(categoryColor);
    case 'tho-cam':
      return generateBrocadePattern(categoryColor);
    
    // ==================== CHỮ VIỆT ====================
    case 'chu-phuc':
      return generateCharacterMotif('Phúc', '福', categoryColor);
    case 'chu-loc':
      return generateCharacterMotif('Lộc', '祿', categoryColor);
    case 'chu-tho':
      return generateCharacterMotif('Thọ', '壽', categoryColor);
    
    // ==================== KHUNG VIỀN ====================
    case 'khung-moc-ban':
      return generateWoodblockFrame(categoryColor);
    case 'khung-hoa-van':
      return generateOrnamentalFrame(categoryColor);
    case 'khung-tron':
      return generateCircularFrame(categoryColor);
    
    default:
      return generateGenericMotif(motif, categoryColor);
  }
}

/**
 * Tạo header/footer SVG chung
 */
function svgWrapper(content, size = 200) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <!-- Xưởng Đông Hồ — Placeholder SVG -->
  <rect width="${size}" height="${size}" fill="${COLORS.paper}" rx="4"/>
${content}
</svg>`;
}

// ==================== LINH VẬT GENERATORS ====================

function generatePigFamily(color) {
  return svgWrapper(`
  <!-- Lợn mẹ -->
  <ellipse cx="100" cy="85" rx="35" ry="25" fill="${color}" stroke="${COLORS.dark}" stroke-width="3"/>
  <circle cx="80" cy="78" r="5" fill="${COLORS.dark}"/>
  <ellipse cx="110" cy="70" rx="12" ry="8" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <circle cx="106" cy="68" r="3" fill="${COLORS.dark}"/>
  <!-- Chân -->
  <rect x="75" y="105" width="8" height="15" rx="3" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <rect x="95" y="105" width="8" height="15" rx="3" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <rect x="115" y="105" width="8" height="15" rx="3" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Lợn con -->
  <ellipse cx="155" cy="95" rx="15" ry="12" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="2"/>
  <circle cx="150" cy="92" r="3" fill="${COLORS.dark}"/>
  <ellipse cx="170" cy="100" rx="13" ry="11" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="2"/>
  <circle cx="166" cy="97" r="3" fill="${COLORS.dark}"/>
  <!-- Hoa văn nền -->
  <circle cx="160" cy="50" r="10" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5" opacity="0.5"/>
  <circle cx="40" cy="120" r="8" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5" opacity="0.5"/>
`, 200);
}

function generateRooster(color) {
  return svgWrapper(`
  <!-- Thân gà -->
  <ellipse cx="100" cy="90" rx="35" ry="40" fill="${color}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Đuôi -->
  <path d="M70 110 Q40 60 50 30 Q60 50 75 90" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <path d="M68 105 Q30 55 45 25 Q50 45 72 85" fill="${COLORS.indigo}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <path d="M65 100 Q20 50 40 20 Q42 42 68 80" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <!-- Đầu -->
  <circle cx="115" cy="55" r="18" fill="${color}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Mào -->
  <path d="M108 39 Q115 22 125 25 Q118 32 120 39" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <!-- Mắt -->
  <circle cx="122" cy="52" r="3" fill="${COLORS.dark}"/>
  <!-- Mỏ -->
  <polygon points="133,55 142,52 133,49" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Chân -->
  <line x1="95" y1="128" x2="90" y2="150" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <line x1="105" y1="128" x2="108" y2="150" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <!-- Mặt trời nhỏ -->
  <circle cx="160" cy="35" r="10" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
`, 200);
}

function generateCarp(color) {
  return svgWrapper(`
  <!-- Thân cá -->
  <ellipse cx="95" cy="90" rx="50" ry="25" fill="${color}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Đuôi -->
  <polygon points="45,75 15,55 25,90 15,125 45,105" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <!-- Vây -->
  <path d="M85 70 Q95 50 105 70" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Mắt -->
  <circle cx="125" cy="82" r="4" fill="${COLORS.dark}"/>
  <!-- Vảy (cách điệu) -->
  <path d="M70 85 Q80 75 90 85" fill="none" stroke="${COLORS.gold}" stroke-width="1.5"/>
  <path d="M85 85 Q95 75 105 85" fill="none" stroke="${COLORS.gold}" stroke-width="1.5"/>
  <path d="M70 95 Q80 85 90 95" fill="none" stroke="${COLORS.gold}" stroke-width="1.5"/>
  <!-- Sóng nước -->
  <path d="M10 140 Q30 130 50 140 Q70 150 90 140 Q110 130 130 140 Q150 150 170 140 Q190 130 200 140" fill="none" stroke="${COLORS.indigo}" stroke-width="1.5" opacity="0.6"/>
`, 200);
}

function generateBuffalo(color) {
  return svgWrapper(`
  <!-- Thân trâu -->
  <rect x="55" y="70" width="60" height="40" rx="15" fill="${COLORS.brown}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Đầu -->
  <rect x="100" y="55" width="30" height="25" rx="10" fill="${COLORS.brown}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Sừng -->
  <path d="M105 57 Q95 35 85 40" fill="none" stroke="${COLORS.dark}" stroke-width="3"/>
  <path d="M125 57 Q135 35 145 40" fill="none" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Mắt -->
  <circle cx="120" cy="65" r="3" fill="${COLORS.dark}"/>
  <!-- Chân -->
  <rect x="65" y="108" width="10" height="20" rx="3" fill="${COLORS.brown}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <rect x="85" y="108" width="10" height="20" rx="3" fill="${COLORS.brown}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <rect x="105" y="108" width="10" height="20" rx="3" fill="${COLORS.brown}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <!-- Người nông dân (cách điệu) -->
  <circle cx="40" cy="60" r="10" fill="${COLORS.paper}" stroke="${COLORS.dark}" stroke-width="2"/>
  <rect x="33" y="70" width="14" height="20" rx="4" fill="${COLORS.indigo}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Cây lúa nền -->
  <path d="M150 140 Q155 110 160 80" fill="none" stroke="${COLORS.green}" stroke-width="2"/>
  <ellipse cx="160" cy="78" rx="4" ry="8" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
`, 200);
}

function generateDressedToad(color) {
  return svgWrapper(`
  <!-- Thân cóc -->
  <ellipse cx="100" cy="100" rx="35" ry="30" fill="${color}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Áo thầy đồ -->
  <rect x="75" y="80" width="50" height="40" rx="8" fill="${COLORS.indigo}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <!-- Đầu -->
  <ellipse cx="100" cy="65" rx="22" ry="18" fill="${color}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Mắt (lồi) -->
  <circle cx="87" cy="55" r="7" fill="${COLORS.paper}" stroke="${COLORS.dark}" stroke-width="2"/>
  <circle cx="88" cy="55" r="3" fill="${COLORS.dark}"/>
  <circle cx="113" cy="55" r="7" fill="${COLORS.paper}" stroke="${COLORS.dark}" stroke-width="2"/>
  <circle cx="114" cy="55" r="3" fill="${COLORS.dark}"/>
  <!-- Miệng -->
  <path d="M90 72 Q100 80 110 72" fill="none" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Sách trên tay -->
  <rect x="60" y="95" width="20" height="15" rx="2" fill="${COLORS.paper}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Nón -->
  <path d="M80 50 L120 50 L100 30 Z" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="2"/>
`, 200);
}

function generateMouseWedding(color) {
  return svgWrapper(`
  <!-- Chuột rể -->
  <ellipse cx="70" cy="90" rx="20" ry="16" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <circle cx="60" cy="82" r="4" fill="${COLORS.dark}"/>
  <circle cx="63" cy="78" r="7" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <ellipse cx="70" cy="105" rx="8" ry="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Chuột cô dâu -->
  <ellipse cx="130" cy="90" rx="20" ry="16" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <circle cx="140" cy="82" r="4" fill="${COLORS.dark}"/>
  <circle cx="137" cy="78" r="7" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Kiệu hoa -->
  <rect x="85" y="70" width="40" height="35" rx="5" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <circle cx="105" cy="75" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Trống -->
  <ellipse cx="160" cy="110" rx="12" ry="8" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Nền văn -->
  <path d="M10 140 Q30 130 50 140 Q70 150 90 140 Q110 130 130 140 Q150 150 170 140 Q190 130 200 140" fill="none" stroke="${COLORS.brown}" stroke-width="1" opacity="0.4"/>
`, 200);
}

function generateTiger(color) {
  return svgWrapper(`
  <!-- Thân -->
  <ellipse cx="100" cy="100" rx="40" ry="35" fill="${color}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Đầu -->
  <circle cx="100" cy="62" r="25" fill="${color}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Tai -->
  <path d="M80 42 L75 28 L90 38" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <path d="M120 42 L125 28 L110 38" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Mắt -->
  <ellipse cx="88" cy="58" rx="5" ry="6" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="88" cy="58" r="2.5" fill="${COLORS.dark}"/>
  <ellipse cx="112" cy="58" rx="5" ry="6" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="112" cy="58" r="2.5" fill="${COLORS.dark}"/>
  <!-- Mũi -->
  <polygon points="100,66 96,72 104,72" fill="${COLORS.dark}"/>
  <!-- Sọc hổ -->
  <path d="M75 80 Q100 75 125 80" fill="none" stroke="${COLORS.dark}" stroke-width="2"/>
  <path d="M80 90 Q100 85 120 90" fill="none" stroke="${COLORS.dark}" stroke-width="2"/>
  <path d="M85 100 Q100 95 115 100" fill="none" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Vằn trên đầu -->
  <line x1="100" y1="38" x2="100" y2="48" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <line x1="92" y1="40" x2="95" y2="48" stroke="${COLORS.dark}" stroke-width="2"/>
  <line x1="108" y1="40" x2="105" y2="48" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Chân -->
  <ellipse cx="80" cy="130" rx="10" ry="6" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <ellipse cx="120" cy="130" rx="10" ry="6" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Lửa/vân vàng -->
  <path d="M130 75 Q145 70 140 85 Q150 80 145 95" fill="none" stroke="${COLORS.gold}" stroke-width="2" opacity="0.6"/>
`, 200);
}

function generateDragon(color) {
  return svgWrapper(`
  <!-- Thân rồng uốn lượn -->
  <path d="M170 60 Q140 40 120 55 Q100 70 80 55 Q60 40 40 60 Q20 80 30 100" 
        fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"/>
  <path d="M170 60 Q140 40 120 55 Q100 70 80 55 Q60 40 40 60 Q20 80 30 100" 
        fill="none" stroke="${COLORS.dark}" stroke-width="14" stroke-linecap="round" opacity="0.3"/>
  <path d="M170 60 Q140 40 120 55 Q100 70 80 55 Q60 40 40 60 Q20 80 30 100" 
        fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"/>
  <!-- Đầu -->
  <ellipse cx="170" cy="58" rx="15" ry="10" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <!-- Mắt -->
  <circle cx="178" cy="55" r="3" fill="${COLORS.dark}"/>
  <!-- Râu -->
  <path d="M180 52 Q190 45 195 48" fill="none" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <path d="M180 56 Q192 54 195 55" fill="none" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Sừng -->
  <path d="M168 48 Q165 38 160 35" fill="none" stroke="${COLORS.gold}" stroke-width="2.5"/>
  <!-- Mây -->
  <circle cx="50" cy="30" r="12" fill="${COLORS.indigo}" stroke="${COLORS.dark}" stroke-width="1.5" opacity="0.5"/>
  <circle cx="140" cy="140" r="10" fill="${COLORS.indigo}" stroke="${COLORS.dark}" stroke-width="1.5" opacity="0.5"/>
`, 200);
}

// ==================== THỰC VẬT GENERATORS ====================

function generateLotus(color) {
  return svgWrapper(`
  <!-- Cánh sen -->
  <ellipse cx="100" cy="85" rx="12" ry="30" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <ellipse cx="100" cy="80" rx="16" ry="28" fill="${COLORS.paper}" stroke="${COLORS.dark}" stroke-width="2" opacity="0.7"/>
  <ellipse cx="85" cy="90" rx="10" ry="25" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="2"/>
  <ellipse cx="115" cy="90" rx="10" ry="25" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Nhụy -->
  <circle cx="100" cy="78" r="6" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Lá sen -->
  <ellipse cx="100" cy="140" rx="45" ry="15" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5" opacity="0.3"/>
  <!-- Cuống -->
  <line x1="100" y1="100" x2="100" y2="140" stroke="${color}" stroke-width="3"/>
  <!-- Sóng nước -->
  <path d="M20 155 Q40 150 60 155 Q80 160 100 155 Q120 150 140 155 Q160 160 180 155" fill="none" stroke="${COLORS.indigo}" stroke-width="1.5"/>
`, 200);
}

function generateBamboo(color) {
  return svgWrapper(`
  <!-- Thân tre -->
  <rect x="90" y="30" width="20" height="140" rx="3" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <!-- Đốt tre -->
  <line x1="88" y1="65" x2="112" y2="65" stroke="${COLORS.dark}" stroke-width="2"/>
  <line x1="88" y1="100" x2="112" y2="100" stroke="${COLORS.dark}" stroke-width="2"/>
  <line x1="88" y1="135" x2="112" y2="135" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Lá tre (trái) -->
  <path d="M88 40 Q60 30 50 40 Q65 45 88 50" fill="${color}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <path d="M88 75 Q55 65 45 75 Q60 80 88 85" fill="${color}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Lá tre (phải) -->
  <path d="M112 50 Q135 40 150 50 Q135 55 112 60" fill="${color}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <path d="M112 90 Q140 80 155 90 Q140 100 112 100" fill="${color}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Bụi tre nhỏ -->
  <rect x="140" y="60" width="12" height="100" rx="2" fill="${COLORS.green}" stroke="${COLORS.dark}" stroke-width="2" opacity="0.6"/>
`, 200);
}

function generatePeachBlossom(color) {
  return svgWrapper(`
  <!-- Cành -->
  <path d="M50 150 Q70 120 100 100 Q120 80 150 70" fill="none" stroke="${COLORS.brown}" stroke-width="3"/>
  <!-- Hoa 1 -->
  <circle cx="100" cy="95" r="14" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="2"/>
  <circle cx="100" cy="95" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
  <!-- Hoa 2 -->
  <circle cx="130" cy="78" r="12" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="2"/>
  <circle cx="130" cy="78" r="4" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
  <!-- Hoa 3 -->
  <circle cx="150" cy="68" r="10" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <circle cx="150" cy="68" r="3.5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
  <!-- Nụ -->
  <circle cx="80" cy="115" r="7" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="1.5" opacity="0.7"/>
  <circle cx="142" cy="82" r="5" fill="${COLORS.salmon}" stroke="${COLORS.dark}" stroke-width="1.5" opacity="0.6"/>
  <!-- Lá -->
  <ellipse cx="115" cy="105" rx="6" ry="3" fill="${COLORS.green}" stroke="${COLORS.dark}" stroke-width="1" transform="rotate(-30 115 105)"/>
`, 200);
}

function generateChrysanthemum(color) {
  return svgWrapper(`
  <!-- Cánh hoa cúc - rất nhiều cánh nhỏ -->
  ${Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5) * Math.PI / 180;
    const x1 = 100 + 20 * Math.cos(angle);
    const y1 = 85 + 20 * Math.sin(angle);
    const x2 = 100 + 40 * Math.cos(angle);
    const y2 = 85 + 40 * Math.sin(angle);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
  }).join('\n  ')}
  <!-- Viền cánh -->
  ${Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5) * Math.PI / 180;
    const x1 = 100 + 20 * Math.cos(angle);
    const y1 = 85 + 20 * Math.sin(angle);
    const x2 = 100 + 40 * Math.cos(angle);
    const y2 = 85 + 40 * Math.sin(angle);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${COLORS.dark}" stroke-width="1" stroke-linecap="round" opacity="0.3"/>`;
  }).join('\n  ')}
  <!-- Nhụy -->
  <circle cx="100" cy="85" r="15" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="2"/>
  <circle cx="100" cy="85" r="8" fill="${COLORS.brown}" opacity="0.4"/>
  <!-- Cành -->
  <line x1="100" y1="125" x2="100" y2="160" stroke="${COLORS.brown}" stroke-width="3"/>
  <!-- Lá -->
  <ellipse cx="80" cy="145" rx="15" ry="5" fill="${COLORS.green}" stroke="${COLORS.dark}" stroke-width="1.5" transform="rotate(-20 80 145)"/>
  <ellipse cx="120" cy="148" rx="15" ry="5" fill="${COLORS.green}" stroke="${COLORS.dark}" stroke-width="1.5" transform="rotate(20 120 148)"/>
`, 200);
}

function generateBuddhaHand(color) {
  return svgWrapper(`
  <!-- Phần trên - các ngón -->
  <path d="M100 130 Q95 90 80 65" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
  <path d="M100 130 Q100 85 100 55" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
  <path d="M100 130 Q105 90 120 65" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
  <path d="M100 130 Q90 95 70 75" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
  <path d="M100 130 Q110 95 130 75" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
  <!-- Viền đen cho các ngón -->
  <path d="M100 130 Q95 90 80 65" fill="none" stroke="${COLORS.dark}" stroke-width="10" stroke-linecap="round" opacity="0.3"/>
  <path d="M100 130 Q100 85 100 55" fill="none" stroke="${COLORS.dark}" stroke-width="10" stroke-linecap="round" opacity="0.3"/>
  <path d="M100 130 Q105 90 120 65" fill="none" stroke="${COLORS.dark}" stroke-width="10" stroke-linecap="round" opacity="0.3"/>
  <!-- Phần dưới - đế -->
  <ellipse cx="100" cy="140" rx="25" ry="12" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <!-- Vân vàng -->
  <path d="M85 140 Q100 135 115 140" fill="none" stroke="${COLORS.gold}" stroke-width="1.5"/>
`, 200);
}

function generateRiceGrain(color) {
  return svgWrapper(`
  <!-- Thân lúa -->
  <line x1="100" y1="30" x2="100" y2="160" stroke="${COLORS.green}" stroke-width="3"/>
  <!-- Hạt lúa (trái) -->
  <ellipse cx="85" cy="70" rx="4" ry="10" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1" transform="rotate(-15 85 70)"/>
  <ellipse cx="82" cy="90" rx="4" ry="10" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1" transform="rotate(-10 82 90)"/>
  <ellipse cx="88" cy="110" rx="4" ry="10" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1" transform="rotate(-20 88 110)"/>
  <!-- Hạt lúa (phải) -->
  <ellipse cx="115" cy="75" rx="4" ry="10" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1" transform="rotate(15 115 75)"/>
  <ellipse cx="118" cy="95" rx="4" ry="10" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1" transform="rotate(10 118 95)"/>
  <ellipse cx="112" cy="115" rx="4" ry="10" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1" transform="rotate(20 112 115)"/>
  <!-- Lá -->
  <path d="M100 50 Q80 55 75 65" fill="${COLORS.green}" stroke="${COLORS.dark}" stroke-width="1.5" opacity="0.6"/>
  <path d="M100 50 Q120 55 125 65" fill="${COLORS.green}" stroke="${COLORS.dark}" stroke-width="1.5" opacity="0.6"/>
`, 200);
}

// ==================== HOA VĂN GENERATORS ====================

function generateCloudPattern(color) {
  return svgWrapper(`
  <!-- Mây xoắn 1 -->
  <path d="M30 100 Q30 70 60 70 Q90 70 90 100 Q90 130 60 130 Q30 130 30 100" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5" opacity="0.7"/>
  <path d="M30 100 Q20 90 10 100 Q0 110 10 120" fill="none" stroke="${color}" stroke-width="4"/>
  <!-- Mây xoắn 2 -->
  <path d="M140 60 Q140 40 160 40 Q180 40 180 60 Q180 80 160 80 Q140 80 140 60" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5" opacity="0.6"/>
  <!-- Mây xoắn 3 -->
  <path d="M110 130 Q110 115 125 115 Q140 115 140 130 Q140 145 125 145 Q110 145 110 130" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5" opacity="0.5"/>
  <!-- Chấm vàng -->
  <circle cx="50" cy="85" r="3" fill="${COLORS.gold}"/>
  <circle cx="70" cy="110" r="3" fill="${COLORS.gold}"/>
  <circle cx="155" cy="50" r="3" fill="${COLORS.gold}"/>
`, 200);
}

function generateWavePattern(color) {
  return svgWrapper(`
  <!-- Sóng lớp 1 -->
  <path d="M0 80 Q25 65 50 80 Q75 95 100 80 Q125 65 150 80 Q175 95 200 80" fill="none" stroke="${color}" stroke-width="4"/>
  <!-- Sóng lớp 2 -->
  <path d="M0 100 Q25 85 50 100 Q75 115 100 100 Q125 85 150 100 Q175 115 200 100" fill="none" stroke="${color}" stroke-width="3" opacity="0.7"/>
  <!-- Sóng lớp 3 -->
  <path d="M0 120 Q25 105 50 120 Q75 135 100 120 Q125 105 150 120 Q175 135 200 120" fill="none" stroke="${color}" stroke-width="2" opacity="0.4"/>
  <!-- Họa tiết sóng cách điệu -->
  <path d="M40 90 Q50 80 60 90" fill="none" stroke="${COLORS.gold}" stroke-width="1.5"/>
  <path d="M100 70 Q110 60 120 70" fill="none" stroke="${COLORS.gold}" stroke-width="1.5"/>
  <path d="M160 90 Q170 80 180 90" fill="none" stroke="${COLORS.gold}" stroke-width="1.5"/>
  <!-- Cá nhỏ -->
  <ellipse cx="80" cy="140" rx="10" ry="5" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1"/>
  <polygon points="70,140 63,136 63,144" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1"/>
  <ellipse cx="150" cy="148" rx="8" ry="4" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1"/>
  <polygon points="142,148 136,145 136,151" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1"/>
`, 200);
}

function generateBrocadePattern(color) {
  return svgWrapper(`
  <!-- Nền -->
  <rect x="10" y="10" width="180" height="180" fill="${COLORS.cream}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Họa tiết kim cương -->
  <polygon points="100,25 140,70 100,115 60,70" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5"/>
  <polygon points="100,40 125,70 100,100 75,70" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Họa tiết góc -->
  <polygon points="25,25 55,25 55,55 25,55 15,40" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <polygon points="175,25 145,25 145,55 175,55 185,40" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <polygon points="25,175 55,175 55,145 25,145 15,160" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <polygon points="175,175 145,175 145,145 175,145 185,160" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Chấm tròn -->
  <circle cx="100" cy="70" r="4" fill="${COLORS.dark}"/>
  <circle cx="60" cy="40" r="3" fill="${COLORS.gold}"/>
  <circle cx="140" cy="40" r="3" fill="${COLORS.gold}"/>
  <circle cx="60" cy="160" r="3" fill="${COLORS.gold}"/>
  <circle cx="140" cy="160" r="3" fill="${COLORS.gold}"/>
  <!-- Đường chéo -->
  <line x1="40" y1="25" x2="25" y2="40" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <line x1="160" y1="25" x2="175" y2="40" stroke="${COLORS.dark}" stroke-width="1.5"/>
`, 200);
}

// ==================== CHỮ VIỆT GENERATORS ====================

function generateCharacterMotif(name, character, color) {
  return svgWrapper(`
  <!-- Khung nền -->
  <rect x="30" y="30" width="140" height="140" rx="10" fill="${color}" stroke="${COLORS.dark}" stroke-width="3"/>
  <!-- Viền trong -->
  <rect x="38" y="38" width="124" height="124" rx="6" fill="none" stroke="${COLORS.dark}" stroke-width="1.5" opacity="0.5"/>
  <!-- Chữ Hán (to) -->
  <text x="100" y="120" text-anchor="middle" font-family="serif" font-size="72" fill="${COLORS.dark}" font-weight="bold">${character}</text>
  <!-- Tên chữ (nhỏ) -->
  <text x="100" y="155" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${COLORS.dark}" opacity="0.7">${name}</text>
  <!-- Họa tiết góc -->
  <circle cx="45" cy="45" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
  <circle cx="155" cy="45" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
  <circle cx="45" cy="155" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
  <circle cx="155" cy="155" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
`, 200);
}

// ==================== KHUNG VIỀN GENERATORS ====================

function generateWoodblockFrame(color) {
  return svgWrapper(`
  <!-- Khung ngoài (gỗ) -->
  <rect x="15" y="15" width="170" height="170" rx="4" fill="none" stroke="${color}" stroke-width="10"/>
  <rect x="15" y="15" width="170" height="170" rx="4" fill="none" stroke="${COLORS.dark}" stroke-width="12" opacity="0.3"/>
  <rect x="15" y="15" width="170" height="170" rx="4" fill="none" stroke="${color}" stroke-width="8"/>
  <!-- Khung trong -->
  <rect x="35" y="35" width="130" height="130" fill="none" stroke="${COLORS.dark}" stroke-width="2"/>
  <!-- Vân gỗ -->
  <line x1="25" y1="50" x2="175" y2="50" stroke="${COLORS.brown}" stroke-width="1" opacity="0.3"/>
  <line x1="25" y1="80" x2="175" y2="80" stroke="${COLORS.brown}" stroke-width="1" opacity="0.3"/>
  <line x1="25" y1="130" x2="175" y2="130" stroke="${COLORS.brown}" stroke-width="1" opacity="0.3"/>
  <line x1="25" y1="160" x2="175" y2="160" stroke="${COLORS.brown}" stroke-width="1" opacity="0.3"/>
  <!-- Góc khung (đinh tán) -->
  <circle cx="25" cy="25" r="4" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="175" cy="25" r="4" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="25" cy="175" r="4" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="175" cy="175" r="4" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1.5"/>
`, 200);
}

function generateOrnamentalFrame(color) {
  return svgWrapper(`
  <!-- Khung chính -->
  <rect x="20" y="20" width="160" height="160" rx="8" fill="none" stroke="${color}" stroke-width="6"/>
  <rect x="20" y="20" width="160" height="160" rx="8" fill="none" stroke="${COLORS.dark}" stroke-width="8" opacity="0.4"/>
  <rect x="20" y="20" width="160" height="160" rx="8" fill="none" stroke="${color}" stroke-width="4"/>
  <!-- Hoa văn góc -->
  <path d="M20 35 Q20 20 35 20" fill="none" stroke="${COLORS.gold}" stroke-width="3"/>
  <path d="M180 35 Q180 20 165 20" fill="none" stroke="${COLORS.gold}" stroke-width="3"/>
  <path d="M20 165 Q20 180 35 180" fill="none" stroke="${COLORS.gold}" stroke-width="3"/>
  <path d="M180 165 Q180 180 165 180" fill="none" stroke="${COLORS.gold}" stroke-width="3"/>
  <!-- Hoa văn cạnh -->
  <circle cx="100" cy="24" r="5" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="100" cy="176" r="5" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="24" cy="100" r="5" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="176" cy="100" r="5" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Chấm nhỏ trang trí -->
  ${[0, 1, 2, 3].map(i => `<circle cx="${45 + i * 40}" cy="24" r="2" fill="${COLORS.gold}"/>`).join('\n  ')}
  ${[0, 1, 2, 3].map(i => `<circle cx="${45 + i * 40}" cy="176" r="2" fill="${COLORS.gold}"/>`).join('\n  ')}
`, 200);
}

function generateCircularFrame(color) {
  return svgWrapper(`
  <!-- Vòng tròn ngoài -->
  <circle cx="100" cy="100" r="85" fill="none" stroke="${color}" stroke-width="8"/>
  <circle cx="100" cy="100" r="85" fill="none" stroke="${COLORS.dark}" stroke-width="10" opacity="0.3"/>
  <circle cx="100" cy="100" r="85" fill="none" stroke="${color}" stroke-width="6"/>
  <!-- Vòng tròn trong -->
  <circle cx="100" cy="100" r="70" fill="none" stroke="${COLORS.dark}" stroke-width="2"/>
  <circle cx="100" cy="100" r="68" fill="none" stroke="${COLORS.gold}" stroke-width="1" opacity="0.5"/>
  <!-- Hoa văn 4 hướng -->
  <circle cx="100" cy="20" r="8" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="100" cy="180" r="8" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="20" cy="100" r="8" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <circle cx="180" cy="100" r="8" fill="${COLORS.red}" stroke="${COLORS.dark}" stroke-width="1.5"/>
  <!-- Hoa văn 4 góc -->
  <circle cx="43" cy="43" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
  <circle cx="157" cy="43" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
  <circle cx="43" cy="157" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
  <circle cx="157" cy="157" r="5" fill="${COLORS.gold}" stroke="${COLORS.dark}" stroke-width="1"/>
`, 200);
}

// ==================== GENERIC FALLBACK ====================

function generateGenericMotif(motif, color) {
  return svgWrapper(`
  <rect x="20" y="20" width="160" height="160" rx="8" fill="${COLORS.paper}" stroke="${COLORS.dark}" stroke-width="3"/>
  <rect x="35" y="35" width="130" height="130" rx="4" fill="${color}" stroke="${COLORS.dark}" stroke-width="2.5" opacity="0.2"/>
  <text x="100" y="95" text-anchor="middle" font-family="sans-serif" font-size="16" fill="${COLORS.dark}">${motif.name}</text>
  <text x="100" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="${COLORS.brown}">${motif.nameEn}</text>
  <circle cx="100" cy="60" r="15" fill="${color}" stroke="${COLORS.dark}" stroke-width="2"/>
  <text x="100" y="65" text-anchor="middle" font-size="14" fill="${COLORS.paper}">${(motif.category==='linh-vat')?'🐖':(motif.category==='thuc-vat')?'🌸':(motif.category==='hoa-van')?'🌊':(motif.category==='chu-viet')?'✍️':'🖼️'}</text>
`, 200);
}

// ==================== MAIN ====================

// Nếu chạy trực tiếp: sinh tất cả SVG
if (require.main === module) {
  const motifsData = require('./motifs-data.json');
  const outputDir = path.join(__dirname, '..', '..', 'public', 'motifs');
  
  // Tạo output dir nếu chưa có
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  motifsData.motifs.forEach(motif => {
    const categoryDir = path.join(outputDir, motif.category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    const svg = generateMotifSVG(motif);
    const filePath = path.join(categoryDir, `${motif.id}.svg`);
    fs.writeFileSync(filePath, svg, 'utf-8');
    console.log(`✅ Generated: ${filePath}`);
  });
  
  console.log(`\n🎨 Done! Generated ${motifsData.motifs.length} SVG motif placeholders.`);
  console.log(`📂 Output: ${outputDir}`);
}

module.exports = { generateMotifSVG, generateSVG: generateMotifSVG };