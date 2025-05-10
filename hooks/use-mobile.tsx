import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)

    // Only run this code on the client side
    if (typeof window !== 'undefined') {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      const onChange = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }

      // Set initial value
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

      // Add event listener
      mql.addEventListener("change", onChange)

      // Clean up
      return () => mql.removeEventListener("change", onChange)
    }
  }, [])

  // During SSR, always return false
  if (!isMounted) return false

  return isMobile
}
