import { cn } from "@/lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "spinner" | "dots" | "pulse" | "bars"
  className?: string
  text?: string
}

export function Loader({ size = "md", variant = "spinner", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  if (variant === "spinner") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-slate-700/30"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-cyan-500 animate-spin"></div>
        <div
          className="absolute inset-1 rounded-full border border-transparent border-t-purple-400/50 border-r-cyan-400/50 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse",
              size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-4 h-4",
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.4s",
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 animate-ping"></div>
        <div
          className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500/40 to-cyan-500/40 animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"></div>
      </div>
    )
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex items-end space-x-1", className)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-gradient-to-t from-purple-500 to-cyan-500 rounded-sm animate-pulse",
              size === "sm" ? "w-0.5" : size === "md" ? "w-1" : size === "lg" ? "w-1.5" : "w-2",
            )}
            style={{
              height:
                size === "sm"
                  ? `${8 + i * 2}px`
                  : size === "md"
                    ? `${12 + i * 3}px`
                    : size === "lg"
                      ? `${16 + i * 4}px`
                      : `${20 + i * 5}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1.2s",
            }}
          />
        ))}
      </div>
    )
  }

  return null
}

// Full page loader component
export function PageLoader({text} :LoaderProps)  {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"></div>
      <div className="relative flex flex-col items-center space-y-6">
        {/* Main loader */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-slate-700/30"></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-purple-500 border-r-cyan-500 animate-spin"></div>
          <div
            className="absolute inset-2 w-16 h-16 rounded-full border border-transparent border-t-purple-400/50 border-r-cyan-400/50 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "2s" }}
          ></div>
          <div className="absolute inset-6 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 animate-pulse"></div>
        </div>

        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">DSA Tracker</span>
        </div>

        {/* Loading text */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-400">{text}</span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Card loader for loading states within cards
export function CardLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-slate-700/50 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-3 bg-slate-700/30 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-slate-700/50 rounded"></div>
        <div className="h-3 bg-slate-700/30 rounded w-5/6"></div>
        <div className="h-3 bg-slate-700/20 rounded w-4/6"></div>
      </div>
    </div>
  )
}

// Chart loader
export function ChartLoader() {
  return (
    <div className="h-[300px] flex items-center justify-center">
      <div className="relative">
        <Loader variant="pulse" size="lg" />
      </div>
    </div>
  )
}
