import Image from "next/image"

export function Logo() {
  return (
    <div className="relative w-24 h-24">
      <Image
        src="/Logo-w.png"
        alt="NIGHTSPARE"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
