/**
 * AI Image Generation utilities for Xưởng Đông Hồ
 *
 * Architecture (updated):
 *   Step 1 — DeepSeek translates Vietnamese prompt → English
 *   Step 2 — Cloudflare Workers AI (Flux.1 Schnell) generates the image
 *
 * All calls go through /api/generate (server-side) to keep keys secure.
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

/** Build the final image prompt with Đông Hồ style baked in */
export function buildImagePrompt(englishPrompt: string): string {
  return `${englishPrompt}, ${DONG_HO_STYLE_SUFFIX}. ${NEGATIVE_STYLE}`
}

/**
 * Cloudflare Workers AI — Flux.1 Schnell
 * Generates image and returns base64-encoded PNG (data URL)
 */
export async function generateImageViaCloudflare(
  prompt: string,
  options: {
    width?: number
    height?: number
    seed?: number
  } = {},
): Promise<string> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!accountId || !apiToken) {
    throw new Error('Cloudflare credentials not configured')
  }

  const { width = 512, height = 512, seed } = options
  const fullPrompt = buildImagePrompt(prompt)

  const cfUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`

  const body: Record<string, unknown> = {
    prompt: fullPrompt,
    width,
    height,
    steps: 4,
  }

  // Only include seed if provided (Flux Schnell supports seed for reproducibility)
  if (seed !== undefined) {
    body.seed = seed
  }

  const res = await fetch(cfUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Cloudflare AI error ${res.status}: ${errText}`)
  }

  const data = await res.json()

  // Cloudflare Workers AI returns { result: { image: "base64..." } }
  const base64Image: string = data?.result?.image
  if (!base64Image) {
    throw new Error('No image in Cloudflare response')
  }

  // Return as data URL so <img> can render directly
  return `data:image/png;base64,${base64Image}`
}

/**
 * Translate Vietnamese → English via DeepSeek
 */
export async function translatePrompt(promptVi: string): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY not configured')
  }

  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `You are a prompt translator for a Vietnamese folk art AI image generator (Đông Hồ woodblock prints). 

Translate the following Vietnamese text into an English image generation prompt. Focus on visual description. Keep it concise (under 60 words). Do NOT add any explanation — only output the translated prompt.

If the input already contains English, refine it for image generation.`,
        },
        {
          role: 'user',
          content: `Vietnamese input: "${promptVi.trim()}"\n\nEnglish image prompt:`,
        },
      ],
      max_tokens: 150,
      temperature: 0.3,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`DeepSeek API error ${res.status}: ${errText}`)
  }

  const data = await res.json()
  const translated = data?.choices?.[0]?.message?.content?.trim()
  if (!translated) {
    throw new Error('No translation in DeepSeek response')
  }

  return translated
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
  imageUrl: string   // data:image/png;base64,... (or URL)
  translatedPrompt: string
  seed: number
}