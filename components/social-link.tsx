"use client"

import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface SocialLinkProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  href: string
  badge?: string
  stats?: {
    online?: number
    members?: number
  }
  accentColor?: string
}

export function SocialLink({ 
  icon, 
  title, 
  subtitle, 
  href, 
  badge,
  stats,
  accentColor = "purple"
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl",
        "bg-secondary/30 hover:bg-secondary/50",
        "border border-border/50 hover:border-primary/30",
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10"
      )}
    >
      {/* Icon container */}
      <div className={cn(
        "relative h-12 w-12 rounded-xl flex items-center justify-center",
        "bg-gradient-to-br from-secondary to-secondary/50",
        "group-hover:from-primary/20 group-hover:to-primary/5",
        "transition-all duration-300"
      )}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground truncate">{title}</h3>
          {badge && (
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
        
        {stats && (
          <div className="flex items-center gap-3 mt-1.5">
            {stats.online !== undefined && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                {stats.online} Online
              </span>
            )}
            {stats.members !== undefined && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                {stats.members.toLocaleString()} Membros
              </span>
            )}
          </div>
        )}
      </div>

      {/* Arrow */}
      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </a>
  )
}
