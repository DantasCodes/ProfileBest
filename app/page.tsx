"use client"

import { useState, useEffect, useRef } from "react"
import { ProfileCard } from "@/components/profile-card"
import { SocialLink } from "@/components/social-link"
import { AudioToggle } from "@/components/audio-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Home,
  Link2,
  MessageCircle,
  Github,
  Twitter,
  Instagram,
  Gamepad2,
  Eye
} from "lucide-react"

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"home" | "links">("home")
  const [viewCount] = useState(2847)
  const [mounted, setMounted] = useState(false)
  const [showEntryOverlay, setShowEntryOverlay] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Force autoplay on load
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.play().catch(() => {
        // Autoplay blocked, video will play muted when user interacts
      })
    }
  }, [])

  // Função para iniciar a experiência (ativar som e remover overlay)
  const startExperience = () => {
    const video = videoRef.current
    if (video) {
      video.muted = false
      video.play().catch(() => {})
    }
    setShowEntryOverlay(false)
  }

  const tabs = [
    { id: "home" as const, label: "HOME", icon: Home },
    { id: "links" as const, label: "LINKS", icon: Link2 }
  ]

  const socialLinks = [
    {
      icon: <img src="/images/xiisluv.jpg" alt="" className="h-8 w-8 rounded-lg object-cover" />,
      title: "Dantasx",
      subtitle: "@dantsx",
      href: "#"
    },
    {
      icon: <DiscordIcon className="h-6 w-6 text-[#5865F2]" />,
      title: "gg.HexLab | Best Profile's",
      subtitle: "Compartilhe todo o seu conteúdo em um local bonito...",
      href: "https://discord.gg/JMnj5g3g",
      badge: "Servidor do Discord",
      stats: { online: 25, members: 1425 }
    }
  ]

  const quickLinks = [
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter", href: "#", color: "hover:text-sky-400" },
    { icon: <Instagram className="h-5 w-5" />, label: "Instagram", href: "https://www.instagram.com/dantasfps1", color: "hover:text-pink-400" },
    { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "https://github.com/DantasCodes", color: "hover:text-foreground" },
    { icon: <Gamepad2 className="h-5 w-5" />, label: "Steam", href: "https://steamcommunity.com/profiles/76561199508314613/", color: "hover:text-blue-400" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* TELA DE ENTRADA (LOADSCREEN) - COM TRANSIÇÃO DE 2 SEGUNDOS */}
      <div 
        id="entry-overlay"
        onClick={startExperience}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/98 backdrop-blur-md cursor-pointer"
        style={{
          transition: 'opacity 1000ms ease-in-out, visibility 1000ms',
          opacity: showEntryOverlay ? 1 : 0,
          visibility: showEntryOverlay ? 'visible' : 'hidden'
        }}
      >
        <div className="entry-content flex items-center gap-3 bg-transparent px-4 py-2 transition-all duration-300 hover:scale-105">
          <span className="heart-icon text-base opacity-60 transition-opacity duration-300">🤍</span>
          <span className="click-text text-[10px] tracking-[5px] uppercase text-white/50 font-medium transition-colors duration-300">Clique Aqui</span>
          <span className="heart-icon text-base opacity-60 transition-opacity duration-300">🤍</span>
        </div>
      </div>

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/Maki.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Audio toggle */}
      <AudioToggle videoSrc="/video/Maki.mp4" />

      {/* View counter */}
      <div className="fixed top-6 right-6 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm text-white/70 border border-white/10">
        <Eye className="h-4 w-4" />
        <span>{mounted ? viewCount.toLocaleString() : "2.847"}</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-xl">
          {/* Card */}
          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/5">
            {/* Tabs */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300",
                      activeTab === tab.id
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {tab.label}
                  </button>
                )
              })}
              
              {/* Eye icon for visibility toggle */}
              <button className="ml-auto text-white/30 hover:text-white/60 transition-colors">
                <Eye className="h-4 w-4" />
              </button>
            </div>

            {/* Tab content - HOME */}
            <div className={cn(
              "transition-all duration-500",
              activeTab === "home" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 hidden"
            )}>
              {/* Profile */}
              <ProfileCard
                name="Dantas"
                username="d"
                bio="founder at! gg.HexLab"
                location="BRASIL"
                joinDate="22/04/2026"
                avatarUrl="/images/xiisluv.jpg"
                badges={["verified", "premium", "developer"]}
              />

              {/* Social links */}
              <div className="mt-8 space-y-3">
                {socialLinks.map((link, i) => (
                  <SocialLink
                    key={i}
                    icon={link.icon}
                    title={link.title}
                    subtitle={link.subtitle}
                    href={link.href}
                    badge={link.badge}
                    stats={link.stats}
                  />
                ))}
              </div>
            </div>

            {/* Tab content - LINKS */}
            <div className={cn(
              "transition-all duration-500",
              activeTab === "links" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 hidden"
            )}>
              {/* Quick links */}
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl",
                      "bg-white/5 hover:bg-white/10",
                      "border border-white/5 hover:border-white/10",
                      "transition-all duration-300 hover:scale-[1.02]",
                      "text-white/60",
                      link.color
                    )}
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                className="w-full mt-6 h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Entrar em contato
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              <span className="font-mono tracking-wider">Criando as melhores páginas de perfil para streamers, criadores de conteúdo e comunidades no Brasil.</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}