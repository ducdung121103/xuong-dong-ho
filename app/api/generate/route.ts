import { NextRequest, NextResponse } from 'next/server'
import { translatePrompt, generateImageViaCloudflare } from '@/lib/ai-generator'
import type { GenerateRequest, GenerateResponse } from '@/lib/ai-generator'

/**
 * POST /api/generate
 *
 * Two-step AI image generation:
 *   1. DeepSeek translates Vietnamese → English + appends Đông Hồ style tokens
 *   2. Cloudflare Workers AI (Flux.1 Schnell) generates the image (free tier)
 *
 * Keys are read from process.env (server-only).
 */
export async function POST(request: NextRequest) {
  console.log('=== /api/generate called ===')
  console.log('DEEPSEEK_KEY exists:', !!process.env.DEEPSEEK_API_KEY)
  console.log('CLOUDFLARE_TOKEN exists:', !!process.env.CLOUDFLARE_API_TOKEN)

  try {
    const body = (await request.json()) as GenerateRequest
    const { prompt_vi, seed } = body

    if (!prompt_vi || typeof prompt_vi !== 'string' || prompt_vi.trim().length === 0) {
      return NextResponse.json(
        { error: 'prompt_vi is required' },
        { status: 400 },
      )
    }

    /* ── Step 1: Translate Vietnamese → English via DeepSeek ── */
    let translatedPrompt: string

    try {
      translatedPrompt = await translatePrompt(prompt_vi.trim())
      console.log('=== DeepSeek translated ===', translatedPrompt)
    } catch (deepseekErr) {
      console.error('DeepSeek error, using Vietnamese prompt directly:', deepseekErr)
      translatedPrompt = prompt_vi // fallback to Vietnamese
    }

    /* ── Step 2: Generate image via Cloudflare Workers AI ── */
    const imageSeed = seed ?? Math.floor(Math.random() * 999999)
    let imageUrl: string

    try {
      imageUrl = await generateImageViaCloudflare(translatedPrompt, {
        width: 512,
        height: 512,
        seed: imageSeed,
      })
      console.log('=== Cloudflare image generated, data URL length ===', imageUrl.length)
    } catch (cfErr) {
      console.error('Cloudflare generation error:', cfErr)
      return NextResponse.json(
        { error: cfErr instanceof Error ? cfErr.message : 'Image generation failed' },
        { status: 500 },
      )
    }

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