"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface AudioToggleProps {
  videoSrc?: string
}

export function AudioToggle({ videoSrc }: AudioToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showVolume, setShowVolume] = useState(false)

  const toggleAudio = () => {
    // Find the video element and toggle its audio
    const video = document.querySelector('video') as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.muted = true
      } else {
        video.muted = false
        video.volume = volume
      }
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    const video = document.querySelector('video') as HTMLVideoElement
    if (video) {
      video.volume = newVolume
    }
  }

  return (
    <div 
      className="fixed top-6 left-6 z-50 flex items-center gap-2"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <button
        onClick={toggleAudio}
        className={cn(
          "h-10 w-10 rounded-full",
          "bg-black/50 backdrop-blur-sm border border-white/10",
          "flex items-center justify-center",
          "transition-all duration-300 hover:bg-black/70 hover:scale-105",
          "group"
        )}
        aria-label={isPlaying ? "Mutar" : "Ativar som"}
      >
        {isPlaying ? (
          <Volume2 className="h-4 w-4 text-white/80" />
        ) : (
          <VolumeX className="h-4 w-4 text-white/50 group-hover:text-white/80 transition-colors" />
        )}
      </button>

      {/* Volume slider */}
      <div className={cn(
        "flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2 border border-white/10",
        "transition-all duration-300",
        showVolume ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
      )}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />
      </div>
    </div>
  )
}
