import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { SplashScreen } from "@/components/splash-screen"
import { Logo } from "@/components/logo"
import { CustomCursor } from "@/components/custom-cursor"
import { CssVariableFixer } from "@/components/css-variable-fixer"
import { MusicPlayer } from "@/components/music-player"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NIGHTSPIRE - Premium Hoodies",
  description: "Premium streetwear and comfortable hoodies",
  generator: 'v0.dev',
  icons: {
    icon: '/Logo.png',
    apple: '/Logo.png',
    shortcut: '/Logo.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Add a script to fix any malformed CSS variables */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Fix malformed CSS variables on the HTML element
              document.addEventListener('DOMContentLoaded', function() {
                const htmlEl = document.documentElement;
                const style = htmlEl.getAttribute('style');
                if (style && style.includes('--main--position--')) {
                  // Replace malformed CSS variable with correct syntax
                  const fixedStyle = style.replace(/--main--position--\s*:\s*"?([^"\;]+)"?/g, '--main-position: $1');
                  htmlEl.setAttribute('style', fixedStyle);
                }
              });
            })();
          `
        }} />
      </head>
      <body className={`${inter.className} bg-dark-900 text-gray-100`}>
        <CssVariableFixer />
        <SplashScreen />
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <Logo />
        </div>
        {children}
        <footer className="w-full py-6 px-4 bg-dark-600 text-gray-400">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 NIGHTSPIRE. All rights reserved.</p>
          </div>
        </footer>
        <CustomCursor />
        <MusicPlayer />
      </body>
    </html>
  )
}
