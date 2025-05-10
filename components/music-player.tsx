"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Music, X } from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [splashComplete, setSplashComplete] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Listen for splash screen completion
  useEffect(() => {
    // Check for splash screen completion
    const checkSplashComplete = () => {
      const splashScreen = document.querySelector('[data-splash-screen]')
      if (!splashScreen || splashScreen.classList.contains('opacity-0')) {
        setSplashComplete(true)
        // Show tooltip after splash screen is gone with a small delay
        setTimeout(() => {
          setShowTooltip(true)
        }, 1000)
      } else {
        // Check again in a moment
        setTimeout(checkSplashComplete, 500)
      }
    }

    checkSplashComplete()
  }, [])

  // Initialize audio on client side only
  useEffect(() => {
    audioRef.current = new Audio("/SoloLeveling.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    // Auto-hide tooltip after 15 seconds
    let tooltipTimer: NodeJS.Timeout

    if (splashComplete && showTooltip) {
      tooltipTimer = setTimeout(() => {
        setShowTooltip(false)
      }, 15000)
    }

    // Clean up on unmount
    return () => {
      if (tooltipTimer) clearTimeout(tooltipTimer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [splashComplete, showTooltip])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      // Play might fail if user hasn't interacted with the page yet
      audioRef.current.play().catch(err => {
        console.error("Failed to play audio:", err)
        setIsPlaying(false)
      })
    }

    setIsPlaying(!isPlaying)
    setShowTooltip(false) // Hide tooltip when user interacts with player
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Don't render until splash screen is complete
  if (!splashComplete) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end">
      {/* Music tooltip - appears next to the player */}
      {showTooltip && (
        <div className="mb-2 mr-4 bg-dark-800 border border-primary rounded-lg p-3 shadow-lg animate-fade-in max-w-[250px]">
          <div className="flex items-start">
            <div className="flex-1">
              <p className="text-sm text-white mb-2">
                  Enhance your experience with the Solo Leveling soundtrack!
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={togglePlay}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Play
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Dismiss
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white -mt-1 -mr-1 h-6 w-6"
              onClick={() => setShowTooltip(false)}
            >
              <X size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* Music player */}
      <div
        className={`bg-dark-800 border ${isPlaying ? 'border-primary' : 'border-gray-700'} rounded-lg shadow-lg transition-all duration-300 ${
          showControls ? "p-4 scale-105" : "p-3 hover:scale-105"
        }`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {showControls ? (
          <div className="flex items-center gap-4">
            <Button
              variant={isPlaying ? "default" : "outline"}
              size="icon"
              onClick={togglePlay}
              className={isPlaying ? "bg-primary hover:bg-primary/90" : "border-primary text-primary hover:bg-primary/10"}
            >
              <Music className="h-5 w-5" />
            </Button>

            <div className="text-sm font-medium text-white min-w-32">
              {isPlaying ? "🎵 Now Playing: Solo Leveling" : "Play Background Music"}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              className="border-gray-700 text-white hover:border-primary"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant={isPlaying ? "default" : "outline"}
              size="icon"
              onClick={togglePlay}
              className={isPlaying ? "bg-primary hover:bg-primary/90" : "border-primary text-primary hover:bg-primary/10"}
            >
              <Music className="h-5 w-5" />
            </Button>
            {isPlaying && (
              <span className="text-xs font-medium text-white animate-pulse">
                Playing 🎵
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
