"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Calendar, 
  Crown,
  BadgeCheck,
  Copy,
  Check,
  Code2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  name: string
  username: string
  bio: string
  location: string
  joinDate: string
  avatarUrl: string
  badges?: Array<"verified" | "premium" | "developer">
}

export function ProfileCard({ 
  name, 
  username, 
  bio, 
  location, 
  joinDate, 
  avatarUrl,
  badges = [] 
}: ProfileCardProps) {
  const [copied, setCopied] = useState(false)
  const [displayedBio, setDisplayedBio] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  // Typing effect with loop
  useEffect(() => {
    let index = 0
    let isDeleting = false
    setDisplayedBio("")
    setIsTyping(true)
    
    const interval = setInterval(() => {
      if (!isDeleting) {
        // Typing
        if (index < bio.length) {
          setDisplayedBio(bio.slice(0, index + 1))
          index++
        } else {
          // Finished typing, wait then start deleting
          setIsTyping(false)
          setTimeout(() => {
            isDeleting = true
            setIsTyping(true)
          }, 2000)
        }
      } else {
        // Deleting
        if (index > 0) {
          index--
          setDisplayedBio(bio.slice(0, index))
        } else {
          // Finished deleting, wait then start typing again
          isDeleting = false
          setTimeout(() => {
            setIsTyping(true)
          }, 500)
        }
      }
    }, 80)

    return () => clearInterval(interval)
  }, [bio])

  const copyUsername = () => {
    navigator.clipboard.writeText(`@${username}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const badgeIcons = {
    verified: <BadgeCheck className="h-4 w-4 text-blue-400" />,
    premium: <Crown className="h-4 w-4 text-yellow-400" />,
    developer: <Code2 className="h-4 w-4 text-green-400" />
  }

  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        {/* Simple avatar without effects */}
        <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={avatarUrl} 
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-2xl font-bold text-white">{name}</h1>
            <div className="flex items-center gap-1.5">
              {badges.map((badge, i) => (
                <span key={i}>
                  {badgeIcons[badge]}
                </span>
              ))}
            </div>
          </div>
          
          <button 
            onClick={copyUsername}
            className="group flex items-center gap-1 text-white/50 hover:text-white/80 transition-colors mx-auto sm:mx-0"
          >
            <span className="text-sm">@{username}</span>
            {copied ? (
              <Check className="h-3 w-3 text-green-400" />
            ) : (
              <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          {/* Bio with typing effect */}
          <p className="mt-3 text-white/70 leading-relaxed max-w-md italic">
            {displayedBio}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <Badge variant="secondary" className="gap-1.5 bg-white/5 hover:bg-white/10 text-white/60 border-white/10 transition-colors">
              <MapPin className="h-3 w-3" />
              {location}
            </Badge>
            <Badge variant="secondary" className="gap-1.5 bg-white/5 hover:bg-white/10 text-white/60 border-white/10 transition-colors">
              <Calendar className="h-3 w-3" />
              {joinDate}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
