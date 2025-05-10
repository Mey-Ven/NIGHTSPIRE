"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Define a type for our media items
type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
}

// Updated media array with both images and videos
const mediaItems: MediaItem[] = [
  {
    type: 'video',
    src: '/hoodie-video-solo.mp4', // Place your video file in the public folder
    alt: 'Hoodie showcase video'
  },

/*  {
    type: 'image',
    src: 'https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif',
    alt: 'Hoodie showcase image'
  }, */
]

export function AutoSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Function to advance to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length)
  }

  // Clear any existing timers
  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  // Set up the slider when component mounts
  useEffect(() => {
    setIsMounted(true)

    // Initial setup for the first slide
    if (mediaItems[0].type === 'image') {
      timerRef.current = setTimeout(goToNextSlide, 8000)
    }

    return () => clearTimers()
  }, [])

  // Handle video playback when the current index changes
  useEffect(() => {
    if (isMounted) {
      // Clear any existing timers when slide changes
      clearTimers()

      // Pause all videos first
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause()
        }
      })

      // Handle the current media item
      const currentItem = mediaItems[currentIndex]

      if (currentItem.type === 'video') {
        // For videos, play the video and set up event listener for when it ends
        const videoElement = videoRefs.current[currentIndex]
        if (videoElement) {
          videoElement.currentTime = 0

          // Set up event listener for video end
          const handleVideoEnd = () => {
            // Wait a moment after video ends before transitioning
            timerRef.current = setTimeout(goToNextSlide, 1000)
          }

          // Remove any existing event listeners
          videoElement.removeEventListener('ended', handleVideoEnd)
          // Add the event listener
          videoElement.addEventListener('ended', handleVideoEnd)

          // Play the video
          videoElement.play().catch(err => {
            console.error('Error playing video:', err)
            // If video fails to play, set a timer to move to next slide
            timerRef.current = setTimeout(goToNextSlide, 5000)
          })
        }
      } else {
        // For images, set a timer to move to the next slide after 8 seconds
        timerRef.current = setTimeout(goToNextSlide, 8000)
      }
    }

    // Clean up function
    return () => {
      // Remove event listeners from videos when effect cleanup runs
      if (isMounted) {
        videoRefs.current.forEach(video => {
          if (video) {
            video.removeEventListener('ended', () => {})
          }
        })
      }
    }
  }, [currentIndex, isMounted])

  const handleShopClick = () => {
    const productSection = document.getElementById("product-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Initialize video refs array
  const setVideoRef = (el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el
  }

  // Don't render anything during SSR
  if (!isMounted) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {mediaItems[0].type === 'image' ? (
            <Image
              src={mediaItems[0].src}
              alt={mediaItems[0].alt || "Banner 1"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          ) : (
            <div className="w-full h-full bg-dark-900" />
          )}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-100 text-center mb-4">
            Premium Streetwear
          </h1>
          <p className="text-xl text-gray-300 text-center mb-8">Elevate Your Style</p>
          <Button size="lg" variant="outline">
            SHOP
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {mediaItems.map((item, index) => (
        <div
          key={`${item.type}-${item.src}`}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {item.type === 'image' ? (
            <Image
              src={item.src}
              alt={item.alt || `Banner ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          ) : (
            <video
              ref={(el) => setVideoRef(el, index)}
              className="w-full h-full object-cover"
              playsInline
              muted
              loop
              style={{ objectFit: "cover" }}
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-100 text-center mb-4">
          Premium Streetwear
        </h1>
        <p className="text-xl text-gray-300 text-center mb-8">Elevate Your Style</p>
        <Button onClick={handleShopClick} size="lg" variant="outline">
          SHOP
        </Button>
      </div>
    </div>
  )
}
