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

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
      setIsHovered(true);
      // Auto-revert after a short delay
      setTimeout(() => setIsHovered(false), 1500);
    }
  };

  return (
    <div className="bg-dark-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div
        className="relative aspect-square"
        onMouseEnter={() => isMounted && setIsHovered(true)}
        onMouseLeave={() => isMounted && setIsHovered(false)}
        onTouchStart={handleTouchStart}
      >
        <Image
          src={isMounted && isHovered ? image2 : image1}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 45vw, (max-width: 1200px) 30vw, 25vw"
          priority
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
