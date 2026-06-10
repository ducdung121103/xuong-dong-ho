/**
 * Đông Hồ Color System — 16 pigment-accurate colors
 * Extracted from ai-outputs-concept.txt (authentic organic pigment analysis)
 *
 * These represent the actual natural dyes used by Đông Hồ artisans:
 * than xoan (charcoal), son (cinnabar), hoa hòe (sophora), chàm (indigo),
 * gỉ đồng (copper patina), điệp (scallop shell), đất sét (clay), etc.
 */

export interface DongHoColor {
  hex: string
  name: string
  nameEn: string
}

export const DONG_HO_PALETTE: Record<string, DongHoColor> = {
  paper:     { hex: '#F4E7D3', name: 'Trắng Điệp',     nameEn: 'Pearlescent Scallop' },
  black:     { hex: '#22251B', name: 'Đen Than Xoan',   nameEn: 'Charcoal Black' },
  red:       { hex: '#AD3B2C', name: 'Đỏ Son',          nameEn: 'Cinnabar Red' },
  gold:      { hex: '#C49A5C', name: 'Vàng Hòe',        nameEn: 'Sophora Yellow' },
  green:     { hex: '#265C41', name: 'Xanh Lục Chàm',   nameEn: 'Indigo Green' },
  orange:    { hex: '#E59A38', name: 'Vàng Cam Dành Dành', nameEn: 'Gardenia Orange' },
  pink:      { hex: '#D0898B', name: 'Hồng Sen Trầm',   nameEn: 'Muted Lotus Pink' },
  brown:     { hex: '#583220', name: 'Nâu Gụ',          nameEn: 'Rosewood Brown' },
  teal:      { hex: '#507C6F', name: 'Xanh Ngọc Điệp',  nameEn: 'Jade Teal' },
  deepRed:   { hex: '#7B1E0E', name: 'Đỏ Thẫm',        nameEn: 'Deep Crimson' },
  mustard:   { hex: '#B8860B', name: 'Vàng Nâu',        nameEn: 'Dark Mustard' },
  darkGreen: { hex: '#2E7D6E', name: 'Xanh Lá Đậm',    nameEn: 'Deep Teal' },
  cream:     { hex: '#EDE8D5', name: 'Kem Nhạt',        nameEn: 'Light Cream' },
  rust:      { hex: '#9B4523', name: 'Đỏ Gạch',         nameEn: 'Brick Red' },
  olive:     { hex: '#6B7A3F', name: 'Xanh Rêu',        nameEn: 'Moss Green' },
  midnight:  { hex: '#1A2850', name: 'Xanh Đêm',        nameEn: 'Midnight Blue' },
} as const

/** Flat array of hex values for quick iteration */
export const PALETTE_HEX = Object.values(DONG_HO_PALETTE).map((c) => c.hex)

/** Flat array of swatches for UI components (ColorPicker, Properties Panel) */
export const PALETTE_SWATCHES = Object.values(DONG_HO_PALETTE)

/**
 * UI-specific color tokens from the "Kinh Bắc Họa Ấn" concept
 * Used for the interface chrome, not the artwork palette
 */
export const UI_TOKENS = {
  screenBg:   '#1A1816',
  panelBg:    '#1E1C1A',
  panelBorder: '#2E2B27',
  warmText:   '#EADABF',
  mutedText:  '#A99672',
  primaryRed: '#AD3B2C',
  accentGold: '#C49A5C',
  accentGreen:'#265C41',
  canvasPaper:'#F4E7D3',
} as const
