/**
 * AI Image Generation utilities for Xưởng Đông Hồ
 *
 * Architecture (per architecture doc):
 *   Step 1 — Gemini translates Vietnamese prompt → English
 *   Step 2 — Pollinations.ai generates the image (free, no key)
 *
 * All calls go through /api/generate (server-side) to avoid CORS.
 */

/** Style suffix appended to every image prompt — enforces Đông Hồ aesthetics */
export const DONG_HO_STYLE_SUFFIX = `in the style of Vietnamese Dong Ho folk woodblock print, flat graphic design, bold black outlines, limited color palette of vermillion red, golden yellow, indigo blue, forest green, white and black, printed on traditional dieu paper with pearl luster, folk art motifs, symmetrical composition, traditional Vietnamese aesthetics, high contrast, no photorealism, no 3D rendering, no shadows, no gradients`

/** Negative prompt to exclude unwanted styles */
export const NEGATIVE_STYLE = `NOT photorealistic, NOT 3D, NOT modern art, NOT Western style, NOT gradient, NOT shadow, NOT photograph, NOT anime, NOT cartoon network style, NOT watercolor, NOT oil painting`

/** Quick-tag prompts in Vietnamese with pre-translated English counterparts */
export const QUICK_TAGS: Array<{ vi: string; en: string }> = [
  { vi: 'Lợn âm dương',      en: 'a pair of yin-yang pigs with swirl patterns on their bodies, surrounded by small piglets, prosperity symbol' },
  { vi: 'Gà trống đón xuân', en: 'a proud rooster crowing at sunrise with peony flowers and Tet new year decorations' },
  { vi: 'Cá chép',           en: 'a carp fish leaping over dragon gate with moon reflection, water waves below' },
  { vi: 'Đầm sen',           en: 'lotus pond scene with blooming lotus flowers, lotus leaves, dragonflies, peaceful countryside' },
  { vi: 'Đám cưới chuột',   en: 'a procession of mice in traditional clothes carrying wedding gifts to a cat, satirical folk scene' },
]

/**
 * Build the Pollinations.ai image URL with the correct parameters.
 * Called server-side only from /api/generate/route.ts
 */
export function buildPollinationsUrl(
  englishPrompt: string,
  options: {
    width?: number
    height?: number
    seed?: number
  } = {},
): string {
  const { width = 512, height = 512, seed = Math.floor(Math.random() * 999999) } = options
  const fullPrompt = `${englishPrompt}, ${DONG_HO_STYLE_SUFFIX}. ${NEGATIVE_STYLE}`
  const encoded = encodeURIComponent(fullPrompt)
  return `https://image.pollinations.ai/prompt/${encoded}?model=flux&width=${width}&height=${height}&seed=${seed}&nologo=true`
}

/**
 * Generate request payload type for the /api/generate endpoint
 */
export interface GenerateRequest {
  prompt_vi: string
  strength?: number
  seed?: number
}

export interface GenerateResponse {
  imageUrl: string
  translatedPrompt: string
  seed: number
}
