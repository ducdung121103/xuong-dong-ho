import { NextRequest, NextResponse } from 'next/server'
import { buildPollinationsUrl, DONG_HO_STYLE_SUFFIX, NEGATIVE_STYLE } from '@/lib/ai-generator'
import type { GenerateRequest, GenerateResponse } from '@/lib/ai-generator'

/**
 * POST /api/generate
 *
 * Two-step AI image generation:
 *   1. Gemini Flash translates Vietnamese → English + appends Đông Hồ style tokens
 *   2. Pollinations.ai generates the image (free, no API key)
 *
 * The Gemini API key is read from process.env.GEMINI_API_KEY (server-only).
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateRequest
    const { prompt_vi, seed } = body

    if (!prompt_vi || typeof prompt_vi !== 'string' || prompt_vi.trim().length === 0) {
      return NextResponse.json(
        { error: 'prompt_vi is required' },
        { status: 400 },
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 },
      )
    }

    /* ── Step 1: Translate Vietnamese → English via Gemini ── */
    let translatedPrompt: string

    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

      const geminiBody = {
        contents: [
          {
            parts: [
              {
                text: `You are a prompt translator for a Vietnamese folk art AI image generator (Đông Hồ woodblock prints). 

Translate the following Vietnamese text into an English image generation prompt. Focus on visual description. Keep it concise (under 60 words). Do NOT add any explanation — only output the translated prompt.

If the input already contains English, refine it for image generation.

Vietnamese input: "${prompt_vi.trim()}"

English image prompt:`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 150,
        },
      }

      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody),
      })

      if (!geminiRes.ok) {
        const errText = await geminiRes.text()
        throw new Error(`Gemini API error ${geminiRes.status}: ${errText}`)
      }

      const geminiData = await geminiRes.json()
      translatedPrompt =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
        prompt_vi
    } catch (geminiErr) {
      // Fallback: use the Vietnamese prompt directly (Pollinations can still process it)
      translatedPrompt = prompt_vi
    }

    /* ── Step 2: Build Pollinations image URL ── */
    const imageSeed = seed ?? Math.floor(Math.random() * 999999)
    const imageUrl = buildPollinationsUrl(translatedPrompt, {
      width: 512,
      height: 512,
      seed: imageSeed,
    })

    /* ── Step 3: Verify the image URL is reachable (HEAD check) ── */
    // Pollinations URLs are deterministic — we just return the URL.
    // The client <img> tag will fetch it directly (same-origin not required for images).

    const response: GenerateResponse = {
      imageUrl,
      translatedPrompt,
      seed: imageSeed,
    }

    return NextResponse.json(response)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
