"use client"

import { useRef, useState, useEffect } from "react"
import { Loader2, Upload } from "lucide-react"
import { useAppStore } from "@/lib/store"
import type { FilterSettings } from "@/components/editor/canvas-editor"

type HistoryEntry = {
  filters: FilterSettings
  imgData: ImageData
}

const drawOverlays = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  f: FilterSettings
) => {
  // 1. Vignette (Mờ Góc)
  if (f.vignette > 0) {
    const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.85)
    grad.addColorStop(0, "rgba(0,0,0,0)")
    grad.addColorStop(1, `rgba(0,0,0,${(f.vignette / 100) * 0.7})`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  }

  // 2. Ánh Điệp (shimmer)
  if (f.pearl > 0) {
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, `rgba(255,255,255,${(f.pearl / 100) * 0.35})`)
    grad.addColorStop(0.5, "rgba(255,255,255,0)")
    grad.addColorStop(1, `rgba(212,175,55,${(f.pearl / 100) * 0.15})`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  }

  // 3. Thớ Gỗ (wood grain)
  if (f.woodcut > 0) {
    ctx.fillStyle = `rgba(88,50,32,${(f.woodcut / 100) * 0.08})`
    for (let i = 0; i < h; i += 6) {
      ctx.fillRect(0, i + Math.sin(i / 10) * 2, w, 1.2)
    }
    ctx.fillStyle = `rgba(88,50,32,${(f.woodcut / 100) * 0.04})`
    for (let j = 0; j < w; j += 15) {
      if (Math.random() > 0.6) {
        ctx.fillRect(j, 0, 1, h)
      }
    }
  }
}

const applyPixelFilters = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  originalData: ImageData,
  s: FilterSettings
) => {
  const currentData = ctx.createImageData(width, height)
  const src = originalData.data
  const dest = currentData.data

  const { warmth, grain, misregistration, redShift, yellowShift, greenShift, sharpness } = s

  const m = Math.round(misregistration)

  // 1. Channel shift, warmth, color shifting, and grain noise
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4

      let r = src[idx]
      let g = src[idx + 1]
      let b = src[idx + 2]
      let a = src[idx + 3]

      // Lệch màu in
      if (m > 0) {
        const rx = Math.max(0, x - m)
        const ry = Math.max(0, y - m)
        r = src[(ry * width + rx) * 4]

        const gx = Math.min(width - 1, x + m)
        const gy = Math.min(height - 1, y + m)
        g = src[(gy * width + gx) * 4 + 1]

        const bx = Math.min(width - 1, x + Math.round(m / 2))
        const by = Math.min(height - 1, y + Math.round(m / 2))
        b = src[(by * width + bx) * 4 + 2]
      }

      // Nhiệt độ màu (warmth)
      if (warmth !== 0) {
        r += warmth * 0.5
        b -= warmth * 0.5
      }

      // Tông màu Đông Hồ
      if (redShift !== 0) {
        r += redShift * 0.8
      }
      if (yellowShift !== 0) {
        r += yellowShift * 0.6
        g += yellowShift * 0.6
      }
      if (greenShift !== 0) {
        g += greenShift * 0.8
      }

      // Hạt giấy dó (grain)
      if (grain > 0) {
        const noise = (Math.random() - 0.5) * grain * 0.6
        r += noise
        g += noise
        b += noise
      }

      dest[idx] = Math.max(0, Math.min(255, r))
      dest[idx + 1] = Math.max(0, Math.min(255, g))
      dest[idx + 2] = Math.max(0, Math.min(255, b))
      dest[idx + 3] = a
    }
  }

  // 2. Nét viền sắc (Convolution Sharpen)
  if (sharpness > 0) {
    const amount = sharpness / 100
    const tempData = new Uint8ClampedArray(dest)

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4

        for (let c = 0; c < 3; c++) {
          const val = tempData[idx + c]
          const top = tempData[((y - 1) * width + x) * 4 + c]
          const bottom = tempData[((y + 1) * width + x) * 4 + c]
          const left = tempData[(y * width + (x - 1)) * 4 + c]
          const right = tempData[(y * width + (x + 1)) * 4 + c]

          const neighborsAvg = (top + bottom + left + right) / 4
          const sharpenedVal = val + (val - neighborsAvg) * amount * 2.5

          dest[idx + c] = Math.max(0, Math.min(255, sharpenedVal))
        }
      }
    }
  }

  return currentData
}

