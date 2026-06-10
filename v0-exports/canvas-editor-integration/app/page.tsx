"use client"

import { useRef, useEffect, useState } from "react"
import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { Process } from "@/components/process"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { CanvasEditor } from "@/components/editor/canvas-editor"
import { Button } from "@/components/ui/button"
import { Send, RotateCw, ChevronLeft, Loader2, ArrowRight } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { QUICK_TAGS } from "@/lib/ai-generator"
import type { GenerateResponse } from "@/lib/ai-generator"

/* ─── Local demo images for fallback gallery display ─── */
const LOCAL_DONG_HO_IMAGES = [
  "/dong-ho/rooster.png",
  "/dong-ho/four-maidens.png",
  "/dong-ho/carp-children.png",
  "/dong-ho/journey-west.png",
  "/dong-ho/scholar-flute.png",
  "/dong-ho/elephant-goddess.png",
  "/dong-ho/lantern-children.png",
  "/dong-ho/buffalo-boy.png",
]

/* ─── Types ─── */
type Message = {
  id: string
  role: "user" | "ai"
  content: string
  image?: string
  timestamp: Date
}

/* ═══════════════════════════════════════════════════════════
   AI Generator View — Full-screen chat/prompting interface
   Paper texture frame (#F4E7D3), quick-tags, prompt textarea
   ═══════════════════════════════════════════════════════════ */
function AIGeneratorView() {
  const setActiveView = useAppStore((s) => s.setActiveView)
  const setGeneratedImageUrl = useAppStore((s) => s.setGeneratedImageUrl)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Xin chào! Tôi là trợ lý khắc ấn của bạn. Hãy mô tả ý tưởng tranh dân gian bạn muốn tạo — từ linh vật may mắn đến cảnh quê hương, mình sẽ khắc nên bản in Đông Hồ độc đáo cho bạn.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt_vi: messageText }),
      })

      let imageUrl: string
      if (res.ok) {
        const data: GenerateResponse = await res.json()
        imageUrl = data.imageUrl
      } else {
        // Fallback to local demo images if API fails
        imageUrl = LOCAL_DONG_HO_IMAGES[Math.floor(Math.random() * LOCAL_DONG_HO_IMAGES.length)]
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content:
          "Đã khắc xong! Đây là tác phẩm dân gian Đông Hồ dựa trên yêu cầu của bạn. Bạn có muốn chỉnh sửa trong xưởng canvas hay tạo một phiên bản khác?",
        image: imageUrl,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Xin lỗi, đã xảy ra lỗi khi tạo ảnh. Xin hãy thử lại.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleTransferToCanvas = (imageUrl: string) => {
    setGeneratedImageUrl(imageUrl)
    setActiveView("editor")
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView("landing")}
              className="p-2 hover:bg-secondary/10 rounded-lg transition-colors"
              aria-label="Quay lại"
            >
              <ChevronLeft className="size-5 text-foreground" />
            </button>
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground">
                Xưởng Khắc Ấn AI
              </h1>
              <p className="text-xs text-muted-foreground">
                Tạo tranh dân gian Đông Hồ bằng trí tuệ nhân tạo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xl space-y-3 ${
                  msg.role === "user"
                    ? "rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-primary-foreground"
                    : "rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>

                {msg.image && (
                  <div className="mt-4 space-y-3">
                    {/* Paper-textured frame — #F4E7D3 */}
                    <div className="relative overflow-hidden rounded-lg border-4 border-[#B07C30]/30 bg-[#F4E7D3] p-2 shadow-md paper-grain">
                      {/* 1:1 image container */}
                      <div className="relative aspect-square w-full overflow-hidden rounded">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={msg.image}
                          alt="Bản khắc Đông Hồ được tạo bởi AI"
                          className="h-full w-full rounded object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs h-8 border-secondary/40 text-foreground hover:bg-secondary/10"
                        onClick={() => handleTransferToCanvas(msg.image!)}
                      >
                        <ArrowRight className="size-3.5 mr-1" />
                        Chuyển vào Xưởng Canvas
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs h-8 border-secondary/40 text-foreground hover:bg-secondary/10"
                        onClick={() => handleSendMessage("Khắc biến thể tương tự")}
                      >
                        <RotateCw className="size-3.5 mr-1" />
                        Khắc biến thể
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Đang khắc gỗ...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Input */}
      <div className="border-t border-border bg-card px-6 py-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {/* Quick Tags */}
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => (
              <Button
                key={tag.vi}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(tag.vi)}
                className="text-xs border-secondary/40 text-foreground hover:bg-secondary/10"
              >
                {tag.vi}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !loading) {
                  handleSendMessage()
                }
              }}
              placeholder="Mô tả ý tưởng tranh dân gian..."
              className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              disabled={loading}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 stamp-press"
              size="icon"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Root Page — 3-view state machine via Zustand
   ═══════════════════════════════════════════════════════════ */
export default function Page() {
  const activeView = useAppStore((s) => s.activeView)

  if (activeView === "ai-generator") {
    return <AIGeneratorView />
  }

  if (activeView === "editor") {
    return <CanvasEditor />
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Gallery />
      <Process />
      <CtaSection />
      <SiteFooter />
    </div>
  )
}
