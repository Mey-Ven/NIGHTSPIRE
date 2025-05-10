import { HoodieCard } from "@/components/hoodie-card"
import { AutoSliderBanner } from "@/components/auto-slider-banner"
import { convertToMAD } from "@/lib/utils"
import { siteConfig } from "@/config/site"

export default function Home() {
  const hoodies = [
    {
      id: 1,
      name: "NIGHTSPIRE Classic Black",
      price: 219.99,
      image1: "/hoodie1.jpg",
      image2: "/Back.jpg", // Fixed case sensitivity
    },
    {
      id: 2,
      name: "NIGHTSPIRE Premium Curse Seal",
      price: 249.99,
      image1: "/ssk.jpg",
      image2: "/ssk-bk.jpg",
    },
    {
      id: 3,
      name: "NIGHTSPIRE Sukuna Curse",
      price: 249.99,
      image1: "/skn.jpg",
      image2: "/skn-bk.jpg", // Added missing leading slash
    },
    {
      id: 4,
      name: "NIGHTSPIRE Berserker Fury",
      price: 249.99,
      image1: "/gts.jpg",
      image2: "/gts-bk.jpg",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Full-screen Auto-sliding Banner */}
      <AutoSliderBanner />

      {/* Product Section */}
      <section id="product-section" className="w-full py-8 md:py-16 lg:py-24 bg-dark-900">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="mb-6 md:mb-8 text-2xl md:text-3xl font-bold text-center text-gray-100">Latest Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {hoodies.map((hoodie) => (
              <HoodieCard key={hoodie.id} {...hoodie} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