export function CanvasStage({
  filters,
  setFilters,
  setActivePreset,
  zoom,
  onHistoryChange,
  undoRef,
  redoRef,
  resetRef,
  exportRef,
  commitPresetHistoryRef,
  commitSliderHistoryRef,
  triggerUploadRef,
}: {
  filters: FilterSettings
  setFilters: (f: FilterSettings) => void
  setActivePreset: (p: string | null) => void
  zoom: number
  onHistoryChange: (canUndo: boolean, canRedo: boolean) => void
  undoRef: React.MutableRefObject<(() => void) | null>
  redoRef: React.MutableRefObject<(() => void) | null>
  resetRef: React.MutableRefObject<(() => void) | null>
  exportRef: React.MutableRefObject<(() => void) | null>
  commitPresetHistoryRef: React.MutableRefObject<((f: FilterSettings) => void) | null>
  commitSliderHistoryRef: React.MutableRefObject<(() => void) | null>
  triggerUploadRef?: React.MutableRefObject<(() => void) | null>
}) {
  const setActiveView = useAppStore((s) => s.setActiveView)

  const canvasElRef = useRef<HTMLCanvasElement>(null)
  const sourceImageRef = useRef<HTMLImageElement | null>(null)
  const originalImageDataRef = useRef<ImageData | null>(null)

  // Status states
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null)
  const [isDragging, setIsDragging]             = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (triggerUploadRef) {
      triggerUploadRef.current = () => {
        fileInputRef.current?.click()
      }
    }
  }, [triggerUploadRef])

  // Undo/redo history refs
  const history = useRef<HistoryEntry[]>([])
  const pointer = useRef(-1)

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chỉ chọn tệp hình ảnh.")
      return
    }
    setIsLoading(true)
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setUploadedImageSrc(dataUrl)
      loadImage(dataUrl)
    }
    reader.onerror = () => {
      setError("Không thể đọc tệp tin.")
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = "" // reset để cho phép chọn lại cùng file
  }

  const loadImage = (url: string) => {
    setIsLoading(true)
    setError(null)
    setIsEmpty(false)

    const img = new Image()
    
    // Only set crossOrigin for absolute external URLs (e.g. Pollinations.ai)
    // Local relative assets (/dong-ho/...) and data URLs will fail if crossOrigin is set
    if (url.startsWith("http://") || url.startsWith("https://")) {
      img.crossOrigin = "anonymous"
    }

    img.onload = () => {
      sourceImageRef.current = img
      setUploadedImageSrc(url)
      const canvas = canvasElRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return

      const w = canvas.width
      const h = canvas.height
      const scale = Math.min(w / img.width, h / img.height)
      const imgW = img.width * scale
      const imgH = img.height * scale
      const x = (w - imgW) / 2
      const y = (h - imgH) / 2

      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(img, x, y, imgW, imgH)

      const origData = ctx.getImageData(0, 0, w, h)
      originalImageDataRef.current = origData

      // Clear history & set initial entry
      history.current = [{ filters: { ...filters }, imgData: origData }]
      pointer.current = 0
      onHistoryChange(false, false)

      setIsLoading(false)
      applyAndRedraw()
    }

    img.onerror = () => {
      setError("Không tải được ảnh.")
      setIsLoading(false)
    }

    img.src = url
  }

  const applyAndRedraw = () => {
    const canvas = canvasElRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return
    const img = sourceImageRef.current
    if (!img) return

    const w = canvas.width
    const h = canvas.height

    const scale = Math.min(w / img.width, h / img.height)
    const imgW = img.width * scale
    const imgH = img.height * scale
    const x = (w - imgW) / 2
    const y = (h - imgH) / 2

    // 1. Draw image with ctx.filter and shadow properties
    ctx.clearRect(0, 0, w, h)
    ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%)`

    if (filters.shadow > 0) {
      ctx.shadowColor = "rgba(0,0,0,0.45)"
      ctx.shadowBlur = filters.shadow
      ctx.shadowOffsetX = filters.shadow / 3
      ctx.shadowOffsetY = filters.shadow / 2
    }

    ctx.drawImage(img, x, y, imgW, imgH)

    // Reset shadow and filter contexts
    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.filter = "none"

    // 2. Extract context pixels for pixel-level processing
    const origData = ctx.getImageData(0, 0, w, h)
    const filteredData = applyPixelFilters(ctx, w, h, origData, filters)

    // 3. Put filtered pixels back
    ctx.putImageData(filteredData, 0, 0)

    // 4. Paint overlays on top
    drawOverlays(ctx, w, h, filters)
  }

  // No auto loading on mount, manual upload triggers it

  // Listen to filter updates
  useEffect(() => {
    if (sourceImageRef.current) {
      applyAndRedraw()
    }
  }, [filters])

  // Wire controls to parent editor
  useEffect(() => {
    undoRef.current = () => {
      if (pointer.current > 0) {
        pointer.current -= 1
        const entry = history.current[pointer.current]
        setFilters(entry.filters)
        
        // Find if preset matches
        setActivePreset(null) // default fallback

        const canvas = canvasElRef.current
        if (canvas) {
          const ctx = canvas.getContext("2d", { willReadFrequently: true })
          if (ctx) {
            ctx.putImageData(entry.imgData, 0, 0)
            drawOverlays(ctx, canvas.width, canvas.height, entry.filters)
          }
        }
        onHistoryChange(pointer.current > 0, true)
      }
    }

    redoRef.current = () => {
      if (pointer.current < history.current.length - 1) {
        pointer.current += 1
        const entry = history.current[pointer.current]
        setFilters(entry.filters)
        setActivePreset(null)

        const canvas = canvasElRef.current
        if (canvas) {
          const ctx = canvas.getContext("2d", { willReadFrequently: true })
          if (ctx) {
            ctx.putImageData(entry.imgData, 0, 0)
            drawOverlays(ctx, canvas.width, canvas.height, entry.filters)
          }
        }
        onHistoryChange(true, pointer.current < history.current.length - 1)
      }
    }

    resetRef.current = () => {
      if (history.current.length > 0) {
        pointer.current = 0
        const entry = history.current[0]
        setFilters(entry.filters)
        setActivePreset("co-dien")

        const canvas = canvasElRef.current
        if (canvas) {
          const ctx = canvas.getContext("2d", { willReadFrequently: true })
          if (ctx) {
            ctx.putImageData(entry.imgData, 0, 0)
            drawOverlays(ctx, canvas.width, canvas.height, entry.filters)
          }
        }
        history.current = [entry]
        onHistoryChange(false, false)
      }
    }

    exportRef.current = () => {
      const canvas = canvasElRef.current
      if (!canvas) return
      const link = document.createElement("a")
      link.download = `xuong-dong-ho-${Date.now()}.png`
      link.href = canvas.toDataURL("image/png", 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    commitPresetHistoryRef.current = (newFilters: FilterSettings) => {
      const canvas = canvasElRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return

      // Save ImageData before overlays
      const origData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const filteredData = applyPixelFilters(ctx, canvas.width, canvas.height, origData, newFilters)

      history.current = history.current.slice(0, pointer.current + 1)
      history.current.push({ filters: { ...newFilters }, imgData: filteredData })

      if (history.current.length > 11) {
        history.current.shift()
      }
      pointer.current = history.current.length - 1
      onHistoryChange(pointer.current > 0, false)
    }

    commitSliderHistoryRef.current = () => {
      const canvas = canvasElRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return

      // Save ImageData before overlays
      const origData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const filteredData = applyPixelFilters(ctx, canvas.width, canvas.height, origData, filters)

      history.current = history.current.slice(0, pointer.current + 1)
      history.current.push({ filters: { ...filters }, imgData: filteredData })

      if (history.current.length > 11) {
        history.current.shift()
      }
      pointer.current = history.current.length - 1
      onHistoryChange(pointer.current > 0, false)
    }
  }, [filters, setFilters, onHistoryChange, setActivePreset])

  // Auto-load generated image from AI store when entering editor
  const generatedImageUrl = useAppStore((s) => s.generatedImageUrl)
  const setGeneratedImageUrl = useAppStore((s) => s.setGeneratedImageUrl)

  useEffect(() => {
    // 1. Check generatedImageUrl in store
    if (generatedImageUrl && !isLoading) {
      loadImage(generatedImageUrl)
      setGeneratedImageUrl(null)
      // Clear sessionStorage pending image as well
      sessionStorage.removeItem("pendingCanvasImage")
      return
    }

    // 2. Check sessionStorage fallback on mount
    const pending = sessionStorage.getItem("pendingCanvasImage")
    if (pending && !isLoading) {
      loadImage(pending)
      sessionStorage.removeItem("pendingCanvasImage")
    }
  }, [generatedImageUrl])

  return (
    <div
      className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden bg-[#F9F5EE] p-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 40%, rgba(176,124,48,0.06), transparent 70%)",
      }}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
      }}
    >
      {/* Zoom wrapper */}
      <div
        className="relative transition-transform duration-150"
        style={{ transform: `scale(${zoom / 100})` }}
      >
        {/* Registration peg top */}
        <Peg className="left-1/2 top-0 -translate-x-1/2 -translate-y-[140%]" />

        {/* Paper sheet — Giấy Điệp */}
        <div
          className="deckle relative h-[540px] w-[420px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
          style={{
            backgroundColor: "#F4E7D3",
          }}
        >
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Main 2D Canvas — always mounted so ref stays valid */}
          <canvas
            ref={canvasElRef}
            width={420}
            height={540}
            className="absolute inset-0 z-10"
          />

          {/* Registration guide cross */}
          <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[rgba(88,50,32,0.08)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[rgba(88,50,32,0.08)]" />
            <div className="absolute inset-4 border border-dashed border-[rgba(88,50,32,0.12)]" />
          </div>

          {/* Loading overlay — shown on top of canvas instead of replacing it */}
          {isLoading && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#F4E7D3]/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="size-8 animate-spin text-[#B33E2B]" />
                <p className="text-sm font-medium text-[#22251B]">Đang tải ảnh vào xưởng...</p>
              </div>
            </div>
          )}

          {/* Error overlay */}
          {error && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#F4E7D3]/90 backdrop-blur-sm">
              <div className="max-w-md space-y-4 rounded-xl border border-[#C8BEA8] bg-[#EDE8DE] p-8 shadow-md text-center">
                <p className="font-serif text-lg font-bold text-[#B33E2B]">Lỗi tải ảnh</p>
                <p className="text-sm leading-relaxed text-[#3D3A35]">{error}</p>
                <button
                  type="button"
                  onClick={() => { setError(null); fileInputRef.current?.click(); }}
                  className="stamp-editor mt-2 inline-flex items-center justify-center rounded-lg bg-[#22251B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/90 cursor-pointer"
                >
                  Chọn ảnh khác
                </button>
              </div>
            </div>
          )}

          {/* Subtle drag border overlay */}
          {isDragging && (
            <div className="absolute inset-0 z-30 border-4 border-dashed border-[#B33E2B]/50 bg-[#B33E2B]/5 rounded-sm flex items-center justify-center pointer-events-none animate-pulse">
              <div className="rounded-lg bg-[#F4E7D3]/95 px-4 py-2 border border-[#C8BEA8] shadow-md flex items-center gap-2">
                <Upload className="size-4 text-[#B33E2B]" />
                <span className="text-xs font-semibold text-[#5C3A1E]">Thả ảnh để tải vào xưởng</span>
              </div>
            </div>
          )}
        </div>

        {/* Registration peg bottom */}
        <Peg className="bottom-0 left-1/2 -translate-x-1/2 translate-y-[140%]" />
      </div>
    </div>
  )
}

function Peg({ className }: { className: string }) {
  return (
    <div className={`absolute flex flex-col items-center ${className}`} aria-hidden="true">
      <span className="size-3 rounded-full border-2 border-[#C49A5C] bg-[#EDE8DE]" />
      <span className="font-mono text-[9px] uppercase tracking-wider text-[#3D3A35]">
        cối đăng ký
      </span>
    </div>
  )
}
