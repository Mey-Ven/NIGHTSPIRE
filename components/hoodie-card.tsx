"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

interface HoodieCardProps {
  name: string
  price: number
  image1: string
  image2: string
  id?: number
}

export function HoodieCard({ name, price, image1, image2 }: HoodieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Check if we're in the browser
  useEffect(() => {
    setIsMounted(true)

    // Preload both images
    if (typeof window !== 'undefined') {
      const img1 = new window.Image();
      const img2 = new window.Image();

      img1.onload = () => {
        img2.src = image2;
      };

      img2.onload = () => {
        setImageLoaded(true);
      };

      img1.src = image1;
    }
  }, [image1, image2])

  // Function to generate WhatsApp link with pre-filled message
  const generateWhatsAppLink = () => {
    // Get WhatsApp number from site config
    const phoneNumber = siteConfig.contact.whatsapp

    // Create a message with product details
    const message = `Hello! I'm interested in purchasing the ${name} hoodie for ${price.toFixed(2)} ${siteConfig.store.currencySymbol}. Please provide more information about availability and shipping.`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)

    // Generate the WhatsApp link
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
  }

  // Handle Buy Now button click
  const handleBuyNow = () => {
    // Open WhatsApp in a new tab
    window.open(generateWhatsAppLink(), "_blank")
  }

  // Add touch event handlers for mobile devices
  const handleTouchStart = () => {
    if (isMounted) {
      console.log(`Touch on ${name}: toggling image view`);
      // Toggle the hover state on touch for mobile devices
      setIsHovered(prev => !prev);

      // Auto-revert after a longer delay to give users time to see the back
      if (!isHovered) {
        setTimeout(() => {
          console.log(`Auto-reverting ${name} to front view`);
          setIsHovered(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div
        className="relative aspect-square"
        onMouseEnter={() => {
          if (isMounted) {
            console.log(`Hovering ${name}: showing back image`);
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (isMounted) {
            console.log(`Leaving ${name}: showing front image`);
            setIsHovered(false);
          }
        }}
        onTouchStart={handleTouchStart}
      >
        {/* Front image (always loaded) */}
        <Image
          src={image1}
          alt={`${name} front view`}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isMounted && isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 45vw, (max-width: 1200px) 30vw, 25vw"
          priority
        />

        {/* Back image (loaded on top, shown on hover) */}
        <Image
          src={image2}
          alt={`${name} back view`}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isMounted && isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 45vw, (max-width: 1200px) 30vw, 25vw"
          priority={imageLoaded}
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-100 truncate">{name}</h3>
        <p className="text-gray-400 text-sm sm:text-base mb-2 sm:mb-4">
          {price.toFixed(2)} {siteConfig.store.currencySymbol}
        </p>
        <Button
          className="w-full text-sm sm:text-base py-1 sm:py-2"
          variant="outline"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </div>
  )
}
