"use client"

import { useEffect } from 'react'

export function CssVariableFixer() {
  useEffect(() => {
    // Fix malformed CSS variables on the HTML element
    const htmlEl = document.documentElement
    const style = htmlEl.getAttribute('style')
    
    if (style && style.includes('--main--position--')) {
      // Replace malformed CSS variable with correct syntax
      const fixedStyle = style.replace(/--main--position--\s*:\s*"?([^";]+)"?/g, '--main-position: $1')
      htmlEl.setAttribute('style', fixedStyle)
    }
  }, [])

  // This component doesn't render anything
  return null
}
